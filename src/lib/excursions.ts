import type { Excursion } from '@/types';
import * as TiqetsApi from '@/lib/tiqets-api';

// Specific cities we want on the homepage
const UAE_CITIES = ['Dubai', 'Abu Dhabi', 'Sharjah'];
const TARGET_CITIES = ['Barcelona', 'Rome', 'Paris', 'New York', 'Amsterdam'];
const ALL_HOMEPAGE_CITIES = [...UAE_CITIES, ...TARGET_CITIES];

export async function getExcursions(supabaseClient?: any): Promise<Excursion[]> {
  try {
    // Fetch specifically for homepage cities to ensure we have data for both sections
    const allExcursions: Excursion[] = [];
    
    for (const city of ALL_HOMEPAGE_CITIES) {
      const cityId = TiqetsApi.KNOWN_CITY_IDS[city.toLowerCase()];
      if (!cityId) continue;
      
      try {
        // Try experiences first
        let response = await fetch(`https://api.tiqets.com/v2/experiences?city_id=${cityId}&page_size=50`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'my user agent',
            'Authorization': `Token ${process.env.TIQETS_API_KEY || 'tqat-KNZfj2r3RZ36Clpavn7zVxabeLVdCq2W'}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          const products = data.experiences || data.products || data.items || [];
          const transformed = products.map((p: any) => TiqetsApi.transformTiqetsProduct(p));
          allExcursions.push(...transformed);
        }
      } catch (e) {
        // Try products endpoint as fallback
        try {
          const response = await fetch(`https://api.tiqets.com/v2/products?city_id=${cityId}&page_size=50`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'my user agent',
              'Authorization': `Token ${process.env.TIQETS_API_KEY || 'tqat-KNZfj2r3RZ36Clpavn7zVxabeLVdCq2W'}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            const products = data.products || data.experiences || data.items || [];
            const transformed = products.map((p: any) => TiqetsApi.transformTiqetsProduct(p));
            allExcursions.push(...transformed);
          }
        } catch (e2) {}
      }
    }
    
    // Also fetch general data for variety
    try {
      const general = await TiqetsApi.fetchTiqetsProducts();
      allExcursions.push(...general);
    } catch (e) {}
    
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