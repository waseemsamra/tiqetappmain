
import { getHeroContent } from '@/lib/hero';
import HomePageClient from './home-page-client';
import type { Excursion, HeroContent } from '@/types';
import { readFileSync } from 'fs';
import { join } from 'path';

export const revalidate = 0;

// DEPLOYMENT TRIGGER: 2026-06-15T04:23:00+04:00 - Force deploy for Singapore KL Bangkok tab fix

const WORLDWIDE_CITIES = ['Barcelona', 'Rome', 'Paris', 'New York', 'Amsterdam', 'Singapore', 'Kuala Lumpur', 'Bangkok'];
const UAE_CITIES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras al-Khaimah', 'Fujairah'];

function loadLocalExcursions(): Excursion[] {
  try {
    const filePath = join(process.cwd(), 'public', 'excursions.json');
    const raw = readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.experiences) ? parsed.experiences : [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const allExcursions: Excursion[] = loadLocalExcursions();
  let heroContent: HeroContent = { headline: 'Discover Amazing Experiences', subheading: 'Find the best things to do worldwide' };

  try {
    const fetched = await getHeroContent();
    if (fetched?.headline) heroContent.headline = fetched.headline;
    if (fetched?.subheading) heroContent.subheading = fetched.subheading;
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
      heroContent={heroContent}
      uaeExcursions={uaeExcursions}
      worldwideExcursions={worldwideExcursions}
      barcelonaExcursions={barcelonaExcursions}
    />
  );
};
