/**
 * Ranked search over a locally held corpus.
 *
 * The Tiqets v2 API has no text-search parameter — `search`, `keyword`, `query`
 * and `name` are all ignored and return the same unfiltered page — so relevance
 * has to be computed here. The previous fallback fetched every homepage city
 * one after another on each keystroke, which was both slow and blind: a query
 * like "ama" matched nothing because the corpus was too small and unscored.
 *
 * The corpus is the on-disk snapshot plus a cached API refresh, and scores are
 * computed with prefix matches ranked above word-start matches above plain
 * substring matches.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import type { Excursion, Country, City } from '@/types';
import { KNOWN_CITY_IDS } from '@/lib/tiqets-api';

export interface SearchHit {
  type: 'country' | 'city' | 'activity';
  item: any;
}

interface IndexEntry {
  type: SearchHit['type'];
  item: any;
  /** Lower-cased haystack, precomputed so scoring never re-lowercases. */
  name: string;
  words: string[];
  country: string;
  city: string;
  /** Higher sorts first when scores tie. */
  weight: number;
}

const API_TTL_MS = 60 * 60 * 1000;
const API_BASE = 'https://api.tiqets.com/v2';

/**
 * On-disk copy of the fetched corpus.
 *
 * Module-level state is per bundle, so the route handler and the boot hook each
 * kept their own index and both paid the build. Persisting the raw corpus lets
 * any bundle load it in a few milliseconds, which also survives a cold start in
 * production where no request has been served yet.
 */
const CORPUS_CACHE_PATH = join(process.cwd(), '.next', 'cache', 'search-corpus.json');

interface StoredCorpus {
  at: number;
  countries: Country[];
  excursions: Excursion[];
}

let index: IndexEntry[] | null = null;
let indexBuiltAt = 0;

/** Overridable for tests; defaults to the API-backed corpus. */
let loadRemoteCorpus: (() => Promise<{ countries: Country[]; cities: City[]; excursions: Excursion[] }>) | null = null;

function readSnapshot(): Excursion[] {
  try {
    const parsed = JSON.parse(
      readFileSync(join(process.cwd(), 'public', 'excursions.json'), 'utf-8'),
    );
    return Array.isArray(parsed) ? parsed : parsed.experiences || [];
  } catch {
    return [];
  }
}

function readStoredCorpus(): StoredCorpus | null {
  try {
    const parsed = JSON.parse(readFileSync(CORPUS_CACHE_PATH, 'utf-8'));
    if (!parsed || typeof parsed.at !== 'number') return null;
    if (Date.now() - parsed.at > API_TTL_MS) return null;
    if (!Array.isArray(parsed.excursions) || parsed.excursions.length === 0) return null;
    return parsed as StoredCorpus;
  } catch {
    return null;
  }
}

/**
 * Persists the corpus for other bundles and later processes.
 *
 * Only the fields search needs are stored, so the file stays small; a write
 * failure is not fatal because the in-memory index still serves this process.
 */
function writeStoredCorpus(countries: Country[], excursions: Excursion[]) {
  try {
    mkdirSync(dirname(CORPUS_CACHE_PATH), { recursive: true });
    const payload: StoredCorpus = {
      at: Date.now(),
      countries,
      excursions: excursions.map((e) => ({
        id: e.id,
        name: e.name,
        city: e.city,
        country: e.country,
        price: e.price,
        currency: e.currency,
        rating: e.rating,
        images: e.images?.slice(0, 1) || [],
      })),
    };
    writeFileSync(CORPUS_CACHE_PATH, JSON.stringify(payload));
  } catch (error) {
    console.warn('[search-index] could not persist corpus:', error);
  }
}

function buildEntry(
  type: SearchHit['type'],
  item: any,
  name: string,
  country: string,
  city: string,
  weight: number,
): IndexEntry {
  const lower = name.toLowerCase().trim();
  return {
    type,
    item,
    name: lower,
    words: lower.split(/[^a-z0-9]+/).filter(Boolean),
    country: (country || '').toLowerCase(),
    city: (city || '').toLowerCase(),
    weight,
  };
}

function buildIndex(
  countries: Country[],
  cities: City[],
  excursions: Excursion[],
): IndexEntry[] {
  const entries: IndexEntry[] = [];

  for (const country of countries || []) {
    const name = country?.name || '';
    if (!name) continue;
    entries.push(buildEntry('country', country, name, name, '', 300));
  }

  for (const city of cities || []) {
    const name = city?.name || '';
    if (!name) continue;
    entries.push(buildEntry('city', city, name, city.country_code || '', name, 200));
  }

  for (const excursion of excursions || []) {
    const name = excursion?.name || '';
    if (!name) continue;
    // Rated experiences break score ties so the better product surfaces first.
    const weight = 100 + Math.round((excursion.rating || 0) * 10);
    entries.push(
      buildEntry('activity', excursion, name, excursion.country || '', excursion.city || '', weight),
    );
  }

  return entries;
}

async function defaultRemoteCorpus() {
  const key = process.env.TIQETS_API_KEY;
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'User-Agent': 'my user agent',
    ...(key ? { Authorization: `Token ${key}` } : {}),
  };

  // `/countries` rejects a page_size above 100, and `/cities` requires a
  // `country_id`, so neither can be fetched bare.
  const [countriesRes, experiencesRes] = await Promise.all([
    fetch(`${API_BASE}/countries?page_size=100&page=1`, { headers })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null),
    // The first pages carry the most-bookable inventory, which is what a
    // suggestion should surface; the tail is rarely typed.
    Promise.all(
      [1, 2, 3, 4].map((p) =>
        fetch(`${API_BASE}/experiences?page_size=100&page=${p}`, { headers })
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      ),
    ),
  ]);

  const countries: Country[] = (countriesRes?.countries || []).map((c: any) => ({
    id: String(c.id ?? ''),
    name: c.name || '',
  }));

  const raw = experiencesRes
    .filter(Boolean)
    .flatMap((d: any) => d.experiences || d.products || d.items || []);

  // Reuse the shared transform so hits match the shape every other surface uses.
  const { transformTiqetsProduct } = await import('@/lib/tiqets-api');
  const excursions: Excursion[] = raw.map(transformTiqetsProduct).filter((e: Excursion) => e?.id);

  // `/cities` needs a country id and would mean one request per country, so the
  // city list is derived from the experience corpus in `getIndex` instead.
  return { countries, cities: [], excursions };
}

/**
 * In-flight build, shared by concurrent callers.
 *
 * Without this, a burst of keystrokes on a cold instance each starts its own
 * build, and every one of them pays for the same API pages.
 */
let building: Promise<IndexEntry[]> | null = null;

async function getIndex(): Promise<IndexEntry[]> {
  const now = Date.now();
  if (index && now - indexBuiltAt < API_TTL_MS) return index;

  // An existing build is reused rather than duplicated; a stale one is discarded
  // only after it settles so callers never observe a half-written index.
  if (building) return building;

  building = buildIndexFromSources().finally(() => {
    building = null;
  });

  return building;
}

async function buildIndexFromSources(): Promise<IndexEntry[]> {
  const now = Date.now();
  const snapshot = readSnapshot();
  const stored = readStoredCorpus();

  let countries: Country[] = stored?.countries || [];
  let excursions: Excursion[] = snapshot;

  if (stored) {
    // A fresh corpus is reused as-is; the snapshot is still merged in because it
    // carries experiences the paged listing does not reach, such as Amsterdam.
    const seen = new Set(excursions.map((e) => String(e.id)));
    for (const e of stored.excursions) {
      if (!seen.has(String(e.id))) {
        seen.add(String(e.id));
        excursions.push(e);
      }
    }
  } else {
    try {
      const remote = await (loadRemoteCorpus || defaultRemoteCorpus)();
      countries = remote.countries;
      const seen = new Set(excursions.map((e) => String(e.id)));
      for (const e of remote.excursions) {
        if (!seen.has(String(e.id))) {
          seen.add(String(e.id));
          excursions.push(e);
        }
      }
      writeStoredCorpus(countries, excursions);
    } catch (error) {
      // The snapshot alone still answers queries, but silently degrading hid a
      // real defect behind plausible-looking results, so the reason is logged.
      console.error('[search-index] API corpus unavailable, using snapshot only:', error);
    }
  }

  // Every city with real inventory becomes a suggestion target, so the corpus
  // itself defines the city list. `/cities` needs a country id and would mean one
  // request per country; the id comes from the known-id map where available.
  const cityNames = new Set<string>();
  for (const e of excursions) {
    if (e?.city) cityNames.add(e.city);
  }
  const cities: City[] = [...cityNames].map((name) => ({
    id: String(KNOWN_CITY_IDS[name.toLowerCase()] ?? ''),
    name,
    country_code: '',
  }));

  index = buildIndex(countries, cities, excursions);
  indexBuiltAt = now;
  return index;
}

/**
 * Scores one entry against the query.
 *
 * Returns 0 when the query does not appear in the name, city or country. Prefix
 * and word-start hits outrank a match buried mid-word, which is what keeps
 * "muse" above unrelated titles that merely contain those letters.
 */
function scoreEntry(entry: IndexEntry, query: string): number {
  let score = 0;

  if (entry.name === query) {
    score = 1000;
  } else if (entry.name.startsWith(query)) {
    score = 800 - Math.min(entry.name.length, 100);
  } else if (entry.words.some((w) => w.startsWith(query))) {
    score = 600 - Math.min(entry.name.length, 100);
  } else if (entry.name.includes(query)) {
    score = 400 - Math.min(entry.name.length, 100);
  } else if (entry.city.startsWith(query)) {
    // Typing a city name should offer that city and its experiences.
    score = 500;
  } else if (entry.city.includes(query)) {
    score = 250;
  } else if (entry.country.includes(query)) {
    score = 200;
  }

  return score > 0 ? score + entry.weight : 0;
}

export interface SuggestOptions {
  perType?: number;
  total?: number;
  city?: string;
}

export async function suggest(rawQuery: string, options: SuggestOptions = {}) {
  const query = rawQuery.trim().toLowerCase();
  const perType = options.perType ?? 6;
  const total = options.total ?? 16;
  const cityFilter = options.city?.trim().toLowerCase();
  if (query.length < 2) return [];

  const entries = await getIndex();

  const buckets: Record<SearchHit['type'], Array<{ entry: IndexEntry; score: number }>> = {
    country: [],
    city: [],
    activity: [],
  };

  for (const entry of entries) {
    // A selected destination scopes suggestions to that city's activities.
    if (cityFilter) {
      if (entry.type !== 'activity') continue;
      if (entry.city.toLowerCase() !== cityFilter) continue;
    }
    const score = scoreEntry(entry, query);
    if (score > 0) buckets[entry.type].push({ entry, score });
  }

  const out: SearchHit[] = [];
  for (const type of ['country', 'city', 'activity'] as const) {
    buckets[type].sort((a, b) => b.score - a.score);
    out.push(...buckets[type].slice(0, perType).map((b) => ({ type, item: b.entry.item })));
  }

  return out.slice(0, total);
}

/**
 * Builds the index ahead of the first query.
 *
 * Called from the instrumentation hook at server start so a visitor's first
 * keystroke does not pay the build cost. Failure is non-fatal: `suggest` builds
 * on demand anyway.
 */
export async function warmSearchIndex(): Promise<void> {
  try {
    await getIndex();
  } catch (error) {
    console.error('[search-index] warm-up failed:', error);
  }
}

/** Exposed for tests: forces the next call to rebuild the index. */
export function __resetSearchIndex() {
  index = null;
  indexBuiltAt = 0;
}

export function __setCorpusLoader(
  loader: (() => Promise<{ countries: Country[]; cities: City[]; excursions: Excursion[] }>) | null,
) {
  loadRemoteCorpus = loader;
}