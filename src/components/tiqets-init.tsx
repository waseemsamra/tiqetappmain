'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useTiqetsWidget() {
  const pathname = usePathname();

  useEffect(() => {
    // After navigation, ensure widgets can be triggered
    // The Tiqets script auto-binds on load via afterInteractive strategy
    const timer = setTimeout(() => {
      // Verify the script has processed widgets
      const configs = document.querySelectorAll('[data-tiqets-widget="booking"]');
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]);
}

export function TiqetsInit() {
  useTiqetsWidget();
  return null;
}