import type { Excursion } from '@/types';
import * as TiqetsApi from '@/lib/tiqets-api';

// Specific cities we want on the homepage
const UAE_CITIES = ['Dubai', 'Abu Dhabi', 'Sharjah'];
const TARGET_CITIES = ['Barcelona', 'Rome', 'Paris', 'New York', 'Amsterdam'];
const ALL_HOMEPAGE_CITIES = [...UAE_CITIES, ...TARGET_CITIES];

export async function getExcursions(supabaseClient?: any): Promise<Excursion[]> {
  try {
    const allExcursions: Excursion[] = [];
    
    // Fetch products for all cities with venue images
    for (const city of ALL_HOMEPAGE_CITIES) {
      try {
        const excursions = await TiqetsApi.fetchTiqetsProducts({ city_name: city });
        allExcursions.push(...excursions);
      } catch (e) {
        console.error(`Failed to fetch ${city}:`, e);
      }
    }
    
    // Remove duplicates by ID
    const seen = new Set<string>();
    const unique = allExcursions.filter(ex => {
      if (seen.has(ex.id)) return false;
      seen.add(ex.id);
      return true;
    });
    
    return unique.slice(0, 200);
  } catch (e) {
    console.error('getExcursions API failed:', e);
    return [];
  }
}

export async function getExcursionsForAdmin({ page = 1, perPage = 50, search }: { page?: number, perPage?: number, search?: string } = {}): Promise<{ excursions: Excursion[], totalCount: number }> {
  const allExcursions = await TiqetsApi.fetchTiqetsProducts();
  const filtered = search 
    ? allExcursions.filter(e => 
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.city.toLowerCase().includes(search.toLowerCase()) ||
        e.country.toLowerCase().includes(search.toLowerCase())
      )
    : allExcursions;
  
  const from = (page - 1) * perPage;
  return { 
    excursions: filtered.slice(from, from + perPage), 
    totalCount: filtered.length 
  };
}

export async function getExcursionsByPartner(partnerId: string): Promise<Excursion[]> {
  return TiqetsApi.fetchTiqetsProducts();
}

export async function getAllExcursionImageUrls(): Promise<string[]> {
  const excursions = await getExcursions();
  return excursions.flatMap((excursion: Excursion) => excursion.images || []);
}

export async function getExcursionById(id: string): Promise<Excursion | null> {
  return TiqetsApi.fetchTiqetsProductById(id);
}

export async function createExcursion(excursionData: any): Promise<Excursion> {
  throw new Error('Creating excursions is not supported via Tiqets API integration.');
}

export async function updateExcursion(id: string, excursionData: any): Promise<Excursion | null> {
  throw new Error('Updating excursions is not supported via Tiqets API integration.');
}

export async function cloneExcursion(id: string): Promise<Excursion> {
  throw new Error('Cloning excursions is not supported via Tiqets API integration.');
}

export async function approveExcursion(id: string): Promise<Excursion> {
  throw new Error('Approving excursions is not supported via Tiqets API integration.');
}

export async function rejectExcursion(id: string): Promise<Excursion> {
  throw new Error('Rejecting excursions is not supported via Tiqets API integration.');
}

export async function deleteExcursion(id: string): Promise<void> {
  throw new Error('Deleting excursions is not supported via Tiqets API integration.');
}

export async function getWishlistItems(userId: string, limit?: number): Promise<Excursion[]> {
  return [];
}

export async function isWishlisted(userId: string, activityId: string): Promise<boolean> {
  return false;
}

export async function addOrRemoveFromWishlist(userId: string, activityId: string): Promise<{message: string; isWishlisted: boolean}> {
  throw new Error('Wishlist operations are not supported via Tiqets API integration.');
}

export async function getBookingById(bookingId: string): Promise<any> {
  return null;
}

export async function findBookingByReferenceAndEmail(reference: string, email: string): Promise<any> {
  return null;
}

export async function getUpcomingBookingsForUser(userId: string, limit?: number): Promise<any[]> {
  return [];
}

export async function getPastBookingsForUser(userId: string): Promise<any[]> {
  return [];
}

export async function getAllUpcomingBookings(): Promise<any[]> {
  return [];
}

export async function getAllPastBookings(): Promise<any[]> {
  return [];
}

export async function getReviewsForExcursionId(activityId: string): Promise<any[]> {
  return [];
}

export async function createReview(reviewData: any): Promise<any> {
  throw new Error('Reviews are not supported via Tiqets API integration.');
}