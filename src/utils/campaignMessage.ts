import type { Opportunity, OpportunityKind } from "./opportunities";
import { CURRENT_ADVISOR } from "../data/clients";

const advisorFirstName = CURRENT_ADVISOR.split(" ")[0];

const subjectByKind: Record<OpportunityKind, string> = {
  "cross-sell": "Une couverture complémentaire pensée pour vous",
  fidelisation: "On fait le point sur votre contrat ?",
  retention: "On fait le point sur votre contrat ?",
  conversion: "Votre proposition personnalisée vous attend",
};

const contextByKind: Record<OpportunityKind, string> = {
  "cross-sell":
    "En analysant votre dossier, j'ai identifié une couverture qui pourrait vous apporter une protection supplémentaire à un tarif préférentiel.",
  conversion: "Votre dossier est prêt et j'aimerais vous accompagner dans la finalisation de votre contrat.",
  retention: "Je souhaite m'assurer que votre contrat correspond toujours parfaitement à vos besoins actuels.",
  fidelisation: "Je souhaite m'assurer que votre contrat correspond toujours parfaitement à vos besoins actuels.",
};

export interface EmailPreview {
  subject: string;
  body: string;
}

export function buildEmailPreview(opportunity: Opportunity, clientFirstName: string): EmailPreview {
  const subject = subjectByKind[opportunity.kind];
  const body = [
    `Bonjour ${clientFirstName},`,
    "",
    `${contextByKind[opportunity.kind]} ${opportunity.recommendedAction}.`,
    "",
    "N'hésitez pas à me répondre directement pour en discuter, ou à me joindre pour convenir d'un rendez-vous.",
    "",
    "Bien à vous,",
    advisorFirstName,
    "Votre conseiller Assurium",
  ].join("\n");
  return { subject, body };
}

export function buildSmsPreview(opportunity: Opportunity, clientFirstName: string): string {
  return `Bonjour ${clientFirstName}, ${advisorFirstName} de Assurium. ${opportunity.recommendedAction}. Répondez OUI pour être recontacté(e), ou STOP pour ne plus recevoir de SMS.`;
}

export function buildCallScript(opportunity: Opportunity): string[] {
  return [
    "Se présenter et rappeler le contexte du contrat actuel du client.",
    opportunity.recommendedAction,
    "Répondre aux objections et confirmer l'intérêt du client.",
    "Planifier une prochaine étape : rendez-vous ou envoi d'un devis détaillé.",
  ];
}
