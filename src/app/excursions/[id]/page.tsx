import type { Excursion } from '@/types';
import { getExcursionById } from '@/app/actions';
import { createClient } from '@/lib/supabase/server';
import ExcursionDetailClient from './excursion-detail-client';
import { notFound } from 'next/navigation';
import * as TiqetsApi from '@/lib/tiqets-api';

export const revalidate = 3600; // Revalidate data every hour
export const dynamic = 'force-dynamic';

export default async function ExcursionDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const excursion = await getExcursionById(params.id);

  if (!excursion) {
    notFound();
  }

  // Fetch product variants if product_ids exist
  let variants: Excursion['variants'] = [];
  if (excursion.product_ids && excursion.product_ids.length > 0) {
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