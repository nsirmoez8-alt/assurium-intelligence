import { TrendingUp, Wallet, Clock, ShieldCheck } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { StatCard } from "../components/ui/StatCard";
import { PremiumsAreaChart } from "../components/charts/PremiumsAreaChart";
import { ClaimsBarChart } from "../components/charts/ClaimsBarChart";
import { ClaimsStatusChart } from "../components/charts/ClaimsStatusChart";
import { PortfolioDonutChart } from "../components/charts/PortfolioDonutChart";
import { SegmentChart } from "../components/charts/SegmentChart";
import { claims } from "../data/claims";
import {
  totalAnnualPremium,
  claimsAverageResolutionDays,
  averageSatisfaction,
  openClaims,
} from "../utils/metrics";
import { formatCurrency } from "../utils/format";

export function Analytics() {
  const closedRatio = Math.round((claims.filter((c) => c.status === "Clôturé").length / claims.length) * 100);

  return (
    <div>
      <PageHeader
        eyebrow="Pilotage"
        title="Analyse"
        description="Vue consolidée des primes, sinistres et de la répartition du portefeuille."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Primes annuelles"
          value={formatCurrency(totalAnnualPremium())}
          numericValue={totalAnnualPremium()}
          format={(n) => formatCurrency(n)}
          icon={Wallet}
          accent="signal"
          trend={{ value: "+5,2 %", direction: "up" }}
        />
        <StatCard
          label="Sinistres clôturés"
          value={`${closedRatio}%`}
          numericValue={closedRatio}
          format={(n) => `${Math.round(n)}%`}
          icon={ShieldCheck}
          accent="azure"
          sublabel="Du total des dossiers"
        />
        <StatCard
          label="Délai moyen de traitement"
          value={`${claimsAverageResolutionDays()} jours`}
          numericValue={claimsAverageResolutionDays()}
          format={(n) => `${Math.round(n)} jours`}
          icon={Clock}
          accent="amber"
          sublabel="Déclaration → clôture"
        />
        <StatCard
          label="Satisfaction moyenne"
          value={`${averageSatisfaction()}%`}
          numericValue={averageSatisfaction()}
          format={(n) => `${Math.round(n)}%`}
          icon={TrendingUp}
          accent="ink"
          trend={{ value: "+1,4 pt", direction: "up" }}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2" hoverable>
          <CardHeader eyebrow="Encaissement" title="Évolution des primes" subtitle="Montant mensuel encaissé, exercice en cours" />
          <PremiumsAreaChart />
        </Card>
        <Card hoverable>
          <CardHeader eyebrow="Clients" title="Répartition par segment" />
          <SegmentChart />
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2" hoverable>
          <CardHeader eyebrow="Sinistralité" title="Sinistres déclarés vs clôturés" subtitle="Sept derniers mois" />
          <ClaimsBarChart />
        </Card>
        <Card hoverable>
          <CardHeader eyebrow="Sinistralité" title="Dossiers par statut" />
          <ClaimsStatusChart />
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <Card hoverable>
          <CardHeader eyebrow="Portefeuille" title="Répartition des primes par couverture" subtitle={`${openClaims().length} sinistres actuellement ouverts sur l'ensemble du portefeuille`} />
          <PortfolioDonutChart />
        </Card>
      </div>
    </div>
  );
}
