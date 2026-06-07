
'use server';
/**
 * @fileOverview An AI flow to find and recommend excursions based on a user's geographical coordinates.
 *
 * - findNearbyExcursions - A function that suggests excursions based on latitude and longitude.
 * - FindNearbyExcursionsInput - The input type for the function.
 * - FindNearbyExcursionsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { getExcursions } from '@/app/actions';
import { z } from 'zod';
import type { Excursion } from '@/types';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

const FindNearbyExcursionsInputSchema = z.object({
  latitude: z.number().describe("The user's latitude."),
  longitude: z.number().describe("The user's longitude."),
});
export type FindNearbyExcursionsInput = z.infer<typeof FindNearbyExcursionsInputSchema>;

const FindNearbyExcursionsOutputSchema = z.object({
  excursions: z.array(z.custom<Excursion>()).describe('A list of all excursion objects that are geographically relevant to the user\'s coordinates.'),
  locationName: z.string().describe("The name of the city or area identified from the coordinates, e.g., 'Paris' or 'Central Park, New York'."),
  countryName: z.string().describe("The name of the country identified from the coordinates, e.g., 'France' or 'United States'."),
});
export type FindNearbyExcursionsOutput = z.infer<typeof FindNearbyExcursionsOutputSchema>;


export async function findNearbyExcursions(input: FindNearbyExcursionsInput): Promise<FindNearbyExcursionsOutput> {
  return findNearbyExcursionsFlow(input);
}


const findNearbyExcursionsFlow = ai.defineFlow(
  {
    name: 'findNearbyExcursionsFlow',
    inputSchema: FindNearbyExcursionsInputSchema,
    outputSchema: FindNearbyExcursionsOutputSchema,
  },
  async (input) => {
    // 1. Ask the LLM to identify the city and country from the coordinates.
    const locationResponse = await ai.generate({
      prompt: `Based on the following coordinates, what is the name of the city and country? 
        Latitude: ${input.latitude}
        Longitude: ${input.longitude}
        Return only the city and country name.`,
      model: 'googleai/gemini-1.5-flash',
      output: {
        schema: z.object({
          city: z.string().describe("The identified city name."),
          country: z.string().describe("The identified country name."),
        })
      }
    });

    const identifiedCity = locationResponse.output?.city;
    const identifiedCountry = locationResponse.output?.country;

    if (!identifiedCountry) {
      return { excursions: [], locationName: "your location", countryName: "" };
    }

    // 2. Get all available excursions from the database.
    const supabaseAdmin = createSupabaseAdminClient();
    const allExcursions = await getExcursions(supabaseAdmin);
    
    // 3. Filter excursions strictly by the identified country name.
    const countryExcursions = allExcursions.filter(ex => 
        ex.country.toLowerCase() === identifiedCountry.toLowerCase()
    );

    // 4. Return all excursions found for that country.
    return { excursions: countryExcursions, locationName: identifiedCity || identifiedCountry, countryName: identifiedCountry };
  }
);
