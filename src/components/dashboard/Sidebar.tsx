import { useState } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { Briefcase, Microscope, AlertTriangle, Network, FileCheck, FileText, Eye, Settings, LogOut, Menu, X, CheckSquare, TrendingUp, ClipboardList, Users, Shield, Sliders, Lock, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { Mono } from "@/components/landing/shared";
import { useRole, type RoleId } from "@/context/RoleContext";
import { Logo } from "@/components/Logo";

interface NavItem { id: string; label: string; icon: React.ReactNode; href: string; }
const roleNavMap: Record<RoleId, NavItem[]> = {
  investigator: [
    { id: "cases", label: "Cases", icon: <Briefcase className="size-4" />, href: "/dashboard/cases" },
    { id: "investigation", label: "Investigation", icon: <Microscope className="size-4" />, href: "/dashboard/investigation" },
    { id: "risk", label: "Risk Intelligence", icon: <AlertTriangle className="size-4" />, href: "/dashboard/risk" },
    { id: "graph", label: "Graph", icon: <Network className="size-4" />, href: "/dashboard/graph" },
    { id: "compliance", label: "Compliance", icon: <FileCheck className="size-4" />, href: "/dashboard/compliance" },
    { id: "reports", label: "Reports", icon: <FileText className="size-4" />, href: "/dashboard/reports" },
    { id: "threat", label: "Threat Watch", icon: <Eye className="size-4" />, href: "/dashboard/threats" },
  ],
  manager: [
    { id: "cases", label: "Cases", icon: <Briefcase className="size-4" />, href: "/dashboard/cases" },
    { id: "approvals", label: "Approvals", icon: <CheckSquare className="size-4" />, href: "/dashboard/approvals" },
    { id: "escalations", label: "Escalations", icon: <TrendingUp className="size-4" />, href: "/dashboard/escalations" },
    { id: "reports", label: "Reports", icon: <FileText className="size-4" />, href: "/dashboard/reports" },
    { id: "compliance", label: "Compliance", icon: <FileCheck className="size-4" />, href: "/dashboard/compliance" },
    { id: "audit", label: "Audit", icon: <ClipboardList className="size-4" />, href: "/dashboard/audit" },
  ],
  administrator: [
    { id: "users", label: "Users", icon: <Users className="size-4" />, href: "/dashboard/users" },
    { id: "roles", label: "Roles", icon: <Shield className="size-4" />, href: "/dashboard/roles" },
    { id: "integrations", label: "Integrations", icon: <Sliders className="size-4" />, href: "/dashboard/integrations" },
    { id: "security", label: "Security", icon: <Lock className="size-4" />, href: "/dashboard/security" },
    { id: "audit-logs", label: "Audit Logs", icon: <History className="size-4" />, href: "/dashboard/audit-logs" },
    { id: "settings", label: "Settings", icon: <Settings className="size-4" />, href: "/dashboard/settings" },
  ],
};
export interface SidebarProps { open?: boolean; onOpenChange?: (open: boolean) => void; userRole?: RoleId; }

export function Sidebar({ open = true, onOpenChange, userRole: userRoleProp }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(open); const navigate = useNavigate(); const location = useLocation(); const { role: contextRole, clearRole } = useRole();
  const activeRole = userRoleProp || contextRole || "investigator"; const mainNav = roleNavMap[activeRole] || roleNavMap.investigator;
  const handleOpenChange = (newOpen: boolean) => { setIsOpen(newOpen); onOpenChange?.(newOpen); };
  const handleSignOut = () => { clearRole(); navigate({ to: "/sign-in" }); };
  const roleLabelMap: Record<RoleId, string> = { investigator: "Investigator View", manager: "Manager View", administrator: "Administrator View" };

  return <>
    <button onClick={() => handleOpenChange(!isOpen)} className={cn("fixed top-4 z-50 rounded-md border border-border bg-background p-2.5 transition-[left] duration-200 lg:hidden", isOpen ? "left-[17rem]" : "left-4")} aria-label="Toggle sidebar" aria-expanded={isOpen}>{isOpen ? <X className="size-5 text-foreground" /> : <Menu className="size-5 text-foreground" />}</button>
    {isOpen && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => handleOpenChange(false)} aria-hidden />}
    <aside className={cn("fixed left-0 top-0 z-40 h-screen w-64 bg-card transition-transform duration-200 ease-out lg:relative lg:translate-x-0", isOpen ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex h-full flex-col overflow-y-auto border-r border-border">
        <button onClick={() => navigate({ to: "/dashboard" })} className="border-b border-border p-5 text-left transition-colors hover:bg-muted/30 focus-visible:outline-none" aria-label="Go to Dashboard"><div className="flex items-center gap-3"><Logo size="md" variant="navy" rounded="md" showLabel={false} /><div><p className="text-xs font-bold tracking-[0.16em] text-foreground">Safe Flow</p><Mono className="mt-0.5 text-[10px] text-muted-foreground">{roleLabelMap[activeRole]}</Mono></div></div><div className="mt-3.5 flex items-center justify-between rounded-md border border-border bg-muted/30 px-2.5 py-1.5 text-xs"><span className="text-[11px] font-semibold capitalize text-foreground">{activeRole}</span><span className="rounded-sm border border-teal/20 bg-teal/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-teal">Active</span></div></button>
        <nav className="flex-1 px-3 py-5"><p className="mb-2.5 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">Workspace Navigation</p><ul className="space-y-1">{mainNav.map((item) => { const isSelected = location.pathname === item.href || (item.href !== "/dashboard" && location.pathname.startsWith(item.href)); return <li key={item.id}><button onClick={() => navigate({ to: item.href })} className={cn("group relative flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-xs font-medium transition-colors duration-150", isSelected ? "border-l-2 border-primary bg-primary/10 pl-2.5 font-semibold text-primary" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20")}><span className={cn("flex size-4 items-center justify-center", isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}>{item.icon}</span><span>{item.label}</span></button></li>; })}</ul></nav>
        <div className="border-t border-border px-3 py-4"><button onClick={handleSignOut} className="group flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-xs font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"><LogOut className="size-4" /><span>Sign Out</span></button></div>
      </div>
    </aside>
  </>;
}
