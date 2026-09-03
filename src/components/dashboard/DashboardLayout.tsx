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
    <div className="gov-dashboard dashboard-monochrome flex min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} userRole={activeRole} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardHeader title={activeTitle} userRole={activeRole} userName={activeUserName} />
        <main className={cn("w-full flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-7", "space-y-5")}>
          <div className="flex flex-wrap items-center justify-end gap-2" aria-label="Risk level legend">
            <div className="flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.55)]" />
              Low Risk
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-yellow-400/30 bg-yellow-500/10 px-3 py-2 text-xs font-semibold text-yellow-300">
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.55)]" />
              Medium Risk
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-orange-400/30 bg-orange-500/10 px-3 py-2 text-xs font-semibold text-orange-300">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.55)]" />
              High Risk
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
