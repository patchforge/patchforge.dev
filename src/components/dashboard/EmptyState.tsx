import { LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-navy-800/50 border border-navy-700/50 text-gray-500 mb-4">
        <Icon size={24} />
      </div>
      <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-sm">{description}</p>
      {actionLabel && actionHref && (
        <div className="mt-6">
          <Link href={actionHref}>
            <Button size="sm">{actionLabel}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
