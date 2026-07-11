import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "../../utils/cn";
import { AnimatedNumber } from "./AnimatedNumber";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: { value: string; direction: "up" | "down"; positive?: boolean };
  accent?: "signal" | "azure" | "amber" | "rose" | "ink";
  sublabel?: string;
  numericValue?: number;
  format?: (n: number) => string;
}

const accentStyles = {
  signal: "bg-signal-50 text-signal-600 dark:bg-signal-500/10 dark:text-signal-400",
  azure: "bg-azure-50 text-azure-600 dark:bg-azure-500/10 dark:text-azure-400",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
  ink: "bg-ink-50 text-ink-600 dark:bg-white/[0.06] dark:text-ink-100",
};

export function StatCard({ label, value, icon: Icon, trend, accent = "ink", sublabel, numericValue, format }: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-mist bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover animate-fade-in dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-card-dark dark:hover:bg-white/[0.045]">
      <div className="flex items-center justify-between">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", accentStyles[accent])}>
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
        {trend && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium font-tabular",
              trend.positive === false ? "text-rose-600 dark:text-rose-400" : "text-signal-600 dark:text-signal-400",
            )}
          >
            {trend.direction === "up" ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {trend.value}
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-2xl font-bold tracking-tight text-ink-900 font-tabular dark:text-white">
        {typeof numericValue === "number" ? <AnimatedNumber value={numericValue} format={format} /> : value}
      </p>
      <p className="mt-1 text-sm text-ink-400 dark:text-ink-200/70">{label}</p>
      {sublabel && <p className="mt-2 text-2xs text-ink-300 dark:text-ink-300/60">{sublabel}</p>}
    </div>
  );
}
