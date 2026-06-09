
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import * as TiqetsApi from '@/lib/tiqets-api';
import { searchProducts } from '@/lib/json-cache';
import { z } from 'zod';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const country = searchParams.get('country');
        const city = searchParams.get('city');
        const queryParam = searchParams.get('query');

        let allExcursions;
        try {
          allExcursions = await TiqetsApi.fetchTiqetsProducts();
        } catch (apiError) {
          console.error('Tiqets API failed, using fallback:', apiError);
          allExcursions = await searchProducts('');
        }
        
        let filtered = allExcursions;
        
        if (country) {
            filtered = filtered.filter(ex => ex.country.toLowerCase() === country.toLowerCase());
        }
        if (city) {
            filtered = filtered.filter(ex => ex.city.toLowerCase() === city.toLowerCase());
        }
        if (queryParam) {
            filtered = filtered.filter(ex => ex.name.toLowerCase().includes(queryParam.toLowerCase()));
        }
        
        return NextResponse.json(filtered.sort((a, b) => a.name.localeCompare(b.name)));

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}


export async function POST(request: Request) {
    return NextResponse.json({ message: 'Excursion creation not available in API-only mode' }, { status: 403 });
}
