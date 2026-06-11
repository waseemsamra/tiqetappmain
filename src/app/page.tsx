
import { readFileSync } from 'fs';
import { join } from 'path';
import { getHeroContent } from '@/lib/hero';
import HomePageClient from './home-page-client';
import type { Excursion, HeroContent } from '@/types';

export const revalidate = 0;

export default async function HomePage() {
  let allExcursions: Excursion[] = [];
  let heroContent: HeroContent = { headline: 'Discover Amazing Experiences', subheading: 'Find the best things to do worldwide' };

  try {
    const filePath = join(process.cwd(), 'public', 'excursions.json');
    const raw = readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    allExcursions = Array.isArray(parsed.experiences) ? parsed.experiences : [];
  } catch {}

  try {
    heroContent = await getHeroContent();
  } catch {}

  const topRatedExcursions = [...allExcursions]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 20);

  return (
    <HomePageClient
      allExcursions={allExcursions}
      topRatedExcursions={topRatedExcursions}
      heroContent={heroContent || { headline: '', subheading: '' }}
    />
  );
};
