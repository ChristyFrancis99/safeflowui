import { useNavigate } from "@tanstack/react-router";
import { useRole, type RoleId } from "@/context/RoleContext";

export interface DashboardHeaderProps { title?: string; userRole?: string; userName?: string; }

const subtitleByTitle: Record<string, string> = {
  "Investigation Overview": "Monitor suspicious activity, risk signals, cases, and AI investigation services.",
  "Review & Approvals": "Review analyst decisions, escalations, reports, and compliance activity.",
  "System Administration": "Manage users, access roles, integrations, security, and audit controls.",
  "Manager Approvals Queue": "Review investigation recommendations before final managerial sign-off.",
  "Reports & Regulatory Filings": "Review generated investigation reports and regulatory filing records.",
  "Transaction Graph": "Explore transaction relationships and suspicious account connections.",
};

export function DashboardHeader({ title, userRole: userRoleProp, userName: userNameProp }: DashboardHeaderProps) {
  const { role, user, dashboardTitle } = useRole();
  const displayTitle = title || dashboardTitle;
  const activeRole = (userRoleProp as RoleId) || role;
  const displayUserName = userNameProp || user.name;
  const subtitle = subtitleByTitle[displayTitle] || "Operational workspace for financial crime investigation and oversight.";

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-7">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{displayTitle}</h1>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-medium text-foreground">{displayUserName}</p>
            <p className="text-[11px] capitalize text-muted-foreground">{activeRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
