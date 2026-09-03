import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, ShieldCheck, FileText, Lock, Check } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const { role, setRole, clearRole, user, dashboardTitle } = useRole();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const displayTitle = title || dashboardTitle;
  const activeRole = (userRoleProp as RoleId) || role;
  const displayUserName = userNameProp || user.name;

  const rolesList: { id: RoleId; label: string; icon: any }[] = [
    { id: "investigator", label: "Investigator", icon: ShieldCheck },
    { id: "manager", label: "Manager", icon: FileText },
    { id: "administrator", label: "Administrator", icon: Lock },
  ];

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
          <div className="relative">
            <button
              type="button"
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className={cn(
                "flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground",
                "hover:border-primary/50 hover:bg-muted/30",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
              )}
              aria-label="Switch role"
            >
              <span className="capitalize">{activeRole} View</span>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>

            {roleMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setRoleMenuOpen(false)}
                />
                <div className="absolute right-0 top-full z-40 mt-1 w-52 rounded-md border border-border bg-card p-1 shadow-md">
                  <p className="px-3 py-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    Switch Role
                  </p>
                  {rolesList.map((item) => {
                    const RoleIcon = item.icon;
                    const isSelected = activeRole === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setRole(item.id);
                          setRoleMenuOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-sm px-3 py-2 text-xs",
                          isSelected
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-foreground hover:bg-muted",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <RoleIcon className="size-3.5" />
                          {item.label}
                        </span>
                        {isSelected && <Check className="size-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

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
