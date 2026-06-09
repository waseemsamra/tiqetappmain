'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useTiqetsWidget() {
  const pathname = usePathname();

  useEffect(() => {
    // On route change, wait for new widgets and let Tiqets rebind
    const timer = setTimeout(() => {
      // The Tiqets script already loaded - just verify elements exist
      const widgets = document.querySelectorAll('[data-tiqets-widget="booking"]');
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);
}

export function TiqetsInit() {
  useTiqetsWidget();
  return null;
}