import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { claimsByStatus } from "../../utils/metrics";
import { useChartColors } from "../../utils/useChartColors";

const statusColor: Record<string, string> = {
  Déclaré: "#2E6BE6",
  "En analyse": "#C58A2E",
  "En traitement": "#9E6E22",
  Clôturé: "#0EAFA0",
  Refusé: "#C24A4A",
};

export function ClaimsStatusChart() {
  const data = claimsByStatus();
  const colors = useChartColors();

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 4, bottom: 4 }}>
        <CartesianGrid horizontal={false} stroke={colors.grid} />
        <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: colors.tick, fontSize: 12, fontFamily: "Inter" }} allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="status"
          axisLine={false}
          tickLine={false}
          width={100}
          tick={{ fill: colors.tick, fontSize: 12, fontFamily: "Inter" }}
        />
        <Tooltip content={(props) => <ChartTooltip {...props} />} cursor={{ fill: colors.tooltipCursor }} />
        <Bar dataKey="count" name="Dossiers" radius={[0, 6, 6, 0]} maxBarSize={22}>
          {data.map((entry) => (
            <Cell key={entry.status} fill={statusColor[entry.status]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
