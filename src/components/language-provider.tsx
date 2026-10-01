'use client';

import { createContext, useContext, useMemo } from 'react';
import { translate, normalizeUiLanguage } from '@/lib/messages';
import type { UiLanguage } from '@/lib/messages';

const LanguageContext = createContext<UiLanguage>('en');

/**
 * Supplies the active UI language to client components.
 *
 * The server reads the `aafare_language` cookie and passes the code down, so
 * this never reads cookies in the browser and the markup is already correct on
 * first paint.
 */
export function LanguageProvider({
  language,
  children,
}: {
  language: string;
  children: React.ReactNode;
}) {
  const value = useMemo(() => normalizeUiLanguage(language), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): UiLanguage {
  return useContext(LanguageContext);
}

/** Returns a `t(key, vars?)` bound to the active language. */
export function useT() {
  const language = useLanguage();
  return useMemo(
    () => (key: string, vars?: Record<string, string | number>) => translate(language, key, vars),
    [language],
  );
}
