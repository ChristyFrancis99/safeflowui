import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Settings, Sliders, Shield, Check } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useRole } from "@/context/RoleContext";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/settings")({ component: SettingsPage });

function SettingsPage() {
  const { role, user } = useRole();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <DashboardLayout title="Workspace Settings">
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center justify-between rounded-md border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
              <Settings className="size-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Platform Configuration</h2>
              <p className="text-xs text-muted-foreground">Manage account preferences, thresholds, and security policies.</p>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Shield className="size-4 text-primary" /> Active Session Profile
          </h3>
          <div className="mt-4 grid gap-4 text-xs sm:grid-cols-2">
            <div><span className="text-muted-foreground">Full Name</span><p className="mt-1 font-semibold text-foreground">{user.name}</p></div>
            <div><span className="text-muted-foreground">Role</span><p className="mt-1 font-semibold capitalize text-foreground">{role}</p></div>
            <div><span className="text-muted-foreground">Work Email</span><p className="mt-1 font-semibold text-foreground">{user.email}</p></div>
            <div><span className="text-muted-foreground">Environment</span><p className="mt-1 font-semibold text-teal">Protected Demo Environment</p></div>
          </div>
        </div>

        <div className="rounded-md border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sliders className="size-4 text-primary" /> AI Risk Scoring Parameters
          </h3>
          <div className="mt-4 space-y-1 text-xs">
            <div className="flex items-center justify-between gap-4 border-b border-border py-3">
              <div><p className="font-medium text-foreground">High-Risk Alert Threshold</p><p className="text-muted-foreground">Trigger senior manager escalation above score</p></div>
              <span className="shrink-0 rounded-md bg-muted px-3 py-1 font-bold text-foreground">75 / 100</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border py-3">
              <div><p className="font-medium text-foreground">Automated Sanctions Screening</p><p className="text-muted-foreground">Real-time match check on beneficiary transactions</p></div>
              <span className="shrink-0 rounded-md border border-teal/20 bg-teal/10 px-2.5 py-1 font-semibold text-teal">Enabled</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <div><p className="font-medium text-foreground">Audit Log Retention</p><p className="text-muted-foreground">Regulatory compliance log archiving period</p></div>
              <span className="shrink-0 rounded-md bg-muted px-3 py-1 font-bold text-foreground">7 Years</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Button size="sm" variant="outline" className="rounded-md text-xs" onClick={handleSave}>
              {saved ? <Check className="mr-1.5 size-3.5" /> : null}
              {saved ? "Configuration Saved" : "Save Configuration"}
            </Button>
            {saved ? <span className="text-xs text-muted-foreground">Demo configuration updated.</span> : null}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
