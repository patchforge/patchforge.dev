"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) return;

    setStatus("loading");

    // Simulate async — replace with real API call later
    await new Promise((resolve) => setTimeout(resolve, 800));

    // For now, just log the email
    console.log("Waitlist signup:", email);

    setStatus("success");
    setEmail("");
  };

  return (
    <section id="waitlist" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric/[0.03] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric/[0.05] rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Ready to put your tickets{" "}
            <span className="bg-gradient-to-r from-electric to-electric-light bg-clip-text text-transparent">
              on autopilot?
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-lg mx-auto">
            Join the waitlist for early access. Beta members get 3 months free
            when we launch Pro.
          </p>

          <div className="mt-10">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 py-4"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 text-green-400">
                    <CheckCircle2 size={24} />
                  </div>
                  <p className="text-lg font-display font-semibold text-white">
                    You&apos;re on the list!
                  </p>
                  <p className="text-sm text-gray-400">
                    We&apos;ll reach out when your spot is ready.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-xs text-gray-500 hover:text-gray-400 transition-colors"
                  >
                    Submit another email
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="flex-1 px-4 py-3 rounded-lg bg-navy-800/80 border border-navy-600/50 text-white placeholder:text-gray-500 text-sm font-mono
                      focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric/40 transition-all duration-200"
                  />
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="gap-2 whitespace-nowrap"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Joining...
                      </>
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight size={16} />
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <p className="mt-6 text-xs text-gray-600">
            No spam. Unsubscribe anytime. Early access members get 3 months free.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
