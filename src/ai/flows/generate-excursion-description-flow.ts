
'use server';
/**
 * @fileOverview An AI flow to generate compelling descriptions for travel excursions.
 *
 * - generateExcursionDescription - A function that creates a description based on excursion details.
 * - GenerateExcursionDescriptionInput - The input type for the generation function.
 * - GenerateExcursionDescriptionOutput - The return type for the generation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

// Input schema for the description generation
const GenerateExcursionDescriptionInputSchema = z.object({
  name: z.string().describe('The name of the excursion or activity.'),
  city: z.string().describe('The city where the excursion takes place.'),
  country: z.string().describe('The country where the excursion takes place.'),
});
export type GenerateExcursionDescriptionInput = z.infer<typeof GenerateExcursionDescriptionInputSchema>;

// Output schema for the description generation
const GenerateExcursionDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated, compelling marketing description for the excursion.'),
});
export type GenerateExcursionDescriptionOutput = z.infer<typeof GenerateExcursionDescriptionOutputSchema>;

// Exported wrapper function that calls the Genkit flow
export async function generateExcursionDescription(input: GenerateExcursionDescriptionInput): Promise<GenerateExcursionDescriptionOutput> {
  return generateExcursionDescriptionFlow(input);
}

// Definition of the Genkit prompt
const descriptionPrompt = ai.definePrompt({
  name: 'generateExcursionDescriptionPrompt',
  input: { schema: GenerateExcursionDescriptionInputSchema },
  output: { schema: GenerateExcursionDescriptionOutputSchema },
  model: 'googleai/gemini-1.5-flash',
  prompt: `You are an expert travel copywriter. Your task is to write a short, exciting, and compelling marketing description for a travel excursion based on the details provided.

Focus on creating a description that is enticing and makes people want to book the experience. Keep it to 2-3 paragraphs.

Excursion Name: {{{name}}}
Location: {{{city}}}, {{{country}}}
`,
});

// Definition of the Genkit flow
const generateExcursionDescriptionFlow = ai.defineFlow(
  {
    name: 'generateExcursionDescriptionFlow',
    inputSchema: GenerateExcursionDescriptionInputSchema,
    outputSchema: GenerateExcursionDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await descriptionPrompt(input);
    if (!output) {
      throw new Error("The AI model failed to return a valid description.");
    }
    return output;
  }
);
