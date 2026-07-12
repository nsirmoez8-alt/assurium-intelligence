import { useState } from "react";
import { Mail, Phone, MessageSquare, Rocket, CheckCircle2, PhoneCall } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { AnimatedNumber } from "../ui/AnimatedNumber";
import { cn } from "../../utils/cn";
import { formatCurrency } from "../../utils/format";
import type { Opportunity } from "../../utils/opportunities";
import { buildEmailPreview, buildSmsPreview, buildCallScript } from "../../utils/campaignMessage";

const channels = [
  { id: "email", label: "Email", icon: Mail },
  { id: "phone", label: "Appel téléphonique", icon: Phone },
  { id: "sms", label: "SMS", icon: MessageSquare },
] as const;

type Channel = (typeof channels)[number]["id"];

export function CampaignModal({ opportunity, onClose }: { opportunity: Opportunity | null; onClose: () => void }) {
  const [channel, setChannel] = useState<Channel>("email");
  const [reach, setReach] = useState(100);
  const [launched, setLaunched] = useState(false);

  if (!opportunity) return null;

  const audience = opportunity.clients.length;
  const contacted = Math.round((audience * reach) / 100);
  const conversionRate = (opportunity.confidence / 100) * 0.42;
  const projectedConversions = Math.max(1, Math.round(contacted * conversionRate));
  const projectedRevenue = Math.round((opportunity.potentialGain / audience) * projectedConversions);

  const sampleFirstName = opportunity.clients[0]?.firstName ?? "Client";
  const emailPreview = buildEmailPreview(opportunity, sampleFirstName);
  const smsPreview = buildSmsPreview(opportunity, sampleFirstName);
  const callScript = buildCallScript(opportunity);

  function handleClose() {
    setLaunched(false);
    setReach(100);
    setChannel("email");
    onClose();
  }

  return (
    <Modal
      open={!!opportunity}
      onClose={handleClose}
      title={launched ? "Campagne simulée" : "Préparer une campagne"}
      subtitle={opportunity.title}
      footer={
        launched ? (
          <Button variant="primary" onClick={handleClose}>
            Fermer
          </Button>
        ) : (
          <>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="gradient" onClick={() => setLaunched(true)}>
              <Rocket className="h-3.5 w-3.5" /> Lancer la simulation
            </Button>
          </>
        )
      }
    >
      {!launched ? (
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-300/60">Canal de contact</p>
            <div className="grid grid-cols-3 gap-2">
              {channels.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setChannel(c.id)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-medium transition-colors",
                    channel === c.id
                      ? "border-iris-400 bg-iris-50 text-iris-700 dark:border-iris-400/60 dark:bg-iris-500/10 dark:text-iris-300"
                      : "border-mist text-ink-500 hover:border-mist-dark dark:border-white/[0.1] dark:text-ink-300/70 dark:hover:border-white/[0.2]",
                  )}
                >
                  <c.icon className="h-4 w-4" />
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-300/60">Portée de la campagne</p>
              <span className="font-tabular text-sm font-semibold text-ink-900 dark:text-white">{reach}%</span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              step={5}
              value={reach}
              onChange={(e) => setReach(Number(e.target.value))}
              className="w-full accent-iris-500"
            />
            <p className="mt-1.5 text-xs text-ink-400 dark:text-ink-300/60">
              {contacted} clients sur {audience} seront contactés
            </p>
          </div>

          <div className="rounded-xl border border-mist bg-paper-dim/60 p-4 text-sm dark:border-white/[0.08] dark:bg-white/[0.03]">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-300/60">Action recommandée</p>
            <p className="mt-1.5 text-ink-700 dark:text-ink-100">{opportunity.recommendedAction}</p>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-300/60">Aperçu du message</p>
            {channel === "email" && (
              <div className="overflow-hidden rounded-xl border border-mist dark:border-white/[0.08]">
                <div className="flex items-center gap-2 border-b border-mist bg-paper-dim/60 px-4 py-2.5 dark:border-white/[0.08] dark:bg-white/[0.03]">
                  <Mail className="h-3.5 w-3.5 text-ink-400 dark:text-ink-300/60" />
                  <p className="truncate text-xs font-medium text-ink-700 dark:text-ink-100">
                    <span className="text-ink-400 dark:text-ink-300/60">Objet : </span>
                    {emailPreview.subject}
                  </p>
                </div>
                <p className="whitespace-pre-line px-4 py-3.5 text-xs leading-relaxed text-ink-600 dark:text-ink-100">{emailPreview.body}</p>
              </div>
            )}
            {channel === "sms" && (
              <div className="rounded-xl border border-mist bg-paper-dim/60 p-4 dark:border-white/[0.08] dark:bg-white/[0.03]">
                <div className="flex items-start gap-2.5">
                  <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-400 dark:text-ink-300/60" />
                  <p className="text-xs leading-relaxed text-ink-600 dark:text-ink-100">{smsPreview}</p>
                </div>
                <p className="mt-2.5 text-2xs text-ink-300 dark:text-ink-300/50">{smsPreview.length} caractères</p>
              </div>
            )}
            {channel === "phone" && (
              <div className="rounded-xl border border-mist bg-paper-dim/60 p-4 dark:border-white/[0.08] dark:bg-white/[0.03]">
                <div className="mb-2.5 flex items-center gap-2 text-xs font-medium text-ink-700 dark:text-ink-100">
                  <PhoneCall className="h-3.5 w-3.5 text-ink-400 dark:text-ink-300/60" /> Script d'appel suggéré
                </div>
                <ol className="space-y-2">
                  {callScript.map((step, i) => (
                    <li key={i} className="flex gap-2.5 text-xs leading-relaxed text-ink-600 dark:text-ink-100">
                      <span className="shrink-0 font-tabular font-semibold text-ink-300 dark:text-ink-300/50">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <p className="mt-2 text-2xs text-ink-300 dark:text-ink-300/50">
              Aperçu généré pour {sampleFirstName} (à titre d'exemple) — contenu à personnaliser avant tout envoi réel. Aucun message n'est envoyé par cette simulation.
            </p>
          </div>
        </div>
      ) : (
        <div className="animate-rise-in space-y-5 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-signal-50 text-signal-600 dark:bg-signal-500/10 dark:text-signal-400">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <div>
            <p className="font-display text-lg font-bold text-ink-900 dark:text-white">Simulation prête</p>
            <p className="mt-1 text-sm text-ink-400 dark:text-ink-300/60">
              Campagne "{opportunity.title}" via {channels.find((c) => c.id === channel)?.label.toLowerCase()}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-mist bg-white p-4 dark:border-white/[0.08] dark:bg-white/[0.03]">
              <p className="font-display text-2xl font-extrabold text-ink-900 font-tabular dark:text-white">
                <AnimatedNumber value={projectedConversions} />
              </p>
              <p className="mt-1 text-xs text-ink-400 dark:text-ink-300/60">Conversions estimées</p>
            </div>
            <div className="rounded-xl border border-mist bg-white p-4 dark:border-white/[0.08] dark:bg-white/[0.03]">
              <p className="font-display text-2xl font-extrabold text-signal-600 font-tabular dark:text-signal-400">
                <AnimatedNumber value={projectedRevenue} format={(n) => formatCurrency(n)} />
              </p>
              <p className="mt-1 text-xs text-ink-400 dark:text-ink-300/60">Revenu additionnel projeté</p>
            </div>
          </div>
          <p className="text-2xs text-ink-300 dark:text-ink-300/50">
            Estimation indicative basée sur le taux de confiance de l'opportunité ({opportunity.confidence}%) — simulation à but de démonstration.
          </p>
        </div>
      )}
    </Modal>
  );
}
