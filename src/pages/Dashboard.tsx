import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Wallet,
  CalendarClock,
  ShieldAlert,
  Smile,
  ArrowRight,
  Sparkles,
  ScanLine,
  CalendarCheck2,
  TrendingUp,
  AlertTriangle,
  Info,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { StatCard } from "../components/ui/StatCard";
import { Card, CardHeader } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";
import { ClaimStatusPill } from "../components/ui/StatusPill";
import { StatCardSkeleton, CardSkeleton } from "../components/ui/Skeleton";
import { RadialScore } from "../components/ui/RadialScore";
import { Button } from "../components/ui/Button";
import { PremiumsAreaChart } from "../components/charts/PremiumsAreaChart";
import { PortfolioDonutChart } from "../components/charts/PortfolioDonutChart";
import { clients, getClientById, clientFullName, CURRENT_ADVISOR } from "../data/clients";
import { openClaims, portfolioHealthScore } from "../utils/metrics";
import { activeClients, totalAnnualPremium, upcomingRenewals, averageSatisfaction } from "../utils/metrics";
import { generateAlyaInsights, alyaSummary } from "../utils/alya";
import type { AlyaInsight } from "../utils/alya";
import { formatCurrency, formatDate, formatRelativeDays, initials } from "../utils/format";
import { cn } from "../utils/cn";

const toneIcon: Record<AlyaInsight["tone"], typeof Info> = {
  info: Info,
  warning: AlertTriangle,
  opportunity: TrendingUp,
};

const toneStyles: Record<AlyaInsight["tone"], string> = {
  info: "bg-azure-50 text-azure-600 dark:bg-azure-500/10 dark:text-azure-400",
  warning: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  opportunity: "bg-signal-50 text-signal-600 dark:bg-signal-500/10 dark:text-signal-400",
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "Bonsoir";
  if (hour < 18) return "Bonjour";
  return "Bonsoir";
}

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [insights, setInsights] = useState<AlyaInsight[] | null>(null);
  const renewals = upcomingRenewals(30);
  const claimsOpen = openClaims().slice(0, 5);
  const summary = alyaSummary();
  const firstName = CURRENT_ADVISOR.split(" ")[0];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  function runAnalysis() {
    if (analyzing) return;
    setAnalyzing(true);
    setInsights(null);
    setTimeout(() => {
      setInsights(generateAlyaInsights());
      setAnalyzing(false);
    }, 1500);
  }

  if (loading) {
    return (
      <div>
        <PageHeader
          eyebrow="Vue d'ensemble"
          title="Tableau de bord"
          description="Suivez l'activité de votre portefeuille clients en un coup d'œil."
        />
        <CardSkeleton className="h-64" />
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
          <CardSkeleton className="xl:col-span-2" />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero cockpit */}
      <div className="relative overflow-hidden rounded-3xl border border-mist bg-white shadow-card dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-card-dark">
        <div className="absolute inset-0 bg-aurora dark:bg-aurora-dark" aria-hidden="true" />
        <div className="relative flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div className="max-w-xl">
            <p className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wider text-iris-600 dark:text-iris-300">
              <Sparkles className="h-3 w-3" /> Cockpit décisionnel
            </p>
            <h1 className="mt-2 font-display text-[1.7rem] font-extrabold leading-tight tracking-tight text-ink-900 sm:text-3xl dark:text-white">
              {getGreeting()} {firstName} — votre portefeuille est sous contrôle.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-200/70 sm:text-base">
              <span className="font-semibold text-ink-800 dark:text-white">{summary.priorities} actions prioritaires</span> détectées
              aujourd'hui : <span className="font-medium text-ink-700 dark:text-ink-100">{summary.renewals} contrats à renouveler</span>,{" "}
              <span className="font-medium text-ink-700 dark:text-ink-100">{summary.risks} sinistres à risque</span> et{" "}
              <span className="font-medium text-ink-700 dark:text-ink-100">{summary.opportunities} opportunités commerciales</span>.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button variant="gradient" onClick={runAnalysis} disabled={analyzing}>
                {analyzing ? (
                  <>
                    <ScanLine className="h-4 w-4 animate-pulse-soft" /> Analyse en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Analyser mon portefeuille
                  </>
                )}
              </Button>
              <Link
                to="/opportunites"
                className="flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-800 dark:text-ink-200/70 dark:hover:text-white"
              >
                Voir les opportunités <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-3">
            <RadialScore score={portfolioHealthScore()} />
            <p className="max-w-[11rem] text-center text-2xs text-ink-400 dark:text-ink-300/60">
              Score de santé du portefeuille
            </p>
          </div>
        </div>

        {(analyzing || insights) && (
          <div className="relative border-t border-mist bg-paper-dim/40 px-6 py-5 dark:border-white/[0.08] dark:bg-white/[0.02] sm:px-8 lg:px-10">
            {analyzing ? (
              <div className="flex items-center gap-3 text-sm text-ink-500 dark:text-ink-200/70">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-mist dark:bg-white/[0.08]">
                  <div className="h-full w-1/3 animate-[shimmer_1.1s_ease-in-out_infinite] rounded-full bg-iris-signal bg-[length:300%_100%]" />
                </div>
                <span className="shrink-0">Analyse des contrats, sinistres et opportunités...</span>
              </div>
            ) : (
              insights && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {insights.map((insight, i) => {
                    const Icon = toneIcon[insight.tone];
                    const content = (
                      <div
                        className="flex h-full items-start gap-2.5 rounded-xl border border-mist bg-white p-3.5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover dark:border-white/[0.08] dark:bg-white/[0.04]"
                        style={{ animationDelay: `${i * 80}ms` }}
                      >
                        <span className={cn("mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg", toneStyles[insight.tone])}>
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <p className="text-xs leading-snug text-ink-600 dark:text-ink-100">{insight.text}</p>
                      </div>
                    );
                    return (
                      <div key={insight.id} className="animate-rise-in" style={{ animationDelay: `${i * 80}ms` }}>
                        {insight.href ? (
                          <Link to={insight.href} className="block h-full">
                            {content}
                          </Link>
                        ) : (
                          content
                        )}
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        )}
      </div>

      <div className="mt-8">
        <PageHeader
          eyebrow="Vue d'ensemble"
          title="Indicateurs clés"
          description="Suivez l'activité de votre portefeuille clients en un coup d'œil."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            label="Clients actifs"
            value={String(activeClients().length)}
            numericValue={activeClients().length}
            icon={Users}
            accent="ink"
            trend={{ value: "+3 ce mois", direction: "up" }}
          />
          <StatCard
            label="Primes totales / an"
            value={formatCurrency(totalAnnualPremium())}
            numericValue={totalAnnualPremium()}
            format={(n) => formatCurrency(n)}
            icon={Wallet}
            accent="signal"
            trend={{ value: "+5,2 %", direction: "up" }}
          />
          <StatCard
            label="Contrats à échéance"
            value={String(renewals.length)}
            numericValue={renewals.length}
            icon={CalendarClock}
            accent="amber"
            sublabel="Sous 30 jours"
          />
          <StatCard
            label="Sinistres ouverts"
            value={String(openClaims().length)}
            numericValue={openClaims().length}
            icon={ShieldAlert}
            accent="rose"
            sublabel="Tous statuts confondus"
          />
          <StatCard
            label="Taux de satisfaction"
            value={`${averageSatisfaction()} %`}
            numericValue={averageSatisfaction()}
            format={(n) => `${Math.round(n)} %`}
            icon={Smile}
            accent="azure"
            trend={{ value: "+1,4 pt", direction: "up" }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2" hoverable>
          <CardHeader
            eyebrow="Encaissement"
            title="Évolution des primes"
            subtitle="Montant mensuel encaissé sur l'exercice en cours"
          />
          <PremiumsAreaChart />
        </Card>

        <Card hoverable>
          <CardHeader eyebrow="Portefeuille" title="Répartition par couverture" />
          <PortfolioDonutChart />
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card padded={false}>
          <div className="p-5 sm:p-6 sm:pb-0">
            <CardHeader
              eyebrow="Échéances"
              title="Contrats à renouveler"
              subtitle="Dans les 30 prochains jours"
              action={
                <Link to="/contrats" className="flex items-center gap-1 text-sm font-medium text-signal-600 hover:text-signal-700 dark:text-signal-400">
                  Tout voir <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            />
          </div>
          <div className="divide-y divide-mist border-t border-mist dark:divide-white/[0.06] dark:border-white/[0.08]">
            {renewals.slice(0, 5).map((contract) => {
              const client = getClientById(contract.clientId);
              if (!client) return null;
              return (
                <Link
                  key={contract.id}
                  to={`/clients/${client.id}`}
                  className="flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-paper-dim/60 dark:hover:bg-white/[0.03] sm:px-6"
                >
                  <Avatar initials={initials(client.firstName, client.lastName)} color={client.avatarColor} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink-900 dark:text-white">{clientFullName(client)}</p>
                    <p className="truncate text-xs text-ink-400 dark:text-ink-300/60">{contract.type} — {contract.reference}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-tabular text-sm font-medium text-ink-900 dark:text-white">{formatDate(contract.endDate)}</p>
                    <p className="text-xs text-amber-600 dark:text-amber-400">{formatRelativeDays(contract.endDate)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        <Card padded={false}>
          <div className="p-5 sm:p-6 sm:pb-0">
            <CardHeader
              eyebrow="Suivi"
              title="Sinistres prioritaires"
              subtitle="Dossiers nécessitant une action"
              action={
                <Link to="/sinistres" className="flex items-center gap-1 text-sm font-medium text-signal-600 hover:text-signal-700 dark:text-signal-400">
                  Tout voir <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            />
          </div>
          <div className="divide-y divide-mist border-t border-mist dark:divide-white/[0.06] dark:border-white/[0.08]">
            {claimsOpen.map((claim) => {
              const client = getClientById(claim.clientId);
              if (!client) return null;
              return (
                <Link
                  key={claim.id}
                  to={`/sinistres/${claim.id}`}
                  className="flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-paper-dim/60 dark:hover:bg-white/[0.03] sm:px-6"
                >
                  <Avatar initials={initials(client.firstName, client.lastName)} color={client.avatarColor} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink-900 dark:text-white">{clientFullName(client)}</p>
                    <p className="truncate text-xs text-ink-400 dark:text-ink-300/60">{claim.type} — {claim.reference}</p>
                  </div>
                  <ClaimStatusPill status={claim.status} />
                </Link>
              );
            })}
          </div>
        </Card>
      </div>

      <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-2xs text-ink-300 dark:text-ink-300/50">
        <CalendarCheck2 className="h-3 w-3" /> {clients.length} clients au total dans votre portefeuille · Données mises à jour aujourd'hui
      </p>
    </div>
  );
}
