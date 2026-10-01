/**
 * Maps the visitor's country to the destinations the homepage should lead with.
 *
 * The homepage used to hard-code the UAE, which looked wrong to anyone outside
 * it. The catalogue only covers a handful of countries, so a country is only
 * used when the catalogue actually has experiences there; everything else falls
 * back to the UAE, which has the widest selection.
 */

/** ISO 3166-1 alpha-2 to the catalogue's country name, plus its top cities. */
const COUNTRY_DESTINATIONS: Record<string, { name: string; cities: string[] }> = {
  AE: { name: 'United Arab Emirates', cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras al-Khaimah', 'Fujairah'] },
  SG: { name: 'Singapore', cities: ['Singapore'] },
  MY: { name: 'Malaysia', cities: ['Kuala Lumpur'] },
  TH: { name: 'Thailand', cities: ['Bangkok'] },
  ES: { name: 'Spain', cities: ['Barcelona'] },
  IT: { name: 'Italy', cities: ['Rome'] },
  FR: { name: 'France', cities: ['Paris'] },
  GB: { name: 'United Kingdom', cities: ['London'] },
  NL: { name: 'The Netherlands', cities: ['Amsterdam'] },
  US: { name: 'United States', cities: ['New York'] },
  CA: { name: 'Canada', cities: ['Vancouver', 'Toronto', 'Niagara Falls', 'Montreal'] },
  MX: { name: 'Mexico', cities: ['Mexico City'] },
  PE: { name: 'Peru', cities: ['Lima', 'Cusco', 'Puno', 'Arequipa'] },
  BR: { name: 'Brazil', cities: ['Rio de Janeiro'] },
  AR: { name: 'Argentina', cities: ['Buenos Aires'] },
  CL: { name: 'Chile', cities: ['Santiago'] },
  AU: { name: 'Australia', cities: ['Sydney', 'Melbourne', 'Gold Coast'] },
  NZ: { name: 'New Zealand', cities: ['Auckland', 'Queenstown'] },
  JP: { name: 'Japan', cities: ['Tokyo', 'Osaka'] },
  KR: { name: 'South Korea', cities: ['Seoul'] },
  CN: { name: 'China', cities: ['Beijing', 'Shanghai'] },
  IN: { name: 'India', cities: ['Delhi', 'Mumbai'] },
  TR: { name: 'Turkey', cities: ['Istanbul'] },
  EG: { name: 'Egypt', cities: ['Cairo', 'Hurghada'] },
  ZA: { name: 'South Africa', cities: ['Cape Town', 'Johannesburg'] },
  PT: { name: 'Portugal', cities: ['Lisbon', 'Porto'] },
  IE: { name: 'Ireland', cities: ['Dublin'] },
  AT: { name: 'Austria', cities: ['Vienna', 'Salzburg'] },
  CH: { name: 'Switzerland', cities: ['Zurich', 'Geneva'] },
  GR: { name: 'Greece', cities: ['Athens', 'Santorini'] },
  HR: { name: 'Croatia', cities: ['Dubrovnik', 'Split'] },
  CZ: { name: 'Czech Republic', cities: ['Prague'] },
  HU: { name: 'Hungary', cities: ['Budapest'] },
  PL: { name: 'Poland', cities: ['Warsaw', 'Krakow'] },
  SE: { name: 'Sweden', cities: ['Stockholm', 'Gothenburg'] },
  NO: { name: 'Norway', cities: ['Oslo', 'Bergen'] },
  DK: { name: 'Denmark', cities: ['Copenhagen'] },
  FI: { name: 'Finland', cities: ['Helsinki'] },
  IS: { name: 'Iceland', cities: ['Reykjavik'] },
  QA: { name: 'Qatar', cities: ['Doha'] },
  SA: { name: 'Saudi Arabia', cities: ['Riyadh', 'Jeddah'] },
  KW: { name: 'Kuwait', cities: ['Kuwait City'] },
  BH: { name: 'Bahrain', cities: ['Manama'] },
  OM: { name: 'Oman', cities: ['Muscat'] },
  JO: { name: 'Jordan', cities: ['Amman', 'Petra'] },
  LB: { name: 'Lebanon', cities: ['Beirut'] },
  MA: { name: 'Morocco', cities: ['Marrakesh', 'Casablanca'] },
  KE: { name: 'Kenya', cities: ['Nairobi', 'Mombasa'] },
  RO: { name: 'Romania', cities: ['Bucharest'] },
  BG: { name: 'Bulgaria', cities: ['Sofia'] },
  SI: { name: 'Slovenia', cities: ['Ljubljana'] },
  RS: { name: 'Serbia', cities: ['Belgrade'] },
  SK: { name: 'Slovakia', cities: ['Bratislava'] },
  LT: { name: 'Lithuania', cities: ['Vilnius'] },
  LV: { name: 'Latvia', cities: ['Riga'] },
  EE: { name: 'Estonia', cities: ['Tallinn'] },
  LU: { name: 'Luxembourg', cities: ['Luxembourg City'] },
  MT: { name: 'Malta', cities: ['Valletta'] },
  CY: { name: 'Cyprus', cities: ['Limassol', 'Paphos'] },
  VN: { name: 'Vietnam', cities: ['Hanoi', 'Ho Chi Minh City'] },
  ID: { name: 'Indonesia', cities: ['Bali', 'Jakarta'] },
  PH: { name: 'Philippines', cities: ['Manila'] },
  TW: { name: 'Taiwan', cities: ['Taipei'] },
  HK: { name: 'Hong Kong', cities: ['Hong Kong'] },
  IL: { name: 'Israel', cities: ['Tel Aviv', 'Jerusalem'] },
};

export type CountryDestinations = { name: string; cities: string[] };

/** Cities to feature when the visitor's country has no catalogue coverage. */
export const DEFAULT_DESTINATIONS: CountryDestinations = {
  name: 'United Arab Emirates',
  cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras al-Khaimah', 'Fujairah'],
};

/**
 * Cities for a country already resolved to `name`.
 *
 * The client component needs this too, and it only receives the resolved country
 * name, so the mapping is looked up by name rather than re-resolving the ISO code.
 */
export function citiesForCountry(name: string): string[] {
  for (const entry of Object.values(COUNTRY_DESTINATIONS)) {
    if (normalizeCountryName(entry.name) === normalizeCountryName(name)) return entry.cities;
  }
  return DEFAULT_DESTINATIONS.cities;
}

/**
 * The catalogue country name for an ISO code, or '' when the country is not
 * mapped. Used to decide whether an API fetch is worth making.
 */
export function countryNameFor(isoCode: string | undefined): string {
  if (!isoCode) return '';
  return COUNTRY_DESTINATIONS[isoCode.toUpperCase()]?.name || '';
}

/**
 * Resolves the visitor's ISO country code to destinations.
 *
 * Only returns a country the catalogue actually has; `availableCountries` is the
 * set of country names present in the loaded excursions, compared case- and
 * punctuation-insensitively so "United Arab Emirates" matches either spelling.
 */
export function destinationsForCountry(
  isoCode: string | undefined,
  availableCountries: string[],
): CountryDestinations {
  if (!isoCode) return DEFAULT_DESTINATIONS;

  const entry = COUNTRY_DESTINATIONS[isoCode.toUpperCase()];
  if (!entry) return DEFAULT_DESTINATIONS;

  const available = new Set(availableCountries.map(normalizeCountryName));
  if (!available.has(normalizeCountryName(entry.name))) {
    return DEFAULT_DESTINATIONS;
  }
  return entry;
}

function normalizeCountryName(name: string): string {
  return name.toLowerCase().replace(/[^a-z]/g, '');
}
