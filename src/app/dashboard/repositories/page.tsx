"use client";

import { GitFork } from "lucide-react";
import EmptyState from "@/components/dashboard/EmptyState";

export default function RepositoriesPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Repositories</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage which repositories PatchForge can access.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-navy-600/50 bg-navy-800/30">
        <EmptyState
          icon={GitFork}
          title="No repositories connected"
          description="Connect GitHub to see your repositories and enable PatchForge on them."
          actionLabel="Connect GitHub"
          actionHref="/dashboard/integrations"
        />
      </div>
    </div>
  );
}
