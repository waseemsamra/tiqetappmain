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
  {
    slug: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    latitude: 25.2048,
    longitude: 55.2708,
    radiusKm: 25,
    areas: [
      { name: 'Downtown Dubai', latitude: 25.1972, longitude: 55.2744 },
      { name: 'Dubai Marina', latitude: 25.0805, longitude: 55.1403 },
      { name: 'Business Bay', latitude: 25.1909, longitude: 55.2646 },
      { name: 'Deira', latitude: 25.2705, longitude: 55.3056 },
      { name: 'Palm Jumeirah', latitude: 25.1124, longitude: 55.139 },
      { name: 'Bur Dubai', latitude: 25.2532, longitude: 55.2969 },
      { name: 'Jumeirah Village Circle', latitude: 25.06, longitude: 55.21 },
      { name: 'Dubailand', latitude: 25.1065, longitude: 55.4164 },
      { name: 'Barsha Heights (Tecom)', latitude: 25.09, longitude: 55.19 },
      { name: 'Nad Al Sheba', latitude: 25.11, longitude: 55.46 },
      { name: 'Jumeirah Lakes Towers', latitude: 25.065, longitude: 55.19 },
      { name: 'Al Barsha', latitude: 25.11, longitude: 55.2 },
      { name: 'Sheikh Zayed Road', latitude: 25.13, longitude: 55.22 },
      { name: 'Jumeirah Beach', latitude: 25.09, longitude: 55.18 },
      { name: 'Jebel Ali', latitude: 25.0, longitude: 55.06 },
      { name: 'Dubai Festival City', latitude: 25.19, longitude: 55.4 },
      { name: 'Dubai International Airport', latitude: 25.2528, longitude: 55.3644 },
      { name: 'Al Jaddaf', latitude: 25.24, longitude: 55.31 },
      { name: 'Dubai Sports City', latitude: 25.05, longitude: 55.24 },
      { name: 'World Trade Centre DIFC', latitude: 25.21, longitude: 55.28 },
      { name: 'Dubai International City', latitude: 25.15, longitude: 55.48 },
      { name: 'Sharjah Waterfront', latitude: 25.35, longitude: 55.42 },
      { name: 'Sharjah City Center', latitude: 25.35, longitude: 55.41 },
      { name: 'Bluewaters Island', latitude: 25.1, longitude: 55.12 },
      { name: 'Dubai Silicon Oasis', latitude: 25.13, longitude: 55.39 },
      { name: 'Damac Hills 2', latitude: 25.04, longitude: 55.26 },
      { name: 'Al Quoz', latitude: 25.11, longitude: 55.22 },
      { name: 'The World Islands', latitude: 25.2, longitude: 55.15 },
      { name: 'Dubai Islands', latitude: 25.32, longitude: 55.4 },
      { name: 'Dubai Maritime City', latitude: 25.23, longitude: 55.32 },
      { name: 'Pearl Jumeirah', latitude: 25.1, longitude: 55.14 },
      { name: 'Jumeirah', latitude: 25.12, longitude: 55.18 },
      { name: 'Jumeirah Beach Residence JBR', latitude: 25.075, longitude: 55.14 },
    ],
  },
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

export function findDestination(input?: string): AgodaDestination {
  const q = (input ?? '').trim().toLowerCase();
  if (!q) return AGODA_DESTINATIONS[0];
  return (
    AGODA_DESTINATIONS.find((d) => d.slug === q) ??
    AGODA_DESTINATIONS.find((d) => d.name.toLowerCase() === q) ??
    AGODA_DESTINATIONS.find(
      (d) => `${d.name}, ${d.country}`.toLowerCase() === q,
    ) ??
    // Partial name match so the searchable field resolves free-text input.
    AGODA_DESTINATIONS.find((d) => d.name.toLowerCase().includes(q)) ??
    AGODA_DESTINATIONS[0]
  );
}
