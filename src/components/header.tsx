'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { UserCircle, HelpCircle, Globe, Menu, Search, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { languageShortLabel } from '@/lib/preferences';
import { SettingsModal } from './settings-modal';
import { usePreferences } from './preferences-provider';
import { useRouter } from 'next/navigation';

interface SuggestResult {
  countries: Array<{ name: string; code: string }>;
  cities: Array<{ name: string; country_name: string }>;
  activities: Array<{ id: string; name: string; city: string; country: string }>;
}

const EMPTY_RESULTS: SuggestResult = { countries: [], cities: [], activities: [] };

function HeaderSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SuggestResult>(EMPTY_RESULTS);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const requestIdRef = useRef(0);

  const search = async (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length < 2) {
      setResults(EMPTY_RESULTS);
      setIsLoading(false);
      return;
    }

    const requestId = ++requestIdRef.current;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(trimmed.slice(0, 80))}&suggest=1`);
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      if (requestId !== requestIdRef.current) return;
      setResults({
        countries: data.countries || [],
        cities: data.cities || [],
        activities: data.excursions || [],
      });
    } catch {
      if (requestId !== requestIdRef.current) return;
      setResults(EMPTY_RESULTS);
    } finally {
      if (requestId === requestIdRef.current) setIsLoading(false);
    }
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    search(value);
    if (value.trim().length >= 2) setIsOpen(true);
  };

  const submitSearch = () => {
    const text = query.trim();
    if (!text) return;
    setIsOpen(false);

    const matchedCountry = results.countries.find(
      (c) => c.name.toLowerCase() === text.toLowerCase()
    );
    const matchedCity = results.cities.find(
      (c) => c.name.toLowerCase() === text.toLowerCase()
    );
    const matchedActivity = results.activities.find(
      (a) => a.name.toLowerCase() === text.toLowerCase()
    );

    if (matchedCountry) {
      router.push(`/country/${encodeURIComponent(matchedCountry.name)}`);
      return;
    }
    if (matchedCity) {
      router.push(`/city/${encodeURIComponent(matchedCity.name)}`);
      return;
    }
    if (matchedActivity) {
      router.push(`/excursions/${encodeURIComponent(matchedActivity.id)}`);
      return;
    }

    router.push(`/search?query=${encodeURIComponent(text)}`);
  };

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const hasResults = results.countries.length > 0 || results.cities.length > 0 || results.activities.length > 0;

  return (
    <div className="relative flex-1 max-w-[480px] md:max-w-[600px] mx-4 md:mx-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search cities, countries, experiences..."
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
          className="w-full h-10 pl-10 pr-10 rounded-full bg-slate-100 text-slate-900 placeholder-slate-400 text-sm font-medium transition-colors focus:bg-white focus:shadow-md focus:outline-none md:h-11"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setResults(EMPTY_RESULTS); setIsOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (hasResults || isLoading) && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl bg-white shadow-lg border border-slate-200 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150"
        >
          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          )}
          {!isLoading && hasResults && (
            <div className="p-2">
              {results.countries.length > 0 && (
                <div className="mb-2">
                  <p className="px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Countries</p>
                  {results.countries.slice(0, 3).map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        router.push(`/country/${encodeURIComponent(country.name)}`);
                        setIsOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Globe className="h-4 w-4 text-slate-400" />
                      {country.name}
                    </button>
                  ))}
                </div>
              )}
              {results.cities.length > 0 && (
                <div className="mb-2">
                  <p className="px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Cities</p>
                  {results.cities.slice(0, 4).map((city) => (
                    <button
                      key={city.name}
                      onClick={() => {
                        router.push(`/city/${encodeURIComponent(city.name)}`);
                        setIsOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Search className="h-4 w-4 text-slate-400" />
                      {city.name}
                      <span className="ml-auto text-xs text-slate-400">{city.country_name}</span>
                    </button>
                  ))}
                </div>
              )}
              {results.activities.length > 0 && (
                <div>
                  <p className="px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Experiences</p>
                  {results.activities.slice(0, 4).map((activity) => (
                    <button
                      key={activity.id}
                      onClick={() => {
                        router.push(`/excursions/${encodeURIComponent(activity.id)}`);
                        setIsOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Search className="h-4 w-4 text-slate-400" />
                      <span className="truncate">{activity.name}</span>
                      <span className="ml-auto text-xs text-slate-400">{activity.city}, {activity.country}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {!isLoading && !hasResults && query.trim().length >= 2 && (
            <div className="p-4 text-center text-slate-500 text-sm">
              No results for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const { preferences } = usePreferences();

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-background shadow-sm">
        {/* Desktop navigation */}
        <div className="container mx-auto hidden px-4 md:block">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" aria-label="AAFare" className="flex items-center gap-2">
              <img src="/aafare-logo.png" alt="AAFare" className="h-10 w-auto" />
              <span className="flex flex-col justify-center leading-none">
                <span className="text-lg font-bold text-primary">AAFare</span>
                <span className="-mt-[2px] text-lg font-bold text-muted-foreground">
                  International
                </span>
              </span>
            </Link>

            <HeaderSearch />

            <div className="flex items-center gap-1 sm:gap-3 ml-auto">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                onClick={() => setIsSettingsModalOpen(true)}
                aria-label="Update language and currency"
              >
                <Globe className="h-5 w-5" />
                <span className="hidden sm:inline-flex">{languageShortLabel(preferences.language)} / {preferences.currency}</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <HelpCircle className="h-5 w-5" />
                <span className="hidden sm:inline-flex">Help</span>
              </Button>

              <div className="hidden sm:block h-6 w-px bg-border" />

              <Button asChild variant="ghost" size="icon" className="text-muted-foreground">
                <Link href="/login">
                  <UserCircle className="h-5 w-5" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile navigation — consistent top bar on every page */}
        <div className="flex h-14 items-center justify-between bg-white px-[18px] md:hidden">
          <Link href="/" aria-label="AAFare" className="flex items-center gap-2">
            <img src="/aafare-logo.png" alt="AAFare" className="h-9 w-auto" />
            <span className="flex flex-col justify-center leading-none">
              <span className="text-lg font-bold text-[#5392F9]">AAFare</span>
              <span className="-mt-[2px] text-lg font-bold text-[#5C6B85]">
                International
              </span>
            </span>
          </Link>
          <button className="p-1" aria-label="Menu">
            <Menu className="h-6 w-6 text-[#1A2B49]" />
          </button>
        </div>
      </header>
      <SettingsModal isOpen={isSettingsModalOpen} onOpenChange={setIsSettingsModalOpen} />
    </>
  );
}
