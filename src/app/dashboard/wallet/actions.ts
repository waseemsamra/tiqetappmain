
'use server';

import { createClient } from '@/lib/supabase/server';
import type { Booking, PointTransaction } from '@/types';

export async function getPastBookingsForUser(): Promise<Booking[]> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const today = new Date().toISOString();
  const {data, error} = await supabase
    .from('bookings')
    .select('*, activity:activities(*, excursionType:activitytypeid(*))')
    .eq('user_id', user.id)
    .lt('booking_date', today)
    .order('booking_date', { ascending: false });

  if (error) {
    console.error('Error fetching past bookings:', error);
    return [];
  }
  return data as Booking[];
}

export async function getPointsHistoryForUser(): Promise<PointTransaction[]> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('points_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20); // Limit to the last 20 transactions for performance

  if (error) {
    console.error('Error fetching points history:', error);
    return [];
  }
  return data;
}
