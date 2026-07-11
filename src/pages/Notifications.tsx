import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, FileClock, FileWarning, ShieldAlert, Zap, CheckCheck } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { cn } from "../utils/cn";
import { notifications as initialNotifications } from "../data/notifications";
import { getClientById, clientFullName } from "../data/clients";
import { formatDateLong, formatRelativeDays } from "../utils/format";
import type { NotificationType } from "../types";

const typeIcon: Record<NotificationType, typeof Bell> = {
  echeance: FileClock,
  document: FileWarning,
  action: Zap,
  sinistre: ShieldAlert,
};

const typeColor: Record<NotificationType, string> = {
  echeance: "bg-azure-50 text-azure-600 dark:bg-azure-500/10 dark:text-azure-400",
  document: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  action: "bg-signal-50 text-signal-600 dark:bg-signal-500/10 dark:text-signal-400",
  sinistre: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
};

const typeLabel: Record<NotificationType, string> = {
  echeance: "Échéance",
  document: "Document manquant",
  action: "Action prioritaire",
  sinistre: "Sinistre",
};

const filters: { id: NotificationType | "toutes"; label: string }[] = [
  { id: "toutes", label: "Toutes" },
  { id: "echeance", label: "Échéances" },
  { id: "document", label: "Documents" },
  { id: "action", label: "Actions prioritaires" },
  { id: "sinistre", label: "Sinistres" },
];

export function Notifications() {
  const [items, setItems] = useState(initialNotifications);
  const [filter, setFilter] = useState<NotificationType | "toutes">("toutes");

  const filtered = useMemo(
    () => (filter === "toutes" ? items : items.filter((n) => n.type === filter)),
    [items, filter],
  );

  const unread = items.filter((n) => !n.read).length;

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  return (
    <div>
      <PageHeader
        eyebrow="Centre de notifications"
        title="Notifications"
        description={`${unread} notification${unread > 1 ? "s" : ""} non lue${unread > 1 ? "s" : ""} sur ${items.length}`}
        action={
          <Button variant="secondary" size="sm" onClick={markAllRead} disabled={unread === 0}>
            <CheckCheck className="h-3.5 w-3.5" /> Tout marquer comme lu
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              filter === f.id
                ? "bg-ink-900 text-white dark:bg-white dark:text-ink-950"
                : "bg-white text-ink-500 ring-1 ring-inset ring-mist hover:bg-mist/60 dark:bg-white/[0.04] dark:text-ink-200/70 dark:ring-white/[0.1] dark:hover:bg-white/[0.08]",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Bell} title="Aucune notification" description="Vous êtes à jour sur cette catégorie." />
      ) : (
        <Card padded={false} className="divide-y divide-mist overflow-hidden dark:divide-white/[0.06]">
          {filtered.map((n) => {
            const Icon = typeIcon[n.type];
            const client = n.clientId ? getClientById(n.clientId) : undefined;
            return (
              <div
                key={n.id}
                className={cn(
                  "flex gap-4 px-5 py-4 transition-colors sm:px-6",
                  !n.read && "bg-signal-50/25 dark:bg-signal-500/[0.05]",
                )}
              >
                <span className={cn("mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", typeColor[n.type])}>
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-ink-900 dark:text-white">{n.title}</p>
                    <span className="rounded-full bg-mist px-2 py-0.5 text-2xs font-medium text-ink-400 dark:bg-white/[0.08] dark:text-ink-300/70">{typeLabel[n.type]}</span>
                    {n.priority === "haute" && (
                      <span className="rounded-full bg-rose-50 px-2 py-0.5 text-2xs font-medium text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">Priorité haute</span>
                    )}
                    {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-signal-500" />}
                  </div>
                  <p className="mt-1 text-sm text-ink-500 dark:text-ink-200/70">{n.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-2xs text-ink-300 dark:text-ink-300/50">
                    <span className="font-tabular">{formatDateLong(n.date)} · {formatRelativeDays(n.date)}</span>
                    {client && (
                      <Link to={`/clients/${client.id}`} className="font-medium text-signal-600 hover:text-signal-700 dark:text-signal-400">
                        {clientFullName(client)}
                      </Link>
                    )}
                  </div>
                </div>
                {!n.read && (
                  <button
                    onClick={() => markRead(n.id)}
                    className="h-fit shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-400 hover:bg-mist hover:text-ink-700 dark:text-ink-300/60 dark:hover:bg-white/[0.08] dark:hover:text-white"
                  >
                    Marquer comme lu
                  </button>
                )}
              </div>
            );
          })}
        </Card>
      )}
    </div>
  );
}
