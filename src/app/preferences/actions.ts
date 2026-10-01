'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import {
  CURRENCY_COOKIE,
  DEFAULT_CURRENCY,
  DEFAULT_LANGUAGE,
  LANGUAGE_COOKIE,
  isSupportedCurrency,
  isSupportedLanguage,
} from '@/lib/preferences';

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export type SavePreferencesResult = {
  success: boolean;
  language: string;
  currency: string;
  error?: string;
};

export async function savePreferences(input: {
  language?: string;
  currency?: string;
}): Promise<SavePreferencesResult> {
  const language = isSupportedLanguage(input.language) ? (input.language as string) : DEFAULT_LANGUAGE;
  const currency = isSupportedCurrency(input.currency) ? (input.currency as string) : DEFAULT_CURRENCY;

  try {
    const store = cookies();

    store.set(LANGUAGE_COOKIE, language, {
      path: '/',
      maxAge: ONE_YEAR_SECONDS,
      sameSite: 'lax',
    });
    store.set(CURRENCY_COOKIE, currency, {
      path: '/',
      maxAge: ONE_YEAR_SECONDS,
      sameSite: 'lax',
    });
  } catch (error) {
    return {
      success: false,
      language,
      currency,
      error: error instanceof Error ? error.message : 'Could not save preferences',
    };
  }

  // Prices and translated content are rendered per preference, so drop caches.
  revalidatePath('/', 'layout');

  return { success: true, language, currency };
}
