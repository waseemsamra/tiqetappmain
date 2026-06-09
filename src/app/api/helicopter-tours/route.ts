import { NextRequest, NextResponse } from 'next/server';
import { getHelicopterTours } from '@/lib/json-cache';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || undefined;
  const country = searchParams.get('country') || undefined;

  try {
    let tours = await getHelicopterTours();

    // Filter by city if specified
    if (city) {
      tours = tours.filter((t) => 
        t.city_name?.toLowerCase().includes(city.toLowerCase())
      );
    }

    // Filter by country if specified
    if (country) {
      tours = tours.filter((t) => 
        t.country_name?.toLowerCase().includes(country.toLowerCase())
      );
    }

    return NextResponse.json({
      helicopter_tours: tours,
      total: tours.length,
      filters: { city, country }
    });
  } catch (error) {
    console.error('Error fetching helicopter tours:', error);
    return NextResponse.json({
      helicopter_tours: [],
      total: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}