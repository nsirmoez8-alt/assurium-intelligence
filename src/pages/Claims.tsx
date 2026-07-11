import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { SearchInput } from "../components/ui/SearchInput";
import { Select } from "../components/ui/Select";
import { Avatar } from "../components/ui/Avatar";
import { EmptyState } from "../components/ui/EmptyState";
import { cn } from "../utils/cn";
import { claims } from "../data/claims";
import { getClientById, clientFullName } from "../data/clients";
import { formatCurrency, formatDate, initials } from "../utils/format";
import type { ClaimPriority, ClaimStatus } from "../types";

const columns: { status: ClaimStatus; tone: string; dot: string }[] = [
  { status: "Déclaré", tone: "border-t-azure-400", dot: "bg-azure-500" },
  { status: "En analyse", tone: "border-t-amber-400", dot: "bg-amber-500" },
  { status: "En traitement", tone: "border-t-amber-500", dot: "bg-amber-600" },
  { status: "Clôturé", tone: "border-t-signal-500", dot: "bg-signal-500" },
  { status: "Refusé", tone: "border-t-rose-400", dot: "bg-rose-500" },
];

const priorityStyles: Record<ClaimPriority, string> = {
  Basse: "bg-mist text-ink-400 dark:bg-white/[0.06] dark:text-ink-300/70",
  Normale: "bg-azure-50 text-azure-600 dark:bg-azure-500/10 dark:text-azure-400",
  Haute: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  Critique: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
};

const priorityOptions = [
  { value: "Toutes", label: "Toutes les priorités" },
  { value: "Critique", label: "Critique" },
  { value: "Haute", label: "Haute" },
  { value: "Normale", label: "Normale" },
  { value: "Basse", label: "Basse" },
];

export function Claims() {
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("Toutes");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return claims.filter((c) => {
      const client = getClientById(c.clientId);
      const matchesQuery =
        !q ||
        c.reference.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q) ||
        (client && clientFullName(client).toLowerCase().includes(q));
      const matchesPriority = priority === "Toutes" || c.priority === priority;
      return matchesQuery && matchesPriority;
    });
  }, [query, priority]);

  return (
    <div>
      <PageHeader
        eyebrow="Suivi"
        title="Sinistres"
        description={`${claims.length} dossiers au total, répartis par étape de traitement`}
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <SearchInput value={query} onChange={setQuery} placeholder="Rechercher par référence, type ou client..." className="sm:max-w-sm" />
        <Select value={priority} onChange={setPriority} options={priorityOptions} className="sm:w-52" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={ShieldAlert} title="Aucun sinistre trouvé" description="Ajustez votre recherche ou vos filtres." />
      ) : (
        <div className="grid grid-cols-1 gap-4 overflow-x-auto pb-2 sm:grid-cols-2 xl:grid-flow-col xl:auto-cols-[280px]">
          {columns.map((col) => {
            const items = filtered.filter((c) => c.status === col.status);
            const total = items.reduce((s, c) => s + c.estimatedAmount, 0);
            return (
              <div
                key={col.status}
                className={cn(
                  "flex min-w-0 flex-col rounded-2xl border border-mist border-t-[3px] bg-paper-dim/40 dark:border-white/[0.08] dark:bg-white/[0.02]",
                  col.tone,
                )}
              >
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full", col.dot)} />
                    <p className="text-sm font-semibold text-ink-900 dark:text-white">{col.status}</p>
                  </div>
                  <span className="rounded-full bg-white px-2 py-0.5 text-2xs font-tabular font-semibold text-ink-500 ring-1 ring-mist dark:bg-white/[0.06] dark:text-ink-200 dark:ring-white/[0.1]">
                    {items.length}
                  </span>
                </div>
                <p className="px-4 pb-3 font-tabular text-xs text-ink-400 dark:text-ink-300/60">{formatCurrency(total)} engagés</p>
                <div className="flex-1 space-y-2.5 px-3 pb-3">
                  {items.length === 0 && (
                    <p className="rounded-xl border border-dashed border-mist-dark px-3 py-6 text-center text-xs text-ink-300 dark:border-white/[0.12] dark:text-ink-300/50">
                      Aucun dossier
                    </p>
                  )}
                  {items.map((claim) => {
                    const client = getClientById(claim.clientId);
                    if (!client) return null;
                    return (
                      <Link
                        key={claim.id}
                        to={`/sinistres/${claim.id}`}
                        className="block rounded-xl border border-mist bg-white p-3.5 shadow-card transition-all duration-150 hover:-translate-y-0.5 hover:shadow-card-hover dark:border-white/[0.08] dark:bg-white/[0.04]"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium leading-snug text-ink-900 dark:text-white">{claim.type}</p>
                          <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-2xs font-medium", priorityStyles[claim.priority])}>
                            {claim.priority}
                          </span>
                        </div>
                        <p className="mt-1 font-tabular text-2xs text-ink-300 dark:text-ink-300/50">{claim.reference}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Avatar initials={initials(client.firstName, client.lastName)} color={client.avatarColor} size="sm" />
                            <span className="max-w-[7rem] truncate text-xs text-ink-500 dark:text-ink-200/70">{clientFullName(client)}</span>
                          </div>
                          <span className="font-tabular text-xs font-semibold text-ink-900 dark:text-white">{formatCurrency(claim.estimatedAmount)}</span>
                        </div>
                        <p className="mt-2 font-tabular text-2xs text-ink-300 dark:text-ink-300/50">Déclaré le {formatDate(claim.declaredDate)}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
