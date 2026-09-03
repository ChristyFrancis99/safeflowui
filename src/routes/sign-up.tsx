import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, UserPlus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useRole } from "@/context/RoleContext";

export const Route = createFileRoute("/sign-up")({ component: SignUpPage });

function SignUpPage() {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setSelectedRole] = useState<"investigator" | "manager" | "administrator">("investigator");
  const [notice, setNotice] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setRole(role);
    setNotice("Demo account created. Opening your workspace...");
    setTimeout(() => navigate({ to: "/dashboard" }), 350);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 text-foreground">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl items-center justify-center">
        <div className="w-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-float)] sm:p-8">
          <div className="flex items-center justify-between"><Logo size="md" rounded="lg" /><Link to="/sign-in" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />Sign in</Link></div>
          <div className="mt-8"><div className="flex size-10 items-center justify-center rounded-xl bg-violet/10 text-violet"><UserPlus className="size-5" /></div><h1 className="mt-4 text-2xl font-semibold">Create your Safe Flow workspace</h1><p className="mt-2 text-sm text-muted-foreground">Demo onboarding for the hackathon prototype. No real account is created.</p></div>
          {notice && <div className="mt-5 rounded-xl border border-teal/20 bg-teal/10 p-3 text-sm text-teal">{notice}</div>}
          <form onSubmit={submit} className="mt-6 space-y-5">
            <div><label htmlFor="signup-name" className="text-sm font-medium">Full name</label><input id="signup-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 w-full rounded-xl border px-3.5 py-3 text-sm" placeholder="Your name" required /></div>
            <div><label htmlFor="signup-email" className="text-sm font-medium">Work email</label><input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full rounded-xl border px-3.5 py-3 text-sm" placeholder="name@company.com" required /></div>
            <div><label htmlFor="signup-role" className="text-sm font-medium">Workspace role</label><select id="signup-role" value={role} onChange={(e) => setSelectedRole(e.target.value as typeof role)} className="mt-1.5 w-full rounded-xl border px-3.5 py-3 text-sm"><option value="investigator">Investigator</option><option value="manager">Manager</option><option value="administrator">Administrator</option></select></div>
            <Button type="submit" className="w-full" size="lg">Continue to workspace <ArrowRight className="size-4" /></Button>
          </form>
        </div>
      </div>
    </div>
  );
}
