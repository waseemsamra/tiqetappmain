
import { getExcursions, getTopRatedExcursions } from '@/app/actions';
import { getHeroContent } from '@/lib/hero';
import HomePageClient from './home-page-client';
import { searchProducts } from '@/lib/json-cache';
import staticExcursions from '@/data/excursions.json';

const TARGET_CITIES = ['Barcelona', 'Rome', 'Paris', 'New York', 'Amsterdam'];

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

  // If API returned no data or is missing target cities, supplement with static data
  if ((!allExcursions || allExcursions.length === 0)) {
    try {
      const cached = await searchProducts('');
      allExcursions = cached && cached.length > 0 ? cached : staticExcursions;
    } catch (cacheError) {
      console.error('Cache fallback failed, using static data:', cacheError);
      allExcursions = staticExcursions;
    }
    topRatedExcursions = allExcursions.slice(0, 10);
  } else {
    // Check if we're missing any target cities and supplement with static data
    const existingCities = new Set(allExcursions.map((e: any) => e.city));
    const missingTargetCities = TARGET_CITIES.filter(city => !existingCities.has(city));
    
    if (missingTargetCities.length > 0) {
      const staticForMissing = staticExcursions.filter((e: any) => 
        missingTargetCities.includes(e.city)
      );
      // Merge API data with static data for missing cities (avoid duplicates by id)
      const existingIds = new Set(allExcursions.map((e: any) => e.id));
      const staticToAdd = staticForMissing.filter((e: any) => !existingIds.has(e.id));
      allExcursions = [...allExcursions, ...staticToAdd];
    }
  }

  return (
    <HomePageClient
      allExcursions={allExcursions}
      topRatedExcursions={topRatedExcursions}
      heroContent={heroContent || {}}
    />
  );
};
