import { clients, clientFullName, getClientById } from "../data/clients";
import { getContractsByClient } from "../data/contracts";
import type { Client, ContractType } from "../types";

export type OpportunityKind = "cross-sell" | "fidelisation" | "conversion" | "retention";

export interface Opportunity {
  id: string;
  kind: OpportunityKind;
  title: string;
  description: string;
  clients: Client[];
  potentialGain: number;
  confidence: number; // 0-100
  recommendedAction: string;
}

function hasActiveContractType(clientId: string, type: ContractType): boolean {
  return getContractsByClient(clientId).some((c) => c.type === type && c.status === "Actif");
}

export function clientsWithoutCoverage(have: ContractType, missing: ContractType): Client[] {
  return clients.filter(
    (c) => c.status === "Actif" && hasActiveContractType(c.id, have) && !hasActiveContractType(c.id, missing),
  );
}

export function highValueRetentionClients(): Client[] {
  return clients.filter((c) => {
    if (c.status !== "Actif") return false;
    const premium = getContractsByClient(c.id)
      .filter((ct) => ct.status === "Actif")
      .reduce((s, ct) => s + ct.premium, 0);
    return premium >= 6000 && c.satisfaction < 85;
  });
}

export function prospectsToConvert(): Client[] {
  return clients.filter((c) => c.status === "Prospect");
}

export function patrimonialWithoutVie(): Client[] {
  return clients.filter(
    (c) => c.status === "Actif" && (c.segment === "Patrimonial" || c.segment === "Professionnel") && !hasActiveContractType(c.id, "Vie"),
  );
}

export function buildOpportunities(): Opportunity[] {
  const autoNoHabitation = clientsWithoutCoverage("Auto", "Habitation");
  const habitationNoSante = clientsWithoutCoverage("Habitation", "Santé");
  const retention = highValueRetentionClients();
  const prospects = prospectsToConvert();
  const vieCandidates = patrimonialWithoutVie();

  const opportunities: Opportunity[] = [
    {
      id: "op-habitation",
      kind: "cross-sell",
      title: "Clients Auto sans assurance Habitation",
      description: `${autoNoHabitation.length} clients possèdent un contrat Auto actif mais aucune couverture Habitation chez Assurium.`,
      clients: autoNoHabitation,
      potentialGain: autoNoHabitation.length * 620,
      confidence: 78,
      recommendedAction: "Proposer une offre Habitation groupée avec remise multi-contrats",
    },
    {
      id: "op-sante",
      kind: "cross-sell",
      title: "Clients Habitation sans complémentaire Santé",
      description: `${habitationNoSante.length} clients couverts en Habitation n'ont pas de contrat Santé actif.`,
      clients: habitationNoSante,
      potentialGain: habitationNoSante.length * 980,
      confidence: 64,
      recommendedAction: "Envoyer une simulation personnalisée de complémentaire santé",
    },
    {
      id: "op-vie",
      kind: "cross-sell",
      title: "Profils patrimoniaux sans contrat Vie",
      description: `${vieCandidates.length} clients patrimoniaux ou professionnels à fort potentiel n'ont pas encore de contrat d'assurance Vie.`,
      clients: vieCandidates,
      potentialGain: vieCandidates.length * 4200,
      confidence: 56,
      recommendedAction: "Planifier un rendez-vous patrimonial dédié",
    },
    {
      id: "op-retention",
      kind: "retention",
      title: "Clients à forte valeur et satisfaction fragile",
      description: `${retention.length} clients représentant plus de 6 000 € de primes annuelles affichent une satisfaction sous les 85 %.`,
      clients: retention,
      potentialGain: retention.reduce((s, c) => s + getContractsByClient(c.id).filter((ct) => ct.status === "Actif").reduce((a, ct) => a + ct.premium, 0), 0),
      confidence: 82,
      recommendedAction: "Programmer un appel de fidélisation avant la prochaine échéance",
    },
    {
      id: "op-conversion",
      kind: "conversion",
      title: "Prospects en attente de conversion",
      description: `${prospects.length} prospects ont un dossier ouvert mais aucun contrat signé à ce jour.`,
      clients: prospects,
      potentialGain: prospects.length * 850,
      confidence: 70,
      recommendedAction: "Relancer avec une proposition tarifaire sous 48h",
    },
  ];

  return opportunities.filter((o) => o.clients.length > 0);
}

export function habitationCrossSellCount(): number {
  return clientsWithoutCoverage("Auto", "Habitation").length;
}

export function opportunityClientNames(op: Opportunity, max = 3): string {
  const names = op.clients.slice(0, max).map((c) => clientFullName(c));
  const rest = op.clients.length - names.length;
  return rest > 0 ? `${names.join(", ")} +${rest} autres` : names.join(", ");
}

export { getClientById };
