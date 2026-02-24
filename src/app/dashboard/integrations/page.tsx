"use client";

import { useState } from "react";
import { Ticket, Github, Layers } from "lucide-react";
import IntegrationCard from "@/components/dashboard/IntegrationCard";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/dashboard/Toast";

export default function IntegrationsPage() {
  const { showToast } = useToast();

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Integrations</h1>
        <p className="mt-1 text-sm text-gray-500">
          Connect your tools so PatchForge can pick up tickets and open pull requests.
        </p>
      </div>

      <div className="space-y-4">
        <JiraCard showToast={showToast} />
        <GitHubCard showToast={showToast} />

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

function JiraCard({ showToast }: { showToast: (msg: string, type?: "info" | "success" | "error") => void }) {
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [apiToken, setApiToken] = useState("");

  const handleConnect = () => {
    if (!domain || !email || !apiToken) {
      showToast("Please fill in all fields.", "error");
      return;
    }
    showToast("Backend integration coming soon. Your settings will be saved once the API is ready.", "info");
  };

  return (
    <IntegrationCard
      icon={Ticket}
      name="Jira Cloud"
      description="Pick up tickets with the patchforge label"
      connected={false}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Jira Domain</label>
          <input
            type="text"
            placeholder="your-team.atlassian.net"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-navy-900/80 border border-navy-600/50 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric/40 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Email</label>
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-navy-900/80 border border-navy-600/50 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric/40 transition-all"
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
            className="w-full px-3 py-2 rounded-lg bg-navy-900/80 border border-navy-600/50 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric/40 transition-all"
          />
        </div>
        <Button size="sm" onClick={handleConnect}>
          Connect Jira
        </Button>
      </div>
    </IntegrationCard>
  );
}

function GitHubCard({ showToast }: { showToast: (msg: string, type?: "info" | "success" | "error") => void }) {
  const handleInstall = () => {
    showToast("Backend integration coming soon. GitHub App installation will be available once the API is ready.", "info");
  };

  return (
    <IntegrationCard
      icon={Github}
      name="GitHub"
      description="Open draft PRs on your repositories"
      connected={false}
    >
      <Button size="sm" onClick={handleInstall}>
        Install GitHub App
      </Button>
    </IntegrationCard>
  );
}
