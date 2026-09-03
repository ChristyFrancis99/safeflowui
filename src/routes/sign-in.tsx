import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole, AlertCircle, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { type RoleId, useRole } from "@/context/RoleContext";
import { Logo } from "@/components/Logo";

interface DemoAccount {
  email: string;
  password: string;
  role: RoleId;
  label: string;
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  { email: "marcus.johnson@smarthorizon.ai", password: "demo-password", role: "investigator", label: "Investigator" },
  { email: "sarah.chen@smarthorizon.ai", password: "demo-password", role: "manager", label: "Manager" },
  { email: "alex.chen@smarthorizon.ai", password: "demo-password", role: "administrator", label: "Administrator" },
];

export const Route = createFileRoute("/sign-in")({ component: SignInPage });

function SignInPage() {
  const { setRole } = useRole();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [infoNotice, setInfoNotice] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError(""); setPasswordError(""); setGeneralError(""); setInfoNotice("");
    const normalizedEmail = email.trim().toLowerCase();
    let hasError = false;
    if (!normalizedEmail) { setEmailError("Work email is required."); hasError = true; }
    else if (!/\S+@\S+\.\S+/.test(normalizedEmail)) { setEmailError("Please enter a valid work email address."); hasError = true; }
    if (!password) { setPasswordError("Password is required."); hasError = true; }
    if (hasError) return;

    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    const account = DEMO_ACCOUNTS.find((candidate) => candidate.email === normalizedEmail && candidate.password === password);
    setIsAnalyzing(false);

    if (!account) {
      const knownEmail = DEMO_ACCOUNTS.some((candidate) => candidate.email === normalizedEmail);
      setGeneralError(knownEmail ? "Credentials were not accepted. Please check your password and try again." : "Unknown user. This account is not authorized for the Safe Flow workspace.");
      return;
    }

    setInfoNotice(`Identity verified. ${account.label} workspace detected.`);
    setRole(account.role);
    await new Promise((resolve) => setTimeout(resolve, 300));
    navigate({ to: "/dashboard" });
  };

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
              <div className="hidden items-center justify-between gap-3 border-b border-border pb-5 lg:flex"><div><p className="text-sm font-semibold tracking-[0.16em] text-foreground">Safe Flow</p><p className="mt-1 font-mono text-xs text-muted-foreground">Digital Investigator</p></div><Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">Back to home</Link></div>
              <div className="mt-8"><h2 className="text-3xl font-semibold tracking-tight text-foreground">Welcome back</h2></div>
              {generalError && <div className="mt-5 flex items-start gap-2 rounded-xl border border-risk-high/30 bg-risk-high/10 p-3 text-xs text-risk-high"><AlertCircle className="mt-0.5 size-4 shrink-0" /><span>{generalError}</span></div>}
              {infoNotice && <div className="mt-5 flex items-start gap-2 rounded-xl border border-violet/30 bg-violet/10 p-3 text-xs text-violet"><Info className="mt-0.5 size-4 shrink-0" /><span>{infoNotice}</span></div>}
              <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
                <div className="space-y-1.5"><label htmlFor="email" className="text-sm font-medium text-foreground">Email</label><input id="email" type="email" autoComplete="username" value={email} onChange={(event) => { setEmail(event.target.value); setEmailError(""); setGeneralError(""); }} placeholder="name@company.com" className={`w-full rounded-xl border bg-background px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-violet/20 ${emailError ? "border-risk-high focus:border-risk-high" : "border-border focus:border-violet/50"}`} />{emailError && <p className="text-xs text-risk-high">{emailError}</p>}</div>
                <div className="space-y-1.5"><label htmlFor="password" className="text-sm font-medium text-foreground">Password</label><div className="relative"><input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => { setPassword(event.target.value); setPasswordError(""); setGeneralError(""); }} placeholder="Enter your password" className={`w-full rounded-xl border bg-background px-3.5 py-3 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-violet/20 ${passwordError ? "border-risk-high focus:border-risk-high" : "border-border focus:border-violet/50"}`} /><LockKeyhole className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden /></div>{passwordError && <p className="text-xs text-risk-high">{passwordError}</p>}</div>
                <Button type="submit" className="w-full rounded-xl" size="lg" disabled={isAnalyzing}>{isAnalyzing ? "Signing in…" : "Sign In"}{!isAnalyzing && <ArrowRight className="size-4" />}</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
