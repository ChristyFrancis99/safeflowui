import { useState } from "react";
import "@/styles/gov-dashboard.css";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { cn } from "@/lib/utils";
import { useRole, type RoleId } from "@/context/RoleContext";

export interface DashboardLayoutProps {
  title?: string;
  userRole?: string;
  userName?: string;
  children?: React.ReactNode;
}

export function DashboardLayout({
  title,
  userRole,
  userName,
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { role, user, dashboardTitle } = useRole();

  const activeRole = (userRole as RoleId) || role;
  const activeTitle = title || dashboardTitle;
  const activeUserName = userName || user.name;

  return (
    <div className="gov-dashboard flex min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} userRole={activeRole} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardHeader
          title={activeTitle}
          userRole={activeRole}
          userName={activeUserName}
        />

        <main
          className={cn(
            "w-full flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-7",
            "space-y-5",
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
