import { NextResponse } from 'next/server';
import { CITY_CATEGORIES } from '@/lib/city-categories';

export async function GET() {
  const keys = Object.keys(CITY_CATEGORIES);
  const hasMexicoCity = 'mexico-city' in CITY_CATEGORIES;
  const hasCancun = 'cancun' in CITY_CATEGORIES;
  
  return NextResponse.json({
    totalKeys: keys.length,
    hasMexicoCity,
    hasCancun,
    mexicoCityCategories: CITY_CATEGORIES['mexico-city'],
    cancunCategories: CITY_CATEGORIES['cancun'],
    sampleKeys: keys.slice(0, 10)
  });
}