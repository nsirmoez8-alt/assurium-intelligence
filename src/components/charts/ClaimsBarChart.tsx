import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { monthlyClaimsTrend } from "../../utils/metrics";
import { useChartColors } from "../../utils/useChartColors";

export function ClaimsBarChart() {
  const data = monthlyClaimsTrend();
  const colors = useChartColors();

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }} barGap={4}>
        <CartesianGrid vertical={false} stroke={colors.grid} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: colors.tick, fontSize: 12, fontFamily: "Inter" }}
          dy={8}
        />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: colors.tick, fontSize: 12, fontFamily: "Inter" }} width={28} allowDecimals={false} />
        <Tooltip content={(props) => <ChartTooltip {...props} />} cursor={{ fill: colors.tooltipCursor }} />
        <Bar dataKey="déclarés" name="Déclarés" fill="#C58A2E" radius={[5, 5, 0, 0]} maxBarSize={22} />
        <Bar dataKey="clôturés" name="Clôturés" fill="#0EAFA0" radius={[5, 5, 0, 0]} maxBarSize={22} />
      </BarChart>
    </ResponsiveContainer>
  );
}
