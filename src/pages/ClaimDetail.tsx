import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldAlert,
  Sparkles,
  Clock,
  CheckCircle2,
  Circle,
  AlertTriangle,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { Card, CardHeader } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";
import { ClaimStatusPill } from "../components/ui/StatusPill";
import { ProgressBar } from "../components/ui/ProgressBar";
import { EmptyState } from "../components/ui/EmptyState";
import { claims } from "../data/claims";
import { getClientById, clientFullName } from "../data/clients";
import { getContractById } from "../data/contracts";
import { predictClaim, buildTimeline, getNextSteps, estimatedResolution } from "../utils/claimPrediction";
import { formatCurrency, formatDateLong, initials } from "../utils/format";
import { cn } from "../utils/cn";

const priorityStyles: Record<string, string> = {
  Basse: "bg-mist text-ink-400 dark:bg-white/[0.06] dark:text-ink-300/70",
  Normale: "bg-azure-50 text-azure-600 dark:bg-azure-500/10 dark:text-azure-400",
  Haute: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  Critique: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
};

const levelStyles = {
  low: {
    badge: "bg-signal-50 text-signal-700 dark:bg-signal-500/10 dark:text-signal-400",
    label: "Risque maîtrisé",
    icon: ShieldCheck,
  },
  medium: {
    badge: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    label: "Vigilance recommandée",
    icon: AlertTriangle,
  },
  high: {
    badge: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
    label: "Attention requise",
    icon: AlertTriangle,
  },
};

export function ClaimDetail() {
  const { id } = useParams<{ id: string }>();
  const claim = claims.find((c) => c.id === id);

  if (!claim) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="Sinistre introuvable"
        description="Ce dossier n'existe pas ou a été archivé."
        action={
          <Link to="/sinistres" className="text-sm font-medium text-signal-600 hover:text-signal-700 dark:text-signal-400">
            Retour aux sinistres
          </Link>
        }
      />
    );
  }

  const client = getClientById(claim.clientId);
  const contract = getContractById(claim.contractId);
  const prediction = predictClaim(claim);
  const timeline = buildTimeline(claim);
  const nextSteps = getNextSteps(claim.status);
  const resolution = estimatedResolution(claim);
  const LevelIcon = levelStyles[prediction.level].icon;

  return (
    <div>
      <Link to="/sinistres" className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-400 hover:text-ink-700 dark:text-ink-300/60 dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Retour aux sinistres
      </Link>

      <div className="mb-6 flex flex-col gap-5 rounded-2xl border border-mist bg-white p-6 shadow-card dark:border-white/[0.08] dark:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
            <ShieldAlert className="h-5.5 w-5.5" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-xl font-bold text-ink-900 dark:text-white">{claim.type}</h1>
              <ClaimStatusPill status={claim.status} />
              <span className={cn("rounded-full px-2.5 py-1 text-2xs font-medium", priorityStyles[claim.priority])}>
                Priorité {claim.priority.toLowerCase()}
              </span>
            </div>
            <p className="mt-1 font-tabular text-sm text-ink-400 dark:text-ink-300/60">
              {claim.reference} · déclaré le {formatDateLong(claim.declaredDate)}
            </p>
          </div>
        </div>
        {client && (
          <Link to={`/clients/${client.id}`} className="flex items-center gap-3 rounded-xl border border-mist px-3.5 py-2.5 transition-colors hover:border-mist-dark dark:border-white/[0.1] dark:hover:border-white/[0.2]">
            <Avatar initials={initials(client.firstName, client.lastName)} color={client.avatarColor} size="sm" />
            <div className="text-left">
              <p className="text-sm font-medium text-ink-900 dark:text-white">{clientFullName(client)}</p>
              <p className="text-2xs text-ink-400 dark:text-ink-300/60">{contract?.reference ?? "Contrat associé"}</p>
            </div>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <CardHeader eyebrow="Suivi" title="Timeline du dossier" subtitle={resolution.label} />
            <ol className="relative space-y-6 pl-2">
              <div className="absolute bottom-4 left-[0.9rem] top-4 w-px bg-mist dark:bg-white/[0.1]" aria-hidden="true" />
              {timeline.map((stage) => (
                <li key={stage.status} className="relative flex gap-4 pl-8">
                  <span
                    className={cn(
                      "absolute left-0 flex h-[1.9rem] w-[1.9rem] items-center justify-center rounded-full border-2",
                      stage.state === "done" && "border-signal-500 bg-signal-50 text-signal-600 dark:bg-signal-500/10 dark:text-signal-400",
                      stage.state === "current" && "border-amber-500 bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
                      stage.state === "pending" && "border-mist-dark bg-white text-ink-300 dark:border-white/[0.14] dark:bg-ink-900 dark:text-ink-300/40",
                    )}
                  >
                    {stage.state === "done" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : stage.state === "current" ? (
                      <Clock className="h-4 w-4 animate-pulse-soft" />
                    ) : (
                      <Circle className="h-3 w-3" />
                    )}
                  </span>
                  <div className={cn("flex-1 pb-1", stage.state === "pending" && "opacity-60")}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className={cn("text-sm font-semibold", stage.state === "pending" ? "text-ink-400 dark:text-ink-300/50" : "text-ink-900 dark:text-white")}>
                        {stage.label}
                      </p>
                      <p className="font-tabular text-2xs text-ink-300 dark:text-ink-300/50">
                        {stage.state === "pending" ? "estimé " : ""}
                        {formatDateLong(stage.date)}
                      </p>
                    </div>
                    <p className="mt-0.5 text-xs text-ink-400 dark:text-ink-300/60">{stage.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          <Card>
            <CardHeader eyebrow="Actions" title="Prochaines étapes" />
            <ul className="space-y-2.5">
              {nextSteps.map((step) => (
                <li key={step} className="flex items-start gap-2.5 text-sm text-ink-600 dark:text-ink-100">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-iris-400" />
                  {step}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader eyebrow="Dossier" title="Description du sinistre" />
            <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-100">{claim.description}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-mist bg-paper-dim/50 p-3.5 dark:border-white/[0.08] dark:bg-white/[0.03]">
                <p className="text-2xs uppercase tracking-wide text-ink-300 dark:text-ink-300/50">Montant estimé</p>
                <p className="mt-1 font-tabular text-sm font-bold text-ink-900 dark:text-white">{formatCurrency(claim.estimatedAmount)}</p>
              </div>
              <div className="rounded-xl border border-mist bg-paper-dim/50 p-3.5 dark:border-white/[0.08] dark:bg-white/[0.03]">
                <p className="text-2xs uppercase tracking-wide text-ink-300 dark:text-ink-300/50">Montant versé</p>
                <p className="mt-1 font-tabular text-sm font-bold text-ink-900 dark:text-white">
                  {claim.paidAmount !== null ? formatCurrency(claim.paidAmount) : "—"}
                </p>
              </div>
              {contract && (
                <Link to={`/clients/${claim.clientId}`} className="flex items-center gap-2 rounded-xl border border-mist bg-paper-dim/50 p-3.5 transition-colors hover:border-mist-dark dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-white/[0.18]">
                  <FileText className="h-4 w-4 shrink-0 text-ink-400 dark:text-ink-300/60" />
                  <div>
                    <p className="text-2xs uppercase tracking-wide text-ink-300 dark:text-ink-300/50">Contrat lié</p>
                    <p className="font-tabular text-sm font-semibold text-ink-900 dark:text-white">{contract.reference}</p>
                  </div>
                </Link>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card glass className="relative overflow-hidden">
            <div className="absolute inset-0 bg-aurora dark:bg-aurora-dark" aria-hidden="true" />
            <div className="relative">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-iris-signal text-white shadow-glow">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-ink-900 dark:text-white">Prédiction IA</p>
                  <p className="text-2xs text-ink-400 dark:text-ink-300/60">Estimation par Alya</p>
                </div>
              </div>

              <div className={cn("mb-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold", levelStyles[prediction.level].badge)}>
                <LevelIcon className="h-4 w-4 shrink-0" />
                {levelStyles[prediction.level].label}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-ink-500 dark:text-ink-200/70">Probabilité de résolution favorable</span>
                    <span className="font-tabular font-semibold text-ink-900 dark:text-white">{prediction.resolutionProbability}%</span>
                  </div>
                  <ProgressBar value={prediction.resolutionProbability} className="mt-1.5" tone="signal" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-ink-500 dark:text-ink-200/70">Indice de risque de fraude</span>
                    <span className="font-tabular font-semibold text-ink-900 dark:text-white">{prediction.fraudRisk}%</span>
                  </div>
                  <ProgressBar value={prediction.fraudRisk} className="mt-1.5" tone={prediction.fraudRisk >= 40 ? "rose" : prediction.fraudRisk >= 18 ? "amber" : "signal"} />
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-white/60 bg-white/70 p-3.5 text-xs leading-relaxed text-ink-600 backdrop-blur-sm dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-ink-100">
                {prediction.recommendation}
              </div>
              <p className="mt-3 text-2xs text-ink-300 dark:text-ink-300/50">
                Estimation générée à titre indicatif pour la démonstration.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
