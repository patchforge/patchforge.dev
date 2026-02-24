"use client";

import { useState } from "react";
import { Key, Plus, Trash2, X } from "lucide-react";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/dashboard/EmptyState";
import { useToast } from "@/components/dashboard/Toast";

export default function ApiKeysPage() {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [keyName, setKeyName] = useState("");

  const handleCreate = () => {
    if (!keyName.trim()) {
      showToast("Please enter a name for the API key.", "error");
      return;
    }
    showToast("Backend integration coming soon. API key creation will be available once the API is ready.", "info");
    setKeyName("");
    setModalOpen(false);
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">API Keys</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage API keys for programmatic access to PatchForge.
          </p>
        </div>
        <Button size="sm" className="gap-2" onClick={() => setModalOpen(true)}>
          <Plus size={14} />
          Create Key
        </Button>
      </div>

      <div className="rounded-xl border border-navy-600/50 bg-navy-800/30">
        <EmptyState
          icon={Key}
          title="No API keys"
          description="Create an API key to access PatchForge programmatically."
        />
      </div>

      {/* Create modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-xl border border-navy-600/50 bg-navy-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-white">
                Create API Key
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-xs text-gray-400 mb-1.5">Key Name</label>
              <input
                type="text"
                placeholder="e.g., Production, CI/CD Pipeline"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-navy-800/80 border border-navy-600/50 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric/40 transition-all"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleCreate}>
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
