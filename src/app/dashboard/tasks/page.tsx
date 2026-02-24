"use client";

import { ListTodo } from "lucide-react";
import DataTable from "@/components/dashboard/DataTable";
import EmptyState from "@/components/dashboard/EmptyState";

const columns = [
  { key: "taskId", label: "Task ID" },
  { key: "source", label: "Source" },
  { key: "title", label: "Title" },
  { key: "status", label: "Status" },
  { key: "prLink", label: "PR" },
  { key: "cost", label: "Cost" },
  { key: "created", label: "Created" },
];

export default function TasksPage() {
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

      <DataTable
        columns={columns}
        data={[]}
        emptyState={
          <EmptyState
            icon={ListTodo}
            title="No tasks yet"
            description="Once PatchForge picks up a Jira ticket, it'll appear here with its status and PR link."
          />
        }
      />
    </div>
  );
}
