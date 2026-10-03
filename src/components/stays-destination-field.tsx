'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import type { AgodaDestination } from '@/lib/agoda-catalog';

/**
 * Searchable destination field for the stays search strip.
 *
 * Submits the display text ("Dubai, United Arab Emirates"); the
 * server resolves it with findDestination(), which matches slugs,
 * exact names and partial names. A purely numeric query is treated
 * as an Agoda hotel ID by the page instead of a destination.
 */
export function StaysDestinationField({
  destinations,
  defaultValue,
}: {
  destinations: AgodaDestination[];
  defaultValue: string;
}) {
  const [query, setQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * The field ships pre-filled with the selected destination's
   * "Name, Country" display string. That idle state lists every
   * destination, so the dropdown is usable straight away instead
   * of opening on "No matching destination".
   */
  const idle = destinations.some(
    (d) =>
      `${d.name}, ${d.country}`.toLowerCase() === query.trim().toLowerCase(),
  );

  const matches = destinations.filter((d) => {
    if (idle || !query.trim()) return true;
    const q = query.trim().toLowerCase();
    const name = d.name.toLowerCase();
    const country = d.country.toLowerCase();
    return (
      name.includes(q) ||
      country.includes(q) ||
      d.slug.toLowerCase().includes(q) ||
      // Match in both directions: the field ships pre-filled
      // with the "Name, Country" display string, which must
      // still match its own destination.
      q.includes(name) ||
      q.includes(country)
    );
  });

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const pick = (d: AgodaDestination) => {
    setQuery(`${d.name}, ${d.country}`);
    setOpen(false);
    inputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && matches.length > 0) {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => (h + 1) % matches.length);
    } else if (e.key === 'ArrowUp' && matches.length > 0) {
      e.preventDefault();
      setHighlight((h) => (h - 1 + matches.length) % matches.length);
    } else if (
      e.key === 'Enter' &&
      open &&
      matches.length > 0 &&
      // An idle, pre-filled field submits the form
      // instead of re-picking the current destination.
      !idle
    ) {
      e.preventDefault();
      pick(matches[Math.min(highlight, matches.length - 1)]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative flex flex-1 items-center gap-2.5 border-b border-[#E8EDF2] px-4 py-3.5 md:border-b-0 md:border-r md:py-0"
    >
      <svg
        className="h-3.5 w-3.5 shrink-0 text-[#8B96A8]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-medium uppercase tracking-wide text-[#8B96A8]">
          Destination
        </span>
        <input
          ref={inputRef}
          name="destination"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlight(0);
            setOpen(true);
          }}
          onFocus={(e) => {
            setOpen(true);
            setHighlight(0);
            // Select the pre-filled text so typing replaces it.
            e.target.select();
          }}
          onKeyDown={onKeyDown}
          placeholder="City, country or hotel ID"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-label="Destination"
          autoComplete="off"
          className="w-full py-3.5 text-[16px] font-semibold text-[#1A2B49] outline-none placeholder:font-normal placeholder:text-[#8B96A8]"
        />
      </span>
      <ChevronDown className="h-3 w-3 shrink-0 text-[#8B96A8]" />
      {open && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-[280px] overflow-y-auto rounded-md border border-[#E8EDF2] bg-white py-1 shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
          {matches.length === 0 ? (
            <li className="px-4 py-2.5 text-[15px] text-[#8B96A8]">
              No matching destination — Search filters properties instead
            </li>
          ) : (
            matches.map((d, i) => (
              <li key={d.slug}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    pick(d);
                  }}
                  onMouseEnter={() => setHighlight(i)}
                  className={`flex w-full items-center gap-2.5 px-4 py-3 text-left text-[14px] ${
                    i === highlight ? 'bg-[#F0F5FF]' : ''
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#E23F3F]" />
                  <span className="font-semibold text-[#1A2B49]">{d.name}</span>
                  <span className="text-[#8B96A8]">{d.country}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
