
import { getHeroContent } from '@/lib/hero';
import { fetchTiqetsProducts } from '@/lib/tiqets-api';
import HomePageClient from './home-page-client';
import type { Excursion, HeroContent } from '@/types';

export const revalidate = 0;

const WORLDWIDE_CITIES = ['Barcelona', 'Rome', 'Paris', 'New York', 'Amsterdam', 'Singapore', 'Kuala Lumpur', 'Bangkok'];
const UAE_CITIES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras al-Khaimah', 'Fujairah'];

export default async function HomePage() {
  let allExcursions: Excursion[] = [];
  let heroContent: HeroContent = { headline: 'Discover Amazing Experiences', subheading: 'Find the best things to do worldwide' };

  try {
    const [uaeResults, worldwideResults] = await Promise.all([
      Promise.all(UAE_CITIES.map(city => fetchTiqetsProducts({ city_name: city }))),
      Promise.all(WORLDWIDE_CITIES.map(city => fetchTiqetsProducts({ city_name: city }))),
    ]);

    const combined = [...uaeResults.flat(), ...worldwideResults.flat()];
    const seen = new Set<string>();
    allExcursions = combined.filter(ex => {
      const id = String(ex.id);
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  } catch {}

  try {
    heroContent = await getHeroContent();
  } catch {}

  const byCity = (city: string, limit = 10) =>
    allExcursions.filter(ex => (ex.city || '').toLowerCase().includes(city.toLowerCase())).slice(0, limit);

  const uaeExcursions = UAE_CITIES.flatMap(city => byCity(city, 10)).slice(0, 50);
  const worldwideExcursions = WORLDWIDE_CITIES.flatMap(city => byCity(city, 10)).slice(0, 50);
  const barcelonaExcursions = byCity('Barcelona', 10);
  const topRatedExcursions = [...allExcursions]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 20);

  return (
    <HomePageClient
      allExcursions={allExcursions}
      topRatedExcursions={topRatedExcursions}
      heroContent={heroContent || { headline: '', subheading: '' }}
      uaeExcursions={uaeExcursions}
      worldwideExcursions={worldwideExcursions}
      barcelonaExcursions={barcelonaExcursions}
    />
  );
};
