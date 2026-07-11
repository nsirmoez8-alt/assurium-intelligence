import { cn } from "../../utils/cn";

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 border-b border-mist dark:border-white/[0.08]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium transition-colors",
            active === tab.id
              ? "text-ink-900 dark:text-white"
              : "text-ink-400 hover:text-ink-600 dark:text-ink-300/60 dark:hover:text-ink-100",
          )}
        >
          {tab.label}
          {typeof tab.count === "number" && (
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-2xs font-tabular",
                active === tab.id
                  ? "bg-ink-900 text-white dark:bg-white dark:text-ink-950"
                  : "bg-mist text-ink-400 dark:bg-white/[0.08] dark:text-ink-300/70",
              )}
            >
              {tab.count}
            </span>
          )}
          {active === tab.id && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-iris-signal" />
          )}
        </button>
      ))}
    </div>
  );
}
