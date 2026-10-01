import type { TiqetsReview } from '@/lib/tiqets-api';

export type VariantReview = TiqetsReview & {
  travelerType: string | null;
  categories: { label: string; value: number }[];
};

const LANGUAGE_NAMES: Record<string, string> = {
  eng: 'English',
  fra: 'French',
  spa: 'Spanish',
  ita: 'Italian',
  deu: 'German',
  por: 'Portuguese',
  nld: 'Dutch',
  jpn: 'Japanese',
  kor: 'Korean',
  chi: 'Chinese',
  zho: 'Chinese',
  rus: 'Russian',
  pol: 'Polish',
  ces: 'Czech',
  cat: 'Catalan',
  dan: 'Danish',
  swe: 'Swedish',
  gre: 'Greek',
  ell: 'Greek',
  ara: 'Arabic',
  tur: 'Turkish',
  hin: 'Hindi',
  heb: 'Hebrew',
  ukr: 'Ukrainian',
  ron: 'Romanian',
  hun: 'Hungarian',
  fin: 'Finnish',
  nor: 'Norwegian',
  slv: 'Slovenian',
  hrv: 'Croatian',
  bul: 'Bulgarian',
  tha: 'Thai',
  vie: 'Vietnamese',
  ind: 'Indonesian',
  swe2: 'Swedish',
};

const CATEGORY_NAMES: Record<string, string> = {
  info_onsite: 'On-site information',
  value_for_money: 'Value for money',
  service: 'Service',
  organisation: 'Organisation',
  guide: 'Guide',
  location: 'Location',
};

/** Tiqets uses ISO 639-3 codes in `language_selection` and 2-letter in `live_guide_languages`. */
export function languageName(code: string): string {
  const key = code.toLowerCase();
  const shortToLong: Record<string, string> = {
    en: 'eng',
    fr: 'fra',
    es: 'spa',
    it: 'ita',
    de: 'deu',
    pt: 'por',
    nl: 'nld',
    ja: 'jpn',
    ko: 'kor',
    zh: 'chi',
    ru: 'rus',
    pl: 'pol',
    cs: 'ces',
    ca: 'cat',
    da: 'dan',
    sv: 'swe',
    el: 'ell',
    ar: 'ara',
    tr: 'tur',
    hi: 'hin',
    he: 'heb',
    uk: 'ukr',
    ro: 'ron',
    hu: 'hun',
    fi: 'fin',
    no: 'nor',
    sl: 'slv',
    hr: 'hrv',
    bg: 'bul',
    th: 'tha',
    vi: 'vie',
    id: 'ind',
  };
  const long = shortToLong[key] || key;
  return LANGUAGE_NAMES[long] || code.toUpperCase();
}

export function languageNames(codes: unknown): string[] {
  if (!Array.isArray(codes)) return [];
  return codes.map(String).map(languageName);
}

export function normalizeReview(review: TiqetsReview): VariantReview {
  const raw = review as unknown as Record<string, unknown>;
  const categories = Object.entries((raw.rating_per_category as Record<string, number>) || {})
    .filter(([, value]) => typeof value === 'number')
    .map(([key, value]) => ({ label: CATEGORY_NAMES[key] || key.replace(/_/g, ' '), value }));
  return {
    ...review,
    travelerType: typeof raw.traveler_type === 'string' ? raw.traveler_type : null,
    categories,
  };
}

/**
 * Counts stars for the distribution bars.
 *
 * Tiqets exposes only an average and a total, so the bars are built from the
 * reviews actually returned by `/products/{id}/reviews`. Bars are therefore
 * labelled as a sample of the reviews fetched, not the full review history.
 */
export function ratingBreakdown(
  reviews: VariantReview[],
  total: number | undefined,
): Array<{ stars: number; count: number; percent: number }> {
  const counts = new Map<number, number>();
  for (const review of reviews) {
    if (typeof review.rating !== 'number') continue;
    const stars = Math.min(5, Math.max(1, Math.round(review.rating)));
    counts.set(stars, (counts.get(stars) || 0) + 1);
  }
  const sampleSize = [...counts.values()].reduce((sum, value) => sum + value, 0);
  return [5, 4, 3, 2, 1].map((stars) => {
    const count = counts.get(stars) || 0;
    return {
      stars,
      count,
      percent: sampleSize > 0 ? Math.round((count / sampleSize) * 100) : 0,
    };
  });
}

export function formatReviewDate(date: string | null): string {
  if (!date) return '';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
