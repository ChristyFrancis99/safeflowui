import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckSquare, CheckCircle2, RotateCcw, ArrowUpRight, Clock, XCircle } from "lucide-react";
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { demoCase } from "@/data/mock-investigation";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/approvals")({ component: ApprovalsPage });

const initialItems = [
  { id: "FC-2026-00421", title: demoCase.title, investigator: "Marcus Johnson", risk: { level: "HIGH", score: 84 }, recommendation: "ESCALATE", waitingTime: "2 hours ago" },
  { id: "FC-2026-00422", title: "Unusual destination country & rapid transfer", investigator: "Priya Patel", risk: { level: "HIGH", score: 72 }, recommendation: "VERIFY", waitingTime: "4 hours ago" },
  { id: "FC-2026-00420", title: "Large cash withdrawal flagged across multiple locations", investigator: "David Rodriguez", risk: { level: "MEDIUM", score: 58 }, recommendation: "VERIFY", waitingTime: "6 hours ago" },
];

function ApprovalsPage() {
  const [items, setItems] = useState(initialItems);
  const [notice, setNotice] = useState("");
  const act = (id: string, action: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
    setNotice(`${action} recorded for ${id}. The case was removed from the pending queue.`);
  };
  return (
    <DashboardLayout title="Manager Approvals Queue">
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 flex items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-violet/10 text-violet"><CheckSquare className="size-5" /></div><div><h2 className="text-lg font-semibold text-foreground">Pending Review & Sign-Off</h2><p className="text-xs text-muted-foreground">Approve, return, or escalate investigation decisions submitted by analysts.</p></div></div><span className="rounded-full border border-risk-medium/20 bg-risk-medium/10 px-2.5 py-1 text-xs font-semibold text-risk-medium">{items.length} pending</span></div>
        {notice && <div className="rounded-xl border border-teal/20 bg-teal/10 p-3 text-xs text-teal">{notice}</div>}
        <div className="rounded-2xl border border-border bg-card overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground"><th className="px-6 py-4 text-left">Case ID</th><th className="px-6 py-4 text-left">Submitted By</th><th className="px-6 py-4 text-left">Risk Level</th><th className="px-6 py-4 text-left">AI Rec</th><th className="px-6 py-4 text-left">Submitted</th><th className="px-6 py-4 text-left">Action</th></tr></thead><tbody className="divide-y divide-border">
          {items.map((item) => <tr key={item.id} className="hover:bg-muted/20 transition-colors">
            <td className="px-6 py-4"><Link to="/dashboard/cases/$caseId" params={{ caseId: item.id }} className="font-semibold text-violet hover:underline flex items-center gap-1">{item.id}<ArrowUpRight className="size-3" /></Link><p className="text-xs text-muted-foreground mt-0.5 max-w-xs truncate">{item.title}</p></td>
            <td className="px-6 py-4 text-xs font-medium text-foreground">{item.investigator}</td>
            <td className="px-6 py-4"><span className={cn("font-bold text-xs px-2 py-0.5 rounded-full", item.risk.level === "HIGH" ? "bg-risk-high/10 text-risk-high" : "bg-risk-medium/10 text-risk-medium")}>{item.risk.level} ({item.risk.score}/100)</span></td>
            <td className="px-6 py-4"><span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-violet/10 text-violet">{item.recommendation}</span></td>
            <td className="px-6 py-4 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><Clock className="size-3" />{item.waitingTime}</span></td>
            <td className="px-6 py-4"><div className="flex flex-wrap items-center gap-2"><Button asChild size="sm" variant="outline" className="text-xs"><Link to="/dashboard/cases/$caseId" params={{ caseId: item.id }}>Review Case</Link></Button><Button size="sm" className="text-xs gap-1 bg-teal text-white" onClick={() => act(item.id, "Approval")}><CheckCircle2 className="size-3" />Approve</Button><Button size="sm" variant="outline" className="text-xs gap-1" onClick={() => act(item.id, "Return")}><RotateCcw className="size-3" />Return</Button><Button size="sm" variant="outline" className="text-xs gap-1 border-risk-high/30 text-risk-high hover:bg-risk-high/10" onClick={() => act(item.id, "Escalation")}><XCircle className="size-3" />Escalate</Button></div></td>
          </tr>)}
        </tbody></table></div></div>
        {items.length === 0 && <div className="rounded-2xl border border-border bg-card p-10 text-center"><CheckCircle2 className="mx-auto size-8 text-teal" /><h3 className="mt-3 text-sm font-semibold text-foreground">Queue cleared</h3><p className="mt-1 text-xs text-muted-foreground">All pending decisions have been actioned in this demo session.</p></div>}
      </div>
    </DashboardLayout>
  );
}
