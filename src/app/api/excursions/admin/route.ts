export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import * as TiqetsApi from '@/lib/tiqets-api';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const perPage = parseInt(searchParams.get('perPage') || '50', 10);

        const allExcursions = await TiqetsApi.fetchTiqetsProducts();
        const totalCount = allExcursions.length;
        
        const from = (page - 1) * perPage;
        const paginatedExcursions = allExcursions.slice(from, from + perPage);

        return NextResponse.json({ excursions: paginatedExcursions, totalCount });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error("Excursions API error:", errorMessage);
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}