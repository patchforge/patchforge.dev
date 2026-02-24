"use client";

import { useState } from "react";
import { Ticket, Github, Layers, Loader2 } from "lucide-react";
import IntegrationCard from "@/components/dashboard/IntegrationCard";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/dashboard/Toast";
import { useOrg } from "@/hooks/useOrg";
import { useAPI } from "@/hooks/useAPI";
import { ApiError } from "@/lib/api";
import type { OrgResponse } from "@/lib/types";
import type { KeyedMutator } from "swr";

export default function IntegrationsPage() {
  const { showToast } = useToast();
  const { org, mutate: orgMutate } = useOrg();

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">
          Integrations
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Connect your tools so PatchForge can pick up tickets and open pull
          requests.
        </p>
      </div>

      <div className="space-y-4">
        <JiraCard
          showToast={showToast}
          org={org}
          orgMutate={orgMutate}
        />
        <GitHubCard
          showToast={showToast}
          org={org}
          orgMutate={orgMutate}
        />

        <IntegrationCard
          icon={Layers}
          name="Azure DevOps"
          description="Azure Boards + Azure Repos"
          connected={false}
          disabled
          statusLabel="Coming Soon"
        />
      </div>
    </div>
  );
}

function JiraCard({
  showToast,
  org,
  orgMutate,
}: {
  showToast: (msg: string, type?: "info" | "success" | "error") => void;
  org: OrgResponse | undefined;
  orgMutate: KeyedMutator<OrgResponse>;
}) {
  const api = useAPI();
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    if (!domain || !email || !apiToken) {
      showToast("Please fill in all fields.", "error");
      return;
    }
    setLoading(true);
    try {
      const result = await api.connectJira({
        jira_domain: domain,
        jira_email: email,
        jira_api_token: apiToken,
      });
      showToast(`Jira connected to ${result.jira_domain}!`, "success");
      orgMutate();
    } catch (err) {
      showToast(
        err instanceof ApiError ? err.detail : "Failed to connect Jira.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setLoading(true);
    try {
      await api.disconnectJira();
      showToast("Jira disconnected.", "success");
      orgMutate();
    } catch (err) {
      showToast(
        err instanceof ApiError ? err.detail : "Failed to disconnect Jira.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg bg-navy-900/80 border border-navy-600/50 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric/40 transition-all";

  return (
    <IntegrationCard
      icon={Ticket}
      name="Jira Cloud"
      description="Pick up tickets with the patchforge label"
      connected={org?.jira_connected ?? false}
    >
      {org?.jira_connected ? (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Connected
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDisconnect}
            disabled={loading}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-2"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            Disconnect
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">
              Jira Domain
            </label>
            <input
              type="text"
              placeholder="your-team.atlassian.net"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Email</label>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              className={inputClass}
            />
          </div>
          <Button size="sm" onClick={handleConnect} disabled={loading} className="gap-2">
            {loading && <Loader2 size={14} className="animate-spin" />}
            Connect Jira
          </Button>
        </div>
      )}
    </IntegrationCard>
  );
}

function GitHubCard({
  showToast,
  org,
  orgMutate,
}: {
  showToast: (msg: string, type?: "info" | "success" | "error") => void;
  org: OrgResponse | undefined;
  orgMutate: KeyedMutator<OrgResponse>;
}) {
  const api = useAPI();
  const [installationId, setInstallationId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    const id = parseInt(installationId, 10);
    if (isNaN(id)) {
      showToast("Please enter a valid installation ID.", "error");
      return;
    }
    setLoading(true);
    try {
      await api.connectGitHub({ installation_id: id });
      showToast("GitHub connected!", "success");
      orgMutate();
    } catch (err) {
      showToast(
        err instanceof ApiError ? err.detail : "Failed to connect GitHub.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setLoading(true);
    try {
      await api.disconnectGitHub();
      showToast("GitHub disconnected.", "success");
      orgMutate();
    } catch (err) {
      showToast(
        err instanceof ApiError ? err.detail : "Failed to disconnect GitHub.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <IntegrationCard
      icon={Github}
      name="GitHub"
      description="Open draft PRs on your repositories"
      connected={org?.github_connected ?? false}
    >
      {org?.github_connected ? (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Connected
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDisconnect}
            disabled={loading}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-2"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            Disconnect
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <a
            href="https://github.com/apps/patchforge-dev/installations/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-electric hover:underline"
          >
            <Github size={14} />
            Install PatchForge GitHub App
          </a>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">
              Installation ID
            </label>
            <input
              type="text"
              placeholder="e.g., 12345678"
              value={installationId}
              onChange={(e) => setInstallationId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-navy-900/80 border border-navy-600/50 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric/40 transition-all"
            />
            <p className="text-xs text-gray-600 mt-1">
              Found in the URL after installing the app.
            </p>
          </div>
          <Button size="sm" onClick={handleConnect} disabled={loading} className="gap-2">
            {loading && <Loader2 size={14} className="animate-spin" />}
            Connect GitHub
          </Button>
        </div>
      )}
    </IntegrationCard>
  );
}
