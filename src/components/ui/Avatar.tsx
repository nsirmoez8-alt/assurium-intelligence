import { cn } from "../../utils/cn";

export function Avatar({
  initials,
  color = "bg-ink-500",
  size = "md",
}: {
  initials: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
  };

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-display font-semibold text-white",
        sizes[size],
        color,
      )}
    >
      {initials}
    </div>
  );
}
