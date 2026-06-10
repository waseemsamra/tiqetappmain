import { NextResponse } from 'next/server';
import { getCountries, getCities } from '@/lib/locations';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [countries, cities] = await Promise.all([getCountries(), getCities()]);
    return NextResponse.json({ countries, cities });
  } catch (error) {
    console.error('Failed to load locations:', error);
    return NextResponse.json({ countries: [], cities: [], error: 'Failed to load locations' }, { status: 500 });
  }
}
