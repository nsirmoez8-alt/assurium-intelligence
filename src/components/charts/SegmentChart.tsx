import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { segmentDistribution } from "../../utils/metrics";
import { clients } from "../../data/clients";

const COLORS: Record<string, string> = {
  Particulier: "#2E6BE6",
  Professionnel: "#C58A2E",
  Patrimonial: "#6D5CE0",
};

export function SegmentChart() {
  const data = segmentDistribution();

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div className="relative shrink-0">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie data={data} dataKey="count" nameKey="segment" innerRadius={54} outerRadius={82} paddingAngle={2} stroke="none">
              {data.map((d) => (
                <Cell key={d.segment} fill={COLORS[d.segment]} />
              ))}
            </Pie>
            <Tooltip content={(props) => <ChartTooltip {...props} />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-tabular font-display text-lg font-bold text-ink-900 dark:text-white">{clients.length}</p>
          <p className="text-2xs text-ink-400 dark:text-ink-300/60">clients</p>
        </div>
      </div>
      <div className="flex-1 space-y-3">
        {data.map((d) => (
          <div key={d.segment} className="flex items-center gap-2.5 text-sm">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: COLORS[d.segment] }} />
            <span className="flex-1 text-ink-600 dark:text-ink-200/80">{d.segment}</span>
            <span className="font-tabular text-xs font-semibold text-ink-900 dark:text-white">{d.count}</span>
            <span className="font-tabular text-2xs text-ink-300 dark:text-ink-300/50">
              ({Math.round((d.count / clients.length) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
