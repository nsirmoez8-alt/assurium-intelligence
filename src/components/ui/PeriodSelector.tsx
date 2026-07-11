import { useEffect, useRef, useState } from "react";
import { CalendarRange, Check, ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";
import { usePeriod, periodLabels, type Period } from "../../context/PeriodContext";

const options: Period[] = ["7j", "30j", "trimestre", "annee"];

export function PeriodSelector() {
  const { period, setPeriod } = usePeriod();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center gap-2 rounded-xl border border-mist bg-white px-3.5 text-sm font-medium text-ink-600 transition-colors hover:border-mist-dark dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-ink-100 dark:hover:border-white/[0.18]"
      >
        <CalendarRange className="h-4 w-4 text-iris-500 dark:text-iris-300" />
        <span className="hidden sm:inline">{periodLabels[period]}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-ink-300 transition-transform dark:text-ink-300/60", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 animate-scale-in overflow-hidden rounded-xl border border-mist bg-white py-1.5 shadow-popover dark:border-white/[0.1] dark:bg-ink-900">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setPeriod(opt);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-3.5 py-2 text-left text-sm text-ink-600 transition-colors hover:bg-mist/60 dark:text-ink-100 dark:hover:bg-white/[0.06]"
            >
              {periodLabels[opt]}
              {opt === period && <Check className="h-3.5 w-3.5 text-iris-500 dark:text-iris-300" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
