import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, FileClock, FileWarning, ShieldAlert, Zap } from "lucide-react";
import { cn } from "../../utils/cn";
import { notifications, unreadCount } from "../../data/notifications";
import { formatRelativeDays } from "../../utils/format";
import type { NotificationType } from "../../types";

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

export function NotificationsPopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = unreadCount();
  const preview = notifications.slice(0, 5);

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
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-xl text-ink-500 transition-colors hover:bg-mist dark:text-ink-200 dark:hover:bg-white/[0.06]"
      >
        <Bell className="h-[18px] w-[18px]" strokeWidth={2} />
        {count > 0 && (
          <span className="absolute right-2 top-2 flex h-2 w-2 items-center justify-center rounded-full bg-rose-500 ring-2 ring-white dark:ring-ink-975" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[22rem] animate-scale-in rounded-2xl border border-mist bg-white shadow-popover dark:border-white/[0.1] dark:bg-ink-900">
          <div className="flex items-center justify-between border-b border-mist px-4 py-3.5 dark:border-white/[0.08]">
            <p className="font-display text-sm font-semibold text-ink-900 dark:text-white">Notifications</p>
            <span className="rounded-full bg-mist px-2 py-0.5 text-2xs font-medium text-ink-500 dark:bg-white/[0.08] dark:text-ink-200">
              {count} non lues
            </span>
          </div>
          <div className="max-h-80 overflow-y-auto scrollbar-none">
            {preview.map((n) => {
              const Icon = typeIcon[n.type];
              return (
                <div
                  key={n.id}
                  className={cn(
                    "flex gap-3 border-b border-mist px-4 py-3 last:border-0 dark:border-white/[0.06]",
                    !n.read && "bg-signal-50/30 dark:bg-signal-500/[0.06]",
                  )}
                >
                  <span className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", typeColor[n.type])}>
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink-900 dark:text-white">{n.title}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-ink-400 dark:text-ink-300/70">{n.description}</p>
                    <p className="mt-1 text-2xs font-tabular text-ink-300 dark:text-ink-300/50">{formatRelativeDays(n.date)}</p>
                  </div>
                  {!n.read && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-500" />}
                </div>
              );
            })}
          </div>
          <Link
            to="/notifications"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-center text-sm font-medium text-signal-600 hover:bg-signal-50/50 dark:text-signal-400 dark:hover:bg-signal-500/[0.06]"
          >
            Voir toutes les notifications
          </Link>
        </div>
      )}
    </div>
  );
}
