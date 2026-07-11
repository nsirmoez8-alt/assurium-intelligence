import { ChevronDown } from "lucide-react";

export function Select({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full appearance-none rounded-xl border border-mist bg-white pl-3.5 pr-9 text-sm text-ink-700 transition-colors focus:border-iris-400 focus:outline-none focus:ring-2 focus:ring-iris-100 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-ink-100 dark:focus:border-iris-400 dark:focus:ring-iris-500/20"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-ink-900">
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300 dark:text-ink-300/60" />
    </div>
  );
}
