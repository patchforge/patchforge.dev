import Sidebar from "@/components/dashboard/Sidebar";
import { ToastProvider } from "@/components/dashboard/Toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="pt-16">
        <Sidebar />
        <div className="lg:ml-[250px]">
          <div className="pt-12 lg:pt-0 min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
