import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, User, FileText, ShieldAlert, X } from "lucide-react";
import { globalSearch, type SearchResult, type SearchResultKind } from "../../utils/globalSearch";

const kindLabel: Record<SearchResultKind, string> = {
  client: "Clients",
  contract: "Contrats",
  claim: "Sinistres",
};

const kindIcon: Record<SearchResultKind, typeof User> = {
  client: User,
  contract: FileText,
  claim: ShieldAlert,
};

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = globalSearch(query);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goTo(result: SearchResult) {
    navigate(result.href);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setQuery("");
      setOpen(false);
      inputRef.current?.blur();
    } else if (e.key === "Enter" && results.length > 0) {
      goTo(results[0]);
    }
  }

  const grouped: Partial<Record<SearchResultKind, SearchResult[]>> = {};
  for (const r of results) {
    (grouped[r.kind] ??= []).push(r);
  }

  return (
    <div ref={containerRef} className="relative hidden flex-1 max-w-md sm:block">
      <div className="flex items-center gap-2.5 rounded-xl border border-mist bg-white px-3.5 py-2.5 transition-colors focus-within:border-iris-400 focus-within:ring-2 focus-within:ring-iris-100 dark:border-white/[0.1] dark:bg-white/[0.04] dark:focus-within:border-iris-400 dark:focus-within:ring-iris-500/20">
        <Search className="h-4 w-4 shrink-0 text-ink-300 dark:text-ink-300/60" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher un client, un contrat..."
          className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none dark:text-white dark:placeholder:text-ink-300/50"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Effacer la recherche"
            className="shrink-0 text-ink-300 hover:text-ink-600 dark:text-ink-300/50 dark:hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && query && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 max-h-96 overflow-y-auto rounded-xl border border-mist bg-white p-2 shadow-popover dark:border-white/[0.1] dark:bg-ink-900">
          {results.length === 0 ? (
            <p className="px-3 py-4 text-center text-sm text-ink-400 dark:text-ink-300/60">Aucun résultat pour « {query} »</p>
          ) : (
            (Object.keys(grouped) as SearchResultKind[]).map((kind) => (
              <div key={kind} className="mb-1 last:mb-0">
                <p className="px-2.5 pb-1 pt-2 text-2xs font-semibold uppercase tracking-wide text-ink-300 dark:text-ink-300/50">{kindLabel[kind]}</p>
                {grouped[kind]!.map((r) => {
                  const Icon = kindIcon[r.kind];
                  return (
                    <button
                      key={`${r.kind}-${r.id}`}
                      onClick={() => goTo(r)}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-mist dark:hover:bg-white/[0.06]"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mist text-ink-500 dark:bg-white/[0.06] dark:text-ink-200">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-ink-900 dark:text-white">{r.label}</span>
                        <span className="block truncate text-xs text-ink-400 dark:text-ink-300/60">{r.sublabel}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
