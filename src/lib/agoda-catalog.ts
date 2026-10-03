export interface AgodaDestination {
  slug: string;
  name: string;
  country: string;
  countryCode: string;
  /** Agoda city ID — enables city search when known. */
  cityId?: number;
  /** Destination centre — the API searches by coordinate radius. */
  latitude: number;
  longitude: number;
  /** Search radius in km around the centre. */
  radiusKm: number;
  /** Neighbourhoods for the area filter (centre coordinates). */
  areas?: AgodaArea[];
}

export interface AgodaArea {
  name: string;
  latitude: number;
  longitude: number;
}

/**
 * Searchable stay destinations.
 *
 * The Long Tail Search API accepts a city ID, a hotel ID list,
 * or a geo coordinate + radius — never a destination string.
 * City IDs are sparse and not published, so every destination
 * also carries its centre coordinates; the search falls back to
 * a radius search around those coordinates, which returns the
 * same hotels as a city search.
 */
export const AGODA_DESTINATIONS: AgodaDestination[] = [
  { slug: 'dubai', name: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', latitude: 25.2048, longitude: 55.2708, radiusKm: 25 },
  { slug: 'bangkok', name: 'Bangkok', country: 'Thailand', countryCode: 'TH', cityId: 9395, latitude: 13.7563, longitude: 100.5018, radiusKm: 25 },
  { slug: 'singapore', name: 'Singapore', country: 'Singapore', countryCode: 'SG', latitude: 1.3521, longitude: 103.8198, radiusKm: 20 },
  { slug: 'tokyo', name: 'Tokyo', country: 'Japan', countryCode: 'JP', latitude: 35.6762, longitude: 139.6503, radiusKm: 25 },
  { slug: 'mumbai', name: 'Mumbai', country: 'India', countryCode: 'IN', latitude: 19.076, longitude: 72.8777, radiusKm: 25 },
  { slug: 'seoul', name: 'Seoul', country: 'South Korea', countryCode: 'KR', latitude: 37.5665, longitude: 126.978, radiusKm: 20 },
  { slug: 'hong-kong', name: 'Hong Kong', country: 'Hong Kong SAR, China', countryCode: 'HK', latitude: 22.3193, longitude: 114.1694, radiusKm: 20 },
  { slug: 'macau', name: 'Macau', country: 'Macau SAR, China', countryCode: 'MO', latitude: 22.1987, longitude: 113.5439, radiusKm: 15 },
  { slug: 'beijing', name: 'Beijing', country: 'China', countryCode: 'CN', latitude: 39.9042, longitude: 116.4074, radiusKm: 25 },
  { slug: 'athens', name: 'Athens', country: 'Greece', countryCode: 'GR', latitude: 37.9838, longitude: 23.7275, radiusKm: 20 },
  { slug: 'budapest', name: 'Budapest', country: 'Hungary', countryCode: 'HU', latitude: 47.4979, longitude: 19.0402, radiusKm: 20 },
  { slug: 'rome', name: 'Rome', country: 'Italy', countryCode: 'IT', latitude: 41.9028, longitude: 12.4964, radiusKm: 20 },
  { slug: 'new-york', name: 'New York', country: 'United States', countryCode: 'US', latitude: 40.7128, longitude: -74.006, radiusKm: 25 },
  { slug: 'paris', name: 'Paris', country: 'France', countryCode: 'FR', latitude: 48.8566, longitude: 2.3522, radiusKm: 20 },
  { slug: 'jakarta', name: 'Jakarta', country: 'Indonesia', countryCode: 'ID', latitude: -6.2088, longitude: 106.8456, radiusKm: 25 },
  { slug: 'male', name: 'Malé', country: 'Maldives', countryCode: 'MV', latitude: 4.1755, longitude: 73.5093, radiusKm: 10 },
];

export function findDestination(slug?: string): AgodaDestination {
  return AGODA_DESTINATIONS.find((d) => d.slug === slug) ?? AGODA_DESTINATIONS[0];
}
