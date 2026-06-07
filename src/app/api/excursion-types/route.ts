
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const excursionTypes = [
      { id: '1', name: 'Tours' },
      { id: '2', name: 'Museums' },
      { id: '3', name: 'Activities' },
      { id: '4', name: 'Shows' },
      { id: '5', name: 'Restaurants' }
    ];
    return NextResponse.json(excursionTypes);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return NextResponse.json({ message: 'Excursion type creation not available in API-only mode' }, { status: 403 });
}
