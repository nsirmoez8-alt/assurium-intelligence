import type { Claim, ClaimStatus } from "../types";
import { claimsAverageResolutionDays } from "./metrics";

function seededRandom(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return (h % 1000) / 1000;
}

export interface ClaimPrediction {
  resolutionProbability: number;
  fraudRisk: number;
  recommendation: string;
  level: "low" | "medium" | "high";
}

const highRiskTypes = ["Vol de véhicule", "Vol de matériel", "Incendie entrepôt", "Cambriolage", "Sinistre client", "Litige contractuel"];

export function predictClaim(claim: Claim): ClaimPrediction {
  const r1 = seededRandom(`${claim.id}-resolution`);
  const r2 = seededRandom(`${claim.id}-fraud`);

  let baseResolution = 62 + r1 * 33; // 62-95
  if (claim.status === "Clôturé") baseResolution = 96 + r1 * 4;
  if (claim.status === "Refusé") baseResolution = 8 + r1 * 10;
  if (claim.priority === "Critique") baseResolution -= 8;
  if (claim.priority === "Haute") baseResolution -= 4;

  let baseFraud = 3 + r2 * 14; // 3-17 baseline
  if (highRiskTypes.includes(claim.type)) baseFraud += 8 + r2 * 12;
  if (claim.estimatedAmount > 20000) baseFraud += 6;
  if (claim.status === "Clôturé") baseFraud *= 0.5;

  const resolutionProbability = Math.round(Math.min(99, Math.max(4, baseResolution)));
  const fraudRisk = Math.round(Math.min(78, Math.max(2, baseFraud)));

  let level: ClaimPrediction["level"] = "low";
  if (fraudRisk >= 40 || resolutionProbability < 50) level = "high";
  else if (fraudRisk >= 18 || resolutionProbability < 75) level = "medium";

  let recommendation = "Dossier standard : poursuivre le traitement selon le processus habituel.";
  if (level === "high") {
    recommendation = fraudRisk >= 40
      ? "Signal de vigilance : recommander une contre-expertise avant indemnisation."
      : "Risque de retard élevé : prioriser ce dossier et relancer l'expert assigné.";
  } else if (level === "medium") {
    recommendation = "Suivi rapproché recommandé pour sécuriser les délais de traitement.";
  }

  return { resolutionProbability, fraudRisk, recommendation, level };
}

export interface TimelineStage {
  status: ClaimStatus;
  label: string;
  date: string;
  state: "done" | "current" | "pending";
  description: string;
}

const stageDescriptions: Record<string, string> = {
  Déclaré: "Sinistre enregistré et accusé de réception envoyé au client.",
  "En analyse": "Expertise en cours et vérification des garanties du contrat.",
  "En traitement": "Indemnisation en cours de validation et de préparation.",
  Clôturé: "Dossier indemnisé et archivé.",
  Refusé: "Sinistre non couvert ou déclaré hors délai contractuel.",
};

export function getNextSteps(status: ClaimStatus): string[] {
  switch (status) {
    case "Déclaré":
      return ["Affectation à un expert sous 48h", "Premier contact avec le client", "Collecte des pièces justificatives"];
    case "En analyse":
      return ["Finalisation de l'expertise", "Vérification des plafonds de garantie", "Estimation du montant à valider"];
    case "En traitement":
      return ["Validation de l'indemnisation", "Préparation du virement ou de la prise en charge", "Confirmation écrite au client"];
    case "Clôturé":
      return ["Dossier archivé", "Enquête de satisfaction envoyée au client"];
    case "Refusé":
      return ["Notification de refus envoyée", "Le client dispose de 30 jours pour contester"];
    default:
      return [];
  }
}

export function buildTimeline(claim: Claim): TimelineStage[] {
  const isRefused = claim.status === "Refusé";
  const stageOrder: ClaimStatus[] = isRefused
    ? ["Déclaré", "En analyse", "Refusé"]
    : ["Déclaré", "En analyse", "En traitement", "Clôturé"];

  const currentIndex = stageOrder.indexOf(claim.status);
  const declared = new Date(claim.declaredDate).getTime();
  const updated = new Date(claim.updatedDate).getTime();
  const avgStepMs = Math.max(2, Math.round(claimsAverageResolutionDays() / 3)) * 24 * 60 * 60 * 1000;

  return stageOrder.map((status, i) => {
    let date: string;
    let state: TimelineStage["state"];

    if (i < currentIndex || (i === currentIndex && (status === "Clôturé" || status === "Refusé"))) {
      state = "done";
      const fraction = currentIndex === 0 ? 0 : i / currentIndex;
      date = new Date(declared + (updated - declared) * fraction).toISOString();
    } else if (i === currentIndex) {
      state = "current";
      date = claim.updatedDate;
    } else {
      state = "pending";
      date = new Date(updated + avgStepMs * (i - currentIndex)).toISOString();
    }

    return {
      status,
      label: status,
      date,
      state,
      description: stageDescriptions[status] ?? "",
    };
  });
}

export function estimatedResolution(claim: Claim): { label: string; overdue: boolean } {
  const avg = claimsAverageResolutionDays();
  const daysElapsed = Math.round((Date.now() - new Date(claim.declaredDate).getTime()) / (1000 * 60 * 60 * 24));

  if (claim.status === "Clôturé") {
    const resolved = Math.round((new Date(claim.updatedDate).getTime() - new Date(claim.declaredDate).getTime()) / (1000 * 60 * 60 * 24));
    return { label: `Résolu en ${resolved} jours`, overdue: false };
  }
  if (claim.status === "Refusé") {
    return { label: "Dossier clôturé sans indemnisation", overdue: false };
  }

  const remaining = avg - daysElapsed;
  if (remaining <= 0) {
    return { label: `Délai moyen dépassé de ${Math.abs(remaining)} jours`, overdue: true };
  }
  return { label: `Résolution estimée sous ${remaining} jours`, overdue: false };
}
