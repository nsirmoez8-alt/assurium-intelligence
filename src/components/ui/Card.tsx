import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
  padded?: boolean;
  glass?: boolean;
}

export function Card({ children, className, hoverable = false, padded = true, glass = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-mist bg-white shadow-card dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-card-dark",
        hoverable &&
          "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover dark:hover:bg-white/[0.045]",
        glass && "glass",
        padded && "p-5 sm:p-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  eyebrow,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1 text-2xs font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-300/80">{eyebrow}</p>
        )}
        <h3 className="font-display text-base font-semibold text-ink-900 dark:text-white">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-ink-400 dark:text-ink-200/70">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
