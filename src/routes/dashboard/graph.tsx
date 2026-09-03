import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { InvestigationGraph } from "@/components/investigation/InvestigationGraph";
import { graphEdges, graphNodes } from "@/data/mock-investigation";

export const Route = createFileRoute("/dashboard/graph")({ component: GraphPage });

function GraphPage() {
  return (
    <DashboardLayout title="Transaction Graph">
      <div className="space-y-5">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Relationship intelligence</p>
          <h2 className="mt-1 text-lg font-semibold text-foreground">Account and transaction network</h2>
          <p className="mt-1 text-sm text-muted-foreground">Trace connected accounts, transfer paths, and suspicious nodes for the active investigation.</p>
        </div>
        <InvestigationGraph nodes={graphNodes} edges={graphEdges} />
      </div>
    </DashboardLayout>
  );
}
