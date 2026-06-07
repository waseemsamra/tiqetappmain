
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { findNearbyExcursions } from '@/ai/flows/find-nearby-excursions-flow';
import { z } from 'zod';
import { searchExcursionsAction } from '@/app/actions';

const searchSchema = z.object({
    query: z.string().optional(),
    lat: z.coerce.number().optional(),
    lon: z.coerce.number().optional(),
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    const validatedParams = searchSchema.safeParse(params);

    if (!validatedParams.success) {
        return NextResponse.json({ error: 'Invalid search parameters.', details: validatedParams.error.flatten() }, { status: 400 });
    }
    
    const { query, lat, lon } = validatedParams.data;

    try {
        if (lat !== undefined && lon !== undefined) {
             // Keep using AI for the specialized geo-location search
             const result = await findNearbyExcursions({ latitude: lat, longitude: lon });
             return NextResponse.json(result);
        }

        if (query) {
            // Use the fast, direct database search action instead of the slow AI flow
            const results = await searchExcursionsAction({ query });
            return NextResponse.json({ excursions: results, locationName: `results for "${query}"` });
        }

        return NextResponse.json({ error: 'A search query or location (lat, lon) is required.' }, { status: 400 });

    } catch (error) {
        console.error('Search API Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
