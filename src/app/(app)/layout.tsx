'use client';

import { Sidebar, SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import Link from 'next/link';

// Custom trigger component to avoid nesting issues and allow for custom content.
function AiToolsSidebarTrigger() {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="outline" onClick={toggleSidebar}>
      <Bot />
      <span>AI Tools</span>
    </Button>
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <div className="flex flex-col flex-1">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tight">Override</span>
            </Link>
            <div className="ml-auto">
              <AiToolsSidebarTrigger />
            </div>
          </header>
          <main className="flex-1 p-4 sm:px-6 sm:py-6">{children}</main>
        </div>
        <Sidebar side="right" collapsible="offcanvas" className="w-96">
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">AI Tools</h2>
            <div className="grid gap-2">
              <Button asChild variant="ghost" className="justify-start">
                  <Link href="/tools/optimal-load">Optimal Load</Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                  <Link href="/tools/delivery-prediction">Delivery Prediction</Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                  <Link href="/tools/document-recognition">Document Recognition</Link>
              </Button>
            </div>
          </div>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
