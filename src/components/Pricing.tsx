"use client";

import { Check } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

const plans = [
  {
    name: "Beta",
    tagline: "Early Access",
    price: "Free",
    priceSub: "Limited spots available",
    highlighted: false,
    badge: null,
    features: [
      "Up to 2 repos",
      "50 PRs per month",
      "Jira + GitHub integration",
      "Community support",
      "3 months free when we launch Pro",
    ],
    cta: "Join Waitlist",
    ctaHref: "#waitlist",
  },
  {
    name: "Pro",
    tagline: "For teams",
    price: "$—/mo",
    priceSub: "Per repo · Coming soon",
    highlighted: true,
    badge: "Popular",
    features: [
      "Unlimited repos",
      "Unlimited PRs",
      "Jira + GitHub + Azure DevOps",
      "Hotfix mode",
      "Priority support",
      "Custom configuration",
    ],
    cta: "Join Waitlist",
    ctaHref: "#waitlist",
  },
  {
    name: "Enterprise",
    tagline: "Custom",
    price: "Custom",
    priceSub: "Let's talk",
    highlighted: false,
    badge: null,
    features: [
      "Everything in Pro",
      "Self-hosted option",
      "Dedicated support",
      "SLA guarantees",
      "Custom integrations",
      "SOC 2 compliance",
    ],
    cta: "Contact Us",
    ctaHref: "mailto:hello@patchforge.dev",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric/[0.03] rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-mono text-electric tracking-wider uppercase mb-3">
            Pricing
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Start free. Scale when ready.
          </h2>
          <p className="mt-4 text-gray-400 max-w-lg mx-auto">
            Get started during beta at no cost. Lock in early access pricing when we launch.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <AnimatedSection key={plan.name} delay={index * 0.1}>
              <div
                className={`relative h-full flex flex-col rounded-xl border p-6 lg:p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? "border-electric/40 bg-navy-800/60 shadow-[0_0_60px_rgba(0,212,255,0.08)]"
                    : "border-navy-600/50 bg-navy-800/30 hover:border-navy-600"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-6">
                    <Badge variant="electric">{plan.badge}</Badge>
                  </div>
                )}

                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500">{plan.tagline}</p>
                </div>

                <div className="mt-5 mb-6">
                  <span className="font-display text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <p className="mt-1 text-xs text-gray-500">{plan.priceSub}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        size={16}
                        className={`mt-0.5 flex-shrink-0 ${
                          plan.highlighted ? "text-electric" : "text-gray-600"
                        }`}
                      />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.ctaHref}>
                  <Button
                    variant={plan.highlighted ? "primary" : "secondary"}
                    className="w-full justify-center"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
