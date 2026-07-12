import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 animate-fade-in bg-ink-950/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 w-full max-w-lg animate-float-in overflow-hidden rounded-2xl border border-mist bg-white shadow-popover dark:border-white/[0.1] dark:bg-ink-900"
      >
        <div className="flex items-start justify-between border-b border-mist px-6 py-5 dark:border-white/[0.08]">
          <div>
            <h2 id="modal-title" className="font-display text-lg font-bold text-ink-900 dark:text-white">
              {title}
            </h2>
            {subtitle && <p className="mt-1 text-sm text-ink-400 dark:text-ink-300/70">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-lg p-1.5 text-ink-300 hover:bg-mist hover:text-ink-700 dark:text-ink-300/60 dark:hover:bg-white/[0.08] dark:hover:text-white"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-2.5 border-t border-mist bg-paper-dim/50 px-6 py-4 dark:border-white/[0.08] dark:bg-white/[0.02]">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
