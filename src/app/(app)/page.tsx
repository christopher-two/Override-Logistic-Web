import { kpis } from '@/lib/data';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { OnTimeDeliveriesChart } from '@/components/dashboard/on-time-deliveries-chart';
import { DispatchesChart } from '@/components/dashboard/dispatches-chart';
import { PageHeader } from '@/components/page-header';

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="Real-time overview of your logistics operations." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.title} kpi={kpi} />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <OnTimeDeliveriesChart />
        <DispatchesChart />
      </div>
    </>
  );
}
