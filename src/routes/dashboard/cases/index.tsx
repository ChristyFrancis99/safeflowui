import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, Search, ArrowUpRight, Loader2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { demoCase } from "@/data/mock-investigation";
import { cn } from "@/lib/utils";
import { listCases, type BackendCase } from "@/lib/api";

export const Route = createFileRoute("/dashboard/cases/")({ component: CasesListPage });
function toRiskLevel(band: string): "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" { const upper = band.toUpperCase(); if (upper === "CRITICAL") return "CRITICAL"; if (upper === "HIGH") return "HIGH"; if (upper === "MEDIUM") return "MEDIUM"; return "LOW"; }
function toRecommendation(action: string): "ALLOW" | "VERIFY" | "ESCALATE" { const upper = action.toUpperCase(); if (upper.includes("ESCALAT") || upper.includes("BLOCK")) return "ESCALATE"; if (upper.includes("FLAG") || upper.includes("MONITOR") || upper.includes("REVIEW")) return "VERIFY"; return "ALLOW"; }
function backendCaseToUI(bc: BackendCase) { const riskLevel = toRiskLevel(bc.risk_band); return { id: bc.case_id, title: bc.transaction_id, alert: bc.recommended_action, openedAt: bc.opened_at, risk: { score: bc.risk_score, level: riskLevel, value: Math.round(bc.risk_score), max: 100 }, recommendation: toRecommendation(bc.recommended_action), status: bc.status }; }
const mockCases = [
  { ...demoCase, title: "Unusual transaction velocity" },
  { ...demoCase, id: "FC-2026-00422", title: "Cross-Border Structuring Alert", alert: "Unusual destination country & rapid transfer", openedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), risk: { score: 72, level: "HIGH" as const, value: 72, max: 100, factors: demoCase.risk.factors }, recommendation: "VERIFY" as const },
  { ...demoCase, id: "FC-2026-00420", title: "Automated ATM Velocity Spike", alert: "Large cash withdrawal flagged across multiple locations", openedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), risk: { score: 58, level: "MEDIUM" as const, value: 58, max: 100, factors: demoCase.risk.factors }, recommendation: "VERIFY" as const },
];

function CasesListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const { data: apiResponse, isLoading, isError } = useQuery({ queryKey: ["cases", selectedFilter], queryFn: () => listCases({ risk_band: selectedFilter === "ALL" ? undefined : selectedFilter, limit: 50 }), retry: 1, staleTime: 10_000 });
  const cases = apiResponse ? apiResponse.cases.map(backendCaseToUI) : mockCases;
  const filteredCases = cases.filter((item) => (item.id.toLowerCase().includes(searchTerm.toLowerCase()) || item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.alert.toLowerCase().includes(searchTerm.toLowerCase())) && (selectedFilter === "ALL" || item.risk.level === selectedFilter));
  const riskClass = (level: string) => level === "CRITICAL" ? "bg-risk-critical/10 text-risk-critical border-risk-critical/20" : level === "HIGH" ? "bg-risk-high/10 text-risk-high border-risk-high/20" : level === "MEDIUM" ? "bg-risk-medium/10 text-risk-medium border-risk-medium/20" : "bg-risk-low/10 text-risk-low border-risk-low/20";

  return (
    <DashboardLayout title="Cases Directory">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="flex items-center gap-3"><div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet/10 text-violet"><Briefcase className="size-5" /></div><div><h2 className="text-lg font-semibold text-foreground">Active Case Workspace</h2><p className="text-xs text-muted-foreground">{apiResponse ? `${apiResponse.total} cases from backend` : isLoading ? "Connecting to backend..." : "Showing demo data (backend offline)"}</p></div></div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xs"><input type="text" placeholder="Search case ID, title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-4 text-xs text-foreground outline-none focus:ring-2 focus:ring-violet/20" /><Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" /></div>
            <div className="flex flex-wrap items-center gap-1 rounded-xl border border-border bg-background p-1 text-xs" role="group" aria-label="Filter cases by risk level">{["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"].map((level) => <button key={level} type="button" onClick={() => setSelectedFilter(level)} className={cn("rounded-lg px-2.5 py-1.5 font-medium transition-colors", selectedFilter === level ? "bg-violet text-white" : "text-muted-foreground hover:text-foreground")}>{level}</button>)}</div>
          </div>
        </div>
        {isLoading && <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground"><Loader2 className="size-4 animate-spin" /><span className="text-sm">Loading cases from backend...</span></div>}
        <div className="rounded-2xl border border-border bg-card overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground"><th className="px-6 py-4 text-left">Case ID</th><th className="px-6 py-4 text-left">Status</th><th className="px-6 py-4 text-left">Risk Level</th><th className="px-6 py-4 text-left">Alert / Action</th><th className="px-6 py-4 text-left">AI Recommendation</th><th className="px-6 py-4 text-left">Action</th></tr></thead><tbody className="divide-y divide-border">
          {filteredCases.map((caseItem) => <tr key={caseItem.id} className="hover:bg-muted/20 transition-colors"><td className="px-6 py-4"><Link to="/dashboard/cases/$caseId" params={{ caseId: caseItem.id }} className="font-semibold text-violet hover:underline flex items-center gap-1">{caseItem.id}<ArrowUpRight className="size-3" /></Link><p className="text-xs text-muted-foreground mt-0.5">{caseItem.title}</p></td><td className="px-6 py-4"><span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-foreground">{(caseItem as { status?: string }).status ?? "OPEN"}</span></td><td className="px-6 py-4"><div className="flex items-center gap-2"><span className={cn("font-bold text-xs px-2 py-0.5 rounded-full border", riskClass(caseItem.risk.level))}>{caseItem.risk.level}</span><span className="text-xs text-muted-foreground">{caseItem.risk.value}/100</span></div></td><td className="px-6 py-4"><span className="text-xs text-foreground">{caseItem.alert}</span></td><td className="px-6 py-4"><span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-violet/10 text-violet">{caseItem.recommendation}</span></td><td className="px-6 py-4"><Button asChild size="sm" variant="outline" className="text-xs gap-1"><Link to="/dashboard/cases/$caseId" params={{ caseId: caseItem.id }}>View Workspace<ArrowUpRight className="size-3" /></Link></Button></td></tr>)}
          {filteredCases.length === 0 && !isLoading && <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">No cases found{searchTerm ? ` matching "${searchTerm}"` : ""}.</td></tr>}
        </tbody></table></div></div>
        {isError && <p className="text-center text-xs text-muted-foreground">⚠ Backend offline — showing demo data.</p>}
      </div>
    </DashboardLayout>
  );
}
