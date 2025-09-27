import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    {
      title: 'Monthly Delivery Performance',
      description: 'A comprehensive report on delivery times, on-time rates, and exceptions for the last month.',
    },
    {
      title: 'Employee Dispatch Summary',
      description: 'Summary of dispatches handled by each employee, including volume and efficiency metrics.',
    },
    {
      title: 'Quarterly Incident Report',
      description: 'Detailed log of all reported incidents, categorized by type and severity.',
    },
    {
      title: 'Full Order History',
      description: 'Complete export of all order data for a specified date range.',
    },
  ];

  return (
    <>
      <PageHeader title="Reports" description="Export operational data for analysis and record-keeping." />
      <div className="grid gap-6">
        {reports.map((report, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="grid gap-1">
                <CardTitle>{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download CSV
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
}
