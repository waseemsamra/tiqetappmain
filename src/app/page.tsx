
import { getExcursions, getTopRatedExcursions } from '@/app/actions';
import { getHeroContent } from '@/lib/hero';
import HomePageClient from './home-page-client';
import type { Excursion, HeroContent } from '@/types';

export default async function HomePage() {
  let allExcursions: Excursion[] = [];
  let topRatedExcursions: Excursion[] = [];
  let heroContent: HeroContent = { headline: 'Discover Amazing Experiences', subheading: 'Find the best things to do worldwide' };

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

  return (
    <HomePageClient
      allExcursions={allExcursions}
      topRatedExcursions={topRatedExcursions}
      heroContent={heroContent || { headline: '', subheading: '' }}
    />
  );
};
