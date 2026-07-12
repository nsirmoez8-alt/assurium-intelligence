import { Menu, Moon, Sun } from "lucide-react";
import { NotificationsPopover } from "./NotificationsPopover";
import { GlobalSearch } from "./GlobalSearch";
import { Avatar } from "../ui/Avatar";
import { PeriodSelector } from "../ui/PeriodSelector";
import { CURRENT_ADVISOR } from "../../data/clients";
import { initials } from "../../utils/format";
import { useTheme } from "../../context/ThemeContext";

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const [advisorFirstName, ...advisorLastParts] = CURRENT_ADVISOR.split(" ");
  const advisorInitials = initials(advisorFirstName, advisorLastParts.join(" "));

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2.5 border-b border-mist bg-paper/85 px-4 backdrop-blur-md sm:px-6 dark:border-white/[0.08] dark:bg-ink-975/85">
      <button
        onClick={onMenuClick}
        aria-label="Ouvrir le menu"
        className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-500 hover:bg-mist lg:hidden dark:text-ink-200 dark:hover:bg-white/[0.06]"
      >
        <Menu className="h-[18px] w-[18px]" />
      </button>

      <GlobalSearch />

      <div className="flex-1 sm:hidden" />

      <div className="flex items-center gap-1.5 sm:gap-2">
        <PeriodSelector />
        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-500 transition-colors hover:bg-mist dark:text-ink-200 dark:hover:bg-white/[0.06]"
        >
          {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>
        <NotificationsPopover />
        <div className="ml-0.5 flex items-center gap-2.5 border-l border-mist pl-2.5 dark:border-white/[0.08]">
          <Avatar initials={advisorInitials} color="bg-ink-800" size="sm" />
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-tight text-ink-900 dark:text-white">{CURRENT_ADVISOR}</p>
            <p className="text-2xs leading-tight text-ink-400 dark:text-ink-300/60">Conseillère patrimoniale</p>
          </div>
        </div>
      </div>
    </header>
  );
}
