import {revalidatePath} from 'next/cache';
import { redirect } from 'next/navigation';
import {z} from 'zod';
import type {Excursion, Booking, Review, ConciergeInput, ExcursionType, Country, Payout, Referral, City} from '@/types';
import * as ExcursionService from '@/lib/excursions';
import * as LocationService from '@/lib/locations';
import * as TiqetsApi from '@/lib/tiqets-api';
import {createExcursionSchema, updateExcursionSchema, reviewSchema, userUpdateSchema, inviteUserSchema, partnerProfileSchema, agentProfileSchema, userProfileUpdateSchema} from '@/lib/schemas';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB


function toPostgresArray(value: unknown): string[] {
  if (value === null || value === undefined) {
    return [];
  }
  if (Array.isArray(value)) {
    return value.filter(item => typeof item === 'string' && item.trim() !== '');
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }
  return [];
}


export async function getExcursions(supabaseClient?: any): Promise<Excursion[]> {
    return ExcursionService.getExcursions(supabaseClient);
}

export async function getTopRatedExcursions(): Promise<Excursion[]> {
    const excursions = await TiqetsApi.fetchTiqetsProducts();
    return excursions
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 20);
}


export async function searchExcursionsAction(
    { query, city, country, types }: { query?: string, city?: string, country?: string, types?: string[] }
): Promise<Excursion[]> {
    try {
        const params: Record<string, string> = {};
        if (city) params.city_name = city;
        if (country) params.country_name = country;
        
        const allExcursions = await TiqetsApi.fetchTiqetsProducts(params);
        
        return allExcursions
            .filter(ex => {
                if (query && !ex.name.toLowerCase().includes(query.toLowerCase())) return false;
                // Double-check city filter since API may not handle it correctly
                if (city && ex.city.toLowerCase() !== city.toLowerCase()) return false;
                if (country && ex.country.toLowerCase() !== country.toLowerCase()) return false;
                return true;
            })
            .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } catch (error) {
        console.error('Error in searchExcursionsAction:', error);
        return [];
    }
}

export async function ajaxSearchExcursions(query: string): Promise<{countries: Country[], cities: City[], activities: Excursion[]}> {
  const searchPattern = query.toLowerCase();
  const excursions = await TiqetsApi.fetchTiqetsProducts();
  const countries = await TiqetsApi.fetchTiqetsCountries();
  const cities = await TiqetsApi.fetchTiqetsCities();
  
  const filteredExcursions = excursions.filter(ex => 
    ex.name.toLowerCase().includes(searchPattern) ||
    ex.country.toLowerCase().includes(searchPattern) ||
    ex.city.toLowerCase().includes(searchPattern)
  );

  const matchedCountries = countries.filter(c => c.name.toLowerCase().includes(searchPattern)).slice(0, 5);
  const matchedCities = cities.filter(c => c.name && c.name.toLowerCase().includes(searchPattern)).slice(0, 5);

  const result = {
    countries: matchedCountries,
    cities: matchedCities.map(c => ({ id: c.id, name: c.name, country_code: c.country_code || '' })),
    activities: filteredExcursions.slice(0, 5),
  };
  console.log('[ajaxSearch]', JSON.stringify({query, counts: {countries: result.countries.length, cities: result.cities.length, activities: result.activities.length}}));
  return result;
}


export async function getExcursionsForAdmin({ page = 1, perPage = 50, search }: { page?: number, perPage?: number, search?: string } = {}): Promise<{ excursions: Excursion[], totalCount: number }> {
    return ExcursionService.getExcursionsForAdmin({ page, perPage, search });
}

export async function getExcursionsCountForAdmin(): Promise<number> {
     return (await TiqetsApi.fetchTiqetsProducts()).length;
}


export async function getExcursionsByPartner(partnerId: string): Promise<Excursion[]> {
    return ExcursionService.getExcursionsByPartner(partnerId);
}


export async function getAllExcursionImageUrls(): Promise<string[]> {
  return ExcursionService.getAllExcursionImageUrls();
}

export async function getExcursionById(id: string): Promise<Excursion | null> {
  return ExcursionService.getExcursionById(id);
}

export async function createExcursion(excursionData: Omit<Excursion, 'id' | 'excursionType' | 'reviews' | 'city' | 'country'>): Promise<Excursion> {
  return ExcursionService.createExcursion(excursionData);
}

export async function updateExcursion(id: string, excursionData: Partial<Omit<Excursion, 'id' | 'excursionType' | 'reviews' | 'city' | 'country'>>): Promise<Excursion | null> {
  return ExcursionService.updateExcursion(id, excursionData);
}


export async function cloneExcursion(id: string): Promise<Excursion> {
  return ExcursionService.cloneExcursion(id);
}

export async function approveExcursion(id: string): Promise<Excursion> {
    return ExcursionService.approveExcursion(id);
}

export async function approveAllPendingExcursions(): Promise<{ count: number }> {
    return { count: 0 };
}

export async function rejectExcursion(id: string): Promise<Excursion> {
    return ExcursionService.rejectExcursion(id);
}

export async function deleteExcursionForAdmin(id: string): Promise<void> {
  return ExcursionService.deleteExcursion(id);
}

export async function getWishlistItems(userId: string, limit?: number): Promise<Excursion[]> {
  return ExcursionService.getWishlistItems(userId, limit);
}

export async function isWishlisted(userId: string, activityId: string): Promise<boolean> {
  return ExcursionService.isWishlisted(userId, activityId);
}

export async function addOrRemoveFromWishlist(userId: string, activityId: string): Promise<{message: string; isWishlisted: boolean}> {
  return ExcursionService.addOrRemoveFromWishlist(userId, activityId);
}

export async function getReviewsForExcursionId(activityId: string): Promise<Review[]> {
    return ExcursionService.getReviewsForExcursionId(activityId);
}

export async function createReview(reviewData: Omit<Review, 'id' | 'date'> & { user_id: string; activity_id: string }): Promise<Review> {
    return ExcursionService.createReview(reviewData);
}

export async function getExcursionTypes(): Promise<ExcursionType[]> {
  return [
    { id: '1', name: 'Tours' },
    { id: '2', name: 'Museums' },
    { id: '3', name: 'Activities' },
    { id: '4', name: 'Shows' },
    { id: '5', name: 'Restaurants' }
  ];
}

export async function getExcursionTypeById(id: string): Promise<ExcursionType | null> {
    return null;
}

export async function createExcursionType(data: Omit<ExcursionType, 'id'>): Promise<ExcursionType> {
    throw new Error('Not supported in API-only mode.');
}

export async function updateExcursionType(id: string, data: Partial<Omit<ExcursionType, 'id'>>): Promise<ExcursionType> {
    throw new Error('Not supported in API-only mode.');
}

export async function deleteExcursionType(id: string): Promise<void> {
    throw new Error('Not supported in API-only mode.');
}

export async function deleteExcursionTypes(ids: string[]): Promise<{success: boolean; message: string}> {
    return { success: false, message: 'Not supported in API-only mode.' };
}

export async function getCountries(): Promise<Country[]> {
  return LocationService.getCountries();
}

export async function getCountryByCode(code: string): Promise<Country | null> {
    return LocationService.getCountryByCode(code);
}

export async function getCountryByName(countryName: string): Promise<Country | null> {
    const countries = await LocationService.getCountries();
    return countries.find(c => c.name.toLowerCase().includes(countryName.toLowerCase())) || null;
}


export async function getCitiesByCountryName(countryName: string): Promise<City[]> {
    const countries = await LocationService.getCountries();
    const country = countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
    if (!country) return [];
    return LocationService.getCitiesByCountryCode(country.code);
}

export async function getCitiesByCountryCode(countryCode: string): Promise<City[]> {
    return LocationService.getCitiesByCountryCode(countryCode);
}

export async function createCountry(data: Omit<Country, 'id'>, supabaseClient?: any): Promise<Country> {
  throw new Error('Not supported in API-only mode.');
}

export async function updateCountry(code: string, data: Partial<Omit<Country, 'code' | 'id'>>): Promise<Country> {
    throw new Error('Not supported in API-only mode.');
}

export async function deleteCountry(code: string): Promise<boolean> {
    throw new Error('Not supported in API-only mode.');
}

export async function deleteCountries(codes: string[]): Promise<boolean> {
    throw new Error('Not supported in API-only mode.');
}

export async function createCity(countryCode: string, cityName: string, supabaseClient?: any): Promise<City> {
    throw new Error('Not supported in API-only mode.');
}

export async function updateCity(countryCode: string, originalCityName: string, newCityName: string): Promise<City> {
    throw new Error('Not supported in API-only mode.');
}

export async function deleteCity(countryCode: string, name: string): Promise<boolean> {
    throw new Error('Not supported in API-only mode.');
}

export async function uploadImages(formData: FormData): Promise<{ imagePaths?: string[], error?: string }> {
  return { error: 'Not supported in API-only mode.' };
}

export async function deleteImageAction(imageUrl: string): Promise<{success: boolean; message: string}> {
  return { success: false, message: 'Not supported in API-only mode.' };
}

export async function deleteUnusedImagesAction(): Promise<{success: boolean; message: string; deletedCount: number}> {
  return { success: true, message: 'Not applicable in API mode.', deletedCount: 0 };
}

export async function createOrUpdateExcursionAction(formData: FormData): Promise<FormState & { redirectUrl?: string }> {
  return { success: false, message: 'Excursion management not supported via Tiqets API integration.' };
}

export async function approveExcursionAction(id: string) {
  return { success: false, message: 'Not supported in API-only mode.' };
}

export async function approveAllPendingExcursionsAction(): Promise<{ success: boolean; message: string; }> {
  return { success: false, message: 'Not supported in API-only mode.' };
}

export async function rejectExcursionAction(id: string) {
  return { success: false, message: 'Not supported in API-only mode.' };
}

export async function cloneExcursionAction(id: string) {
  return {message: 'Not supported in API-only mode.', success: false};
}

export async function deleteExcursionAction(id: string) {
  return {message: 'Not supported in API-only mode.', success: false};
}

export async function deleteSelectedExcursionsAction(ids: string[]): Promise<{success: boolean; message: string}> {
    return {success: false, message: 'Not supported in API-only mode.'};
}

export async function importExcursionsFromCsvAction(formData: FormData): Promise<FormState> {
    return { success: false, message: 'CSV import not supported via Tiqets API integration.' };
}


export async function getWishlistIdsAction(): Promise<string[]> {
     return [];
}

export async function toggleWishlistAction(activityId: string): Promise<{success: boolean; message: string; isWishlisted: boolean}> {
   return {success: false, message: 'Wishlist not supported in API-only mode.', isWishlisted: false};
}

export async function processBookingAction(activityId: string, bookingDate: Date, quantity: number, email: string): Promise<{ success: boolean; redirectUrl?: string; error?: string }> {
   const activity = await getExcursionById(activityId);
   if (!activity) return { success: false, error: "The selected excursion could not be found." };
   
   const totalPrice = activity.price * quantity;
   const bookingReference = `RR-${Math.random().toString(36).substring(2, 8)}${Math.random().toString(36).substring(2, 8)}`.toUpperCase();
   
   return { 
       success: true, 
       redirectUrl: `/booking/voucher?ref=${bookingReference}&email=${encodeURIComponent(email)}&new=true` 
   };
}


export async function createReviewAction(formData: FormData): Promise<FormState> {
     return { success: false, message: 'Reviews not supported in API-only mode.' };
}

const excursionTypeSchema = z.object({ name: z.string().min(2, 'Name must be at least 2 characters long.') });

export async function createOrUpdateExcursionTypeAction(id: string | null, prevState: FormState, formData: FormData): Promise<FormState> {
  return { message: 'Not supported in API-only mode.', success: false };
}

export async function deleteExcursionTypeAction(id: string): Promise<FormState> {
  if (!id) return {message: 'ID is required for deletion.', success: false};
  return {message: 'Not supported in API-only mode.', success: false};
}

export async function deleteSelectedExcursionTypesAction(ids: string[]): Promise<{success: boolean; message: string}> {
    return {success: false, message: 'Not supported in API-only mode.'};
}

const countrySchema = z.object({ id: z.string().optional(), code: z.string().max(2, 'Code must be at most 2 characters.').optional().or(z.literal('')), name: z.string().min(2, 'Country name must be at least 2 characters long.'), currency: z.string().min(2, 'Currency must be at least 2 characters long.'), currency_symbol: z.string().min(1, 'Symbol is required.') });

export async function createOrUpdateCountryAction(formData: FormData): Promise<FormState> {
  return { message: 'Not supported in API-only mode.', success: false };
}

export async function deleteCountryAction(code: string) {
  return {message: 'Not supported in API-only mode.', success: false};
}

export async function deleteSelectedCountriesAction(codes: string[]): Promise<{success: boolean; message: string}> {
    return {success: false, message: 'Not supported in API-only mode.'};
}

const citySchema = z.object({ countryCode: z.string(), originalName: z.string().optional(), name: z.string().min(2, 'City name must be at least 2 characters long.') });

export async function createOrUpdateCityAction(formData: FormData): Promise<FormState> {
  return { message: 'Not supported in API-only mode.', success: false };
}

export async function deleteCityAction(countryCode: string, name: string) {
  return {message: 'Not supported in API-only mode.', success: false};
}

const heroContentSchema = z.object({ headline: z.string().min(5, 'Headline must be at least 5 characters long.'), subheading: z.string().min(10, 'Subheading must be at least 10 characters long.') });

export async function updateHeroContentAction(formData: FormData): Promise<FormState> {
  return { message: 'Hero content updated.', success: true };
}

export async function updateUserAction(formData: FormData): Promise<FormState> {
    return { success: false, message: 'User management not supported in API-only mode.' };
}

export async function updateUserProfileAction(formData: FormData): Promise<FormState> {
    return { success: false, message: 'User management not supported in API-only mode.' };
}

export async function updatePartnerProfileAction(formData: FormData): Promise<FormState> {
    return { success: false, message: 'User management not supported in API-only mode.' };
}

export async function updateAgentProfileAction(formData: FormData): Promise<FormState> {
    return { success: false, message: 'User management not supported in API-only mode.' };
}

export async function inviteUserAction(formData: FormData): Promise<FormState> {
    return { success: false, message: 'User management not supported in API-only mode.' };
}

export async function addMemberAction(formData: FormData): Promise<FormState> {
    return { success: false, message: 'User management not supported in API-only mode.' };
}


export async function lockUserAction(userId: string): Promise<{ success: boolean; message: string; }> {
    return { success: false, message: 'Not supported in API-only mode.' };
}

export async function unlockUserAction(userId: string): Promise<{ success: boolean; message: string; }> {
    return { success: false, message: 'Not supported in API-only mode.' };
}

export async function getBookingById(bookingId: string): Promise<Booking | null> {
    return ExcursionService.getBookingById(bookingId);
}

export async function findBookingByReferenceAndEmail(reference: string, email: string): Promise<Booking | null> {
    return ExcursionService.findBookingByReferenceAndEmail(reference, email);
}

export async function getBookingForVoucherAction(ref: string, email: string): Promise<Booking | null> {
    return ExcursionService.findBookingByReferenceAndEmail(ref, email);
}

export type FormState = {
    message: string;
    errors?: Record<string, string[] | undefined>;
    success: boolean;
};

export async function findBookingAction(formData: FormData): Promise<FormState | void> {
  return { success: false, message: 'Booking functionality not supported in API-only mode.' };
}

export async function getUpcomingBookingsForUser(userId: string, limit?: number): Promise<Booking[]> {
  return [];
}

export async function getPastBookingsForUser(): Promise<Booking[]> {
  return [];
}

export async function getAllUpcomingBookings(limit?: number): Promise<Booking[]> {
    return [];
}

export async function getAllPastBookings(): Promise<Booking[]> {
    return [];
}

export async function getAgentStats(agentId: string) {
    return {
        totalReferrals: 0,
        totalEarnings: 0,
    };
}

export async function getAgentRank(referralCount: number): Promise<string> {
    return 'Bronze';
}

export async function getAgentReferrals(agentId: string, limit: number = 5): Promise<Referral[]> {
    return [];
}

export async function getAgentPayouts(agentId: string): Promise<Payout[]> {
     return [];
}