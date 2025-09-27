import { AppSidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { SidebarInset } from '@/components/ui/sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <SidebarInset>
            <main className="flex-1 p-4 sm:px-6 sm:py-0 pt-14 sm:pt-0">{children}</main>
        </SidebarInset>
      </div>
    </div>
  );
}
