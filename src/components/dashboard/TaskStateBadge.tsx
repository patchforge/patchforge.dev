"use client";

import Badge from "@/components/ui/Badge";

const stateConfig: Record<
  string,
  { label: string; variant: "default" | "electric" | "forge"; className?: string }
> = {
  ASSIGNED: { label: "Assigned", variant: "default" },
  ANALYZING: { label: "Analyzing", variant: "default" },
  NEEDS_CLARIFICATION: {
    label: "Needs Clarification",
    variant: "default",
    className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
  PLANNING: { label: "Planning", variant: "default" },
  CODING: { label: "Coding", variant: "electric" },
  TESTING: { label: "Testing", variant: "electric" },
  ITERATING: { label: "Iterating", variant: "electric" },
  PR_OPENED: { label: "PR Opened", variant: "forge" },
  WAITING_FOR_REVIEW: { label: "In Review", variant: "forge" },
  COMPLETED: {
    label: "Completed",
    variant: "default",
    className: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  FAILED: {
    label: "Failed",
    variant: "default",
    className: "bg-red-500/10 text-red-400 border-red-500/20",
  },
};

export default function TaskStateBadge({ state }: { state: string }) {
  const config = stateConfig[state] ?? {
    label: state,
    variant: "default" as const,
  };
  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
}
