'use client';

import { useMemo, useState } from 'react';
import { Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { collectTourLanguages, shouldShowLanguageSelector } from '@/lib/tour-language';
import type { AvailabilityVariant } from '@/lib/tour-language';

const ALL = 'all';

interface TourLanguageFilterProps {
  variants: AvailabilityVariant[];
  onFilter: (code: string | null) => void;
  /** Ties the chip to an anchor id so the list can be scrolled into view. */
  targetId?: string;
}

/**
 * Tour-language selector, driven by the Availability API's
 * `variants[].language_selection`.
 *
 * Renders nothing when Tiqets reports no languages for the product, which is
 * the documented signal that the selector should not be shown. Filtering
 * happens in the browser; the language is ultimately carried by the chosen
 * `variant_id` at booking time, so no language parameter is ever sent.
 */
export function TourLanguageFilter({ variants, onFilter, targetId }: TourLanguageFilterProps) {
  const languages = useMemo(() => collectTourLanguages(variants), [variants]);
  const [selected, setSelected] = useState<string>(ALL);

  if (!shouldShowLanguageSelector(variants)) return null;

  const handleChange = (value: string) => {
    setSelected(value);
    onFilter(value === ALL ? null : value);
    if (targetId) {
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200/80 bg-white p-4">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-semibold text-gray-900">Tour language</span>
      </div>
      <Select value={selected} onValueChange={handleChange}>
        <SelectTrigger className="h-11 w-full sm:w-64" aria-label="Tour language">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All languages</SelectItem>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              {language.label}
              {language.native !== language.label ? ` (${language.native})` : ''}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-gray-500">
        Showing tours conducted in the language you select.
      </p>
    </div>
  );
}
