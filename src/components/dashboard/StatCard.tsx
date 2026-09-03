import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: {
    direction: "up" | "down";
    value: number;
  };
  className?: string;
}

export function StatCard({ label, value, unit, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-card p-4 sm:p-5 transition-colors hover:border-primary/40",
        className,
      )}
    >
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-baseline gap-1.5">
        <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
      {trend && (
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span className="font-medium text-primary">
            {trend.direction === "up" ? "↑" : "↓"} {trend.value}%
          </span>
          <span className="text-muted-foreground">vs last period</span>
        </div>
      )}
    </div>
  );
}
