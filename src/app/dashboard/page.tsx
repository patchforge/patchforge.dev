"use client";

import { useUser } from "@clerk/nextjs";
import {
  GitPullRequest,
  CheckCircle2,
  Coins,
  DollarSign,
  ExternalLink,
  Circle,
  Activity,
} from "lucide-react";
import Link from "next/link";
import StatsCard from "@/components/dashboard/StatsCard";
import EmptyState from "@/components/dashboard/EmptyState";

const checklist = [
  {
    label: "Connect Jira",
    href: "/dashboard/integrations",
    done: false,
  },
  {
    label: "Install GitHub App",
    href: "/dashboard/integrations",
    done: false,
  },
  {
    label: "Enable a repository",
    href: "/dashboard/repositories",
    done: false,
  },
  {
    label: "Create your first task",
    href: null,
    done: false,
    hint: "Add the patchforge label to a Jira ticket",
  },
];

export default function DashboardPage() {
  const { user } = useUser();
  const firstName = user?.firstName || "there";

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-gray-500">
          Here&apos;s an overview of your PatchForge activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={GitPullRequest} label="PRs Opened" value="0" trend="All time" />
        <StatsCard icon={CheckCircle2} label="Tasks Completed" value="0" trend="All time" />
        <StatsCard icon={Coins} label="Tokens Used" value="0" trend="This month" />
        <StatsCard icon={DollarSign} label="Cost Saved" value="$0" trend="Estimated" />
      </div>

      {/* Get Started checklist */}
      <div className="rounded-xl border border-navy-600/50 bg-navy-800/30 p-6 mb-8">
        <h2 className="font-display text-lg font-semibold text-white mb-4">
          Get Started
        </h2>
        <div className="space-y-3">
          {checklist.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <Circle
                size={18}
                className={item.done ? "text-green-400 fill-green-400" : "text-navy-600"}
              />
              <div className="flex-1">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-electric transition-colors inline-flex items-center gap-1.5"
                  >
                    {item.label}
                    <ExternalLink size={12} className="text-gray-600" />
                  </Link>
                ) : (
                  <span className="text-sm text-gray-300">{item.label}</span>
                )}
                {item.hint && (
                  <p className="text-xs text-gray-600 mt-0.5">{item.hint}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-navy-600/50 bg-navy-800/30">
        <div className="px-6 py-4 border-b border-navy-700/30">
          <h2 className="font-display text-lg font-semibold text-white">
            Recent Activity
          </h2>
        </div>
        <EmptyState
          icon={Activity}
          title="No activity yet"
          description="Connect your tools to get started. Once PatchForge picks up a ticket, activity will appear here."
          actionLabel="Connect Integrations"
          actionHref="/dashboard/integrations"
        />
      </div>
    </div>
  );
}
