"use client";

import { SWRConfig } from "swr";
import Sidebar from "@/components/dashboard/Sidebar";
import { ToastProvider } from "@/components/dashboard/Toast";
import { useOrg } from "@/hooks/useOrg";
import Onboarding from "@/components/dashboard/Onboarding";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        dedupingInterval: 5000,
      }}
    >
      <ToastProvider>
        <DashboardContent>{children}</DashboardContent>
      </ToastProvider>
    </SWRConfig>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { needsOnboarding, isLoading, mutate } = useOrg();

  if (isLoading) {
    return (
      <div className="pt-16">
        <Sidebar />
        <div className="lg:ml-[250px]">
          <div className="pt-12 lg:pt-0 min-h-[calc(100vh-4rem)] flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (needsOnboarding) {
    return (
      <div className="pt-16">
        <div className="min-h-[calc(100vh-4rem)]">
          <Onboarding onComplete={() => mutate()} />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <Sidebar />
      <div className="lg:ml-[250px]">
        <div className="pt-12 lg:pt-0 min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}
