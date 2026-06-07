
'use server';

import { findNearbyExcursions } from '@/ai/flows/find-nearby-excursions-flow';
import type { Excursion } from '@/types';

/**
 * A server action that wraps the AI flow to find nearby excursions.
 * It's designed to be called from a client component.
 * This is a safer pattern for Vercel deployment as it keeps the AI flow logic
 * strictly on the server.
 */
export async function findNearbyExcursionsAction(latitude: number, longitude: number): Promise<{ success: boolean; excursions?: Excursion[], locationName?: string, error?: string }> {
    try {
        const result = await findNearbyExcursions({ latitude, longitude });
        return {
            success: true,
            excursions: result.excursions,
            locationName: result.locationName,
        };
    } catch (error) {
        console.error("findNearbyExcursionsAction error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "An unknown error occurred.",
        };
    }
}
