import { clients } from "../data/clients";
import { contracts } from "../data/contracts";
import { claims } from "../data/claims";
import { daysUntil } from "./format";
import type { ContractType } from "../types";

export function activeClients() {
  return clients.filter((c) => c.status === "Actif");
}

export function totalAnnualPremium() {
  return contracts
    .filter((c) => c.status === "Actif")
    .reduce((sum, c) => sum + c.premium, 0);
}

export function upcomingRenewals(withinDays = 30) {
  return contracts
    .filter((c) => (c.status === "Actif" || c.status === "Suspendu") && daysUntil(c.endDate) >= 0 && daysUntil(c.endDate) <= withinDays)
    .sort((a, b) => daysUntil(a.endDate) - daysUntil(b.endDate));
}

export function openClaims() {
  return claims.filter((c) => c.status === "Déclaré" || c.status === "En analyse" || c.status === "En traitement");
}

export function averageSatisfaction() {
  const active = activeClients();
  return Math.round(active.reduce((sum, c) => sum + c.satisfaction, 0) / active.length);
}

export function contractsByType(): { type: ContractType; count: number; premium: number }[] {
  const map = new Map<ContractType, { count: number; premium: number }>();
  for (const c of contracts) {
    if (c.status !== "Actif") continue;
    const entry = map.get(c.type) ?? { count: 0, premium: 0 };
    entry.count += 1;
    entry.premium += c.premium;
    map.set(c.type, entry);
  }
  return Array.from(map.entries())
    .map(([type, v]) => ({ type, ...v }))
    .sort((a, b) => b.premium - a.premium);
}

export function claimsByStatus() {
  const statuses = ["Déclaré", "En analyse", "En traitement", "Clôturé", "Refusé"] as const;
  return statuses.map((status) => ({
    status,
    count: claims.filter((c) => c.status === status).length,
  }));
}

const monthLabels = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

export function monthlyPremiumTrend() {
  // Progression simulée des primes encaissées sur l'année en cours, cohérente avec le volume actuel du portefeuille.
  const base = totalAnnualPremium() / 12;
  const factors = [0.78, 0.81, 0.85, 0.88, 0.91, 0.93, 0.97, 1, 1.02, 1.05, 1.07, 1.1];
  return monthLabels.map((month, i) => ({
    month,
    primes: Math.round((base * factors[i]) / 100) * 100,
  }));
}

export function monthlyClaimsTrend() {
  const declaredByMonth = [4, 3, 6, 5, 7, 8, 5];
  const closedByMonth = [3, 4, 3, 5, 4, 6, 4];
  return monthLabels.slice(0, 7).map((month, i) => ({
    month,
    déclarés: declaredByMonth[i],
    clôturés: closedByMonth[i],
  }));
}

export function segmentDistribution() {
  const segments: Record<string, number> = {};
  for (const c of clients) {
    segments[c.segment] = (segments[c.segment] ?? 0) + 1;
  }
  return Object.entries(segments).map(([segment, count]) => ({ segment, count }));
}

export function claimsAverageResolutionDays() {
  const closed = claims.filter((c) => c.status === "Clôturé");
  const total = closed.reduce((sum, c) => {
    const declared = new Date(c.declaredDate).getTime();
    const updated = new Date(c.updatedDate).getTime();
    return sum + (updated - declared) / (1000 * 60 * 60 * 24);
  }, 0);
  return Math.round(total / closed.length);
}

export function portfolioHealthScore(): number {
  const satisfactionScore = averageSatisfaction();

  const activeContracts = contracts.filter((c) => c.status === "Actif");
  const highRiskShare = activeContracts.filter((c) => c.riskLevel === "Élevé").length / activeContracts.length;
  const riskScore = 100 - highRiskShare * 100;

  const criticalOpen = claims.filter((c) => c.priority === "Critique" && c.status !== "Clôturé" && c.status !== "Refusé").length;
  const openRatio = openClaims().length / claims.length;
  const claimsScore = 100 - openRatio * 100 - criticalOpen * 6;

  const clientsWithDocs = clients.filter((c) => c.missingDocuments.length > 0).length;
  const docsScore = 100 - (clientsWithDocs / clients.length) * 100;

  const weighted = satisfactionScore * 0.4 + riskScore * 0.25 + claimsScore * 0.2 + docsScore * 0.15;
  return Math.round(Math.min(100, Math.max(0, weighted)));
}
