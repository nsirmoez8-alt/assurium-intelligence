import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-fade-in">
      <div>
        {eyebrow && (
          <p className="mb-1.5 text-2xs font-semibold uppercase tracking-wider text-signal-600 dark:text-signal-400">{eyebrow}</p>
        )}
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-[1.75rem] dark:text-white">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-ink-400 dark:text-ink-200/70">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
