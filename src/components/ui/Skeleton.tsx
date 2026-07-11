import { cn } from "../../utils/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "skeleton-shimmer animate-shimmer overflow-hidden rounded-lg bg-mist dark:bg-white/[0.06]",
        className,
      )}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-mist bg-white p-5 shadow-card dark:border-white/[0.08] dark:bg-white/[0.03]">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <Skeleton className="mt-4 h-7 w-20" />
      <Skeleton className="mt-2 h-3.5 w-28" />
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="border-b border-mist last:border-0 dark:border-white/[0.08]">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <Skeleton className="h-4 w-full max-w-[140px]" />
        </td>
      ))}
    </tr>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-mist bg-white p-6 shadow-card dark:border-white/[0.08] dark:bg-white/[0.03]",
        className,
      )}
    >
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-4 h-40 w-full" />
    </div>
  );
}
