import { defineTool } from 'genkit';
import { z } from 'zod';

/**
 * Tool to fetch real-time availability from the Tiqets API.
 * Ensure TIQETS_API_KEY is set in your .env.local file.
 */
export const tiqetsAvailabilityTool = defineTool(
  {
    name: 'getTiqetsAvailability',
    description: 'Checks available dates and time slots for a specific attraction or museum on Tiqets.',
    inputSchema: z.object({
      productId: z.string().describe('The unique ID of the product/attraction.'),
      startDate: z.string().optional().describe('Search start date in YYYY-MM-DD format.'),
      endDate: z.string().optional().describe('Search end date in YYYY-MM-DD format.'),
      limit: z.number().optional().default(20).describe('Max number of slots to return to avoid token limits.'),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      availability: z.array(z.object({
        date: z.string().describe('The date of availability'),
        time: z.string().describe('The specific time slot or start time'),
        status: z.string().describe('Whether the slot is available or sold out'),
      })),
      totalFound: z.number().optional().describe('Total number of slots available on the server.'),
      error: z.string().optional(),
    }),
  },
  async ({ productId, startDate, endDate, limit }) => {
    const apiKey = process.env.TIQETS_API_KEY;

    if (!apiKey) {
      return { success: false, availability: [], error: 'API configuration missing' };
    }

    try {
      const url = new URL(`https://api.tiqets.com/v2/products/${productId}/availability/`);
      if (startDate) url.searchParams.append('start_date', startDate);
      if (endDate) url.searchParams.append('end_date', endDate);

      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Tiqets API responded with ${response.status}`);
      }

      const data = await response.json();

      const rawAvailability = data.availability || [];
      
      // Slice results before mapping to save processing time and token space
      const formattedAvailability = rawAvailability.slice(0, limit).map((slot: any) => ({
        date: slot.date || 'N/A',
        time: slot.start_time || slot.time || 'Check website',
        status: slot.available ? 'Available' : 'Sold Out'
      }));

      return { success: true, availability: formattedAvailability, totalFound: rawAvailability.length };
    } catch (error) {
      return { success: false, availability: [], error: (error as Error).message };
    }
  }
);

/**
 * Tool to search for products/attractions on Tiqets by name.
 */
export const tiqetsSearchTool = defineTool(
  {
    name: 'searchTiqetsProducts',
    description: 'Searches for attractions, museums, or landmarks on Tiqets by name to find their product IDs.',
    inputSchema: z.object({
      query: z.string().describe('The name of the attraction or city to search for.'),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      products: z.array(z.object({
        id: z.string().describe('The product ID'),
        title: z.string().describe('The name of the attraction'),
        city: z.string().describe('The city where it is located'),
      })),
      error: z.string().optional(),
    }),
  },
  async ({ query }) => {
    const apiKey = process.env.TIQETS_API_KEY;

    if (!apiKey) {
      return { success: false, products: [], error: 'API configuration missing' };
    }

    try {
      const url = new URL(`https://api.tiqets.com/v2/products/`);
      url.searchParams.append('query', query);

      const response = await fetch(url.toString(), {
        headers: { 'Authorization': `Token ${apiKey}`, 'Accept': 'application/json' },
      });
      if (!response.ok) throw new Error(`Tiqets API responded with ${response.status}`);
      const data = await response.json();
      const products = (data.products || []).slice(0, 5).map((p: any) => ({
        id: String(p.id),
        title: p.title,
        city: p.city_name || 'Unknown',
      }));
      return { success: true, products };
    } catch (error) {
      return { success: false, products: [], error: (error as Error).message };
    }
  }
);