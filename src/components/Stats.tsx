"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const stats = [
  {
    value: "4",
    label: "LLM calls per task",
    detail: "Lean, focused architecture",
  },
  {
    value: "<60s",
    label: "Per pull request",
    detail: "From ticket to code",
  },
  {
    value: "<$0.05",
    label: "Per PR generated",
    detail: "Pennies, not dollars",
  },
  {
    value: "3 PRs",
    label: "In 2.5 minutes",
    detail: "Real test results",
  },
];

export default function Stats() {
  return (
    <section className="relative py-24 sm:py-32 border-y border-navy-700/30">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-navy-950 to-navy-900/50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-mono text-forge tracking-wider uppercase mb-3">
            Real numbers
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Built for speed and efficiency
          </h2>
          <p className="mt-4 text-gray-400 max-w-lg mx-auto">
            These aren&apos;t projections. These are real results from our test runs.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.label} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="relative text-center p-6 sm:p-8 rounded-xl border border-navy-600/30 bg-navy-800/20"
              >
                <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-gray-300">
                  {stat.label}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {stat.detail}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
