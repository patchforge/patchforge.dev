"use client";

import { motion } from "framer-motion";
import { Tag, Cpu, GitPullRequest, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const steps = [
  {
    number: "01",
    icon: Tag,
    title: "Label your ticket",
    description:
      'Add the patchforge label to any Jira issue. That\'s the trigger. No setup, no configuration — just one label.',
    color: "electric" as const,
  },
  {
    number: "02",
    icon: Cpu,
    title: "PatchForge writes the code",
    description:
      "It analyzes your codebase, understands the context, plans the implementation, generates code, and self-reviews it — all autonomously.",
    color: "forge" as const,
  },
  {
    number: "03",
    icon: GitPullRequest,
    title: "Review the PR",
    description:
      "A draft pull request appears on GitHub with a structured description. Your developer reviews, tweaks if needed, and merges.",
    color: "electric" as const,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-electric/[0.03] rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16 sm:mb-20">
          <p className="text-sm font-mono text-electric tracking-wider uppercase mb-3">
            How it works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Three steps. Zero complexity.
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            PatchForge integrates directly with your existing workflow. No new tools to learn, no processes to change.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 0.15}>
              <div className="relative group h-full">
                {/* Connector arrow (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-12 -right-4 lg:-right-5 z-10 text-navy-600">
                    <ArrowRight size={20} />
                  </div>
                )}

                <div className="relative h-full rounded-xl border border-navy-600/50 bg-navy-800/30 p-6 lg:p-8 transition-all duration-300 hover:border-navy-600 hover:bg-navy-800/50">
                  {/* Step number */}
                  <span className={`font-mono text-xs tracking-wider ${
                    step.color === "electric" ? "text-electric/50" : "text-forge/50"
                  }`}>
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className={`mt-4 inline-flex items-center justify-center w-12 h-12 rounded-lg ${
                    step.color === "electric"
                      ? "bg-electric/10 text-electric"
                      : "bg-forge/10 text-forge"
                  }`}>
                    <step.icon size={24} />
                  </div>

                  {/* Content */}
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Visual flow */}
        <AnimatedSection delay={0.5} className="mt-12 sm:mt-16">
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-sm font-mono">
            <motion.span
              className="px-3 py-1.5 rounded-lg bg-navy-800 border border-navy-600/50 text-gray-400"
              whileHover={{ scale: 1.05 }}
            >
              Jira Ticket
            </motion.span>
            <ArrowRight size={16} className="text-electric/50" />
            <motion.span
              className="px-3 py-1.5 rounded-lg bg-electric/10 border border-electric/20 text-electric"
              whileHover={{ scale: 1.05 }}
            >
              PatchForge
            </motion.span>
            <ArrowRight size={16} className="text-electric/50" />
            <motion.span
              className="px-3 py-1.5 rounded-lg bg-navy-800 border border-navy-600/50 text-gray-400"
              whileHover={{ scale: 1.05 }}
            >
              GitHub PR
            </motion.span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
