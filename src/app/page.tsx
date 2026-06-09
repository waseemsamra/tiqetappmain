
import { getExcursions, getTopRatedExcursions } from '@/app/actions';
import { getHeroContent } from '@/lib/hero';
import HomePageClient from './home-page-client';
import { searchProducts } from '@/lib/json-cache';
import { promises as fs } from 'fs';
import { join } from 'path';

// Fallback static data file (included in build)
async function getStaticExcursions(): Promise<any[]> {
  try {
    const data = await fs.readFile(join(process.cwd(), 'src/data/excursions.json'), 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export default async function HomePage() {
  let allExcursions: any[] = [];
  let topRatedExcursions: any[] = [];
  let heroContent: any = { headline: 'Discover Amazing Experiences', subheading: 'Find the best things to do worldwide' };

  try {
    const results = await Promise.all([
      getExcursions(),
      getTopRatedExcursions(),
      getHeroContent(),
    ]);
    allExcursions = results[0] || [];
    topRatedExcursions = results[1] || [];
    heroContent = results[2] || heroContent;
  } catch (error) {
    console.error('Error fetching home page data:', error);
  }

  // Use cached/API data or static fallback
  if (!allExcursions || allExcursions.length === 0) {
    try {
      const cached = await searchProducts('');
      allExcursions = cached && cached.length > 0 ? cached : await getStaticExcursions();
    } catch (cacheError) {
      console.error('Cache fallback failed, using static data:', cacheError);
      allExcursions = await getStaticExcursions();
    }
    topRatedExcursions = allExcursions.slice(0, 10);
  }

  return (
    <HomePageClient
      allExcursions={allExcursions}
      topRatedExcursions={topRatedExcursions}
      heroContent={heroContent || {}}
    />
  );
};
