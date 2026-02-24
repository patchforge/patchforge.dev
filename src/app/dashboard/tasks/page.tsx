"use client";

import { useState } from "react";
import { ListTodo, ExternalLink } from "lucide-react";
import Link from "next/link";
import DataTable from "@/components/dashboard/DataTable";
import EmptyState from "@/components/dashboard/EmptyState";
import TaskStateBadge from "@/components/dashboard/TaskStateBadge";
import { Skeleton } from "@/components/dashboard/Skeleton";
import ErrorState from "@/components/dashboard/ErrorState";
import Button from "@/components/ui/Button";
import { useTasks } from "@/hooks/useTasks";
import { formatRelativeTime } from "@/lib/utils";
import type { TaskSummary } from "@/lib/types";

const PAGE_SIZE = 20;

const stateFilters = [
  { label: "All", value: "" },
  { label: "Assigned", value: "ASSIGNED" },
  { label: "Coding", value: "CODING" },
  { label: "PR Opened", value: "PR_OPENED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Failed", value: "FAILED" },
];

const columns = [
  {
    key: "id",
    label: "Task",
    render: (row: TaskSummary) => (
      <Link
        href={`/dashboard/tasks/${row.id}`}
        className="text-electric hover:underline font-mono text-xs"
      >
        {row.id.slice(0, 8)}...
      </Link>
    ),
  },
  {
    key: "source",
    label: "Source",
    render: (row: TaskSummary) => (
      <span className="capitalize text-gray-400 text-xs">
        {row.source.toLowerCase().replace(/_/g, " ")}
      </span>
    ),
  },
  {
    key: "title",
    label: "Title",
    render: (row: TaskSummary) => (
      <Link
        href={`/dashboard/tasks/${row.id}`}
        className="text-gray-300 hover:text-white transition-colors"
      >
        {row.title}
      </Link>
    ),
  },
  {
    key: "state",
    label: "Status",
    render: (row: TaskSummary) => <TaskStateBadge state={row.state} />,
  },
  {
    key: "pr_url",
    label: "PR",
    render: (row: TaskSummary) =>
      row.pr_url ? (
        <a
          href={row.pr_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-electric hover:underline text-xs inline-flex items-center gap-1"
        >
          View <ExternalLink size={10} />
        </a>
      ) : (
        <span className="text-gray-600">--</span>
      ),
  },
  {
    key: "assigned_at",
    label: "Created",
    render: (row: TaskSummary) => (
      <span className="text-gray-500 text-xs">
        {row.assigned_at ? formatRelativeTime(row.assigned_at) : "--"}
      </span>
    ),
  },
];

export default function TasksPage() {
  const [stateFilter, setStateFilter] = useState("");
  const [offset, setOffset] = useState(0);

  const { tasks, error, isLoading, mutate } = useTasks({
    state: stateFilter || undefined,
    limit: PAGE_SIZE,
    offset,
  });

  const totalPages = tasks ? Math.ceil(tasks.total / PAGE_SIZE) : 0;
  const currentPage = Math.floor(offset / PAGE_SIZE) + 1;

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Tasks</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track all tasks PatchForge has picked up.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {stateFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => {
              setStateFilter(f.value);
              setOffset(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              stateFilter === f.value
                ? "bg-electric/10 text-electric border border-electric/20"
                : "bg-navy-800/50 text-gray-400 border border-navy-600/50 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="rounded-xl border border-navy-600/50 bg-navy-800/30 p-8">
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-10" />
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="rounded-xl border border-navy-600/50 bg-navy-800/30">
          <ErrorState message={error.message} onRetry={() => mutate()} />
        </div>
      )}

      {/* Data */}
      {!isLoading && !error && (
        <>
          <DataTable
            columns={columns}
            data={(tasks?.tasks ?? []) as (TaskSummary & Record<string, unknown>)[]}
            emptyState={
              <EmptyState
                icon={ListTodo}
                title="No tasks yet"
                description="Once PatchForge picks up a Jira ticket, it'll appear here with its status and PR link."
              />
            }
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-gray-500">
                Page {currentPage} of {totalPages} ({tasks?.total} total)
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={offset === 0}
                  onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
                >
                  Previous
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setOffset(offset + PAGE_SIZE)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
