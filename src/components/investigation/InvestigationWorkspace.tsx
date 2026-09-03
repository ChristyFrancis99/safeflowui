import { useState } from "react";
import {
  Check, CircleDot, ClipboardCheck, FileText, Gavel, ShieldCheck, X, CheckCircle2,
  Sparkles, Loader2, AlertTriangle, Copy, FileCheck,
} from "lucide-react";
import { AgentStatus, type InvestigationAgentProgress } from "@/components/dashboard/AgentStatus";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Agent, Case, GraphEdge, GraphNode, InvestigationReport, RegulatorySource } from "@/types/investigation";
import type { BackendCase } from "@/lib/api";
import { InvestigationGraph } from "./InvestigationGraph";
import { RiskIntelligencePanel } from "./RiskIntelligencePanel";

export interface InvestigationWorkspaceProps {
  caseData: Case; evidenceChips: string[]; nodes: GraphNode[]; edges: GraphEdge[]; agents: Agent[];
  regulatorySources: RegulatorySource[]; report: InvestigationReport; backendCase?: BackendCase | null;
  onRunInvestigation?: () => void; isInvestigating?: boolean; onDecision?: (decision: string, notes?: string) => void;
  isSubmittingDecision?: boolean; decisionSuccess?: string | null; strDraft?: string | null;
}

const agentIds = ["risk", "data", "compliance", "reason"];

export function InvestigationWorkspace({
  caseData, evidenceChips, nodes, edges, agents, regulatorySources, report, backendCase,
  onRunInvestigation, isInvestigating = false, onDecision, isSubmittingDecision = false,
  decisionSuccess = null, strDraft = null,
}: InvestigationWorkspaceProps) {
  const [localDecision, setLocalDecision] = useState<string | null>(null);
  const [copiedStr, setCopiedStr] = useState(false);
  const supporting = caseData.evidence.filter((item) => item.kind === "supporting");
  const counter = caseData.evidence.filter((item) => item.kind === "counter");
  const investigationAgents = agents.filter((agent) => agentIds.includes(agent.id));
  const recommendationReasoning = report.sections.find((section) => section.title.includes("Findings") || section.title.includes("Report"))?.summary || backendCase?.investigation_report;

  const handleDecisionClick = (action: string, backendCode: string) => { setLocalDecision(action); onDecision?.(backendCode); };
  const copyStrDraft = () => {
    const textToCopy = strDraft || backendCase?.str_draft || "";
    if (textToCopy) { navigator.clipboard.writeText(textToCopy); setCopiedStr(true); setTimeout(() => setCopiedStr(false), 2500); }
  };

  const progressByAgent: Record<string, InvestigationAgentProgress> = isInvestigating
    ? {
        risk: { status: "Running", activity: "Evaluating behavioral and graph risk signals...", progress: 75, findingCount: 3 },
        data: { status: "Running", activity: "Fetching KYC, device and transaction context...", progress: 90, findingCount: 4 },
        compliance: { status: "Running", activity: "Grounding PMLA / RBI / FIU-IND context...", progress: 65, findingCount: 2 },
        reason: { status: "Running", activity: "Synthesizing evidence into investigator reasoning...", progress: 50, findingCount: 1 },
      }
    : recommendationReasoning
      ? {
          risk: { status: "Completed", activity: "Risk score and topological signals evaluated", progress: 100, findingCount: 3 },
          data: { status: "Completed", activity: "Evidence register compiled and validated", progress: 100, findingCount: 7 },
          compliance: { status: "Completed", activity: "Regulatory context grounded", progress: 100, findingCount: 4 },
          reason: { status: "Completed", activity: "Investigator reasoning report generated", progress: 100, findingCount: 5 },
        }
      : {
          risk: { status: "Waiting", activity: "Awaiting investigation trigger", progress: 0, findingCount: 0 },
          data: { status: "Waiting", activity: "Awaiting investigation trigger", progress: 0, findingCount: 0 },
          compliance: { status: "Waiting", activity: "Awaiting investigation trigger", progress: 0, findingCount: 0 },
          reason: { status: "Waiting", activity: "Awaiting upstream findings", progress: 0, findingCount: 0 },
        };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-10">
      <header className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div><div className="flex items-center gap-2"><span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">Investigation workspace</span><span className="inline-flex items-center rounded-full bg-violet/10 px-2 py-0.5 text-[10px] font-semibold text-violet">AI + Human-in-the-Loop</span></div><h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Case {caseData.id}</h1><p className="mt-1 text-sm text-muted-foreground">{caseData.alert}</p></div>
          <div className="flex flex-wrap items-center gap-3">
            {onRunInvestigation && <Button onClick={onRunInvestigation} disabled={isInvestigating} size="lg" className="gap-2 rounded-xl bg-violet text-white font-semibold">{isInvestigating ? <><Loader2 className="size-4 animate-spin" />Running AI Agents...</> : <><Sparkles className="size-4 text-teal" />Run AI Investigation</>}</Button>}
            <div className="grid min-w-[340px] grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="rounded-xl border border-border bg-muted/30 px-3 py-2"><p className="font-mono text-[9px] uppercase text-muted-foreground">Risk Level</p><p className={cn("mt-0.5 text-xs font-bold", caseData.risk.level === "CRITICAL" ? "text-risk-critical" : caseData.risk.level === "HIGH" ? "text-risk-high" : caseData.risk.level === "MEDIUM" ? "text-risk-medium" : "text-risk-low")}>{caseData.risk.level} · {caseData.risk.value}/100</p></div>
              <div className="rounded-xl border border-border bg-muted/30 px-3 py-2"><p className="font-mono text-[9px] uppercase text-muted-foreground">Status</p><p className="mt-0.5 text-xs font-semibold text-foreground">{backendCase?.status || "OPEN"}</p></div>
              <div className="rounded-xl border border-border bg-muted/30 px-3 py-2"><p className="font-mono text-[9px] uppercase text-muted-foreground">Action</p><p className="mt-0.5 text-xs font-semibold text-violet">{caseData.recommendation}</p></div>
              <div className="rounded-xl border border-border bg-muted/30 px-3 py-2"><p className="font-mono text-[9px] uppercase text-muted-foreground">Opened</p><p className="mt-0.5 font-mono text-[11px] font-semibold text-foreground">{new Intl.DateTimeFormat("en-IN", { dateStyle: "short" }).format(new Date(caseData.openedAt || Date.now()))}</p></div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]"><InvestigationGraph nodes={nodes} edges={edges} /><RiskIntelligencePanel risk={caseData.risk} /></div>
      <AgentStatus agents={investigationAgents} progressByAgent={progressByAgent} />

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6" aria-labelledby="recommendation-title">
        <div className="flex items-start justify-between border-b border-border pb-4"><div className="flex items-start gap-3"><FileText className="mt-0.5 size-5 text-violet" /><div><p className="font-mono text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">AI Investigation & Reasoning Report</p><h2 id="recommendation-title" className="mt-1 text-lg font-bold text-foreground">Executive Synthesis · {caseData.recommendation}</h2></div></div>{onRunInvestigation && !recommendationReasoning && <Button onClick={onRunInvestigation} disabled={isInvestigating} size="sm" variant="outline" className="text-xs gap-1.5"><Sparkles className="size-3.5 text-violet" />Generate Report</Button>}</div>
        {recommendationReasoning ? <div className="mt-4 space-y-4"><div className="rounded-xl border border-violet/20 bg-violet/5 p-4 text-sm leading-relaxed text-foreground whitespace-pre-wrap">{recommendationReasoning}</div>{(strDraft || backendCase?.str_draft) && <div className="rounded-xl border border-teal/20 bg-teal/5 p-4"><div className="mb-2 flex items-center justify-between"><div className="flex items-center gap-2"><FileCheck className="size-4 text-teal" /><span className="text-xs font-bold uppercase tracking-wider text-teal">FIU-IND Suspicious Transaction Report (STR) Draft Generated</span></div><Button onClick={copyStrDraft} size="sm" variant="outline" className="h-7 text-[11px] gap-1">{copiedStr ? <Check className="size-3 text-teal" /> : <Copy className="size-3" />}{copiedStr ? "Copied" : "Copy STR"}</Button></div><pre className="max-h-60 overflow-y-auto rounded-lg bg-background/80 p-3 text-[11px] font-mono leading-relaxed text-muted-foreground whitespace-pre-wrap">{strDraft || backendCase?.str_draft}</pre></div>}</div> : <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-8 text-center"><Sparkles className="mb-2 size-8 text-violet/40" /><p className="text-sm font-semibold text-foreground">AI Investigation Report Not Yet Generated</p><p className="mt-1 max-w-md text-xs text-muted-foreground">Click &quot;Run AI Investigation&quot; to execute the Score, Context, Compliance, and Reasoning agents powered by the investigation pipeline.</p>{onRunInvestigation && <Button onClick={onRunInvestigation} disabled={isInvestigating} size="sm" className="mt-4 gap-1.5 bg-violet text-white text-xs"><Sparkles className="size-3.5" />Run AI Investigation Now</Button>}</div>}
        <div className="mt-5"><p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Supporting signals</p><div className="mt-2 flex flex-wrap gap-2">{supporting.map((item) => <span key={item.label} className="rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs text-foreground">{item.label}</span>)}</div></div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6" aria-labelledby="evidence-title"><p className="font-mono text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">Evidence</p><h2 id="evidence-title" className="mt-1 text-lg font-bold tracking-tight text-foreground">Evidence register</h2><div className="mt-5 grid gap-5 sm:grid-cols-2"><div><h3 className="flex items-center gap-2 text-xs font-semibold text-teal"><Check className="size-4" />Supporting evidence</h3><ul className="mt-3 space-y-2">{supporting.map((item) => <li key={item.label} className="text-xs text-muted-foreground">{item.label}</li>)}</ul></div><div><h3 className="flex items-center gap-2 text-xs font-semibold text-risk-medium"><X className="size-4" />Counter evidence</h3><ul className="mt-3 space-y-2">{counter.length > 0 ? counter.map((item) => <li key={item.label} className="text-xs text-muted-foreground">{item.label}</li>) : <li className="text-xs italic text-muted-foreground">No mitigating signals observed</li>}</ul></div></div><div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">{evidenceChips.map((chip) => <span key={chip} className="rounded-full bg-muted px-2.5 py-1 font-mono text-xs text-foreground">{chip}</span>)}</div></section>
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6" aria-labelledby="regulatory-title"><p className="font-mono text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">Regulatory context</p><h2 id="regulatory-title" className="mt-1 text-lg font-bold tracking-tight text-foreground">Sources consulted</h2><p className="mt-1.5 text-xs text-muted-foreground">Grounding regulatory documents available for investigator review.</p><ul className="mt-4 divide-y divide-border">{regulatorySources.map((source) => <li key={source.code} className="flex gap-3 py-2.5 first:pt-0"><span className="font-mono text-xs font-bold text-violet">{source.code}</span><span className="text-xs text-foreground">{source.name}</span></li>)}</ul></section>
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6" aria-labelledby="human-decision-title"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2"><Gavel className="size-5 text-foreground" /><h2 id="human-decision-title" className="text-lg font-bold tracking-tight text-foreground">Analyst Decision & Maker-Checker</h2></div><p className="mt-1.5 max-w-2xl text-xs text-muted-foreground">AI recommends, human decides. Submit your final verdict to commit to the audit trail.</p><p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground"><CircleDot className="size-3.5 text-teal" />Backed by live audit logging and FIU-IND compliance rules.</p></div><div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant={localDecision === "Block" ? "destructive" : "outline"} disabled={isSubmittingDecision} onClick={() => handleDecisionClick("Block", "APPROVE_BLOCK")} className="gap-1.5 text-xs border-risk-high/30 text-risk-high hover:bg-risk-high/10"><AlertTriangle className="size-4" />{isSubmittingDecision && localDecision === "Block" ? "Submitting..." : "Block & Report"}</Button>
        <Button type="button" variant={localDecision === "Monitor" ? "default" : "outline"} disabled={isSubmittingDecision} onClick={() => handleDecisionClick("Monitor", "APPROVE_FLAG")} className="gap-1.5 text-xs border-risk-medium/30 text-risk-medium hover:bg-risk-medium/10"><ClipboardCheck className="size-4" />Flag for Monitoring</Button>
        <Button type="button" variant={localDecision === "Dismiss" ? "default" : "outline"} disabled={isSubmittingDecision} onClick={() => handleDecisionClick("Dismiss", "DISMISS")} className="gap-1.5 text-xs border-risk-low/30 text-risk-low hover:bg-risk-low/10"><ShieldCheck className="size-4" />Dismiss Case</Button>
        <Button type="button" variant={localDecision === "Escalate" ? "default" : "outline"} disabled={isSubmittingDecision} onClick={() => handleDecisionClick("Escalate", "ESCALATE")} className="gap-1.5 bg-violet text-white hover:bg-violet/90">Escalate to Manager</Button>
      </div></div>{(decisionSuccess || localDecision) && <div className="mt-4 flex items-center gap-2 rounded-xl border border-teal/30 bg-teal/10 p-3 text-xs font-semibold text-teal"><CheckCircle2 className="size-4" /><span>Decision recorded: {decisionSuccess || localDecision}.</span></div>}</section>
    </div>
  );
}
