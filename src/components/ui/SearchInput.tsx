import { Search, X } from "lucide-react";
import { cn } from "../../utils/cn";

export function SearchInput({
  value,
  onChange,
  placeholder = "Rechercher...",
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300 dark:text-ink-300/60" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-mist bg-white py-2.5 pl-10 pr-9 text-sm text-ink-900 placeholder:text-ink-300 transition-colors focus:border-iris-400 focus:outline-none focus:ring-2 focus:ring-iris-100 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-ink-300/50 dark:focus:border-iris-400 dark:focus:ring-iris-500/20"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Effacer la recherche"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-ink-300 hover:bg-mist hover:text-ink-600 dark:text-ink-300/60 dark:hover:bg-white/[0.08] dark:hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
