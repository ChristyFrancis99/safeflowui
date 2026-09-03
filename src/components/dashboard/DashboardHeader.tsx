import { useNavigate } from "@tanstack/react-router";
import { useRole, type RoleId } from "@/context/RoleContext";

export interface DashboardHeaderProps {
  title?: string;
  userRole?: string;
  userName?: string;
}

export function DashboardHeader({
  title,
  userRole: userRoleProp,
  userName: userNameProp,
}: DashboardHeaderProps) {
  const navigate = useNavigate();
  const { role, clearRole, user, dashboardTitle } = useRole();

  const displayTitle = title || dashboardTitle;
  const activeRole = (userRoleProp as RoleId) || role;
  const displayUserName = userNameProp || user.name;

  const handleLogout = () => {
    clearRole();
    navigate({ to: "/sign-in" });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-7">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {displayTitle}
          </h1>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            Overview of fraud detection and investigation activity
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-medium text-foreground">{displayUserName}</p>
            <p className="text-[11px] capitalize text-muted-foreground">{activeRole}</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:border-primary/50 hover:bg-muted/30"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
