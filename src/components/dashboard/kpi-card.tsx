import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Kpi } from "@/lib/types";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const isIncrease = kpi.changeType === 'increase';
  const isPositive = !kpi.change.startsWith('-');

  // In brutalism, we might want to be explicit with colors.
  // Let's say green for "good" changes and red for "bad" ones.
  // A decrease in load time is good (positive). An increase in incidents is bad (negative).
  const isGoodChange = (isIncrease && isPositive) || (!isIncrease && !isPositive);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{kpi.value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <span className={cn(
            "font-semibold",
            isGoodChange ? "text-green-500" : "text-red-500"
          )}>
            {kpi.change}
          </span>
          {kpi.description}
        </p>
      </CardContent>
    </Card>
  );
}