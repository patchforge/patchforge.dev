import { PenLine } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function BlogPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-navy-800/50 border border-navy-700/50 text-forge mb-6">
          <PenLine size={28} />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Blog
        </h1>
        <p className="mt-3 text-gray-400 max-w-md mx-auto">
          We&apos;re cooking up some posts about autonomous AI engineering,
          LLM architecture, and building PatchForge. Stay tuned.
        </p>
        <div className="mt-8">
          <Link href="/#waitlist">
            <Button>Join the Waitlist</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
