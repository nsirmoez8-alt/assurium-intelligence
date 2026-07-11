import type { AppNotification } from "../types";

export const notifications: AppNotification[] = [
  { id: "no01", type: "sinistre", title: "Sinistre critique déclaré", description: "David Fontaine — incendie dans l'entrepôt, dégâts estimés à 52 000 €.", date: "2026-07-10", read: false, priority: "haute", clientId: "c22", contractId: "ct48", claimId: "sn11" },
  { id: "no02", type: "echeance", title: "Contrat RC Pro à échéance dans 5 jours", description: "Olivier Marchand — RCP-2011-0003 arrive à échéance le 16/07/2026.", date: "2026-07-11", read: false, priority: "haute", clientId: "c24", contractId: "ct52" },
  { id: "no03", type: "document", title: "Attestation Kbis manquante", description: "Mehdi Bensaïd n'a pas transmis son Kbis à jour pour son contrat RC Pro.", date: "2026-07-09", read: false, priority: "normale", clientId: "c02", contractId: "ct04" },
  { id: "no04", type: "sinistre", title: "Sinistre en analyse — vol de véhicule", description: "Karim Haddad — véhicule utilitaire volé sur chantier, dossier en cours d'analyse.", date: "2026-07-10", read: false, priority: "haute", clientId: "c08", contractId: "ct20", claimId: "sn04" },
  { id: "no05", type: "echeance", title: "Contrat suspendu à réactiver", description: "Yannick Morin — RCP-2022-6612 suspendue, échéance le 19/07/2026.", date: "2026-07-08", read: false, priority: "haute", clientId: "c14", contractId: "ct31" },
  { id: "no06", type: "action", title: "Relance prospect recommandée", description: "Thomas Lefebvre attend une proposition tarifaire depuis 6 jours.", date: "2026-07-07", read: false, priority: "normale", clientId: "c10" },
  { id: "no07", type: "document", title: "Pièces d'identité manquantes", description: "Manon Dumas — dossier prospect incomplet, pièce d'identité requise.", date: "2026-07-06", read: true, priority: "normale", clientId: "c21" },
  { id: "no08", type: "echeance", title: "Contrat multirisque pro à échéance", description: "David Fontaine — MRP-2016-0188 arrive à échéance le 31/07/2026.", date: "2026-07-05", read: false, priority: "normale", clientId: "c22", contractId: "ct48" },
  { id: "no09", type: "document", title: "Bilan comptable 2025 manquant", description: "Karim Haddad doit transmettre son bilan comptable pour le renouvellement.", date: "2026-07-04", read: false, priority: "normale", clientId: "c08" },
  { id: "no10", type: "action", title: "Satisfaction client en baisse", description: "Pierre Lambert — score de satisfaction à 58 %, contact conseillé.", date: "2026-07-03", read: true, priority: "haute", clientId: "c16" },
  { id: "no11", type: "echeance", title: "Contrat auto à échéance dans 2 semaines", description: "Camille Perrot — AUT-2022-3390 arrive à échéance le 25/07/2026.", date: "2026-07-02", read: true, priority: "basse", clientId: "c03", contractId: "ct07" },
  { id: "no12", type: "document", title: "Attestation décennale manquante", description: "Yannick Morin doit fournir son attestation d'assurance décennale.", date: "2026-07-01", read: true, priority: "normale", clientId: "c14" },
  { id: "no13", type: "sinistre", title: "Dossier sinistre en attente de pièces", description: "Sophie Guillon — litige contractuel déclaré, complément de dossier attendu.", date: "2026-06-30", read: true, priority: "basse", clientId: "c05", contractId: "ct11", claimId: "sn08" },
  { id: "no14", type: "action", title: "Renouvellement à préparer", description: "Karim Haddad — 3 contrats professionnels arrivent à échéance le 22/07/2026.", date: "2026-06-29", read: true, priority: "normale", clientId: "c08" },
];

export function unreadCount(): number {
  return notifications.filter((n) => !n.read).length;
}
