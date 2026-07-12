import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { CURRENT_ADVISOR } from "../../data/clients";
import { initials } from "../../utils/format";
import { useAuth } from "../../context/AuthContext";

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [advisorFirstName, ...advisorLastParts] = CURRENT_ADVISOR.split(" ");
  const advisorInitials = initials(advisorFirstName, advisorLastParts.join(" "));

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleLogout() {
    setOpen(false);
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu du compte"
        aria-expanded={open}
        className="ml-0.5 flex items-center gap-2.5 rounded-xl border-l border-mist py-1 pl-2.5 pr-1.5 transition-colors hover:bg-mist/60 dark:border-white/[0.08] dark:hover:bg-white/[0.06]"
      >
        <Avatar initials={advisorInitials} color="bg-ink-800" size="sm" />
        <div className="hidden text-left sm:block">
          <p className="text-sm font-medium leading-tight text-ink-900 dark:text-white">{CURRENT_ADVISOR}</p>
          <p className="text-2xs leading-tight text-ink-400 dark:text-ink-300/60">Conseillère patrimoniale</p>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-40 w-48 rounded-xl border border-mist bg-white p-1.5 shadow-popover dark:border-white/[0.1] dark:bg-ink-900">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
          >
            <LogOut className="h-4 w-4" />
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
}
