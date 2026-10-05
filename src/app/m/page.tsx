import type { Metadata } from 'next';
import MobileHome from './mobile-home';
import { getHomePageData } from '@/lib/home-data';

export const metadata: Metadata = {
  title: 'AAFare',
  description: 'Your ticket to better experiences.',
};

export const dynamic = 'force-dynamic';

export default async function MobilePage() {
  const data = await getHomePageData();
  return <MobileHome {...data} />;
}
