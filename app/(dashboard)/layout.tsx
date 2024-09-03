"use client"
import {
  Home,
  Package2,
  PanelLeft,
  Search,
  Calendar,
  Radio,
  Users,
  FileText,
  FileCheck,
  Building,
  CreditCard,
  Sparkles,
  ChevronRight,
  Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Analytics } from '@vercel/analytics/react';
import { User } from './components/user';
import Providers from './providers';
import { NavItem } from './components/nav-item';
import { SearchInput } from './components/search';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { GeminiChat, Person } from '@/components/GeminiChatHome';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
  };

  return (
    <Providers>
      <main className="flex min-h-screen w-full bg-muted/40">
        <DesktopNav onPersonClick={handlePersonClick} />
        <div className="flex-1 flex flex-col ml-64">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-end gap-4 border-b bg-background px-4 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
          </header>
          <div className="flex-1 flex">
            {selectedPerson ? (
              <div className="flex-1 flex">
                <div className="w-64 border-r">
                  <ConversationsSidebar person={selectedPerson} />
                </div>
                <div className="flex-1 bg-background/50 backdrop-blur-sm">
                  <GeminiChat person={selectedPerson} />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-lg text-muted-foreground">Select a person to start chatting</p>
              </div>
            )}
          </div>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}

function DesktopNav({ onPersonClick }: { onPersonClick: (person: Person) => void }) {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const avras = [
    { name: 'John Doe', role: 'Marketing' },
    { name: 'Jane Smith', role: 'Design' },
    { name: 'Alex Johnson', role: 'Sales' },
    { name: 'Emily Brown', role: 'Product' },
    { name: 'Michael Lee', role: 'Executive Assistant' }
  ];

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person.name);
    onPersonClick(person);
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col gap-4 p-4 flex-grow">
        <Link
          href="/"
          className="flex items-center gap-2 px-2 py-1"
        >
          <Image
            src="https://www.tapback.co/api/avatar/Univation"
            alt="Univation Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
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
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">Your Avras</h3>
          <div className="flex flex-col gap-2">
            {avras.map(({ name, role }) => (
              <button
                key={name}
                onClick={() => handlePersonClick({ name, role })}
                className={`flex items-center justify-between px-2 py-1 hover:bg-muted rounded-md transition-colors ${
                  selectedPerson === name ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={`https://www.tapback.co/api/avatar/${encodeURIComponent(name)}`}
                    alt={name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-sm">{name}</span>
                </div>
                <Badge variant="outline" className="text-xs whitespace-nowrap">{role}</Badge>
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      <div className="mt-auto p-4 border-t">
        <User />
        <div className="mt-4">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">Credits</h3>
          <div className="px-2 text-2xl font-bold">500</div>
        </div>
        <Button variant="default" className="w-full mt-4">Upgrade</Button>
      </div>
    </aside>
  );
}

function ConversationsSidebar({ person }: { person: Person }) {
  const conversations = [
    { id: 1, title: 'Project Discussion' },
    { id: 2, title: 'Weekly Update' },
    { id: 3, title: 'Client Meeting' },
    // Add more conversations as needed
  ];

  return (
    <aside className="fixed inset-y-0 left-64 z-20 w-64 flex-col border-r bg-muted/60 flex">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Conversations with {person.name}</h2>
        <div className="flex flex-col gap-2">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/conversations/${conversation.id}`}
              className="px-3 py-2 hover:bg-muted rounded-md transition-colors"
            >
              {conversation.title}
            </Link>
          ))}
        </div>
      </div>
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

          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">Main</h3>
            <Link href="/" className="flex items-center gap-4 px-2.5 text-foreground">
              <Home className="h-5 w-5" />
              Home
            </Link>
          </div>

          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">Posting</h3>
            <Link href="/opportunities" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <Search className="h-5 w-5" />
              Opportunities
            </Link>
          </div>

          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">Relationships</h3>
            <Link href="/fairs" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <Calendar className="h-5 w-5" />
              Fairs
            </Link>
            <Link href="/talent-radar" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <Radio className="h-5 w-5" />
              Talent Radar
            </Link>
            <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <Users className="h-5 w-5" />
              Available Talent
              <Badge variant="secondary" className="ml-auto">Soon</Badge>
            </Link>
          </div>

          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">Management</h3>
            <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <FileText className="h-5 w-5" />
              Lists
              <Badge variant="secondary" className="ml-auto">Upgrade</Badge>
            </Link>
            <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <FileCheck className="h-5 w-5" />
              Applications
              <Badge variant="secondary" className="ml-auto">Upgrade</Badge>
            </Link>
          </div>

          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">Superpowers</h3>
            <Link href="/ai-recruiter" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <Sparkles className="h-5 w-5" />
              AI Recruiter
              <Badge variant="default" className="ml-2 text-xs">New</Badge>
            </Link>
          </div>

          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">Administration</h3>
            <Link href="/organization" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <Building className="h-5 w-5" />
              Organization
            </Link>
            <Link href="/billing" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <CreditCard className="h-5 w-5" />
              Billing
            </Link>
          </div>

          <Link href="/plans" className="block">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-4 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">Current Plan</span>
                <Badge variant="outline" className="bg-white/20 text-white border-white/40">Free</Badge>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold">€0</span>
                <span className="text-xs opacity-75">/month</span>
              </div>
              <div className="flex items-center text-sm mb-4">
                <Zap className="h-4 w-4 mr-2" />
                <span>0 Talent unlocks</span>
              </div>
              <Button variant="secondary" className="w-full bg-white text-purple-700 hover:bg-purple-100">
                <span>Upgrade Plan</span>
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
