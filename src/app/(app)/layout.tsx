'use client';

import {
  Bot,
  Calendar,
  FileUp,
  LayoutDashboard,
  Menu,
  Package,
  FileText,
  Users,
  Truck,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navLinks = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/orders', label: 'Orders', icon: Package },
    { href: '/users', label: 'Users', icon: Users },
    { href: '/reports', label: 'Reports', icon: FileText },
  ];

  const aiToolsLinks = [
    { href: '/tools/optimal-load', label: 'Optimal Load', icon: Truck },
    {
      href: '/tools/delivery-prediction',
      label: 'Delivery Prediction',
      icon: Calendar,
    },
    {
      href: '/tools/document-recognition',
      label: 'Document Recognition',
      icon: FileUp,
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Truck className="h-6 w-6" />
            <span className="sr-only">Override</span>
          </Link>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="text-muted-foreground hover:text-foreground -ml-4">
                  AI Tools
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>AI Features</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {aiToolsLinks.map(({ href, label }) => (
                 <DropdownMenuItem key={href} asChild>
                    <Link href={href}>{label}</Link>
                 </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Truck className="h-6 w-6" />
                <span className="sr-only">Override</span>
              </Link>
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="text-muted-foreground hover:text-foreground">
                  {label}
                </Link>
              ))}
              <div className='pt-2'>
                <p className='text-sm font-semibold text-muted-foreground px-1 pb-2'>AI Tools</p>
                {aiToolsLinks.map(({ href, label }) => (
                    <Link key={href} href={href} className="flex items-center py-2 text-muted-foreground hover:text-foreground">
                      {label}
                    </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}