"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ListTodo,
  GitFork,
  Puzzle,
  Key,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Logo from "@/components/Logo";
import { useOrg } from "@/hooks/useOrg";

const sidebarLinks = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Tasks", href: "/dashboard/tasks", icon: ListTodo },
  { label: "Repositories", href: "/dashboard/repositories", icon: GitFork },
  { label: "Integrations", href: "/dashboard/integrations", icon: Puzzle },
  { label: "API Keys", href: "/dashboard/api-keys", icon: Key },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { org } = useOrg();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-navy-700/50">
        <Link href="/dashboard" className="flex items-center" onClick={onNavigate}>
          <Logo variant="full" size="sm" theme="dark" />
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/dashboard" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                isActive
                  ? "bg-electric/10 text-electric"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <link.icon size={18} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Plan badge */}
      <div className="px-4 py-4 border-t border-navy-700/50">
        <div className="flex items-center gap-2">
          <Badge variant="electric">{org?.plan === "beta" ? "Beta" : org?.plan ?? "Beta"}</Badge>
          <span className="text-xs text-gray-500">{org?.plan === "beta" ? "Free Plan" : org?.plan ?? "Free Plan"}</span>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 h-12 border-b border-navy-700/50 bg-navy-950/90 backdrop-blur-xl flex items-center px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <Menu size={18} />
          <span>Menu</span>
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:top-16 lg:left-0 lg:bottom-0 lg:w-[250px] border-r border-navy-700/50 bg-navy-950/50 backdrop-blur-sm">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-navy-950 border-r border-navy-700/50 lg:hidden"
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
