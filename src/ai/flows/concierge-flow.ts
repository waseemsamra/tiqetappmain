
'use server';
/**
 * @fileOverview A digital travel concierge AI agent.
 *
 * - askConcierge - A function that handles the chat interaction.
 */

import { ai } from '@/ai/genkit';
import { getExcursions } from '@/app/actions';
import { z } from 'zod';
import type { ConciergeInput, ConciergeOutput } from '@/types';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

// Tool: A function the AI can call to search for excursions.
const searchExcursions = ai.defineTool(
  {
    name: 'searchExcursions',
    description: 'Search for real excursions and activities based on a user query. Can filter by location, type, etc. This is the ONLY way to find excursions.',
    inputSchema: z.object({
      query: z.string().describe("The user's search query (e.g., 'museums in Paris', 'sailing trips in Greece')."),
    }),
    outputSchema: z.object({
      results: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          city: z.string(),
          country: z.string(),
          price: z.number(),
          rating: z.number(),
        })
      ),
    }),
  },
  async (input) => {
    console.log(`[AI Tool] Searching excursions with query: "${input.query}"`);
    
    try {
      // Using admin client here to bypass RLS in the tool context if necessary
      const supabaseAdmin = createSupabaseAdminClient();
      const allExcursions = await getExcursions(supabaseAdmin);

      const lowerCaseQuery = input.query.toLowerCase();

      const filtered = allExcursions
        .filter(ex => {
          return (
            ex.name.toLowerCase().includes(lowerCaseQuery) ||
            ex.description.toLowerCase().includes(lowerCaseQuery) ||
            ex.city.toLowerCase().includes(lowerCaseQuery) ||
            ex.country.toLowerCase().includes(lowerCaseQuery) ||
            ex.excursionType?.name.toLowerCase().includes(lowerCaseQuery)
          );
        })
        .map(ex => ({
          id: ex.id,
          name: ex.name,
          city: ex.city,
          country: ex.country,
          price: ex.price,
          rating: ex.rating,
        }))
        .slice(0, 5); // Return a max of 5 results to keep it concise

      return { results: filtered };
    } catch (error) {
      console.error('[AI Tool] Error searching excursions:', error instanceof Error ? error.message : error);
      // Return empty results if Supabase is not configured
      return { results: [] };
    }
  }
);


const ConciergeInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe("The conversation history between the user and the AI concierge."),
  message: z.string().describe("The user's latest message."),
});

const ConciergeOutputSchema = z.object({
  response: z.string().describe('The AI concierge\'s response.'),
});

const conciergePrompt = ai.definePrompt({
    name: 'conciergePrompt',
    input: { schema: ConciergeInputSchema },
    output: { schema: ConciergeOutputSchema },
    tools: [searchExcursions],
    model: 'googleai/gemini-1.5-flash',
    prompt: `You are a friendly and expert travel concierge for the AAFare website.
Your goal is to help users find the perfect travel excursion from the ones available on THIS WEBSITE ONLY.

IMPORTANT RULES:
- You can ONLY recommend excursions that you find using the 'searchExcursions' tool.
- If the tool returns no results or an error occurs, politely inform the user that you're currently unable to search excursions and suggest they try again later or browse the website directly.
- DO NOT invent or recommend excursions that are not in the tool's search results.
- DO NOT answer general travel questions or give recommendations for restaurants, hotels, or anything other than the excursions available on this site. If asked, politely state that you can only help with finding excursions on AAFare.
- When presenting excursion results, format them as a clear, easy-to-read list. Always include the name and price.

Use the conversation history to maintain context. The user's role is 'user' and your role is 'model'.

CONVERSATION HISTORY:
{{#each history}}
{{role}}: {{content}}
{{/each}}

LATEST USER MESSAGE:
{{message}}

Your Response:
`,
});

const conciergeFlow = ai.defineFlow(
  {
    name: 'conciergeFlow',
    inputSchema: ConciergeInputSchema,
    outputSchema: ConciergeOutputSchema,
  },
  async (input) => {
    const { output } = await conciergePrompt(input);
    
    if (!output) {
        throw new Error("The AI model failed to return a valid response.");
    }
    
    return output;
  }
);


export async function askConcierge(input: ConciergeInput): Promise<ConciergeOutput> {
  // Check for required environment variables
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    console.warn('[Concierge] SUPABASE_URL is not configured. AI will not be able to search excursions.');
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('[Concierge] SUPABASE_SERVICE_ROLE_KEY is not configured. AI will not be able to search excursions.');
  }

  try {
    return await conciergeFlow(input);
  } catch (error) {
    console.error('[Concierge] Error:', error instanceof Error ? error.message : error);
    throw error;
  }
}
