import type { Metadata } from 'next';
import MobileHome from './mobile-home';

export const metadata: Metadata = {
  title: 'AAFare',
  description: 'Your ticket to better experiences.',
};

export default function MobilePage() {
  return <MobileHome />;
}
