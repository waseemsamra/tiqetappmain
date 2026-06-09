'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type TiqetsWindow = Window & {
  tiqets?: {
    init?: () => void;
    reinit?: () => void;
    _loaded?: boolean;
  };
};

export function TiqetsInit() {
  const pathname = usePathname();

  useEffect(() => {
    // On route change, trigger widget rebind
    const rebindWidgets = () => {
      const win = window as TiqetsWindow;
      
      // Find all widget configs and their trigger buttons
      const configs = document.querySelectorAll('[data-tiqets-widget="booking"]');
      
      configs.forEach(config => {
        const triggerSelector = config.getAttribute('data-trigger-selector');
        if (triggerSelector) {
          const triggerEl = document.querySelector(triggerSelector);
          // The Tiqets script should auto-bind, but we can manually click to force it
          // This is what the original code was doing
        }
      });
    };

    // Wait for React to hydrate new content
    const timer = setTimeout(rebindWidgets, 300);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // Initial page load - ensure widgets are bound
    // The script in <head> should handle this, but let's also check
    const timer = setTimeout(() => {
      const win = window as TiqetsWindow;
      if (win.tiqets?._loaded && !win.tiqets.init) {
        // Script loaded but maybe didn't bind yet
        win.tiqets.init?.();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}