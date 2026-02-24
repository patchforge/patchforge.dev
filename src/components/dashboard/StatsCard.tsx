import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
}

export default function StatsCard({ icon: Icon, label, value, trend }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-navy-600/50 bg-navy-800/30 p-5 transition-colors hover:border-navy-600">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-navy-700/50 text-electric">
          <Icon size={18} />
        </div>
        {trend && (
          <span className="text-xs text-gray-500">{trend}</span>
        )}
      </div>
      <div className="font-display text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}
