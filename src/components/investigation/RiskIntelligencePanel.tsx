import { AlertTriangle } from "lucide-react";
import type { RiskScore } from "@/types/investigation";

const levelStyle = {
  LOW: "border-risk-low/40 bg-risk-low/10 text-risk-low",
  MEDIUM: "border-risk-medium/40 bg-risk-medium/10 text-risk-medium",
  HIGH: "border-risk-high/40 bg-risk-high/10 text-risk-high",
  CRITICAL: "border-risk-critical/40 bg-risk-critical/10 text-risk-critical",
};

export function RiskIntelligencePanel({ risk }: { risk: RiskScore }) {
  const maxContribution = Math.max(...risk.factors.map((factor) => factor.contribution), 1);

  return (
    <aside
      className="min-w-0 rounded-2xl border border-border bg-card p-5 text-foreground sm:p-6"
      aria-labelledby="risk-intelligence-title"
    >
      <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Risk Intelligence
          </p>
          <h2 id="risk-intelligence-title" className="mt-1 text-lg font-semibold text-foreground">
            Risk Score
          </h2>
        </div>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-risk-high/30 bg-risk-high/10">
          <AlertTriangle className="size-4 text-risk-high" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {/* Score */}
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Overall Score
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-5xl font-bold leading-none tabular-nums text-foreground">
                  {risk.value}
                </span>
                <span className="font-mono text-sm font-medium text-muted-foreground">
                  / {risk.max}
                </span>
              </div>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${levelStyle[risk.level]}`}
            >
              <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
              {risk.level}
            </span>
          </div>

          <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-label="Overall risk score" aria-valuenow={risk.value} aria-valuemin={0} aria-valuemax={risk.max}>
            <div
              className="h-full rounded-full bg-risk-high transition-[width] duration-500"
              style={{ width: `${Math.min((risk.value / risk.max) * 100, 100)}%` }}
            />
          </div>

          <p className="mt-4 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
            Case <span className="text-foreground">FC-2026-00421</span>
          </p>
        </div>

        {/* Explainable factors */}
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Feature Contribution
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Each signal shows how it contributed to the score.
              </p>
            </div>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              Weight
            </span>
          </div>

          <ul className="mt-4 space-y-4">
            {risk.factors.map((factor) => {
              const width = Math.max((factor.contribution / maxContribution) * 100, 4);

              return (
                <li key={factor.label} className="min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <span className="min-w-0 truncate text-sm font-semibold text-foreground">
                      {factor.label}
                    </span>
                    <span className="shrink-0 font-mono text-xs font-bold tabular-nums text-violet">
                      +{factor.contribution}
                    </span>
                  </div>

                  <div
                    className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-label={`${factor.label} contribution`}
                    aria-valuenow={factor.contribution}
                    aria-valuemin={0}
                    aria-valuemax={maxContribution}
                  >
                    <div
                      className="h-full rounded-full bg-violet transition-[width] duration-500"
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
