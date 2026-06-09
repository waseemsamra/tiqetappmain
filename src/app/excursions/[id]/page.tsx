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
    notFound();
  }

  // Try to get variants from cache, fall back to API
  let variants: Excursion['variants'] = [];
  const cachedVariants = await getVariantsForExperience(params.id);
  
  if (cachedVariants.length > 0) {
    variants = cachedVariants;
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