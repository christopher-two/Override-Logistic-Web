'use client';

import { Line, LineChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import { onTimeDeliveriesData } from '@/lib/data';

const chartConfig = {
  onTime: {
    label: 'On-Time',
    color: 'hsl(var(--primary))',
  },
};

export function OnTimeDeliveriesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>On-Time Delivery Rate</CardTitle>
        <CardDescription>Performance over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={onTimeDeliveriesData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                content={<ChartTooltipContent
                  formatter={(value) => `${value}%`}
                  indicator="dot"
                 />}
              />
              <Line
                type="monotone"
                dataKey="onTime"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{
                  fill: "hsl(var(--primary))",
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}