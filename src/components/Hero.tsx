"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial gradient glow - electric */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-electric/[0.07] rounded-full blur-[120px]" />

      {/* Radial gradient glow - forge */}
      <div className="absolute top-32 right-0 w-[400px] h-[400px] bg-forge/[0.04] rounded-full blur-[100px]" />

      {/* Animated particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-electric/30 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Horizontal glow lines */}
      <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/10 to-transparent" />
      <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forge/5 to-transparent" />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="electric" className="mb-6">
            Early Access — Limited Spots
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]"
        >
          Assign a ticket.{" "}
          <br className="hidden sm:block" />
          Review a PR.{" "}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-electric via-electric-light to-electric bg-clip-text text-transparent">
            That&apos;s it.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          PatchForge is an autonomous AI software engineer that picks up your
          Jira tickets and opens pull requests on GitHub — so your team can
          focus on what matters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="#waitlist">
            <Button size="lg" className="gap-2">
              Join the Waitlist
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="secondary" size="lg">
              See How It Works
            </Button>
          </Link>
        </motion.div>

        {/* Terminal preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 sm:mt-20 mx-auto max-w-2xl"
        >
          <div className="rounded-xl border border-navy-600/50 bg-navy-900/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-electric/5">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-navy-700/50 bg-navy-900/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-gray-500 font-mono ml-2">patchforge status</span>
            </div>

            {/* Terminal content */}
            <div className="p-5 font-mono text-sm space-y-3 text-left">
              <TerminalLine emoji="🤖" delay={0.6}>
                PatchForge picked up <span className="text-electric">KAN-4</span>. Analyzing codebase...
              </TerminalLine>
              <TerminalLine emoji="📊" delay={1.0}>
                Analysis complete. <span className="text-green-400">95% confidence</span>. Planning implementation...
              </TerminalLine>
              <TerminalLine emoji="📋" delay={1.4}>
                Implementation plan: Create <span className="text-forge">utils.py</span> with 3 functions...
              </TerminalLine>
              <TerminalLine emoji="✅" delay={1.8}>
                Self-review passed. Code quality: <span className="text-green-400">A</span>
              </TerminalLine>
              <TerminalLine emoji="🚀" delay={2.2}>
                Draft PR opened: <span className="text-electric underline">patchforge/KAN-4-add-utils-module → main</span>
              </TerminalLine>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-16"
        >
          <Link
            href="#how-it-works"
            className="inline-flex flex-col items-center text-gray-600 hover:text-gray-400 transition-colors"
          >
            <span className="text-xs mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TerminalLine({
  emoji,
  delay,
  children,
}: {
  emoji: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex gap-2 text-gray-300"
    >
      <span>{emoji}</span>
      <span>{children}</span>
    </motion.div>
  );
}
