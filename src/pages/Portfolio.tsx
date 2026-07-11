import { useMemo, useState } from "react";
import { Orbit, Info } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Select } from "../components/ui/Select";
import { Tooltip as InfoTooltip } from "../components/ui/Tooltip";
import { PortfolioBubbleChart, riskColor } from "../components/charts/PortfolioBubbleChart";
import { contracts } from "../data/contracts";
import { formatCurrency } from "../utils/format";
import type { ContractStatus, ContractType, RiskLevel } from "../types";

const typeOptions: { value: ContractType | "Tous"; label: string }[] = [
  { value: "Tous", label: "Toutes les couvertures" },
  { value: "Auto", label: "Auto" },
  { value: "Habitation", label: "Habitation" },
  { value: "Santé", label: "Santé" },
  { value: "Vie", label: "Vie" },
  { value: "Prévoyance", label: "Prévoyance" },
  { value: "Responsabilité Civile Pro", label: "Responsabilité Civile Pro" },
  { value: "Multirisque Professionnelle", label: "Multirisque Professionnelle" },
  { value: "Emprunteur", label: "Emprunteur" },
];

const statusOptions: { value: ContractStatus | "Tous"; label: string }[] = [
  { value: "Tous", label: "Tous les statuts" },
  { value: "Actif", label: "Actif" },
  { value: "En attente", label: "En attente" },
  { value: "Suspendu", label: "Suspendu" },
  { value: "Résilié", label: "Résilié" },
  { value: "Expiré", label: "Expiré" },
];

const riskOptions: { value: RiskLevel | "Tous"; label: string }[] = [
  { value: "Tous", label: "Tous les niveaux de risque" },
  { value: "Faible", label: "Faible" },
  { value: "Modéré", label: "Modéré" },
  { value: "Élevé", label: "Élevé" },
];

export function Portfolio() {
  const [typeFilter, setTypeFilter] = useState<string>("Tous");
  const [statusFilter, setStatusFilter] = useState<string>("Tous");
  const [riskFilter, setRiskFilter] = useState<string>("Tous");

  const filteredCount = useMemo(() => {
    return contracts.filter(
      (c) =>
        (typeFilter === "Tous" || c.type === typeFilter) &&
        (statusFilter === "Tous" || c.status === statusFilter) &&
        (riskFilter === "Tous" || c.riskLevel === riskFilter),
    );
  }, [typeFilter, statusFilter, riskFilter]);

  const totalPremium = filteredCount.reduce((s, c) => s + c.premium, 0);

  return (
    <div>
      <PageHeader
        eyebrow="Cartographie"
        title="Vue portefeuille"
        description="Explorez vos contrats sous forme de bulles — taille = prime, couleur = risque, position = couverture et statut."
        action={
          <span className="flex items-center gap-1.5 rounded-full bg-iris-50 px-3 py-1.5 text-xs font-medium text-iris-600 dark:bg-iris-500/10 dark:text-iris-300">
            <Orbit className="h-3.5 w-3.5" /> {filteredCount.length} contrats · {formatCurrency(totalPremium)}
          </span>
        }
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <Select value={typeFilter} onChange={setTypeFilter} options={typeOptions} className="sm:w-64" />
        <Select value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="sm:w-44" />
        <Select value={riskFilter} onChange={setRiskFilter} options={riskOptions} className="sm:w-52" />
      </div>

      <Card hoverable>
        <CardHeader
          eyebrow="Répartition interactive"
          title="Contrats du portefeuille"
          subtitle="Survolez une bulle pour voir le détail du client et du contrat"
          action={
            <InfoTooltip content="Position horizontale = couverture, verticale = statut, taille = prime annuelle" side="left">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mist text-ink-400 dark:bg-white/[0.06] dark:text-ink-300/70">
                <Info className="h-3.5 w-3.5" />
              </span>
            </InfoTooltip>
          }
        />
        <PortfolioBubbleChart
          typeFilter={typeFilter as ContractType | "Tous"}
          statusFilter={statusFilter as ContractStatus | "Tous"}
          riskFilter={riskFilter as RiskLevel | "Tous"}
        />

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-mist pt-4 dark:border-white/[0.08]">
          {(Object.keys(riskColor) as (keyof typeof riskColor)[]).map((level) => (
            <div key={level} className="flex items-center gap-2 text-xs text-ink-500 dark:text-ink-200/70">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: riskColor[level] }} />
              Risque {level.toLowerCase()}
            </div>
          ))}
          <div className="flex items-center gap-2 text-xs text-ink-400 dark:text-ink-300/60">
            <span className="flex items-center gap-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-ink-300 dark:bg-ink-300/60" />
              <span className="h-3 w-3 rounded-full bg-ink-300 dark:bg-ink-300/60" />
            </span>
            Taille = prime annuelle
          </div>
        </div>
      </Card>
    </div>
  );
}
