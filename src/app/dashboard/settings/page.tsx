"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/dashboard/Toast";

export default function SettingsPage() {
  const { showToast } = useToast();
  const [orgName, setOrgName] = useState("");
  const [confidence, setConfidence] = useState(0.7);
  const [maxConcurrent, setMaxConcurrent] = useState(3);
  const [autoMerge, setAutoMerge] = useState(false);
  const [label, setLabel] = useState("patchforge");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleSave = () => {
    showToast(
      "Backend integration coming soon. Your settings will be saved once the API is ready.",
      "info"
    );
  };

  const handleDelete = () => {
    showToast(
      "Backend integration coming soon. Organization deletion will be available once the API is ready.",
      "info"
    );
    setDeleteConfirm(false);
  };

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Configure how PatchForge operates on your repositories.
        </p>
      </div>

      <div className="space-y-6">
        {/* General settings */}
        <div className="rounded-xl border border-navy-600/50 bg-navy-800/30 p-6">
          <h2 className="font-display text-lg font-semibold text-white mb-4">
            General
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">
                Organization Name
              </label>
              <input
                type="text"
                placeholder="My Organization"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-navy-900/80 border border-navy-600/50 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric/40 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">
                PatchForge Label
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-navy-900/80 border border-navy-600/50 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric/40 transition-all"
              />
              <p className="text-xs text-gray-600 mt-1">
                The Jira label that triggers PatchForge.
              </p>
            </div>
          </div>
        </div>

        {/* Behavior settings */}
        <div className="rounded-xl border border-navy-600/50 bg-navy-800/30 p-6">
          <h2 className="font-display text-lg font-semibold text-white mb-4">
            Behavior
          </h2>
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-400">
                  Confidence Threshold
                </label>
                <span className="text-sm font-mono text-electric">
                  {confidence.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.05"
                value={confidence}
                onChange={(e) => setConfidence(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-navy-700 rounded-full appearance-none cursor-pointer accent-electric"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>0.50 (more attempts)</span>
                <span>1.00 (only confident)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-400">
                  Max Concurrent Tasks
                </label>
                <span className="text-sm font-mono text-electric">
                  {maxConcurrent}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={maxConcurrent}
                onChange={(e) => setMaxConcurrent(parseInt(e.target.value))}
                className="w-full h-1.5 bg-navy-700 rounded-full appearance-none cursor-pointer accent-electric"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm text-gray-400">Auto-merge PRs</label>
                <p className="text-xs text-gray-600 mt-0.5">
                  Automatically merge PRs when all checks pass.
                </p>
              </div>
              <button
                onClick={() => setAutoMerge(!autoMerge)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                  autoMerge ? "bg-electric" : "bg-navy-600"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                    autoMerge ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Settings</Button>
        </div>

        {/* Danger zone */}
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
          <h2 className="font-display text-lg font-semibold text-red-400 mb-2">
            Danger Zone
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Permanently delete your organization and all associated data. This
            action cannot be undone.
          </p>
          {!deleteConfirm ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20"
              onClick={() => setDeleteConfirm(true)}
            >
              Delete Organization
            </Button>
          ) : (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertTriangle size={18} className="text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-300 flex-1">
                Are you sure? This cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
