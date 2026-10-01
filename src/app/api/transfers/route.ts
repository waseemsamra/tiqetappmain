import { NextRequest, NextResponse } from 'next/server';
import { searchTransfers } from '@/lib/intui-transfers';

export const dynamic = 'force-dynamic';

/**
 * GET /api/transfers?airportCode=DXB&arrivalDate=2026-10-15&arrivalTime=09:00&adults=2
 *
 * Thin proxy in front of Intui's transfer API so the browser never depends on
 * their host. Returns a tracked landing link when the API is unreachable.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const airportCode = (params.get('airportCode') ?? '').trim().toUpperCase();
  const arrivalDate = (params.get('arrivalDate') ?? '').trim();

  if (!airportCode || !arrivalDate) {
    return NextResponse.json(
      { error: 'airportCode and arrivalDate are required' },
      { status: 400 },
    );
  }

  const hotelName = (params.get('hotelName') ?? '').trim();
  const hotelAddress = (params.get('hotelAddress') ?? '').trim();

  const result = await searchTransfers({
    airportCode,
    arrivalDate,
    arrivalTime: params.get('arrivalTime') ?? '10:00',
    // The digest needs both halves of the name/address pair, so they are only
    // forwarded together.
    ...(hotelName && hotelAddress ? { hotelName, hotelAddress } : {}),
    departureDate: params.get('departureDate') ?? undefined,
    departureTime: params.get('departureTime') ?? undefined,
    adults: Number(params.get('adults') ?? 2) || 2,
    children: Number(params.get('children') ?? 0) || 0,
    infants: Number(params.get('infants') ?? 0) || 0,
    currency: params.get('currency') ?? undefined,
  });

  return NextResponse.json(result, {
    status: 200,
    headers: { 'Cache-Control': 'no-store' },
  });
}
