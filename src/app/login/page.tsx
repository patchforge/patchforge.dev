import { Lock } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-navy-800/50 border border-navy-700/50 text-electric mb-6">
          <Lock size={28} />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Dashboard
        </h1>
        <p className="mt-3 text-gray-400 max-w-md mx-auto">
          The PatchForge dashboard is coming soon. Join the waitlist to get
          early access when we launch.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/#waitlist">
            <Button>Join the Waitlist</Button>
          </Link>
          <Link href="/">
            <Button variant="secondary">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
