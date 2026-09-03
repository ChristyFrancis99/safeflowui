import { CheckCircle2, ShieldCheck, FileText, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RoleSelectorProps {
  selectedRole: RoleId;
  onRoleSelect: (roleId: RoleId) => void;
}

export const roleOptions = [
  {
    id: "investigator",
    label: "Investigator",
    description: "Fraud / AML Analyst",
    purpose: "Investigate suspicious cases, evidence, risk and AI analysis.",
    icon: ShieldCheck,
  },
  {
    id: "manager",
    label: "Manager",
    description: "AML / Compliance Manager",
    purpose: "Review investigations, approve recommendations, manage escalations and reports.",
    icon: FileText,
  },
  {
    id: "administrator",
    label: "Administrator",
    description: "Bank IT / Security Administrator",
    purpose: "Manage users, roles, integrations and platform security.",
    icon: Lock,
  },
] as const;

export type RoleId = (typeof roleOptions)[number]["id"];

export function RoleSelector({ selectedRole, onRoleSelect }: RoleSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">Select your role</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Choose your role before signing in.
        </p>
      </div>

      <div className="grid gap-3">
        {roleOptions.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onRoleSelect(role.id)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2",
                isSelected
                  ? "border-violet bg-violet/10 ring-2 ring-violet/20"
                  : "border-border bg-background hover:border-violet/50 hover:bg-violet/5",
              )}
              aria-pressed={isSelected}
              aria-label={`Select ${role.label}`}
            >
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg",
                  isSelected ? "bg-violet text-white" : "bg-muted text-muted-foreground group-hover:text-violet",
                )}
              >
                <Icon className="size-4" aria-hidden />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{role.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{role.description}</p>
              </div>

              {isSelected && (
                <CheckCircle2 className="size-5 shrink-0 text-violet" aria-hidden />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
