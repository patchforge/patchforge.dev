"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navLinks = [
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-navy-700/50 bg-navy-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-8 h-8">
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <path
                  d="M16 2L4 8v16l12 6 12-6V8L16 2z"
                  className="fill-electric/20 stroke-electric"
                  strokeWidth="1.5"
                />
                <path
                  d="M16 8l-6 3v10l6 3 6-3V11l-6-3z"
                  className="fill-electric/40 stroke-electric"
                  strokeWidth="1"
                />
                <path
                  d="M16 14l-2 1v4l2 1 2-1v-4l-2-1z"
                  className="fill-electric"
                />
              </svg>
            </div>
            <span className="font-display text-lg font-bold text-white tracking-tight">
              Patch<span className="text-electric">Forge</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/#waitlist">
                <Button size="sm">Join Waitlist</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="secondary" size="sm" className="gap-2">
                  <LayoutDashboard size={14} />
                  Dashboard
                </Button>
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-navy-700/50 bg-navy-950/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-3 py-2.5 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-navy-700/50 space-y-2">
                <SignedOut>
                  <Link href="/sign-in" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-center">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/#waitlist" onClick={() => setMobileOpen(false)}>
                    <Button size="sm" className="w-full justify-center">
                      Join Waitlist
                    </Button>
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                    <Button variant="secondary" size="sm" className="w-full justify-center gap-2">
                      <LayoutDashboard size={14} />
                      Dashboard
                    </Button>
                  </Link>
                  <div className="flex justify-center pt-2">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                        },
                      }}
                    />
                  </div>
                </SignedIn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
