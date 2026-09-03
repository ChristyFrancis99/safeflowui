import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Circle, Eye, LoaderCircle, ShieldAlert, ChevronRight } from "lucide-react";
import { agents as defaultAgents } from "@/data/mock-investigation";
import type { Agent } from "@/types/investigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type InvestigationAgentState = "Waiting" | "Running" | "Completed" | "Needs Review";
export interface InvestigationAgentProgress { status: InvestigationAgentState; activity: string; progress?: number; findingCount?: number; }

const pipelineAgentIds = ["risk", "data", "compliance", "reason"];
const defaultProgress: Record<string, InvestigationAgentProgress> = {
  risk: { status: "Completed", activity: "Risk score decomposed across behavioral signals", progress: 100, findingCount: 6 },
  data: { status: "Completed", activity: "Transaction, device and network context compiled", progress: 100, findingCount: 7 },
  compliance: { status: "Completed", activity: "Applicable AML and regulatory context grounded", progress: 100, findingCount: 4 },
  reason: { status: "Running", activity: "Synthesizing evidence into investigator reasoning", progress: 72, findingCount: 3 },
};
const serviceNameMap: Record<string, string> = {
  risk: "Score Agent",
  data: "Context Agent",
  compliance: "Compliance Agent",
  reason: "Reasoning Agent",
};
const pipelineAgents = defaultAgents.filter((agent) => pipelineAgentIds.includes(agent.id));

export interface AgentStatusProps { agents?: Agent[]; progressByAgent?: Record<string, InvestigationAgentProgress>; onViewInvestigation?: () => void; className?: string; }

function StatusMark({ status }: { status: InvestigationAgentState }) {
  if (status === "Completed") return <CheckCircle2 className="size-3.5 text-teal" aria-hidden="true" />;
  if (status === "Running") return <LoaderCircle className="size-3.5 animate-spin text-violet" aria-hidden="true" />;
  if (status === "Needs Review") return <ShieldAlert className="size-3.5 text-risk-medium" aria-hidden="true" />;
  return <Circle className="size-3.5 text-muted-foreground" aria-hidden="true" />;
}
const statusBadgeStyle: Record<InvestigationAgentState, string> = {
  Completed: "bg-teal/10 text-teal border-teal/20",
  Running: "bg-violet/10 text-violet border-violet/20",
  Waiting: "bg-muted text-muted-foreground border-border",
  "Needs Review": "bg-risk-medium/10 text-risk-medium border-risk-medium/20",
};

export function AgentStatus({ agents = pipelineAgents, progressByAgent = defaultProgress, onViewInvestigation, className }: AgentStatusProps) {
  const navigate = useNavigate();
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const handleViewInvestigation = () => onViewInvestigation ? onViewInvestigation() : navigate({ to: "/dashboard/cases/FC-2026-00421" });

  return (
    <section className={cn("rounded-xl border border-border bg-card p-5 sm:p-6", className)} aria-labelledby="ai-investigation-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-4">
        <div><p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase font-mono">AI Investigation Agents</p><h2 id="ai-investigation-title" className="mt-0.5 text-base font-bold tracking-tight text-foreground">Four-agent investigation pipeline</h2></div>
        <Button type="button" variant="outline" size="sm" onClick={handleViewInvestigation} className="h-8 text-xs gap-1.5"><Eye className="size-3.5" />Review case log</Button>
      </div>
      <div className="mt-4 divide-y divide-border/70 rounded-lg border border-border/80 bg-background/50 overflow-hidden">
        {agents.map((agent, index) => {
          const details = progressByAgent[agent.id] ?? { status: "Waiting", activity: "Awaiting upstream input", progress: 0, findingCount: 0 };
          const serviceName = serviceNameMap[agent.id] || agent.name;
          const progress = details.progress ?? (details.status === "Completed" ? 100 : 0);
          const isExpanded = selectedAgentId === agent.id;
          return (
            <div key={agent.id} className="transition-colors hover:bg-muted/10">
              <button type="button" onClick={() => setSelectedAgentId(isExpanded ? null : agent.id)} className="flex w-full items-center justify-between gap-3 p-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/20">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="flex size-6 items-center justify-center rounded-md bg-muted font-mono text-[11px] font-bold text-muted-foreground shrink-0">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1"><div className="flex items-center gap-2 flex-wrap"><p className="text-xs font-bold text-foreground truncate">{serviceName}</p></div><p className="text-[11px] text-muted-foreground truncate mt-0.5">{details.activity}</p></div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden sm:flex items-center gap-2"><div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden"><div className={cn("h-full rounded-full transition-all duration-500", details.status === "Completed" ? "bg-teal" : details.status === "Running" ? "bg-violet" : "bg-muted-foreground")} style={{ width: `${progress}%` }} /></div><span className="font-mono text-[11px] text-muted-foreground w-8 text-right">{progress}%</span></div>
                  <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold", statusBadgeStyle[details.status])}><StatusMark status={details.status} />{details.status}</span>
                  <ChevronRight className={cn("size-4 text-muted-foreground transition-transform duration-200", isExpanded && "rotate-90")} />
                </div>
              </button>
              {isExpanded && <div className="bg-muted/30 p-3.5 border-t border-border/60 text-xs space-y-2"><div className="flex items-center justify-between text-muted-foreground"><span>Agent scope</span><span className="font-medium text-foreground">{agent.role}</span></div><div className="flex items-center justify-between text-muted-foreground"><span>Findings registered</span><span className="font-mono font-bold text-foreground">{details.findingCount || 0} signals</span></div><div className="flex items-center justify-between text-muted-foreground"><span>Execution tier</span><span className="font-mono uppercase text-[10px] text-violet font-semibold">{agent.tier}</span></div></div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
