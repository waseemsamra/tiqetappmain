
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import * as TiqetsApi from '@/lib/tiqets-api';
import { z } from 'zod';

const searchSchema = z.object({
    query: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    types: z.array(z.string()).optional(),
});

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        
        const params = {
            query: searchParams.get('query') || undefined,
            city: searchParams.get('city') || undefined,
            country: searchParams.get('country') || undefined,
            types: searchParams.getAll('types').length > 0 ? searchParams.getAll('types') : undefined,
        };

        const validatedParams = searchSchema.safeParse(params);
        if (!validatedParams.success) {
            return NextResponse.json({ error: 'Invalid search parameters' }, { status: 400 });
        }
        
        const { query, city, country, types } = validatedParams.data;
        
        // Build API params - use city_name for direct city lookup (more reliable)
        const apiParams: Record<string, string> = {};
        if (city) {
            apiParams.city_name = city;
        } else if (country) {
            apiParams.country_name = country;
        }
        
        let allExcursions = await TiqetsApi.fetchTiqetsProducts(apiParams);
        
        let filtered = allExcursions;

        if (query) {
            filtered = filtered.filter(ex => ex.name.toLowerCase().includes(query.toLowerCase()));
        }
        if (city) {
            filtered = filtered.filter(ex => ex.city.toLowerCase() === city.toLowerCase());
        }
        if (country) {
            filtered = filtered.filter(ex => ex.country.toLowerCase() === country.toLowerCase());
        }
        if (types && types.length > 0) {
            filtered = filtered.filter(ex => types.includes(ex.activitytypeid));
        }

        return NextResponse.json(filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)));

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Search API Error:', errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
