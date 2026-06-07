
import { getExcursions, getTopRatedExcursions } from '@/app/actions';
import { getHeroContent } from '@/lib/hero';
import HomePageClient from './home-page-client';

export default async function HomePage() {
  let allExcursions: any[] = [];
  let topRatedExcursions: any[] = [];
  let heroContent: any = null;

  try {
    [allExcursions, topRatedExcursions, heroContent] = await Promise.all([
      getExcursions(),
      getTopRatedExcursions(),
      getHeroContent(),
    ]);
  } catch (error) {
    console.error('Error fetching home page data:', error);
    // Return a fallback or rethrow depending on your needs
    throw error;
  }

  return (
    <HomePageClient
      allExcursions={allExcursions}
      topRatedExcursions={topRatedExcursions}
      heroContent={heroContent!}
    />
  );
};
