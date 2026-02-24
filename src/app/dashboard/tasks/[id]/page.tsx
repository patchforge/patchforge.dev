"use client";

import { use } from "react";
import { ArrowLeft, GitBranch, ExternalLink, Zap, DollarSign } from "lucide-react";
import Link from "next/link";
import { useTask } from "@/hooks/useTasks";
import TaskStateBadge from "@/components/dashboard/TaskStateBadge";
import { Skeleton } from "@/components/dashboard/Skeleton";
import ErrorState from "@/components/dashboard/ErrorState";
import type { AgentRun } from "@/lib/types";

export default function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { task, error, isLoading, mutate } = useTask(id);

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl">
        <Skeleton className="w-32 h-5 mb-6" />
        <Skeleton className="w-64 h-8 mb-2" />
        <Skeleton className="w-48 h-4 mb-8" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
        <Skeleton className="w-full h-40" />
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl">
        <Link
          href="/dashboard/tasks"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to Tasks
        </Link>
        <ErrorState
          message={error?.message || "Task not found"}
          onRetry={() => mutate()}
        />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      {/* Back */}
      <Link
        href="/dashboard/tasks"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft size={14} /> Back to Tasks
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h1 className="font-display text-2xl font-bold text-white">
            {task.title}
          </h1>
          <TaskStateBadge state={task.state} />
        </div>
        <p className="text-sm text-gray-500">
          {task.source.toLowerCase().replace(/_/g, " ")} / {task.source_id}
        </p>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-navy-600/50 bg-navy-800/30 p-4">
          <div className="text-xs text-gray-500 mb-1">Priority</div>
          <div className="text-sm text-white font-medium">
            {task.priority.replace(/_/g, " ")}
          </div>
        </div>
        <div className="rounded-xl border border-navy-600/50 bg-navy-800/30 p-4">
          <div className="text-xs text-gray-500 mb-1">Branch</div>
          <div className="text-sm text-white font-mono truncate flex items-center gap-1.5">
            {task.branch_name ? (
              <>
                <GitBranch size={12} className="text-electric shrink-0" />
                {task.branch_name}
              </>
            ) : (
              <span className="text-gray-600">--</span>
            )}
          </div>
        </div>
        <div className="rounded-xl border border-navy-600/50 bg-navy-800/30 p-4">
          <div className="text-xs text-gray-500 mb-1">Pull Request</div>
          <div className="text-sm">
            {task.pr_url ? (
              <a
                href={task.pr_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-electric hover:underline inline-flex items-center gap-1"
              >
                View PR <ExternalLink size={10} />
              </a>
            ) : (
              <span className="text-gray-600">--</span>
            )}
          </div>
        </div>
        <div className="rounded-xl border border-navy-600/50 bg-navy-800/30 p-4">
          <div className="text-xs text-gray-500 mb-1">Assigned</div>
          <div className="text-sm text-white">
            {task.assigned_at
              ? new Date(task.assigned_at).toLocaleDateString()
              : "--"}
          </div>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <div className="rounded-xl border border-navy-600/50 bg-navy-800/30 p-6 mb-8">
          <h2 className="font-display text-lg font-semibold text-white mb-3">
            Description
          </h2>
          <p className="text-sm text-gray-300 whitespace-pre-wrap">
            {task.description}
          </p>
        </div>
      )}

      {/* Run History */}
      <div className="rounded-xl border border-navy-600/50 bg-navy-800/30">
        <div className="px-6 py-4 border-b border-navy-700/30">
          <h2 className="font-display text-lg font-semibold text-white">
            Run History ({task.runs.length})
          </h2>
        </div>
        {task.runs.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-gray-500">
            No runs yet.
          </div>
        ) : (
          <div className="divide-y divide-navy-700/30">
            {task.runs.map((run: AgentRun) => (
              <div key={run.id} className="px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-gray-400">
                    {run.id.slice(0, 8)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {run.started_at
                      ? new Date(run.started_at).toLocaleString()
                      : "--"}
                  </span>
                </div>
                <div className="flex gap-6 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Zap size={12} className="text-electric" />
                    {run.tokens_used.toLocaleString()} tokens
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign size={12} className="text-green-400" />$
                    {run.cost_estimate.toFixed(4)}
                  </span>
                  {run.pr_url && (
                    <a
                      href={run.pr_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-electric hover:underline"
                    >
                      PR <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
