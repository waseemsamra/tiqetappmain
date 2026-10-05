
import HomePageClient from './home-page-client';
import { getHomePageData } from '@/lib/home-data';

export const revalidate = 0;

// DEPLOYMENT TRIGGER: 2026-06-15T04:23:00+04:00 - Force deploy for Singapore KL Bangkok tab fix

export default async function HomePage({ searchParams }: { searchParams?: { previewCountry?: string | string[] } }) {
  const data = await getHomePageData(searchParams);

  return <HomePageClient {...data} />;
};
