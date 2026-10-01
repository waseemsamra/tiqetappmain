'use client';

import { createContext, useCallback, useContext, useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { DEFAULT_CURRENCY, DEFAULT_LANGUAGE } from '@/lib/preferences';

export type Preferences = { language: string; currency: string };

type PreferencesContextValue = {
  preferences: Preferences;
  /** Persists the selection, then refreshes server components that read it. */
  savePreferences: (next: Preferences) => void;
  isSaving: boolean;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({
  children,
  initialPreferences,
}: {
  children: React.ReactNode;
  initialPreferences?: Preferences;
}) {
  const router = useRouter();
  const [preferences, setPreferences] = useState<Preferences>(
    initialPreferences ?? { language: DEFAULT_LANGUAGE, currency: DEFAULT_CURRENCY }
  );
  const [isSaving, startTransition] = useTransition();

  const savePreferences = useCallback(
    (next: Preferences) => {
      setPreferences(next);
      startTransition(async () => {
        const { savePreferences: persist } = await import('@/app/preferences/actions');
        await persist(next);
        // Prices and translated copy are rendered per preference, so re-render.
        router.refresh();
      });
    },
    [router],
  );

  const value = useMemo(
    () => ({ preferences, savePreferences, isSaving }),
    [preferences, savePreferences, isSaving],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences(): PreferencesContextValue {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used inside <PreferencesProvider>');
  }
  return context;
}
