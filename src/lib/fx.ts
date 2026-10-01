/**
 * USD conversion for prices that were cached to disk.
 *
 * Live pages (excursion detail, variants, country, search) ask Tiqets for the
 * visitor's currency directly, so those amounts are authoritative. The static
 * listing cache in public/excursions.json is a snapshot, so re-expressing it in
 * another currency needs a rate. Rates come from a free, key-less feed and are
 * cached for an hour; the fallback table keeps builds working offline.
 */

const RATES_ENDPOINT = 'https://open.er-api.com/v6/latest/USD';
const REVALIDATE_SECONDS = 3600;

/** Units of each currency per 1 USD, used only when the feed is unreachable. */
const FALLBACK_RATES_PER_USD: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.6725,
  AUD: 1.52,
  CAD: 1.37,
  CHF: 0.88,
  CZK: 23.1,
  DKK: 6.86,
  HKD: 7.8,
  HUF: 360,
  INR: 83,
  JPY: 155,
  KRW: 1350,
  MXN: 18,
  MYR: 4.7,
  NOK: 10.8,
  NZD: 1.65,
  PLN: 4.0,
  SEK: 10.5,
  SGD: 1.35,
  THB: 36,
  TRY: 32,
  BRL: 5.5,
  COP: 4000,
};

let cachedRates: Record<string, number> | null = null;
let inFlight: Promise<Record<string, number>> | null = null;

/** Units of `currency` per 1 USD. */
export async function getUsdRates(): Promise<Record<string, number>> {
  if (cachedRates) return cachedRates;
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const res = await fetch(RATES_ENDPOINT, { next: { revalidate: REVALIDATE_SECONDS } });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      if (data?.result !== 'success' || !data?.rates || typeof data.rates !== 'object') {
        throw new Error('unexpected rates payload');
      }
      cachedRates = { ...FALLBACK_RATES_PER_USD, ...(data.rates as Record<string, number>) };
    } catch (error) {
      console.warn('[fx] Using static USD rates:', (error as Error).message);
      cachedRates = { ...FALLBACK_RATES_PER_USD };
    }
    return cachedRates;
  })();

  try {
    return await inFlight;
  } finally {
    inFlight = null;
  }
}

/**
 * Converts a cached amount from `fromCurrency` to `toCurrency`.
 * Unknown currencies are returned unchanged rather than zeroed.
 */
export async function convertCurrency(
  amount: number | string | null | undefined,
  fromCurrency: string,
  toCurrency: string,
): Promise<number> {
  const value = Number(amount ?? 0);
  if (!Number.isFinite(value) || value === 0) return 0;

  const from = (fromCurrency || 'USD').toUpperCase();
  const to = (toCurrency || 'USD').toUpperCase();
  if (from === to) return value;

  const rates = await getUsdRates();
  const perUsdFrom = rates[from];
  const perUsdTo = rates[to];
  if (!perUsdFrom || !perUsdTo || perUsdFrom <= 0 || perUsdTo <= 0) return value;

  // amount -> USD -> target
  return (value / perUsdFrom) * perUsdTo;
}

/** Rounds to cents, avoiding float drift like 51.999999999. */
export function roundCents(value: number): number {
  return Math.round(value * 100) / 100;
}
