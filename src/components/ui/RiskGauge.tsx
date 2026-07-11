import { cn } from "../../utils/cn";
import type { RiskLevel } from "../../types";

const levelConfig: Record<RiskLevel, { bars: number; color: string }> = {
  Faible: { bars: 1, color: "bg-signal-500" },
  Modéré: { bars: 2, color: "bg-amber-500" },
  Élevé: { bars: 3, color: "bg-rose-500" },
};

export function RiskGauge({ level, showLabel = true }: { level: RiskLevel; showLabel?: boolean }) {
  const { bars, color } = levelConfig[level];

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-end gap-0.5">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              "w-1.5 rounded-sm transition-colors",
              i === 1 ? "h-2" : i === 2 ? "h-3" : "h-4",
              i <= bars ? color : "bg-mist-dark dark:bg-white/[0.1]",
            )}
          />
        ))}
      </div>
      {showLabel && <span className="text-sm text-ink-600 dark:text-ink-100">{level}</span>}
    </div>
  );
}
