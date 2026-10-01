import { CURRENCIES, DEFAULT_CURRENCY } from '@/lib/preferences';

export { DEFAULT_CURRENCY };

/** Derived from the single CURRENCIES list so symbols cannot drift from options. */
export const CURRENCY_SYMBOLS: Record<string, string> = CURRENCIES.reduce<Record<string, string>>(
  (symbols, option) => {
    const match = option.label.match(/\((.+)\)\s*$/);
    symbols[option.code] = match ? match[1] : option.code;
    return symbols;
  },
  {},
);

export function currencySymbol(currency?: string | null): string {
  if (!currency) return CURRENCY_SYMBOLS[DEFAULT_CURRENCY];
  const code = currency.toUpperCase();
  return CURRENCY_SYMBOLS[code] || code;
}

/**
 * Formats an amount. Defaults to USD so a missing currency never renders a bare
 * number. Callers are responsible for supplying an amount already expressed in
 * the given currency.
 */
export function formatPrice(amount: number | string | null | undefined, currency: string = DEFAULT_CURRENCY): string {
  const value = Number(amount ?? 0);
  const safe = Number.isFinite(value) ? value : 0;
  return `${currencySymbol(currency)}${safe.toFixed(2)}`;
}
