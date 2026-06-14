import type { Excursion } from '@/types';
import { getExcursionById } from '@/app/actions';
import { createClient } from '@/lib/supabase/server';
import ExcursionDetailClient from './excursion-detail-client';
import { notFound } from 'next/navigation';
import * as TiqetsApi from '@/lib/tiqets-api';
import { getVariantsForExperience, getExperienceByIdFromCache } from '@/lib/json-cache';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export default async function ExcursionDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Try to get experience from cache first
  let excursion = await getExperienceByIdFromCache(params.id);

  if (!excursion) {
    // Fall back to API
    excursion = await getExcursionById(params.id);
  }

  if (!excursion) {
    // Render a friendly unavailable page instead of raw Next.js 404
    excursion = {
      id: params.id,
      name: 'Experience Unavailable',
      city: '',
      country: '',
      description: 'This experience is no longer available or has been removed.',
      price: 0,
      duration: '',
      images: [],
      rating: 0,
      activitytypeid: params.id,
      excursionType: { id: params.id, name: 'Unavailable' },
      status: 'inactive',
      partner_id: null,
      reviews: [],
      product_ids: [],
      reviewsTotal: 0,
      tag_ids: [],
      experience_url: '',
      variants: [],
    } as any;
  }

   // Try to get variants from cache, fall back to API
   let variants: Excursion['variants'] = [];
   const cachedVariants = await getVariantsForExperience(params.id);
   
   if (cachedVariants.length > 0) {
     variants = cachedVariants;
    } else if (excursion.product_groups && Array.isArray(excursion.product_groups) && excursion.product_groups.length > 0) {
      // Extract variants from product_groups data
      const productList = excursion.product_groups
        .flatMap(group => Array.isArray(group.products) ? group.products : []);
      
       variants = productList
        .filter(product => product.id !== null && product.id !== undefined && product.id !== '')
        .map(product => {
          // Use product data from product_groups, with fallbacks to main excursion data for missing fields
          const price = Number(product.from_price || product.price || 0);
          
          return {
            id: product.id!.toString(),
            name: product.title || '',
            price: isNaN(price) ? 0 : price,
            duration: excursion.duration || 'Not specified',
            description: product.description || product.summary || excursion.description || '',
            images: (product.image_url && [product.image_url]) || (excursion.images && excursion.images.length > 0 ? excursion.images : []),
            status: 'available',
            whatsincluded: product.whats_included || '',
            whatsnotincluded: product.whats_excluded || '',
          } as ExcursionVariant;
        });
   } else if (excursion.product_ids && excursion.product_ids.length > 0) {
     const fetchedVariants = await TiqetsApi.fetchTiqetsProductVariants(excursion.product_ids);
     variants = fetchedVariants;
   }

  return (
    <ExcursionDetailClient
      excursion={{ ...excursion, variants }}
      user={user}
    />
  );
}