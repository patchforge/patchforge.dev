import Pricing from "@/components/Pricing";
import Waitlist from "@/components/Waitlist";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — PatchForge",
  description:
    "Start free during beta. Scale with Pro and Enterprise plans when you're ready.",
};

export default function PricingPage() {
  return (
    <div className="pt-16">
      <Pricing />
      <Waitlist />
    </div>
  );
}
