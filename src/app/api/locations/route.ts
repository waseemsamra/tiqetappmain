import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'cache', 'locations.json');
    const raw = readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    return NextResponse.json({ countries: parsed.countries ?? [], cities: parsed.cities ?? [] });
  } catch (error) {
    return NextResponse.json({ countries: [], cities: [], error: 'Failed to load locations' }, { status: 500 });
  }
}
