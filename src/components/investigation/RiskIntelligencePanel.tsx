import { AlertTriangle } from "lucide-react";
import type { RiskScore } from "@/types/investigation";

const levelStyle = {
  LOW: "border-[#30363d] bg-[#21262d] text-[#b5baff]",
  MEDIUM: "border-[#30363d] bg-[#21262d] text-[#b5baff]",
  HIGH: "border-[#6b4a7d] bg-[#23162b] text-[#b5baff]",
  CRITICAL: "border-[#6b4a7d] bg-[#23162b] text-[#b5baff]",
};

export function RiskIntelligencePanel({ risk }: { risk: RiskScore }) {
  const maxContribution = Math.max(...risk.factors.map((factor) => factor.contribution), 1);

  return (
    <aside
      className="rounded-md border border-[#30363d] bg-[#161b22] p-5 sm:p-6 text-white"
      aria-labelledby="risk-intelligence-title"
    >
      <div className="flex items-start justify-between gap-3 border-b border-[#30363d] pb-4">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8b949e]">
            Risk Intelligence
          </p>
          <h2 id="risk-intelligence-title" className="mt-1 text-lg font-semibold text-white">
            Risk Score
          </h2>
        </div>
        <AlertTriangle className="size-5 text-[#b5baff]" aria-hidden="true" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-center">
        <div className="rounded-md border border-[#30363d] bg-[#0d1117] p-5">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b949e]">
            Risk Score
          </p>

          <div className="mt-4 flex items-end gap-2">
            <span className="text-5xl font-bold leading-none tabular-nums text-white">
              {risk.value}
            </span>
            <span className="pb-1 text-sm font-medium text-[#8b949e]">/ {risk.max}</span>
          </div>

          <div className="mt-5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${levelStyle[risk.level]}`}
            >
              <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
              {risk.level}
            </span>
          </div>

          <p className="mt-5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-[#8b949e]">
            Case <span className="text-white">FC-2026-00421</span>
          </p>
        </div>

        <div className="min-w-0">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b949e]">
              Feature Contribution
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#8b949e]">
              Signal weight
            </span>
          </div>

          <ul className="mt-4 space-y-4">
            {risk.factors.map((factor) => {
              const width = Math.max((factor.contribution / maxContribution) * 100, 4);

              return (
                <li key={factor.label}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="min-w-0 truncate text-sm font-semibold text-white">
                      {factor.label}
                    </span>
                    <span className="shrink-0 font-mono text-xs font-semibold tabular-nums text-[#b5baff]">
                      +{factor.contribution}
                    </span>
                  </div>

                  <div
                    className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#21262d]"
                    role="progressbar"
                    aria-label={`${factor.label} contribution`}
                    aria-valuenow={factor.contribution}
                    aria-valuemin={0}
                    aria-valuemax={maxContribution}
                  >
                    <div
                      className="h-full rounded-full bg-[#b5baff]"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
