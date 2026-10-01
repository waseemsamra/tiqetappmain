/**
 * Language and currency preferences.
 *
 * Both lists mirror what the Tiqets Distributor API accepts: the `language`
 * codes come from its supported-language table, and every currency in
 * CURRENCIES was verified to return a converted price from the content
 * endpoints when passed as `?currency=`.
 */

export type LanguageOption = { code: string; label: string };

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'ca', label: 'Català' },
  { code: 'cs', label: 'Čeština' },
  { code: 'da', label: 'Dansk' },
  { code: 'de', label: 'Deutsch' },
  { code: 'el', label: 'Ελληνικά' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'ko', label: '한국어' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'ja', label: '日本語' },
  { code: 'pl', label: 'Polski' },
  { code: 'pt', label: 'Português' },
  { code: 'ru', label: 'Русский' },
  { code: 'sv', label: 'Svenska' },
  { code: 'zh', label: '中文' },
];

export type CurrencyOption = { code: string; label: string };

export const CURRENCIES: CurrencyOption[] = [
  { code: 'AED', label: 'AED (د.إ)' },
  { code: 'EUR', label: 'EUR (€)' },
  { code: 'USD', label: 'USD ($)' },
  { code: 'GBP', label: 'GBP (£)' },
  { code: 'AUD', label: 'AUD (A$)' },
  { code: 'CAD', label: 'CAD (CA$)' },
  { code: 'CHF', label: 'CHF (Fr)' },
  { code: 'DKK', label: 'DKK (kr)' },
  { code: 'NOK', label: 'NOK (kr)' },
  { code: 'PLN', label: 'PLN (zł)' },
  { code: 'SEK', label: 'SEK (kr)' },
  { code: 'HUF', label: 'HUF (Ft)' },
  { code: 'SGD', label: 'SGD (S$)' },
  { code: 'HKD', label: 'HKD (HK$)' },
  { code: 'JPY', label: 'JPY (¥)' },
  { code: 'COP', label: 'COP ($)' },
  { code: 'NZD', label: 'NZD ($)' },
  { code: 'MYR', label: 'MYR (RM)' },
  { code: 'CZK', label: 'CZK (Kč)' },
  { code: 'MXN', label: 'MXN ($)' },
  { code: 'INR', label: 'INR (₹)' },
  { code: 'THB', label: 'THB (฿)' },
  { code: 'BRL', label: 'BRL (R$)' },
];

export const LANGUAGE_CODES = new Set(LANGUAGES.map((l) => l.code));
export const CURRENCY_CODES = new Set(CURRENCIES.map((c) => c.code));

export const DEFAULT_LANGUAGE = 'en';
export const DEFAULT_CURRENCY = 'USD';

export const LANGUAGE_COOKIE = 'aafare_language';
export const CURRENCY_COOKIE = 'aafare_currency';

export function languageLabel(code?: string | null): string {
  return LANGUAGES.find((l) => l.code === code)?.label ?? 'English';
}

export function currencyLabel(code?: string | null): string {
  return CURRENCIES.find((c) => c.code === code)?.label ?? currencyLabel(DEFAULT_CURRENCY);
}

/** Short form for the header trigger, e.g. "EN / USD". */
export function languageShortLabel(code?: string | null): string {
  return (code || DEFAULT_LANGUAGE).toUpperCase();
}

export function isSupportedLanguage(code?: string | null): boolean {
  return !!code && LANGUAGE_CODES.has(code);
}

export function isSupportedCurrency(code?: string | null): boolean {
  return !!code && CURRENCY_CODES.has(code);
}
