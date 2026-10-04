'use client';

/**
 * Shared autocomplete behaviour for the hero search.
 *
 * Both the standalone search bar and the tabbed widget need the same ranked
 * suggest behaviour, so the request handling lives here rather than being
 * reimplemented per surface. Two details matter for correctness:
 *
 * - a request id discards responses for superseded keystrokes, so a slow reply
 *   cannot overwrite results for what the visitor is currently looking at;
 * - the cache is consulted *before* fetching, otherwise it saves nothing.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import type { Excursion, Country, City } from '@/types';

export interface SearchResults {
  countries: Country[];
  cities: City[];
  activities: Excursion[];
}

const EMPTY: SearchResults = { countries: [], cities: [], activities: [] };

const SEARCH_CACHE_TTL = 5 * 60 * 1000;
const SEARCH_CACHE = new Map<string, { data: SearchResults; timestamp: number }>();

function getCachedSearch(key: string): SearchResults | null {
  const entry = SEARCH_CACHE.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > SEARCH_CACHE_TTL) {
    SEARCH_CACHE.delete(key);
    return null;
  }
  return entry.data;
}

function setCachedSearch(key: string, value: SearchResults) {
  SEARCH_CACHE.set(key, { data: value, timestamp: Date.now() });
}

/** Longest prefix the API is asked about, keeping keystroke latency bounded. */
const MAX_QUERY_LENGTH = 80;

export function useSuggestSearch(debounceMs = 250) {
  const [results, setResults] = useState<SearchResults>(EMPTY);
  const [isLoading, setIsLoading] = useState(false);
  const requestIdRef = useRef(0);
  const categoryRef = useRef<string>('all');
  const cityRef = useRef<string>('');

  const runSearch = useDebouncedCallback(async (currentQuery: string) => {
    const trimmed = currentQuery.trim();
    if (trimmed.length < 2) {
      setResults(EMPTY);
      setIsLoading(false);
      return;
    }

    const key = `${categoryRef.current}:${cityRef.current}:${trimmed.toLowerCase()}`;
    const cached = getCachedSearch(key);
    if (cached) {
      setResults(cached);
      setIsLoading(false);
      return;
    }

    const requestId = ++requestIdRef.current;
    try {
      const categoryParam = categoryRef.current !== 'all' ? `&category=${categoryRef.current}` : '';
      const cityParam = cityRef.current ? `&city=${encodeURIComponent(cityRef.current)}` : '';
      const res = await fetch(
        `/api/search?query=${encodeURIComponent(trimmed.slice(0, MAX_QUERY_LENGTH))}&suggest=1${categoryParam}${cityParam}`,
      );
      if (!res.ok) throw new Error(`Search failed: ${res.status}`);
      const data = await res.json();

      // A newer keystroke already superseded this response.
      if (requestId !== requestIdRef.current) return;

      const next: SearchResults = {
        countries: data.countries || [],
        cities: data.cities || [],
        activities: data.excursions || [],
      };
      setCachedSearch(key, next);
      setResults(next);
    } catch {
      if (requestId !== requestIdRef.current) return;
      setResults(EMPTY);
    } finally {
      if (requestId === requestIdRef.current) setIsLoading(false);
    }
  }, debounceMs);

  // Called on every keystroke; the debounce lives in `runSearch`.
  // Memoized: callers run this from effects, so a new reference
  // per render would re-trigger them endlessly.
  const search = useCallback((query: string, category?: string, city?: string) => {
    if (category) categoryRef.current = category;
    if (city !== undefined) cityRef.current = city;
    if (!query.trim()) {
      setResults(EMPTY);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    runSearch(query);
  }, [runSearch]);

  const reset = useCallback(() => {
    // Bumping the id orphans any in-flight response so it cannot repopulate.
    requestIdRef.current += 1;
    setResults(EMPTY);
    setIsLoading(false);
  }, []);

  useEffect(() => () => void runSearch.cancel(), [runSearch]);

  return { results, isLoading, search, reset };
}