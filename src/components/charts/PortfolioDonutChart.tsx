import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { contractsByType } from "../../utils/metrics";
import { formatCurrency } from "../../utils/format";

const COLORS = ["#0EAFA0", "#6D5CE0", "#2E6BE6", "#C58A2E", "#5C7096", "#C24A4A", "#2CC4B6", "#4C82EC"];

export function PortfolioDonutChart() {
  const data = contractsByType();
  const total = data.reduce((s, d) => s + d.premium, 0);

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div className="relative shrink-0">
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="premium"
              nameKey="type"
              innerRadius={62}
              outerRadius={92}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={(props) => <ChartTooltip {...props} currency />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-tabular font-display text-lg font-bold text-ink-900 dark:text-white">{formatCurrency(total)}</p>
          <p className="text-2xs text-ink-400 dark:text-ink-300/60">primes / an</p>
        </div>
      </div>
      <div className="grid w-full flex-1 grid-cols-1 gap-2.5 sm:grid-cols-2">
        {data.map((d, i) => (
          <div key={d.type} className="flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            <span className="truncate text-ink-600 dark:text-ink-200/80">{d.type}</span>
            <span className="ml-auto shrink-0 font-tabular text-xs text-ink-400 dark:text-ink-300/60">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
