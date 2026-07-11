import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { monthlyPremiumTrend } from "../../utils/metrics";
import { useChartColors } from "../../utils/useChartColors";
import { usePeriod, periodMonthsWindow } from "../../context/PeriodContext";

export function PremiumsAreaChart() {
  const { period } = usePeriod();
  const colors = useChartColors();
  const window = periodMonthsWindow[period];
  const data = monthlyPremiumTrend().slice(-window);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="premiumsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6D5CE0" stopOpacity={0.32} />
            <stop offset="100%" stopColor="#0EAFA0" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="premiumsStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6D5CE0" />
            <stop offset="100%" stopColor="#0EAFA0" />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke={colors.grid} strokeDasharray="0" />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: colors.tick, fontSize: 12, fontFamily: "Inter" }}
          dy={8}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: colors.tick, fontSize: 12, fontFamily: "Inter" }}
          tickFormatter={(v) => `${Math.round(v / 1000)}k€`}
          width={44}
        />
        <Tooltip content={(props) => <ChartTooltip {...props} currency />} cursor={{ stroke: colors.tooltipStroke, strokeWidth: 1 }} />
        <Area
          type="monotone"
          dataKey="primes"
          name="Primes encaissées"
          stroke="url(#premiumsStroke)"
          strokeWidth={2.5}
          fill="url(#premiumsGradient)"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
