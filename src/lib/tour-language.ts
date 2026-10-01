/**
 * Tour-language support, as exposed by Tiqets.
 *
 * Tiqets has no display-language API: `?language=` is not a documented
 * parameter and is silently ignored. The only language data Tiqets exposes is
 * the language a tour is *conducted in*, reported per variant as
 * `language_selection` on the Availability API:
 *
 *   GET /v2/products/{product_id}/availability
 *   -> variants[].language_selection = ["eng", "spa"]
 *
 * Codes are ISO 639-3 (three letters), not ISO 639-1. Tiqets populates the
 * field only for products where the language selector is enabled, so an empty
 * array means "do not show a selector" -- that is the documented signal, and it
 * is what most of this catalog returns today.
 *
 * See: https://developers.tiqets.dev/integration-guides/product-integration/how-to-implement-language-selection
 */

export type TourLanguage = {
  /** ISO 639-3 code, exactly as Tiqets returns it. */
  code: string;
  /** English label for the selector. */
  label: string;
  /** Endonym, shown alongside the English name. */
  native: string;
};

const LABELS: Record<string, { label: string; native: string }> = {
  eng: { label: 'English', native: 'English' },
  spa: { label: 'Spanish', native: 'Español' },
  fra: { label: 'French', native: 'Français' },
  deu: { label: 'German', native: 'Deutsch' },
  ita: { label: 'Italian', native: 'Italiano' },
  por: { label: 'Portuguese', native: 'Português' },
  nld: { label: 'Dutch', native: 'Nederlands' },
  rus: { label: 'Russian', native: 'Русский' },
  jpn: { label: 'Japanese', native: '日本語' },
  chi: { label: 'Chinese', native: '中文' },
  zho: { label: 'Chinese', native: '中文' },
  ara: { label: 'Arabic', native: 'العربية' },
  kor: { label: 'Korean', native: '한국어' },
  tha: { label: 'Thai', native: 'ไทย' },
  vie: { label: 'Vietnamese', native: 'Tiếng Việt' },
  pol: { label: 'Polish', native: 'Polski' },
  ces: { label: 'Czech', native: 'Čeština' },
  dan: { label: 'Danish', native: 'Dansk' },
  nor: { label: 'Norwegian', native: 'Norsk' },
  swe: { label: 'Swedish', native: 'Svenska' },
  ell: { label: 'Greek', native: 'Ελληνικά' },
  tur: { label: 'Turkish', native: 'Türkçe' },
  heb: { label: 'Hebrew', native: 'עברית' },
  hin: { label: 'Hindi', native: 'हिन्दी' },
  ind: { label: 'Indonesian', native: 'Bahasa Indonesia' },
  ukr: { label: 'Ukrainian', native: 'Українська' },
  fin: { label: 'Finnish', native: 'Suomi' },
  cat: { label: 'Catalan', native: 'Català' },

  // ISO 639-1 fallbacks. Tiqets returns 3-letter codes in
  // `language_selection`, but the separate `languages` field uses 2-letter
  // codes, so the fallback path needs these to avoid rendering as "Other".
  en: { label: 'English', native: 'English' },
  es: { label: 'Spanish', native: 'Español' },
  fr: { label: 'French', native: 'Français' },
  de: { label: 'German', native: 'Deutsch' },
  it: { label: 'Italian', native: 'Italiano' },
  pt: { label: 'Portuguese', native: 'Português' },
  nl: { label: 'Dutch', native: 'Nederlands' },
  ru: { label: 'Russian', native: 'Русский' },
  ja: { label: 'Japanese', native: '日本語' },
  zh: { label: 'Chinese', native: '中文' },
  ar: { label: 'Arabic', native: 'العربية' },
  ko: { label: 'Korean', native: '한국어' },
  th: { label: 'Thai', native: 'ไทย' },
  vi: { label: 'Vietnamese', native: 'Tiếng Việt' },
  pl: { label: 'Polish', native: 'Polski' },
  cs: { label: 'Czech', native: 'Čeština' },
  da: { label: 'Danish', native: 'Dansk' },
  no: { label: 'Norwegian', native: 'Norsk' },
  sv: { label: 'Swedish', native: 'Svenska' },
  el: { label: 'Greek', native: 'Ελληνικά' },
  tr: { label: 'Turkish', native: 'Türkçe' },
  he: { label: 'Hebrew', native: 'עברית' },
  hi: { label: 'Hindi', native: 'हिन्दी' },
  id: { label: 'Indonesian', native: 'Bahasa Indonesia' },
  uk: { label: 'Ukrainian', native: 'Українська' },
  fi: { label: 'Finnish', native: 'Suomi' },
};

const UNKNOWN: { label: string; native: string } = { label: 'Other', native: 'Other' };

/** Resolves an ISO 639-3 code to a display name, tolerating unknown codes. */
export function tourLanguageLabel(code: string): string {
  return (LABELS[code] || UNKNOWN).label;
}

export function tourLanguageNative(code: string): string {
  return (LABELS[code] || UNKNOWN).native;
}

/** A variant as returned by the Availability API, narrowed to what we use. */
export type AvailabilityVariant = {
  id: string | number;
  label?: string;
  description?: string;
  languages?: string[];
  language_selection?: string[];
};

/**
 * Tour languages for a variant, from `language_selection` only.
 *
 * Deliberately does NOT fall back to the product's `languages` field: that
 * field lists the content languages Tiqets can render a product in, which is a
 * different concept and would wrongly present a "tour language" selector. The
 * guide is explicit that `language_selection` is the only signal for whether a
 * selector should be shown.
 */
function codesForVariant(variant: AvailabilityVariant): string[] {
  const selection = variant.language_selection;
  return Array.isArray(selection) ? selection.filter((code) => typeof code === 'string' && !!code) : [];
}

/**
 * Every distinct tour language across the given variants, in first-seen order.
 * Empty means Tiqets has not enabled language selection for this product.
 */
export function collectTourLanguages(variants: AvailabilityVariant[]): TourLanguage[] {
  const seen = new Set<string>();
  const out: TourLanguage[] = [];
  for (const variant of variants) {
    for (const code of codesForVariant(variant)) {
      if (typeof code !== 'string' || !code || seen.has(code)) continue;
      seen.add(code);
      out.push({ code, label: tourLanguageLabel(code), native: tourLanguageNative(code) });
    }
  }
  return out;
}

/**
 * True when a language selector is warranted: at least one variant declares a
 * language. A single language is still shown, per Tiqets' guidance.
 */
export function shouldShowLanguageSelector(variants: AvailabilityVariant[]): boolean {
  return collectTourLanguages(variants).length > 0;
}

/** Keeps only the variants that run in `code`. */
export function filterVariantsByLanguage<T extends AvailabilityVariant>(
  variants: T[],
  code: string | null,
): T[] {
  if (!code) return variants;
  return variants.filter((variant) => codesForVariant(variant).includes(code));
}
