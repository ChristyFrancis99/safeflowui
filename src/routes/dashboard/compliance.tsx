import { createFileRoute } from "@tanstack/react-router";
import { FileCheck, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/dashboard/compliance")({ component: CompliancePage });

const complianceRules = [
  { id: "RULE-RBI-KYC", title: "RBI KYC and customer due-diligence requirements", status: "Active", riskScore: "Compliant" },
  { id: "RULE-PMLA-AML", title: "PMLA suspicious transaction monitoring and reporting", status: "Active", riskScore: "Monitored" },
  { id: "RULE-FATF-16", title: "FATF Travel Rule originator and beneficiary context", status: "Active", riskScore: "Compliant" },
  { id: "RULE-FIU-STR", title: "FIU-IND suspicious transaction reporting workflow", status: "Active", riskScore: "Compliant" },
];

function CompliancePage() {
  return (
    <DashboardLayout title="Compliance Intelligence & Rules Engine">
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 flex items-center justify-between"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-teal/10 text-teal"><FileCheck className="size-5" /></div><div><h2 className="text-lg font-semibold text-foreground">Regulatory Rules Engine</h2><p className="text-xs text-muted-foreground">India-first AML monitoring grounded in RBI, PMLA, FIU-IND, and FATF context.</p></div></div></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Screening Accuracy</p><p className="text-3xl font-bold text-teal mt-2">99.94%</p></div>
          <div className="rounded-2xl border border-border bg-card p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rules Enforced</p><p className="text-3xl font-bold text-foreground mt-2">142 Active</p></div>
          <div className="rounded-2xl border border-border bg-card p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Regulatory Sources</p><p className="text-3xl font-bold text-violet mt-2">6 Sources</p></div>
          <div className="rounded-2xl border border-border bg-card p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Sync</p><p className="text-3xl font-bold text-foreground mt-2">2m ago</p></div>
        </div>
        <div className="rounded-2xl border border-border bg-card overflow-hidden"><div className="p-4 border-b border-border font-semibold text-sm text-foreground">Active Regulatory Rule Sets</div><div className="divide-y divide-border">{complianceRules.map((rule) => <div key={rule.id} className="p-4 flex items-center justify-between gap-4 hover:bg-muted/20 transition-colors"><div className="space-y-1"><span className="text-xs font-semibold text-violet">{rule.id}</span><p className="text-sm font-medium text-foreground">{rule.title}</p></div><span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-teal/10 text-teal"><CheckCircle2 className="size-3" />{rule.riskScore}</span></div>)}</div></div>
      </div>
    </DashboardLayout>
  );
}
