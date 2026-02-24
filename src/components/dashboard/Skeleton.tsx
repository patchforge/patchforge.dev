import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-navy-700/50", className)}
    />
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="rounded-xl border border-navy-600/50 bg-navy-800/30 p-5">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="w-9 h-9 rounded-lg" />
        <Skeleton className="w-16 h-4" />
      </div>
      <Skeleton className="w-20 h-8 mb-1" />
      <Skeleton className="w-24 h-4" />
    </div>
  );
}

export function TableRowSkeleton({ columns }: { columns: number }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="w-full h-4" />
        </td>
      ))}
    </tr>
  );
}
