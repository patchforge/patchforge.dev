"use client";

import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface IntegrationCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  connected: boolean;
  disabled?: boolean;
  statusLabel?: string;
  children?: ReactNode;
}

export default function IntegrationCard({
  icon: Icon,
  name,
  description,
  connected,
  disabled = false,
  statusLabel,
  children,
}: IntegrationCardProps) {
  return (
    <div
      className={`rounded-xl border p-6 transition-colors ${
        disabled
          ? "border-navy-700/30 bg-navy-900/20 opacity-60"
          : "border-navy-600/50 bg-navy-800/30 hover:border-navy-600"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy-700/50 text-electric">
            <Icon size={20} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-white">{name}</h3>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
            disabled
              ? "bg-navy-700/30 text-gray-500"
              : connected
              ? "bg-green-500/10 text-green-400"
              : "bg-navy-700/50 text-gray-400"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              disabled ? "bg-gray-600" : connected ? "bg-green-400" : "bg-gray-500"
            }`}
          />
          {statusLabel || (disabled ? "Coming Soon" : connected ? "Connected" : "Not Connected")}
        </span>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
