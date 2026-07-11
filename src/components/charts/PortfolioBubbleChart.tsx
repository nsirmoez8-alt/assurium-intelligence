import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { contracts } from "../../data/contracts";
import { getClientById, clientFullName } from "../../data/clients";
import { formatCurrency, formatDate } from "../../utils/format";
import { useChartColors } from "../../utils/useChartColors";
import type { Contract, ContractStatus, ContractType, RiskLevel } from "../../types";

const typeOrder: ContractType[] = [
  "Auto",
  "Habitation",
  "Santé",
  "Vie",
  "Prévoyance",
  "Responsabilité Civile Pro",
  "Multirisque Professionnelle",
  "Emprunteur",
];

const typeShortLabel: Record<ContractType, string> = {
  Auto: "Auto",
  Habitation: "Habitation",
  Santé: "Santé",
  Vie: "Vie",
  Prévoyance: "Prévoyance",
  "Responsabilité Civile Pro": "RC Pro",
  "Multirisque Professionnelle": "Multirisque Pro",
  Emprunteur: "Emprunteur",
};

const statusOrder: ContractStatus[] = ["Actif", "En attente", "Suspendu", "Résilié", "Expiré"];

export const riskColor: Record<RiskLevel, string> = {
  Faible: "#0EAFA0",
  Modéré: "#C58A2E",
  Élevé: "#C24A4A",
};

function hashJitter(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 1000;
  return (h / 1000 - 0.5) * 0.62;
}

const premiums = contracts.map((c) => c.premium);
const minPremium = Math.min(...premiums);
const maxPremium = Math.max(...premiums);

function radiusFor(premium: number): number {
  const minR = 7;
  const maxR = 32;
  const t = (Math.sqrt(premium) - Math.sqrt(minPremium)) / (Math.sqrt(maxPremium) - Math.sqrt(minPremium));
  return minR + t * (maxR - minR);
}

interface BubblePoint {
  x: number;
  y: number;
  z: number;
  contract: Contract;
  clientName: string;
  clientId: string;
}

export function PortfolioBubbleChart({
  typeFilter,
  statusFilter,
  riskFilter,
}: {
  typeFilter: ContractType | "Tous";
  statusFilter: ContractStatus | "Tous";
  riskFilter: RiskLevel | "Tous";
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const colors = useChartColors();

  const points = useMemo<BubblePoint[]>(() => {
    return contracts
      .filter((c) => (typeFilter === "Tous" ? true : c.type === typeFilter))
      .filter((c) => (statusFilter === "Tous" ? true : c.status === statusFilter))
      .filter((c) => (riskFilter === "Tous" ? true : c.riskLevel === riskFilter))
      .map((c) => {
        const client = getClientById(c.clientId);
        const jitter = hashJitter(c.id);
        return {
          x: typeOrder.indexOf(c.type) + jitter,
          y: statusOrder.indexOf(c.status) + jitter * 0.7,
          z: c.premium,
          contract: c,
          clientName: client ? clientFullName(client) : "Client inconnu",
          clientId: c.clientId,
        };
      });
  }, [typeFilter, statusFilter, riskFilter]);

  return (
    <ResponsiveContainer width="100%" height={480}>
      <ScatterChart margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
        <CartesianGrid stroke={colors.grid} />
        <XAxis
          type="number"
          dataKey="x"
          domain={[-0.6, typeOrder.length - 0.4]}
          ticks={typeOrder.map((_, i) => i)}
          tickFormatter={(v) => typeShortLabel[typeOrder[v]] ?? ""}
          tick={{ fill: colors.tick, fontSize: 11, fontFamily: "Inter" }}
          axisLine={false}
          tickLine={false}
          interval={0}
          angle={-18}
          textAnchor="end"
          height={56}
        />
        <YAxis
          type="number"
          dataKey="y"
          domain={[-0.6, statusOrder.length - 0.4]}
          ticks={statusOrder.map((_, i) => i)}
          tickFormatter={(v) => statusOrder[v] ?? ""}
          tick={{ fill: colors.tick, fontSize: 11, fontFamily: "Inter" }}
          axisLine={false}
          tickLine={false}
          width={90}
        />
        <ZAxis type="number" dataKey="z" range={[49, 1024]} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={({ active, payload }) => {
            if (!active || !payload || payload.length === 0) return null;
            const point = payload[0].payload as BubblePoint;
            const { contract } = point;
            return (
              <div className="min-w-[13rem] rounded-xl border border-mist bg-white px-4 py-3 shadow-popover dark:border-white/[0.1] dark:bg-ink-900">
                <p className="text-sm font-semibold text-ink-900 dark:text-white">{point.clientName}</p>
                <p className="mt-0.5 font-tabular text-2xs text-ink-400 dark:text-ink-300/60">{contract.reference}</p>
                <div className="mt-2.5 space-y-1 text-xs">
                  <div className="flex justify-between gap-4">
                    <span className="text-ink-400 dark:text-ink-300/60">Couverture</span>
                    <span className="font-medium text-ink-700 dark:text-ink-100">{contract.type}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-ink-400 dark:text-ink-300/60">Statut</span>
                    <span className="font-medium text-ink-700 dark:text-ink-100">{contract.status}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-ink-400 dark:text-ink-300/60">Prime annuelle</span>
                    <span className="font-tabular font-semibold text-ink-900 dark:text-white">{formatCurrency(contract.premium)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-ink-400 dark:text-ink-300/60">Risque</span>
                    <span className="font-medium" style={{ color: riskColor[contract.riskLevel] }}>
                      {contract.riskLevel}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-ink-400 dark:text-ink-300/60">Échéance</span>
                    <span className="font-tabular font-medium text-ink-700 dark:text-ink-100">{formatDate(contract.endDate)}</span>
                  </div>
                </div>
                <Link
                  to={`/clients/${point.clientId}`}
                  className="mt-3 block rounded-lg bg-mist py-1.5 text-center text-2xs font-semibold text-ink-700 hover:bg-mist-dark dark:bg-white/[0.08] dark:text-ink-100 dark:hover:bg-white/[0.14]"
                >
                  Voir la fiche client
                </Link>
              </div>
            );
          }}
        />
        <Scatter
          data={points}
          shape={(props: any) => {
            const { cx, cy, payload } = props;
            const point = payload as BubblePoint;
            const r = radiusFor(point.z);
            const isHovered = hoveredId === point.contract.id;
            return (
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill={riskColor[point.contract.riskLevel]}
                fillOpacity={isHovered ? 0.85 : 0.62}
                stroke={riskColor[point.contract.riskLevel]}
                strokeWidth={isHovered ? 2 : 1}
                className="cursor-pointer transition-[fill-opacity,stroke-width] duration-150"
                onMouseEnter={() => setHoveredId(point.contract.id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            );
          }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
