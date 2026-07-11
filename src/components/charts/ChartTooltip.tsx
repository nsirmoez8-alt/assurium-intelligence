import type { TooltipContentProps } from "recharts/types/component/Tooltip";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { formatCurrency, formatNumber } from "../../utils/format";

export function ChartTooltip({
  active,
  payload,
  label,
  currency = false,
}: TooltipContentProps<ValueType, NameType> & { currency?: boolean }) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-xl border border-mist bg-white px-3.5 py-2.5 shadow-popover dark:border-white/[0.1] dark:bg-ink-900">
      {label !== undefined && <p className="mb-1.5 text-2xs font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-300/60">{label}</p>}
      <div className="space-y-1">
        {payload.map((entry) => (
          <div key={entry.dataKey as string} className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-ink-500 dark:text-ink-200/70">{entry.name}</span>
            <span className="ml-auto font-tabular font-semibold text-ink-900 dark:text-white">
              {currency ? formatCurrency(Number(entry.value)) : formatNumber(Number(entry.value))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
