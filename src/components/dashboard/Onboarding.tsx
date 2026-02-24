"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Copy,
  Check,
  Loader2,
  Ticket,
  Github,
  Rocket,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { useAPI } from "@/hooks/useAPI";
import { useToast } from "@/components/dashboard/Toast";
import { ApiError } from "@/lib/api";
import type { CreateOrgResponse } from "@/lib/types";

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  { num: 1, label: "Create Org" },
  { num: 2, label: "Jira" },
  { num: 3, label: "GitHub" },
  { num: 4, label: "Done" },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const api = useAPI();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1 state
  const [orgName, setOrgName] = useState("");
  const [createdOrg, setCreatedOrg] = useState<CreateOrgResponse | null>(null);
  const [keyCopied, setKeyCopied] = useState(false);

  // Step 2 state
  const [jiraDomain, setJiraDomain] = useState("");
  const [jiraEmail, setJiraEmail] = useState("");
  const [jiraToken, setJiraToken] = useState("");

  // Step 3 state
  const [installationId, setInstallationId] = useState("");

  const handleCreateOrg = async () => {
    if (!orgName.trim()) {
      showToast("Please enter an organization name.", "error");
      return;
    }
    setLoading(true);
    try {
      const result = await api.createOrg({ name: orgName.trim() });
      setCreatedOrg(result);
      showToast("Organization created!", "success");
    } catch (err) {
      showToast(
        err instanceof ApiError ? err.detail : "Failed to create organization.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyKey = () => {
    if (createdOrg?.api_key) {
      navigator.clipboard.writeText(createdOrg.api_key);
      setKeyCopied(true);
      setTimeout(() => setKeyCopied(false), 2000);
    }
  };

  const handleConnectJira = async () => {
    if (!jiraDomain || !jiraEmail || !jiraToken) {
      showToast("Please fill in all Jira fields.", "error");
      return;
    }
    setLoading(true);
    try {
      await api.connectJira({
        jira_domain: jiraDomain,
        jira_email: jiraEmail,
        jira_api_token: jiraToken,
      });
      showToast("Jira connected!", "success");
      setStep(3);
    } catch (err) {
      showToast(
        err instanceof ApiError ? err.detail : "Failed to connect Jira.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConnectGitHub = async () => {
    const id = parseInt(installationId, 10);
    if (isNaN(id)) {
      showToast("Please enter a valid installation ID.", "error");
      return;
    }
    setLoading(true);
    try {
      await api.connectGitHub({ installation_id: id });
      showToast("GitHub connected!", "success");
      setStep(4);
    } catch (err) {
      showToast(
        err instanceof ApiError ? err.detail : "Failed to connect GitHub.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg bg-navy-900/80 border border-navy-600/50 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric/40 transition-all";

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-6">
      <div className="w-full max-w-lg">
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                  step > s.num
                    ? "bg-green-500 text-white"
                    : step === s.num
                    ? "bg-electric text-navy-950"
                    : "bg-navy-700 text-gray-400"
                }`}
              >
                {step > s.num ? <CheckCircle2 size={16} /> : s.num}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    step > s.num ? "bg-green-500" : "bg-navy-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-navy-600/50 bg-navy-800/30 p-8">
          {/* Step 1: Create Organization */}
          {step === 1 && !createdOrg && (
            <>
              <h2 className="font-display text-xl font-bold text-white mb-2">
                Create your organization
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                This is where your team&apos;s PatchForge settings, repos, and
                tasks will live.
              </p>
              <div className="mb-6">
                <label className="block text-xs text-gray-400 mb-1.5">
                  Organization Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Acme Corp"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className={inputClass}
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleCreateOrg()}
                />
              </div>
              <Button
                onClick={handleCreateOrg}
                disabled={loading}
                className="w-full gap-2"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                Create Organization
              </Button>
            </>
          )}

          {/* Step 1b: Show API key after creation */}
          {step === 1 && createdOrg && (
            <>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={20} className="text-green-400" />
                <h2 className="font-display text-xl font-bold text-white">
                  Organization created!
                </h2>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Your default API key has been generated. Save it now — you
                won&apos;t see it again.
              </p>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-navy-900 border border-navy-600/50 mb-6">
                <code className="flex-1 text-sm text-electric font-mono break-all">
                  {createdOrg.api_key}
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
              <Button onClick={() => setStep(2)} className="w-full">
                Continue Setup
              </Button>
            </>
          )}

          {/* Step 2: Connect Jira */}
          {step === 2 && (
            <>
              <div className="flex items-center gap-3 mb-2">
                <Ticket size={20} className="text-electric" />
                <h2 className="font-display text-xl font-bold text-white">
                  Connect Jira Cloud
                </h2>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                PatchForge picks up tickets with the{" "}
                <code className="text-electric">patchforge</code> label.
              </p>
              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">
                    Jira Domain
                  </label>
                  <input
                    type="text"
                    placeholder="your-team.atlassian.net"
                    value={jiraDomain}
                    onChange={(e) => setJiraDomain(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={jiraEmail}
                    onChange={(e) => setJiraEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">
                    API Token{" "}
                    <a
                      href="https://id.atlassian.com/manage-profile/security/api-tokens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-electric hover:underline"
                    >
                      (Get one here)
                    </a>
                  </label>
                  <input
                    type="password"
                    placeholder="Your Jira API token"
                    value={jiraToken}
                    onChange={(e) => setJiraToken(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setStep(3)}
                  className="flex-1"
                >
                  Skip for now
                </Button>
                <Button
                  onClick={handleConnectJira}
                  disabled={loading}
                  className="flex-1 gap-2"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  Connect Jira
                </Button>
              </div>
            </>
          )}

          {/* Step 3: Connect GitHub */}
          {step === 3 && (
            <>
              <div className="flex items-center gap-3 mb-2">
                <Github size={20} className="text-electric" />
                <h2 className="font-display text-xl font-bold text-white">
                  Connect GitHub
                </h2>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Install the PatchForge GitHub App on your organization, then
                enter the installation ID below.
              </p>
              <a
                href="https://github.com/apps/patchforge-dev/installations/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-electric hover:underline mb-4"
              >
                <Github size={14} />
                Install PatchForge GitHub App
              </a>
              <div className="mb-6">
                <label className="block text-xs text-gray-400 mb-1.5">
                  Installation ID
                </label>
                <input
                  type="text"
                  placeholder="e.g., 12345678"
                  value={installationId}
                  onChange={(e) => setInstallationId(e.target.value)}
                  className={inputClass}
                />
                <p className="text-xs text-gray-600 mt-1">
                  Found in the URL after installing:{" "}
                  <code className="text-gray-500">
                    github.com/settings/installations/
                    <span className="text-electric">ID</span>
                  </code>
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setStep(4)}
                  className="flex-1"
                >
                  Skip for now
                </Button>
                <Button
                  onClick={handleConnectGitHub}
                  disabled={loading}
                  className="flex-1 gap-2"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  Connect GitHub
                </Button>
              </div>
            </>
          )}

          {/* Step 4: Done */}
          {step === 4 && (
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 mx-auto mb-4">
                <Rocket size={28} />
              </div>
              <h2 className="font-display text-xl font-bold text-white mb-2">
                You&apos;re all set!
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Add the{" "}
                <code className="text-electric font-mono">patchforge</code>{" "}
                label to any Jira issue to get started. PatchForge will pick it
                up, write the code, and open a PR.
              </p>
              <Button onClick={onComplete} className="gap-2">
                Go to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
