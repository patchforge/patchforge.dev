"use client";

import { useState } from "react";
import { GitFork, Plus, Trash2, Loader2 } from "lucide-react";
import EmptyState from "@/components/dashboard/EmptyState";
import ErrorState from "@/components/dashboard/ErrorState";
import { Skeleton } from "@/components/dashboard/Skeleton";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useRepos } from "@/hooks/useRepos";
import { useOrg } from "@/hooks/useOrg";
import { useAPI } from "@/hooks/useAPI";
import { useToast } from "@/components/dashboard/Toast";
import { ApiError } from "@/lib/api";

const statusColors: Record<string, string> = {
  READY: "bg-green-500/10 text-green-400 border-green-500/20",
  PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  INDEXING: "bg-electric/10 text-electric border-electric/20",
  FAILED: "bg-red-500/10 text-red-400 border-red-500/20",
  STALE: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export default function RepositoriesPage() {
  const api = useAPI();
  const { showToast } = useToast();
  const { org } = useOrg();
  const { repos, error, isLoading, mutate } = useRepos();
  const [repoInput, setRepoInput] = useState("");
  const [enabling, setEnabling] = useState(false);
  const [disabling, setDisabling] = useState<string | null>(null);

  const handleEnable = async () => {
    const parts = repoInput.trim().split("/");
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      showToast("Enter repository as owner/repo", "error");
      return;
    }
    setEnabling(true);
    try {
      await api.enableRepo(parts[0], parts[1]);
      showToast("Repository enabled!", "success");
      setRepoInput("");
      mutate();
    } catch (err) {
      showToast(
        err instanceof ApiError ? err.detail : "Failed to enable repository.",
        "error"
      );
    } finally {
      setEnabling(false);
    }
  };

  const handleDisable = async (githubUrl: string) => {
    // Extract owner/repo from github URL
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return;
    setDisabling(githubUrl);
    try {
      await api.disableRepo(match[1], match[2]);
      showToast("Repository disabled.", "success");
      mutate();
    } catch (err) {
      showToast(
        err instanceof ApiError ? err.detail : "Failed to disable repository.",
        "error"
      );
    } finally {
      setDisabling(null);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Repositories
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage which repositories PatchForge can access.
          </p>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3">
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-16" />
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="rounded-xl border border-navy-600/50 bg-navy-800/30">
          <ErrorState message={error.message} onRetry={() => mutate()} />
        </div>
      )}

      {/* Not connected */}
      {!isLoading && !error && !org?.github_connected && (
        <div className="rounded-xl border border-navy-600/50 bg-navy-800/30">
          <EmptyState
            icon={GitFork}
            title="No repositories connected"
            description="Connect GitHub to see your repositories and enable PatchForge on them."
            actionLabel="Connect GitHub"
            actionHref="/dashboard/integrations"
          />
        </div>
      )}

      {/* Connected */}
      {!isLoading && !error && org?.github_connected && (
        <>
          {/* Enable repo form */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="owner/repo (e.g., acme/api-server)"
              value={repoInput}
              onChange={(e) => setRepoInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEnable()}
              className="flex-1 px-3 py-2 rounded-lg bg-navy-900/80 border border-navy-600/50 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric/40 transition-all"
            />
            <Button
              size="sm"
              onClick={handleEnable}
              disabled={enabling}
              className="gap-2"
            >
              {enabling ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Plus size={14} />
              )}
              Enable
            </Button>
          </div>

          {/* Repo list */}
          {repos.length === 0 ? (
            <div className="rounded-xl border border-navy-600/50 bg-navy-800/30">
              <EmptyState
                icon={GitFork}
                title="No repositories enabled"
                description="Enable a repository above to let PatchForge work on it."
              />
            </div>
          ) : (
            <div className="space-y-3">
              {repos.map((repo) => {
                const match = repo.github_url.match(
                  /github\.com\/([^/]+\/[^/]+)/
                );
                const displayName = match ? match[1] : repo.github_url;

                return (
                  <div
                    key={repo.id}
                    className="flex items-center justify-between px-5 py-4 rounded-xl border border-navy-600/50 bg-navy-800/30 hover:border-navy-600 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <GitFork size={18} className="text-electric shrink-0" />
                      <div className="min-w-0">
                        <a
                          href={repo.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-white font-medium hover:text-electric transition-colors"
                        >
                          {displayName}
                        </a>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-500">
                            {repo.default_branch}
                          </span>
                          <Badge
                            className={
                              statusColors[repo.index_status] ?? ""
                            }
                          >
                            {repo.index_status.toLowerCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDisable(repo.github_url)}
                      disabled={disabling === repo.github_url}
                      className="text-gray-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                    >
                      {disabling === repo.github_url ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
