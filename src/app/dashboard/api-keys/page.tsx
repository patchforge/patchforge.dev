"use client";

import { useState } from "react";
import { Key, Plus, Trash2, X, Copy, Check, Loader2, AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/dashboard/EmptyState";
import ErrorState from "@/components/dashboard/ErrorState";
import { Skeleton } from "@/components/dashboard/Skeleton";
import { useToast } from "@/components/dashboard/Toast";
import { useAPIKeys } from "@/hooks/useAPIKeys";
import { useAPI } from "@/hooks/useAPI";
import { ApiError } from "@/lib/api";
import type { CreateApiKeyResponse } from "@/lib/types";

export default function ApiKeysPage() {
  const api = useAPI();
  const { showToast } = useToast();
  const { keys, error, isLoading, mutate } = useAPIKeys();
  const [modalOpen, setModalOpen] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [creating, setCreating] = useState(false);
  const [createdKey, setCreatedKey] = useState<CreateApiKeyResponse | null>(null);
  const [keyCopied, setKeyCopied] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleCreate = async () => {
    if (!keyName.trim()) {
      showToast("Please enter a name for the API key.", "error");
      return;
    }
    setCreating(true);
    try {
      const result = await api.createApiKey({ name: keyName.trim() });
      setCreatedKey(result);
      mutate();
    } catch (err) {
      showToast(
        err instanceof ApiError ? err.detail : "Failed to create API key.",
        "error"
      );
    } finally {
      setCreating(false);
    }
  };

  const handleCopyKey = () => {
    if (createdKey?.key) {
      navigator.clipboard.writeText(createdKey.key);
      setKeyCopied(true);
      setTimeout(() => setKeyCopied(false), 2000);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setKeyName("");
    setCreatedKey(null);
    setKeyCopied(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.revokeApiKey(deleteId);
      showToast("API key revoked.", "success");
      setDeleteId(null);
      mutate();
    } catch (err) {
      showToast(
        err instanceof ApiError ? err.detail : "Failed to revoke API key.",
        "error"
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            API Keys
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage API keys for programmatic access to PatchForge.
          </p>
        </div>
        <Button
          size="sm"
          className="gap-2"
          onClick={() => setModalOpen(true)}
        >
          <Plus size={14} />
          Create Key
        </Button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3">
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

      {/* Keys list */}
      {!isLoading && !error && (
        <>
          {keys.length === 0 ? (
            <div className="rounded-xl border border-navy-600/50 bg-navy-800/30">
              <EmptyState
                icon={Key}
                title="No API keys"
                description="Create an API key to access PatchForge programmatically."
              />
            </div>
          ) : (
            <div className="rounded-xl border border-navy-600/50 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-600/50 bg-navy-800/30">
                    <th className="px-4 py-3 text-left font-medium text-gray-400 font-display text-xs uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-400 font-display text-xs uppercase tracking-wider">
                      Key
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-400 font-display text-xs uppercase tracking-wider">
                      Scopes
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-400 font-display text-xs uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-400 font-display text-xs uppercase tracking-wider">
                      Last Used
                    </th>
                    <th className="px-4 py-3 w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-700/30">
                  {keys.map((key) => (
                    <tr
                      key={key.id}
                      className="hover:bg-navy-800/20 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-300 font-medium">
                        {key.name}
                      </td>
                      <td className="px-4 py-3">
                        <code className="text-xs text-gray-500 font-mono">
                          {key.key_prefix}...
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {key.scopes.map((scope) => (
                            <Badge key={scope} variant="default">
                              {scope}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {key.created_at
                          ? new Date(key.created_at).toLocaleDateString()
                          : "--"}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {key.last_used_at
                          ? new Date(key.last_used_at).toLocaleDateString()
                          : "Never"}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setDeleteId(key.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors p-1 rounded"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Create modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={handleCloseModal}
          />
          <div className="relative w-full max-w-md rounded-xl border border-navy-600/50 bg-navy-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-white">
                {createdKey ? "API Key Created" : "Create API Key"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {createdKey ? (
              <>
                <p className="text-sm text-gray-400 mb-4">
                  Save this key now — you won&apos;t see it again.
                </p>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-navy-800 border border-navy-600/50 mb-4">
                  <code className="flex-1 text-sm text-electric font-mono break-all">
                    {createdKey.key}
                  </code>
                  <button
                    onClick={handleCopyKey}
                    className="shrink-0 p-1.5 rounded hover:bg-navy-700 transition-colors text-gray-400 hover:text-white"
                  >
                    {keyCopied ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
                <Button onClick={handleCloseModal} className="w-full">
                  Done
                </Button>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-xs text-gray-400 mb-1.5">
                    Key Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Production, CI/CD Pipeline"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-navy-800/80 border border-navy-600/50 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric/40 transition-all"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleCreate}
                    disabled={creating}
                    className="gap-2"
                  >
                    {creating && (
                      <Loader2 size={14} className="animate-spin" />
                    )}
                    Create
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDeleteId(null)}
          />
          <div className="relative w-full max-w-sm rounded-xl border border-navy-600/50 bg-navy-900 p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/10 text-red-400">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-white">
                  Revoke API Key
                </h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-500 hover:bg-red-600 text-white gap-2"
              >
                {deleting && <Loader2 size={14} className="animate-spin" />}
                Revoke
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
