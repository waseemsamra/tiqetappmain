/**
 * Category page plumbing.
 *
 * Tiqets serves one page per city + category, e.g.
 * /en/dubai-attractions-c60005/attractions-t2966/
 * The trailing `-t<id>` is the category's type id, and
 * every product lists the type ids it belongs to in its
 * tag_ids — so a category page is simply the city's
 * products filtered by that type id.
 */

/** Category URL slug -> Tiqets type id. */
export const CATEGORY_TYPE_IDS: Record<string, string> = {
  'attractions': '2966',
  'food-drinks': '1034',
  'city-tours': '1040',
  'cruises-boat-tours': '1035',
  'nature-wildlife': '2745',
  'museums': '2968',
  'aviation-activities': '1037',
  'city-cards-passes': '1032',
  'games-entertainment': '1038',
  'historical-archaeological-sites': '2967',
  'shows-theatres': '2596',
  'transfers': '1840',
  'travel-services': '2597',
  'trips-excursions': '1042',
  'water-activities': '1036',
  'adventure-seekers': '1191',
  'architecture-admirers': '1192',
  'hidden-gems': '1944',
  'nature-lovers': '1199',
  'nightlife-seekers': '1200',
  'sport-fanatics': '1201',
  'adventure-activities': '2747',
  'adventure-parks': '722',
  'aquariums': '724',
  'art-museums': '700',
  'botanical-gardens': '725',
  'breweries': '717',
  'cable-cars': '962',
  'castles': '705',
  'concerts-live-music': '2595',
  'culture-heritage': '2744',
  'distilleries': '718',
  'ferris-wheels': '1086',
  'geological-wonders': '728',
  'history-museums': '702',
  'interactive-museums': '701',
  'monuments': '707',
  'motorsports-driving': '2746',
  'music-museums': '704',
  'national-parks': '726',
  'observation-decks': '716',
  'palaces': '706',
  'places-of-worship': '710',
  'public-transport': '1048',
  'rentals': '1049',
  'science-technology-museums': '703',
  'sport': '711',
  'theme-parks': '712',
  'water-parks': '713',
  'workshops-classes': '1033',
  'zoos': '723',
};

/** Category display name -> URL slug. */
const NAME_TO_SLUG: Record<string, string> = {
  'attractions': 'attractions',
  'food & drinks': 'food-drinks',
  'city tours': 'city-tours',
  'cruises & boat tours': 'cruises-boat-tours',
  'nature & wildlife': 'nature-wildlife',
  'museums': 'museums',
  'aviation activities': 'aviation-activities',
  'city cards & passes': 'city-cards-passes',
  'games & entertainment': 'games-entertainment',
  'historical & archaeological sites': 'historical-archaeological-sites',
  'shows & theatres': 'shows-theatres',
  'transfers': 'transfers',
  'travel services': 'travel-services',
  'trips & excursions': 'trips-excursions',
  'water activities': 'water-activities',
  'adventure seekers': 'adventure-seekers',
  'architecture admirers': 'architecture-admirers',
  'hidden gems': 'hidden-gems',
  'nature lovers': 'nature-lovers',
  'nightlife seekers': 'nightlife-seekers',
  'sport fanatics': 'sport-fanatics',
};

/** URL slug -> display name. */
const SLUG_TO_NAME: Record<string, string> = {
  'attractions': 'Attractions',
  'food-drinks': 'Food & Drinks',
  'city-tours': 'City Tours',
  'cruises-boat-tours': 'Cruises & Boat Tours',
  'nature-wildlife': 'Nature & Wildlife',
  'museums': 'Museums',
  'aviation-activities': 'Aviation Activities',
  'city-cards-passes': 'City Cards & Passes',
  'games-entertainment': 'Games & Entertainment',
  'historical-archaeological-sites': 'Historical & Archaeological Sites',
  'shows-theatres': 'Shows & Theatres',
  'transfers': 'Transfers',
  'travel-services': 'Travel Services',
  'trips-excursions': 'Trips & Excursions',
  'water-activities': 'Water Activities',
  'adventure-seekers': 'Adventure seekers',
  'architecture-admirers': 'Architecture admirers',
  'hidden-gems': 'Hidden Gems',
  'nature-lovers': 'Nature lovers',
  'nightlife-seekers': 'Nightlife seekers',
  'sport-fanatics': 'Sport fanatics',
};

/** Tiqets type id -> URL slug (inverse of CATEGORY_TYPE_IDS). */
const TYPE_ID_TO_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_TYPE_IDS).map(([slug, id]) => [id, slug]),
);

/** Tiqets type id -> URL slug, or null when unknown. */
export function categorySlugByTypeId(typeId: string): string | null {
  return TYPE_ID_TO_SLUG[typeId] || null;
}

/** Lowercased display name -> URL slug. */
export function categorySlug(name: string): string {
  const key = name.trim().toLowerCase();
  return NAME_TO_SLUG[key] || key.replace(/\s+/g, '-');
}

/** URL slug -> display name, or a capitalized slug if unknown. */
export function categoryName(slug: string): string {
  if (SLUG_TO_NAME[slug]) return SLUG_TO_NAME[slug];
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** Display name -> Tiqets type id, or null when unknown. */
export function categoryTypeId(name: string): string | null {
  return CATEGORY_TYPE_IDS[categorySlug(name)] || null;
}

/** Display name -> the app's category page path. */
export function categoryPath(cityName: string, category: string): string {
  return `/city/${encodeURIComponent(cityName)}/category/${categorySlug(category)}`;
}
