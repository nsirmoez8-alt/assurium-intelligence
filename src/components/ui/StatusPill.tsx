import { cn } from "../../utils/cn";
import type { ClaimStatus, ClientStatus, ContractStatus, RiskLevel } from "../../types";

type Tone = "signal" | "azure" | "amber" | "rose" | "ink" | "slate";

const toneStyles: Record<Tone, string> = {
  signal: "bg-signal-50 text-signal-700 ring-signal-100 dark:bg-signal-500/10 dark:text-signal-400 dark:ring-signal-500/20",
  azure: "bg-azure-50 text-azure-600 ring-azure-100 dark:bg-azure-500/10 dark:text-azure-400 dark:ring-azure-500/20",
  amber: "bg-amber-50 text-amber-600 ring-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",
  rose: "bg-rose-50 text-rose-600 ring-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/20",
  ink: "bg-ink-50 text-ink-600 ring-ink-100 dark:bg-white/[0.06] dark:text-ink-100 dark:ring-white/[0.1]",
  slate: "bg-mist text-ink-400 ring-mist-dark dark:bg-white/[0.05] dark:text-ink-200/70 dark:ring-white/[0.1]",
};

const toneDot: Record<Tone, string> = {
  signal: "bg-signal-500",
  azure: "bg-azure-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  ink: "bg-ink-500",
  slate: "bg-ink-300",
};

function Pill({ label, tone }: { label: string; tone: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        toneStyles[tone],
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", toneDot[tone])} />
      {label}
    </span>
  );
}

const contractToneMap: Record<ContractStatus, Tone> = {
  Actif: "signal",
  "En attente": "azure",
  Suspendu: "amber",
  Résilié: "rose",
  Expiré: "slate",
};

export function ContractStatusPill({ status }: { status: ContractStatus }) {
  return <Pill label={status} tone={contractToneMap[status]} />;
}

const claimToneMap: Record<ClaimStatus, Tone> = {
  Déclaré: "azure",
  "En analyse": "amber",
  "En traitement": "amber",
  Clôturé: "signal",
  Refusé: "rose",
};

export function ClaimStatusPill({ status }: { status: ClaimStatus }) {
  return <Pill label={status} tone={claimToneMap[status]} />;
}

const clientToneMap: Record<ClientStatus, Tone> = {
  Actif: "signal",
  Inactif: "slate",
  Prospect: "azure",
};

export function ClientStatusPill({ status }: { status: ClientStatus }) {
  return <Pill label={status} tone={clientToneMap[status]} />;
}

const riskToneMap: Record<RiskLevel, Tone> = {
  Faible: "signal",
  Modéré: "amber",
  Élevé: "rose",
};

export function RiskPill({ level }: { level: RiskLevel }) {
  return <Pill label={level} tone={riskToneMap[level]} />;
}
