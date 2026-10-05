'use client';

import Link from 'next/link';
import { useState } from 'react';
import { UserCircle, HelpCircle, Globe } from 'lucide-react';
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
          <div className="flex h-14 items-center justify-between">
            <Link href="/" aria-label="AAFare" className="flex items-center gap-2">
              <img src="/aafare-logo.png" alt="AAFare" className="h-10 w-auto" />
              <span className="flex flex-col justify-center leading-none">
                <span className="text-lg font-bold text-primary">AAFare</span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.5px] text-muted-foreground">
                  International
                </span>
              </span>
            </Link>

            <div className="flex items-center gap-1 sm:gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                onClick={() => setIsSettingsModalOpen(true)}
                aria-label="Update language and currency"
              >
                <Globe className="h-5 w-5" />
                <span className="hidden sm:inline-flex">{languageShortLabel(preferences.language)} / {preferences.currency}</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <HelpCircle className="h-5 w-5" />
                <span className="hidden sm:inline-flex">Help</span>
              </Button>

              <div className="hidden sm:block h-6 w-px bg-border" />

              <Button asChild variant="ghost" size="icon" className="text-muted-foreground">
                <Link href="/login">
                  <UserCircle className="h-5 w-5" />
                  <span className="hidden sm:inline">Sign In</span>
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
