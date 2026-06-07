
import type { HeroContent } from '@/types';
import heroData from '@/data/hero.json';

// In-memory 'database' for hero content loaded from JSON
let heroContent: HeroContent = heroData;

// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches the hero content. In a real app, this could be an API call.
 * For this mock implementation, it reads from an in-memory object.
 */
export async function getHeroContent(): Promise<HeroContent> {
  await delay(50);
  return heroContent;
}

/**
 * This function is now part of a server action.
 * The logic has been moved to `src/app/actions.ts`.
 * We keep the in-memory object here to be updated by the action.
 */

// This function is called by the server action to update the in-memory cache.
// Note: This is a simplification for the mock environment. In a real DB scenario,
// you'd just re-fetch or use a more robust caching/revalidation strategy.
export function updateInMemoryHeroContent(data: Partial<HeroContent>) {
    heroContent = { ...heroContent, ...data };
}
