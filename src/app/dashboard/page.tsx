"use client";

import { useUser } from "@clerk/nextjs";
import {
  GitPullRequest,
  CheckCircle2,
  Coins,
  DollarSign,
  ExternalLink,
  Circle,
  Activity,
} from "lucide-react";
import Link from "next/link";
import StatsCard from "@/components/dashboard/StatsCard";
import EmptyState from "@/components/dashboard/EmptyState";
import { StatsCardSkeleton } from "@/components/dashboard/Skeleton";
import TaskStateBadge from "@/components/dashboard/TaskStateBadge";
import { useOrg } from "@/hooks/useOrg";
import { useUsage } from "@/hooks/useUsage";
import { useTasks } from "@/hooks/useTasks";
import { useRepos } from "@/hooks/useRepos";
import { formatNumber, formatRelativeTime } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useUser();
  const { org } = useOrg();
  const { usage } = useUsage("30d");
  const { tasks } = useTasks({ limit: 5 });
  const { repos } = useRepos();

  const firstName = user?.firstName || "there";

  const checklist = [
    {
      label: "Connect Jira",
      href: "/dashboard/integrations",
      done: org?.jira_connected ?? false,
    },
    {
      label: "Install GitHub App",
      href: "/dashboard/integrations",
      done: org?.github_connected ?? false,
    },
    {
      label: "Enable a repository",
      href: "/dashboard/repositories",
      done: repos.length > 0,
    },
    {
      label: "Create your first task",
      href: null as string | null,
      done: (tasks?.total ?? 0) > 0,
      hint: "Add the patchforge label to a Jira ticket",
    },
  ];

  const allDone = checklist.every((item) => item.done);

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-gray-500">
          Here&apos;s an overview of your PatchForge activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {!org ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          <>
            <StatsCard
              icon={GitPullRequest}
              label="PRs Opened"
              value={String(org.total_prs_opened)}
              trend="All time"
            />
            <StatsCard
              icon={CheckCircle2}
              label="Total Runs"
              value={String(usage?.total_runs ?? 0)}
              trend="This month"
            />
            <StatsCard
              icon={Coins}
              label="Tokens Used"
              value={formatNumber(org.total_tokens_used)}
              trend="All time"
            />
            <StatsCard
              icon={DollarSign}
              label="Cost"
              value={`$${org.total_cost_usd.toFixed(2)}`}
              trend="All time"
            />
          </>
        )}
      </div>

      {/* Get Started checklist */}
      {!allDone && (
        <div className="rounded-xl border border-navy-600/50 bg-navy-800/30 p-6 mb-8">
          <h2 className="font-display text-lg font-semibold text-white mb-4">
            Get Started
          </h2>
          <div className="space-y-3">
            {checklist.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <Circle
                  size={18}
                  className={
                    item.done
                      ? "text-green-400 fill-green-400"
                      : "text-navy-600"
                  }
                />
                <div className="flex-1">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-sm text-gray-300 hover:text-electric transition-colors inline-flex items-center gap-1.5"
                    >
                      {item.label}
                      {!item.done && (
                        <ExternalLink size={12} className="text-gray-600" />
                      )}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-300">{item.label}</span>
                  )}
                  {item.hint && !item.done && (
                    <p className="text-xs text-gray-600 mt-0.5">{item.hint}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="rounded-xl border border-navy-600/50 bg-navy-800/30">
        <div className="px-6 py-4 border-b border-navy-700/30">
          <h2 className="font-display text-lg font-semibold text-white">
            Recent Activity
          </h2>
        </div>
        {!tasks?.tasks?.length ? (
          <EmptyState
            icon={Activity}
            title="No activity yet"
            description="Connect your tools to get started. Once PatchForge picks up a ticket, activity will appear here."
            actionLabel="Connect Integrations"
            actionHref="/dashboard/integrations"
          />
        ) : (
          <div className="divide-y divide-navy-700/30">
            {tasks.tasks.map((task) => (
              <Link
                key={task.id}
                href={`/dashboard/tasks/${task.id}`}
                className="flex items-center justify-between px-6 py-3 hover:bg-navy-800/20 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <TaskStateBadge state={task.state} />
                  <span className="text-sm text-gray-300 truncate">
                    {task.title}
                  </span>
                </div>
                <span className="text-xs text-gray-500 shrink-0 ml-4">
                  {task.assigned_at
                    ? formatRelativeTime(task.assigned_at)
                    : "--"}
                </span>
              </Link>
            ))}
            {tasks.total > 5 && (
              <Link
                href="/dashboard/tasks"
                className="block px-6 py-3 text-center text-sm text-electric hover:underline"
              >
                View all {tasks.total} tasks
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
