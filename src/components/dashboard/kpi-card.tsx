import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Kpi } from "@/lib/types";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const isIncrease = kpi.changeType === 'increase';
  const isPositiveChange = (isIncrease && !kpi.change.startsWith('-')) || (!isIncrease && kpi.change.startsWith('-'));

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
            isPositiveChange ? "text-green-600" : "text-red-600"
          )}>
            {kpi.change}
          </span>
          {kpi.description}
        </p>
      </CardContent>
    </Card>
  );
}
