"use client";

import {
  Ticket,
  GitPullRequest,
  MessageSquare,
  Zap,
  ShieldCheck,
  Layers,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const features = [
  {
    icon: Ticket,
    title: "Jira Integration",
    description:
      "Label a ticket with patchforge and it picks it up automatically. Works with your existing Jira workflow — no plugins required.",
    badge: null,
  },
  {
    icon: GitPullRequest,
    title: "GitHub PRs",
    description:
      "Opens draft pull requests with structured descriptions, implementation notes, and clear diffs. Ready for your review.",
    badge: null,
  },
  {
    icon: MessageSquare,
    title: "Clarification Loop",
    description:
      "If the ticket is ambiguous, PatchForge asks clarifying questions in the Jira comments before writing code. No guessing.",
    badge: null,
  },
  {
    icon: Zap,
    title: "Hotfix Mode",
    description:
      "P0 issues get immediate PRs — no questions asked, no waiting. Critical bugs get fixed as fast as the code can be written.",
    badge: "forge",
  },
  {
    icon: ShieldCheck,
    title: "Self-Review",
    description:
      "PatchForge reviews its own code before opening the PR. Catches bugs, style issues, and logical errors before you even see them.",
    badge: null,
  },
  {
    icon: Layers,
    title: "Azure DevOps",
    description:
      "Also supports Azure Boards and Azure Repos out of the box. Linear and GitHub Issues support coming soon.",
    badge: "coming",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-forge/[0.03] rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-mono text-electric tracking-wider uppercase mb-3">
            Features
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Everything your AI teammate needs
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            PatchForge handles the full lifecycle — from understanding the ticket to delivering reviewable code.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 0.1}>
              <Card className="h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-700/50 text-electric">
                    <feature.icon size={20} />
                  </div>
                  {feature.badge === "forge" && (
                    <Badge variant="forge">Hot</Badge>
                  )}
                  {feature.badge === "coming" && (
                    <Badge>Coming Soon</Badge>
                  )}
                </div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
