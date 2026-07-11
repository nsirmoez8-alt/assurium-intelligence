import { cn } from "../../utils/cn";

export function ProgressBar({
  value,
  max = 100,
  tone = "signal",
  className,
}: {
  value: number;
  max?: number;
  tone?: "signal" | "azure" | "amber" | "rose";
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const toneColor = {
    signal: "bg-signal-500",
    azure: "bg-azure-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
  }[tone];

  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-mist dark:bg-white/[0.08]", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-500", toneColor)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
