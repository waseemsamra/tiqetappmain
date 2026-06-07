
'use server';

import { getBookingById } from '@/app/actions';
import type { Booking } from '@/types';

export async function getBookingByIdAction(bookingId: string): Promise<Booking | null> {
    return getBookingById(bookingId);
}
