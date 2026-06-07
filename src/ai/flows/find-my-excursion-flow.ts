
'use server';
/**
 * @fileOverview An AI flow to find and recommend excursions based on a user's query.
 *
 * - findMyExcursion - A function that suggests excursions.
 * - FindMyExcursionInput - The input type for the function.
 * - FindMyExcursionOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { Excursion } from '@/types';
import { createClient } from '@/lib/supabase/server';
import { getExcursions } from '@/app/actions';


// This function is defined here to ensure it is only used in a server context.
async function getAllExcursionsForAI(): Promise<Excursion[]> {
  const supabase = createClient();
  const {data, error} = await supabase
    .from('activities')
    .select('*, excursionType:activitytypeid(*)')
    .eq('status', 'active')
    .not('activitytypeid', 'is', null);

  if (error) {
    console.error('Error fetching excursions for AI:', error);
    return [];
  }
  
  const validExcursions = data.filter(excursion => excursion.excursionType);
  return validExcursions as Excursion[];
}


// Define a simplified Excursion object for the AI to reason over.
// This is more efficient than passing the full, complex object.
const SimplifiedExcursionSchema = z.object({
    id: z.string(),
    name: z.string(),
    city: z.string(),
    country: z.string(),
    description: z.string(),
    excursionTypeName: z.string().describe("The name of the excursion type, like 'Museum Visit' or 'Sailing Trip'."),
});

const FindMyExcursionInputSchema = z.object({
  query: z.string().describe("The user's free-text query describing the type of excursion they are looking for."),
});
export type FindMyExcursionInput = z.infer<typeof FindMyExcursionInputSchema>;

const FindMyExcursionOutputSchema = z.object({
  excursions: z.array(z.custom<Excursion>()).describe('A list of up to 3 recommended excursion objects that best match the user query.'),
});
export type FindMyExcursionOutput = z.infer<typeof FindMyExcursionOutputSchema>;


export async function findMyExcursion(input: FindMyExcursionInput): Promise<FindMyExcursionOutput> {
  return findMyExcursionFlow(input);
}


const findMyExcursionFlow = ai.defineFlow(
  {
    name: 'findMyExcursionFlow',
    inputSchema: FindMyExcursionInputSchema,
    outputSchema: FindMyExcursionOutputSchema,
  },
  async (input) => {
    // 1. Get all available excursions from the database using the AI-specific function.
    const validExcursions = await getAllExcursionsForAI();
    
    // 2. Create a simplified version of the data for the AI model.
    const simplifiedExcursions = validExcursions
      .filter(ex => ex.excursionType) // Ensure we only process valid excursions
      .map(ex => ({
          id: ex.id,
          name: ex.name,
          city: ex.city,
          country: ex.country,
          description: ex.description,
          excursionTypeName: ex.excursionType.name,
      }));

    // 3. Ask the LLM to select the best matches and return only their IDs.
    const llmResponse = await ai.generate({
      prompt: `You are an expert travel agent. Your task is to find the best excursions that match a user's request from a provided list.
Select up to 3 excursions that are the best fit.
Return your answer as a list of the recommended excursion IDs only.
Do not make up excursions. Only use the ones from the list below.

USER REQUEST: "${input.query}"

AVAILABLE EXCURSIONS (with their IDs):
${JSON.stringify(simplifiedExcursions, null, 2)}
      `,
       output: {
         schema: z.object({
            recommendedIds: z.array(z.string()).describe("An array of the IDs of the recommended excursions."),
         })
       },
       model: 'googleai/gemini-1.5-flash',
    });
    
    const recommendedIds = llmResponse.output?.recommendedIds;

    // 4. If we have recommendations, fetch the full excursion data from our validated list.
    if (recommendedIds && recommendedIds.length > 0) {
      const fullExcursions = validExcursions.filter(ex => recommendedIds.includes(ex.id));
      return { excursions: fullExcursions };
    }

    // 5. If no excursions were found or an error occurred.
    return { excursions: [] };
  }
);
