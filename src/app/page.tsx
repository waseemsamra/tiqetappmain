
import { getHeroContent } from '@/lib/hero';
import { fetchTiqetsProducts } from '@/lib/tiqets-api';
import HomePageClient from './home-page-client';
import type { Excursion, HeroContent } from '@/types';
import { readFileSync } from 'fs';
import { join } from 'path';

export const revalidate = 0;

export default async function HomePage() {
  let allExcursions: Excursion[] = [];
  let heroContent: HeroContent = { headline: 'Discover Amazing Experiences', subheading: 'Find the best things to do worldwide' };

  try {
    allExcursions = await fetchTiqetsProducts({});
  } catch {}

  if (!allExcursions.length) {
    try {
      const filePath = join(process.cwd(), 'public', 'excursions.json');
      const raw = readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      allExcursions = Array.isArray(parsed.experiences) ? parsed.experiences : [];
    } catch {}
  }

  try {
    heroContent = await getHeroContent();
  } catch {}

  const byCity = (city: string, limit = 10) =>
    allExcursions.filter(ex => (ex.city || '').toLowerCase() === city.toLowerCase()).slice(0, limit);

  const uaeExcursions = ['Dubai', 'Abu Dhabi', 'Sharjah'].flatMap(city => byCity(city, 10)).slice(0, 50);
  const worldwideExcursions = ['Barcelona', 'Rome', 'Paris', 'New York', 'Amsterdam'].flatMap(city => byCity(city, 10)).slice(0, 50);
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
