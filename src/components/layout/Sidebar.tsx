import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  ShieldAlert,
  BarChart3,
  Bell,
  Shield,
  X,
  Orbit,
  Target,
  Sparkles,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { unreadCount } from "../../data/notifications";

const navItems = [
  { to: "/", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/clients", label: "Clients", icon: Users },
  { to: "/contrats", label: "Contrats", icon: FileText },
  { to: "/sinistres", label: "Sinistres", icon: ShieldAlert },
  { to: "/portefeuille", label: "Vue portefeuille", icon: Orbit },
  { to: "/opportunites", label: "Opportunités", icon: Target },
  { to: "/analyse", label: "Analyse", icon: BarChart3 },
  { to: "/notifications", label: "Notifications", icon: Bell, badge: unreadCount() },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink-950/40 backdrop-blur-[2px] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[17rem] shrink-0 flex-col bg-ink-900 transition-transform duration-300 ease-out lg:static lg:translate-x-0 dark:bg-ink-975 dark:border-r dark:border-white/[0.06]",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-iris-signal shadow-glow">
              <Shield className="h-5 w-5 text-white" strokeWidth={2.25} />
            </span>
            <div className="leading-tight">
              <span className="block font-display text-lg font-bold tracking-tight text-white">Assurium</span>
              <span className="flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-wider text-iris-300">
                <Sparkles className="h-2.5 w-2.5" /> Intelligence
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer le menu"
            className="rounded-lg p-1.5 text-ink-300 hover:bg-white/5 lg:hidden"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 px-3.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive ? "bg-white/[0.08] text-white" : "text-ink-300 hover:bg-white/[0.04] hover:text-white",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={cn("h-[18px] w-[18px] shrink-0", isActive ? "text-iris-300" : "text-ink-400 group-hover:text-ink-200")}
                    strokeWidth={2}
                  />
                  <span className="flex-1">{item.label}</span>
                  {!!item.badge && (
                    <span className="rounded-full bg-signal-500 px-1.5 py-0.5 text-2xs font-tabular font-semibold text-white">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mx-3.5 mb-5 mt-4 rounded-xl border border-white/[0.06] bg-iris-signal/[0.08] p-4">
          <p className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wider text-iris-300">
            <Sparkles className="h-3 w-3" /> Portefeuille
          </p>
          <p className="mt-1.5 text-sm text-ink-200">24 clients actifs sous votre gestion</p>
        </div>
      </aside>
    </>
  );
}
