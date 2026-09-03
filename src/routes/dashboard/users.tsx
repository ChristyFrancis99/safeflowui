import { createFileRoute } from "@tanstack/react-router";
import { Users, UserPlus, CheckCircle2, MoreHorizontal, X, UserCheck } from "lucide-react";
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/users")({ component: UsersPage });

type UserRow = { id: string; name: string; email: string; role: string; status: string; lastActive: string };
const initialUsers: UserRow[] = [
  { id: "usr-1", name: "Alex Chen", email: "alex.chen@smarthorizon.ai", role: "administrator", status: "Active", lastActive: "15m ago" },
  { id: "usr-2", name: "Sarah Chen", email: "sarah.chen@smarthorizon.ai", role: "manager", status: "Active", lastActive: "45m ago" },
  { id: "usr-3", name: "Marcus Johnson", email: "marcus.johnson@smarthorizon.ai", role: "investigator", status: "Active", lastActive: "2h ago" },
  { id: "usr-4", name: "Priya Patel", email: "priya.patel@smarthorizon.ai", role: "investigator", status: "Active", lastActive: "3h ago" },
  { id: "usr-5", name: "David Rodriguez", email: "david.rodriguez@smarthorizon.ai", role: "manager", status: "Inactive", lastActive: "1d ago" },
];

function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState<UserRow | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("investigator");
  const addUser = (event: React.FormEvent) => { event.preventDefault(); if (!name.trim() || !email.trim()) return; setUsers((current) => [...current, { id: `usr-${current.length + 1}`, name, email, role, status: "Active", lastActive: "just now" }]); setName(""); setEmail(""); setShowAdd(false); };
  const toggleStatus = (id: string) => setUsers((current) => current.map((u) => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u));

  return (
    <DashboardLayout title="User Management & Directory">
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 flex items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-violet/10 text-violet"><Users className="size-5" /></div><div><h2 className="text-lg font-semibold text-foreground">Platform User Directory</h2><p className="text-xs text-muted-foreground">Manage user accounts, roles, workspace permissions, and analyst access.</p></div></div><Button size="sm" className="gap-2" onClick={() => setShowAdd(true)}><UserPlus className="size-4" />Add New User</Button></div>
        <div className="rounded-2xl border border-border bg-card overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground"><th className="px-6 py-4 text-left">User</th><th className="px-6 py-4 text-left">Assigned Role</th><th className="px-6 py-4 text-left">Status</th><th className="px-6 py-4 text-left">Last Active</th><th className="px-6 py-4 text-left">Action</th></tr></thead><tbody className="divide-y divide-border">
          {users.map((user) => <tr key={user.id} className="hover:bg-muted/20 transition-colors"><td className="px-6 py-4"><p className="font-semibold text-foreground">{user.name}</p><p className="text-xs text-muted-foreground">{user.email}</p></td><td className="px-6 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet/10 text-violet capitalize">{user.role}</span></td><td className="px-6 py-4"><span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${user.status === "Active" ? "bg-teal/10 text-teal" : "bg-muted text-muted-foreground"}`}><CheckCircle2 className="size-3" />{user.status}</span></td><td className="px-6 py-4 text-xs text-muted-foreground">{user.lastActive}</td><td className="px-6 py-4"><Button size="sm" variant="ghost" className="text-xs" onClick={() => setSelected(user)} aria-label={`Open actions for ${user.name}`}><MoreHorizontal className="size-4" /></Button></td></tr>)}
        </tbody></table></div></div>
      </div>

      {(showAdd || selected) && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => { setShowAdd(false); setSelected(null); }}>
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-float)]" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between"><h3 className="text-lg font-semibold text-foreground">{showAdd ? "Add New User" : selected?.name}</h3><button onClick={() => { setShowAdd(false); setSelected(null); }} className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"><X className="size-4" /></button></div>
          {showAdd ? <form className="mt-5 space-y-4" onSubmit={addUser}><div><label className="text-sm font-medium">Name</label><input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm" required /></div><div><label className="text-sm font-medium">Work email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm" required /></div><div><label className="text-sm font-medium">Role</label><select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm"><option value="investigator">Investigator</option><option value="manager">Manager</option><option value="administrator">Administrator</option></select></div><Button type="submit" className="w-full">Create Demo User</Button></form> : <div className="mt-5 space-y-4"><div className="rounded-xl border border-border bg-muted/30 p-4 text-sm"><p className="font-medium text-foreground">{selected?.email}</p><p className="mt-1 text-xs capitalize text-muted-foreground">{selected?.role} · {selected?.status}</p></div><Button variant="outline" className="w-full gap-2" onClick={() => { if (selected) toggleStatus(selected.id); setSelected(null); }}><UserCheck className="size-4" />{selected?.status === "Active" ? "Deactivate User" : "Reactivate User"}</Button></div>}
        </div>
      </div>}
    </DashboardLayout>
  );
}
