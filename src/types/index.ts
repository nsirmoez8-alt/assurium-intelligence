export type ClientSegment = "Particulier" | "Professionnel" | "Patrimonial";

export type ClientStatus = "Actif" | "Inactif" | "Prospect";

export type RiskLevel = "Faible" | "Modéré" | "Élevé";

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  postalCode: string;
  segment: ClientSegment;
  status: ClientStatus;
  clientSince: string; // ISO date
  satisfaction: number; // 0-100
  riskProfile: RiskLevel;
  advisor: string;
  avatarColor: string;
  missingDocuments: string[];
  notes?: string;
}

export type ContractType =
  | "Auto"
  | "Habitation"
  | "Santé"
  | "Vie"
  | "Prévoyance"
  | "Responsabilité Civile Pro"
  | "Multirisque Professionnelle"
  | "Emprunteur";

export type ContractStatus = "Actif" | "En attente" | "Suspendu" | "Résilié" | "Expiré";

export type PaymentFrequency = "Mensuelle" | "Trimestrielle" | "Annuelle";

export interface Contract {
  id: string;
  reference: string;
  clientId: string;
  type: ContractType;
  status: ContractStatus;
  premium: number; // montant annuel en EUR
  paymentFrequency: PaymentFrequency;
  startDate: string;
  endDate: string;
  riskLevel: RiskLevel;
  deductible: number;
  coverageAmount: number;
}

export type ClaimStatus = "Déclaré" | "En analyse" | "En traitement" | "Clôturé" | "Refusé";

export type ClaimPriority = "Basse" | "Normale" | "Haute" | "Critique";

export interface Claim {
  id: string;
  reference: string;
  clientId: string;
  contractId: string;
  type: string;
  status: ClaimStatus;
  priority: ClaimPriority;
  declaredDate: string;
  updatedDate: string;
  description: string;
  estimatedAmount: number;
  paidAmount: number | null;
}

export type NotificationType = "echeance" | "document" | "action" | "sinistre";

export type NotificationPriority = "basse" | "normale" | "haute";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  date: string;
  read: boolean;
  priority: NotificationPriority;
  clientId?: string;
  contractId?: string;
  claimId?: string;
}
