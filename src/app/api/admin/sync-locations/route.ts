export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { syncLocations } from '@/lib/locations';

export async function POST() {
  try {
    const result = await syncLocations();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('Location sync error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST to sync locations' });
}
