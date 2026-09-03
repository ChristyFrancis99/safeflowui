import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import "@/styles/gov-dashboard.css";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { cn } from "@/lib/utils";
import { useRole, type RoleId } from "@/context/RoleContext";

export interface DashboardLayoutProps { title?: string; userRole?: string; userName?: string; children?: React.ReactNode; }

const rolePrefixes: Record<RoleId, string[]> = {
  investigator: ["/dashboard", "/dashboard/cases", "/dashboard/investigation", "/dashboard/risk", "/dashboard/graph", "/dashboard/compliance", "/dashboard/reports", "/dashboard/threats"],
  manager: ["/dashboard", "/dashboard/cases", "/dashboard/approvals", "/dashboard/escalations", "/dashboard/reports", "/dashboard/compliance", "/dashboard/audit"],
  administrator: ["/dashboard", "/dashboard/users", "/dashboard/roles", "/dashboard/integrations", "/dashboard/security", "/dashboard/audit-logs", "/dashboard/settings"],
};

export function DashboardLayout({ title, userRole, userName, children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { role, user, dashboardTitle, isAuthenticated } = useRole();
  const activeRole = (userRole as RoleId) || role;
  const activeTitle = title || dashboardTitle;
  const activeUserName = userName || user.name;
  const allowed = rolePrefixes[activeRole].some((prefix) => prefix === "/dashboard" ? location.pathname === "/dashboard" : location.pathname === prefix || location.pathname.startsWith(`${prefix}/`));

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/sign-in", replace: true });
    else if (!allowed) navigate({ to: "/dashboard", replace: true });
  }, [isAuthenticated, allowed, navigate]);

  if (!isAuthenticated || !allowed) return null;

  return (
    <div className="gov-dashboard flex min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} userRole={activeRole} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardHeader title={activeTitle} userRole={activeRole} userName={activeUserName} />
        <main className={cn("w-full flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-7", "space-y-5")}>{children}</main>
      </div>
    </div>
  );
}
