'use client';

import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import { dispatchesData } from '@/lib/data';

const chartConfig = {
  dispatches: {
    label: 'Dispatches',
    color: 'hsl(var(--primary))',
  },
};

export function DispatchesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dispatches per Employee</CardTitle>
        <CardDescription>Top 5 employees by dispatches this week.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dispatchesData} margin={{ top: 20 }}>
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="dispatches" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}