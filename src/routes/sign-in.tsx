import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole, AlertCircle, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mono } from "@/components/landing/shared";
import { RoleSelector, type RoleId } from "@/components/auth/RoleSelector";
import { useRole } from "@/context/RoleContext";
import { Logo } from "@/components/Logo";

const roleTargetMap: Record<RoleId, string> = { investigator: "/dashboard", manager: "/dashboard", administrator: "/dashboard" };
const roleDemoEmail: Record<RoleId, string> = { investigator: "marcus.johnson@smarthorizon.ai", manager: "sarah.chen@smarthorizon.ai", administrator: "alex.chen@smarthorizon.ai" };

export const Route = createFileRoute("/sign-in")({ component: SignInPage });

function SignInPage() {
  const { setRole } = useRole();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<RoleId>("investigator");
  const [email, setEmail] = useState(roleDemoEmail.investigator);
  const [password, setPassword] = useState("demo-password");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [infoNotice, setInfoNotice] = useState("Demo workspace: choose a role and sign in with any non-empty password.");

  const handleRoleSelect = (role: RoleId) => {
    setSelectedRole(role); setEmail(roleDemoEmail[role]); setGeneralError(""); setEmailError(""); setPasswordError(""); setInfoNotice(`Demo workspace selected: ${role}.`);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setEmailError(""); setPasswordError(""); setGeneralError("");
    let hasError = false;
    if (!email.trim()) { setEmailError("Work email is required."); hasError = true; }
    else if (!/\S+@\S+\.\S+/.test(email.trim())) { setEmailError("Please enter a valid work email address."); hasError = true; }
    if (!password.trim()) { setPasswordError("Password is required."); hasError = true; }
    if (hasError) return;
    setRole(selectedRole); navigate({ to: roleTargetMap[selectedRole] });
  };

  const handleForgotPassword = (event: React.MouseEvent) => { event.preventDefault(); setInfoNotice("Demo mode: password reset is simulated. No email is sent."); };

  return (
    <div className="min-h-screen bg-offwhite p-3 md:p-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-border bg-background shadow-[var(--shadow-float)]">
        <div className="grid min-h-[calc(100vh-2rem)] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative hidden h-full min-h-[calc(100vh-2rem)] overflow-hidden bg-black lg:block">
            <img src="/login.png" alt="Safe Flow security workspace" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="flex flex-col justify-center bg-background px-4 py-8 sm:px-6 lg:px-10 xl:px-14">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-6 flex items-center justify-between gap-3 lg:hidden"><Logo size="md" rounded="lg" /><Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">Back to home</Link></div>
              <div className="hidden items-center justify-between gap-3 border-b border-border pb-5 lg:flex"><div><p className="text-sm font-semibold tracking-[0.16em] text-foreground">Safe Flow</p><Mono className="mt-1 text-muted-foreground">Digital Investigator</Mono></div><Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">Back to home</Link></div>
              <div className="mt-8"><h2 className="text-3xl font-semibold tracking-tight text-foreground">Welcome back.</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Sign in to your Safe Flow workspace.</p></div>
              {generalError && <div className="mt-4 flex items-center gap-2 rounded-xl border border-risk-high/30 bg-risk-high/10 p-3 text-xs text-risk-high"><AlertCircle className="size-4 shrink-0" /><span>{generalError}</span></div>}
              {infoNotice && <div className="mt-4 flex items-center gap-2 rounded-xl border border-violet/30 bg-violet/10 p-3 text-xs text-violet"><Info className="size-4 shrink-0" /><span>{infoNotice}</span></div>}
              <div className="mt-6"><RoleSelector selectedRole={selectedRole} onRoleSelect={handleRoleSelect} /></div>
              <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
                <div className="space-y-1.5"><label htmlFor="email" className="text-sm font-medium text-foreground">Work Email</label><input id="email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); if (emailError) setEmailError(""); }} placeholder="name@company.com" className={`w-full rounded-xl border bg-background px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-violet/20 ${emailError ? "border-risk-high focus:border-risk-high" : "border-border focus:border-violet/50"}`} />{emailError && <p className="text-xs text-risk-high">{emailError}</p>}</div>
                <div className="space-y-1.5"><div className="flex items-center justify-between gap-3"><label htmlFor="password" className="text-sm font-medium text-foreground">Password</label><button type="button" onClick={handleForgotPassword} className="text-sm font-medium text-violet hover:text-foreground focus:outline-none">Forgot password?</button></div><div className="relative"><input id="password" type="password" value={password} onChange={(event) => { setPassword(event.target.value); if (passwordError) setPasswordError(""); }} placeholder="Enter your password" className={`w-full rounded-xl border bg-background px-3.5 py-3 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-violet/20 ${passwordError ? "border-risk-high focus:border-risk-high" : "border-border focus:border-violet/50"}`} /><LockKeyhole className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden /></div>{passwordError && <p className="text-xs text-risk-high">{passwordError}</p>}</div>
                <Button type="submit" className="w-full rounded-xl" size="lg">Sign In <ArrowRight className="size-4" /></Button>
              </form>
              <div className="mt-4 text-center text-sm text-muted-foreground">Don't have an account? <Link to="/sign-up" className="font-medium text-violet hover:text-foreground">Sign Up</Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
