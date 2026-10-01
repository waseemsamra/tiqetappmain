'use client';

import Link from 'next/link';
import { useState } from 'react';
import { UserCircle, Ticket, HelpCircle, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { languageShortLabel } from '@/lib/preferences';
import { SettingsModal } from './settings-modal';
import { usePreferences } from './preferences-provider';

export default function Header() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const { preferences } = usePreferences();

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-background shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
              <Ticket className="h-7 w-7" />
              <span className="text-2xl font-bold">AAFare</span>
            </Link>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-muted-foreground"
                onClick={() => setIsSettingsModalOpen(true)}
                aria-label="Update language and currency"
              >
                <Globe className="mr-2 h-5 w-5" />
                {languageShortLabel(preferences.language)} / {preferences.currency}
              </Button>
              <Button variant="ghost" className="text-muted-foreground">
                <HelpCircle className="mr-2 h-5 w-5" />
                Help
              </Button>

              <div className="h-6 w-px bg-border" />

              <Button asChild variant="ghost" className="text-muted-foreground">
                <Link href="/login">
                  <UserCircle className="mr-2 h-5 w-5" />
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <SettingsModal isOpen={isSettingsModalOpen} onOpenChange={setIsSettingsModalOpen} />
    </>
  );
}
