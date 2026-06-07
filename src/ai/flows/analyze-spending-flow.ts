
'use server';
/**
 * @fileOverview An AI flow to analyze a user's spending habits and suggest new excursions.
 *
 * - analyzeSpendingAndSuggestExcursions - A function that analyzes booking history and recommends excursions.
 * - AnalyzeSpendingInput - The input type for the function.
 * - AnalyzeSpendingOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { Booking, Excursion } from '@/types';
import { getExcursions } from '@/app/actions';

// Input schema for the analysis flow
const AnalyzeSpendingInputSchema = z.object({
    bookings: z.array(z.custom<Booking>()).describe('An array of the user\'s past booking objects.'),
});
export type AnalyzeSpendingInput = z.infer<typeof AnalyzeSpendingInputSchema>;

// Output schema for the analysis flow
const AnalyzeSpendingOutputSchema = z.object({
  profile: z.string().describe("A short, friendly analysis of the user's travel personality based on their booking history (e.g., 'You seem to be an avid historian!' or 'You're a fan of outdoor adventures!')."),
  recommendations: z.array(z.custom<Excursion>()).describe('A list of up to 3 recommended excursion objects that the user has not booked before and that match their inferred profile.'),
});
export type AnalyzeSpendingOutput = z.infer<typeof AnalyzeSpendingOutputSchema>;

// Exported wrapper function that calls the Genkit flow
export async function analyzeSpendingAndSuggestExcursions(input: AnalyzeSpendingInput): Promise<AnalyzeSpendingOutput> {
  return analyzeSpendingFlow(input);
}

// Definition of the Genkit flow
const analyzeSpendingFlow = ai.defineFlow(
  {
    name: 'analyzeSpendingFlow',
    inputSchema: AnalyzeSpendingInputSchema,
    outputSchema: AnalyzeSpendingOutputSchema,
  },
  async (input) => {
    // 1. Get all available excursions to recommend from.
    const allExcursions = await getExcursions();
    
    // 2. Extract excursion types and IDs from the user's booking history.
    const bookedExcursionTypes = input.bookings.map(b => b.activity.excursionType.name);
    const bookedExcursionIds = new Set(input.bookings.map(b => b.activity.id));

    // 3. Filter out already booked excursions from the potential recommendations.
    const availableToRecommend = allExcursions.filter(ex => !bookedExcursionIds.has(ex.id));

    // 4. Ask the LLM to analyze the pattern and pick the best new excursions.
    const llmResponse = await ai.generate({
      prompt: `You are a travel expert analyzing a user's booking history to understand their travel style and recommend new experiences.

Based on the list of excursion types the user has booked, first, write a short, friendly, one-sentence summary of their travel personality.

Then, from the list of AVAILABLE excursions, recommend up to 3 excursions that they haven't booked before and that best match their personality.

USER'S BOOKED EXCURSION TYPES:
- ${bookedExcursionTypes.join('\n- ')}

AVAILABLE EXCURSIONS (with their IDs and types):
${JSON.stringify(availableToRecommend.map(ex => ({id: ex.id, name: ex.name, type: ex.excursionType.name})), null, 2)}
      `,
       output: {
         schema: z.object({
            profile: z.string().describe("The one-sentence summary of the user's travel personality."),
            recommendedIds: z.array(z.string()).describe("An array of the IDs of the recommended excursions."),
         })
       },
       model: 'googleai/gemini-1.5-flash',
    });
    
    const output = llmResponse.output;

    if (!output) {
      return { profile: "We're still getting to know you!", recommendations: [] };
    }

    // 5. Fetch the full excursion data for the recommended IDs.
    const recommendedExcursions = availableToRecommend.filter(ex => 
        output.recommendedIds.includes(ex.id)
    );

    return {
      profile: output.profile,
      recommendations: recommendedExcursions,
    };
  }
);
