import { useId } from "react";
import { useAnimatedNumber } from "./AnimatedNumber";
import { cn } from "../../utils/cn";

export function RadialScore({
  score,
  size = 168,
  strokeWidth = 12,
  label,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}) {
  const gradientId = useId();
  const animated = useAnimatedNumber(score, 1100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, animated)) / 100) * circumference;

  const status =
    score >= 85 ? "Excellent" : score >= 70 ? "Bon niveau" : score >= 50 ? "À surveiller" : "Action requise";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D5CE0" />
            <stop offset="55%" stopColor="#2E6BE6" />
            <stop offset="100%" stopColor="#0EAFA0" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-mist dark:stroke-white/[0.08]"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke={`url(#${gradientId})`}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.2s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="font-display text-4xl font-extrabold tracking-tight text-ink-900 font-tabular dark:text-white">
          {Math.round(animated)}
        </p>
        <p className={cn("text-2xs font-medium text-ink-300 dark:text-ink-300/60")}>/100</p>
        <p className="mt-1 text-2xs font-semibold uppercase tracking-wide text-iris-600 dark:text-iris-300">
          {label ?? status}
        </p>
      </div>
    </div>
  );
}
