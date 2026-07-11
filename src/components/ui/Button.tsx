import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gradient";
  size?: "sm" | "md";
}

const variants = {
  primary: "bg-ink-900 text-white hover:bg-ink-800 active:bg-ink-950 dark:bg-white dark:text-ink-950 dark:hover:bg-ink-100",
  secondary:
    "bg-white text-ink-700 ring-1 ring-inset ring-mist-dark hover:bg-mist/60 dark:bg-white/[0.04] dark:text-ink-100 dark:ring-white/[0.12] dark:hover:bg-white/[0.08]",
  ghost: "text-ink-500 hover:bg-mist/70 hover:text-ink-900 dark:text-ink-200/80 dark:hover:bg-white/[0.06] dark:hover:text-white",
  gradient: "bg-iris-signal text-white shadow-glow hover:brightness-110 dark:shadow-glow-dark",
};

const sizes = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
};

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
