
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { askConcierge } from '@/ai/flows/concierge-flow';
import type { ConciergeInput } from '@/types';

export async function POST(request: Request) {
    try {
        const body: ConciergeInput = await request.json();

        // Basic validation
        if (!body || typeof body.message !== 'string' || !Array.isArray(body.history)) {
            return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
        }

        // Check for required environment variables
        if (!process.env.GEMINI_API_KEY) {
            console.error('[Concierge] Missing GEMINI_API_KEY');
            return NextResponse.json({ error: 'AI service not configured.' }, { status: 500 });
        }

        const result = await askConcierge(body);
        return NextResponse.json(result);

    } catch (error) {
        console.error('[Concierge API] Error:', error instanceof Error ? error.message : error);
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
