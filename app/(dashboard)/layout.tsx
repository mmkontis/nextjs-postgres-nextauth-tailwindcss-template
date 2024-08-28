import Link from 'next/link';
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
  Search,
  Calendar,
  Radio,
  Users,
  FileText,
  FileCheck,
  Building,
  CreditCard
} from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Analytics } from '@vercel/analytics/react';
import { User } from './components/user';
import { VercelLogo } from '@/components/icons';
import Providers from './providers';
import { NavItem } from './components/nav-item';
import { SearchInput } from './components/search';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
            <DashboardBreadcrumb />
            <SearchInput />
            <User />
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}

function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col gap-4 p-4">
        <Link
          href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs"
          className="flex items-center gap-2 px-2 py-1"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <VercelLogo className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">Univation</span>
        </Link>

        <div className="mt-4">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">Main</h3>
          <NavItem href="/" label="Home">
            <Home className="h-5 w-5 mr-3" />
            Home
          </NavItem>
        </div>

        <div className="mt-4">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">Posting</h3>
          <NavItem href="#" label="Opportunities">
            <Search className="h-5 w-5 mr-3" />
            Opportunities
          </NavItem>
        </div>

        <div className="mt-4">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">Relationships</h3>
          <NavItem href="/fairs" label="Fairs">
            <Calendar className="h-5 w-5 mr-3" />
            Fairs
          </NavItem>
          <NavItem href="#" label="Talent Radar">
            <Radio className="h-5 w-5 mr-3" />
            Talent Radar
          </NavItem>
          <NavItem href="#" label="Available Talent">
            <Users className="h-5 w-5 mr-3" />
            Available Talent
          </NavItem>
        </div>

        <div className="mt-4">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">Management</h3>
          <NavItem href="#" label="Lists">
            <FileText className="h-5 w-5 mr-3" />
            Lists
          </NavItem>
          <NavItem href="#" label="Applications">
            <FileCheck className="h-5 w-5 mr-3" />
            Applications
          </NavItem>
        </div>
      </nav>
      <nav className="mt-auto flex flex-col gap-4 p-4">
        <div>
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">Administration</h3>
          <NavItem href="#" label="Organization">
            <Building className="h-5 w-5 mr-3" />
            Organization
          </NavItem>
          <NavItem href="#" label="Billing">
            <CreditCard className="h-5 w-5 mr-3" />
            Billing
          </NavItem>
        </div>
      </nav>
    </aside>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Vercel</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Users2 className="h-5 w-5" />
            Customers
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function DashboardBreadcrumb() {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Products</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>All Products</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
