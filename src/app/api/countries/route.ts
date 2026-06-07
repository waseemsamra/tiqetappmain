export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';

const countrySchema = z.object({
  code: z.string().length(2, "Country code must be exactly 2 characters long."),
  name: z.string().min(2, "Country name must be at least 2 characters long."),
  currency: z.string().min(2, "Currency must be at least 2 characters long."),
  currency_symbol: z.string().min(1, "Currency symbol is required."),
});

export async function POST(request: Request) {
  return NextResponse.json({ message: 'Country creation not available in API-only mode' }, { status: 403 });
}
