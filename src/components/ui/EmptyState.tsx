import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-mist-dark px-6 py-14 text-center animate-fade-in dark:border-white/[0.12]">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mist dark:bg-white/[0.06]">
        <Icon className="h-5 w-5 text-ink-400 dark:text-ink-200/70" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 font-display text-sm font-semibold text-ink-900 dark:text-white">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-ink-400 dark:text-ink-200/60">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
