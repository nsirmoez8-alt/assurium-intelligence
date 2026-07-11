import { useState } from "react";
import { Link } from "react-router-dom";
import { Target, TrendingUp, ShieldCheck, UserPlus, ArrowUpRight, Gauge } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Avatar } from "../components/ui/Avatar";
import { ProgressBar } from "../components/ui/ProgressBar";
import { EmptyState } from "../components/ui/EmptyState";
import { CampaignModal } from "../components/opportunities/CampaignModal";
import { buildOpportunities, type Opportunity, type OpportunityKind } from "../utils/opportunities";
import { formatCurrency, initials } from "../utils/format";
import { cn } from "../utils/cn";

const kindIcon: Record<OpportunityKind, typeof TrendingUp> = {
  "cross-sell": TrendingUp,
  fidelisation: ShieldCheck,
  retention: ShieldCheck,
  conversion: UserPlus,
};

const kindLabel: Record<OpportunityKind, string> = {
  "cross-sell": "Cross-sell",
  fidelisation: "Fidélisation",
  retention: "Fidélisation",
  conversion: "Conversion",
};

const kindStyles: Record<OpportunityKind, string> = {
  "cross-sell": "bg-iris-50 text-iris-600 dark:bg-iris-500/10 dark:text-iris-300",
  fidelisation: "bg-signal-50 text-signal-600 dark:bg-signal-500/10 dark:text-signal-400",
  retention: "bg-signal-50 text-signal-600 dark:bg-signal-500/10 dark:text-signal-400",
  conversion: "bg-azure-50 text-azure-600 dark:bg-azure-500/10 dark:text-azure-400",
};

export function Opportunities() {
  const opportunities = buildOpportunities();
  const [selected, setSelected] = useState<Opportunity | null>(null);

  const totalGain = opportunities.reduce((s, o) => s + o.potentialGain, 0);

  return (
    <div>
      <PageHeader
        eyebrow="Croissance"
        title="Opportunités"
        description="Détection automatique de cross-sell et de fidélisation à partir de votre portefeuille."
        action={
          <span className="flex items-center gap-1.5 rounded-full bg-signal-50 px-3 py-1.5 text-xs font-medium text-signal-700 dark:bg-signal-500/10 dark:text-signal-400">
            <Target className="h-3.5 w-3.5" /> {formatCurrency(totalGain)} de gain potentiel identifié
          </span>
        }
      />

      {opportunities.length === 0 ? (
        <EmptyState icon={Target} title="Aucune opportunité détectée" description="Votre portefeuille ne présente pas d'opportunité identifiable pour le moment." />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {opportunities.map((op) => {
            const Icon = kindIcon[op.kind];
            return (
              <Card key={op.id} hoverable className="flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", kindStyles[op.kind])}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={cn("rounded-full px-2.5 py-1 text-2xs font-semibold", kindStyles[op.kind])}>
                    {kindLabel[op.kind]}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-base font-bold text-ink-900 dark:text-white">{op.title}</h3>
                <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-200/70">{op.description}</p>

                <div className="mt-4 flex -space-x-2">
                  {op.clients.slice(0, 6).map((c) => (
                    <Link key={c.id} to={`/clients/${c.id}`} title={`${c.firstName} ${c.lastName}`}>
                      <Avatar initials={initials(c.firstName, c.lastName)} color={c.avatarColor} size="sm" />
                    </Link>
                  ))}
                  {op.clients.length > 6 && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-mist text-2xs font-semibold text-ink-500 dark:border-ink-900 dark:bg-white/[0.1] dark:text-ink-200">
                      +{op.clients.length - 6}
                    </span>
                  )}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-mist bg-paper-dim/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
                    <p className="text-2xs uppercase tracking-wide text-ink-300 dark:text-ink-300/50">Gain potentiel</p>
                    <p className="mt-1 font-tabular text-lg font-bold text-signal-600 dark:text-signal-400">{formatCurrency(op.potentialGain)}</p>
                  </div>
                  <div className="rounded-xl border border-mist bg-paper-dim/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
                    <div className="flex items-center justify-between">
                      <p className="text-2xs uppercase tracking-wide text-ink-300 dark:text-ink-300/50">Confiance</p>
                      <span className="flex items-center gap-0.5 font-tabular text-xs font-semibold text-ink-700 dark:text-ink-100">
                        <Gauge className="h-3 w-3" /> {op.confidence}%
                      </span>
                    </div>
                    <ProgressBar value={op.confidence} className="mt-2" tone={op.confidence >= 70 ? "signal" : "amber"} />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-xl bg-mist/50 px-3 py-2.5 text-xs text-ink-500 dark:bg-white/[0.03] dark:text-ink-200/70">
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-iris-500 dark:text-iris-300" />
                  {op.recommendedAction}
                </div>

                <div className="mt-5">
                  <Button variant="gradient" className="w-full" onClick={() => setSelected(op)}>
                    Préparer une campagne
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <CampaignModal opportunity={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
