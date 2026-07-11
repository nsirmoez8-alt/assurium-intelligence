import { getClientById, clientFullName } from "../data/clients";
import { claims } from "../data/claims";
import { upcomingRenewals } from "./metrics";
import { habitationCrossSellCount } from "./opportunities";
import { daysUntil, formatCurrency } from "./format";

export interface AlyaInsight {
  id: string;
  text: string;
  tone: "info" | "warning" | "opportunity";
  href?: string;
}

export function generateAlyaInsights(): AlyaInsight[] {
  const insights: AlyaInsight[] = [];

  const nextRenewal = upcomingRenewals(30)[0];
  if (nextRenewal) {
    const client = getClientById(nextRenewal.clientId);
    if (client) {
      insights.push({
        id: "renewal",
        text: `Le contrat ${nextRenewal.type} de ${clientFullName(client)} expire dans ${daysUntil(nextRenewal.endDate)} jours.`,
        tone: "warning",
        href: `/clients/${client.id}`,
      });
    }
  }

  const atRiskClaim = claims
    .filter((c) => c.status === "En analyse" || c.status === "En traitement")
    .sort((a, b) => new Date(a.declaredDate).getTime() - new Date(b.declaredDate).getTime())[0];
  if (atRiskClaim) {
    insights.push({
      id: "claim",
      text: `Le sinistre ${atRiskClaim.reference} présente un risque de dépassement de délai.`,
      tone: "warning",
      href: `/sinistres/${atRiskClaim.id}`,
    });
  }

  const habitationCount = habitationCrossSellCount();
  if (habitationCount > 0) {
    insights.push({
      id: "cross-sell",
      text: `Vous pourriez proposer une couverture Habitation à ${habitationCount} clients Auto non couverts.`,
      tone: "opportunity",
      href: "/opportunites",
    });
  }

  const criticalClaim = claims.find((c) => c.priority === "Critique" && c.status !== "Clôturé");
  if (criticalClaim) {
    const client = getClientById(criticalClaim.clientId);
    insights.push({
      id: "critical",
      text: `Dossier prioritaire : ${criticalClaim.type} (${criticalClaim.reference})${client ? ` pour ${clientFullName(client)}` : ""}, montant estimé ${formatCurrency(criticalClaim.estimatedAmount)}.`,
      tone: "warning",
      href: `/sinistres/${criticalClaim.id}`,
    });
  }

  return insights;
}

export function alyaSummary(): { priorities: number; renewals: number; risks: number; opportunities: number } {
  const renewals = upcomingRenewals(30).length;
  const risks = claims.filter((c) => c.status === "En analyse" || c.status === "En traitement").length;
  const opportunities = habitationCrossSellCount();
  return { priorities: 3, renewals, risks, opportunities };
}

const fallbackReplies = [
  "Je continue d'analyser votre portefeuille en temps réel — d'autres signaux pourraient apparaître d'ici peu.",
  "Bonne question. Je vous recommande de vérifier la fiche client concernée pour plus de détails.",
  "Je note votre demande. En attendant, la page Opportunités regroupe mes dernières recommandations.",
];

export function alyaReply(message: string): string {
  const m = message.toLowerCase();

  if (m.includes("sinistre") || m.includes("claim")) {
    const open = claims.filter((c) => c.status !== "Clôturé" && c.status !== "Refusé").length;
    return `Il y a actuellement ${open} sinistres ouverts. Le plus urgent est en priorité critique — je vous conseille de le consulter dans "Sinistres".`;
  }
  if (m.includes("contrat") || m.includes("échéance") || m.includes("echeance") || m.includes("renouvel")) {
    const renewals = upcomingRenewals(30).length;
    return `${renewals} contrats arrivent à échéance dans les 30 prochains jours. Je peux prioriser les plus stratégiques si besoin.`;
  }
  if (m.includes("client")) {
    return "Vous gérez actuellement 24 clients. Voulez-vous que je mette en avant ceux avec une satisfaction en baisse ?";
  }
  if (m.includes("opportunit") || m.includes("vente") || m.includes("cross")) {
    const count = habitationCrossSellCount();
    return `J'ai identifié plusieurs opportunités, dont ${count} clients Auto sans Habitation. Consultez la page Opportunités pour lancer une campagne.`;
  }
  if (m.includes("bonjour") || m.includes("salut") || m.includes("merci")) {
    return "Toujours un plaisir de vous accompagner. Dites-moi si vous voulez un point sur les priorités du jour.";
  }

  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}
