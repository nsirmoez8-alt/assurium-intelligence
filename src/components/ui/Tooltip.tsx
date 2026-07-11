import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export function Tooltip({
  content,
  children,
  side = "top",
  className,
}: {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}) {
  const sideStyles: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <span className={cn("group/tooltip relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-ink-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-popover transition-all duration-150 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100",
          side === "top" && "translate-y-1 group-hover/tooltip:translate-y-0",
          side === "bottom" && "-translate-y-1 group-hover/tooltip:translate-y-0",
          "dark:bg-white dark:text-ink-950",
          sideStyles[side],
        )}
      >
        {content}
      </span>
    </span>
  );
}
