import { createClient } from '@/lib/supabase/server';
import { getBookingById } from '@/lib/excursions';
import type { Booking } from '@/types';
import Image from 'next/image';
import { Calendar, Clock, MapPin, User, Mail, Phone, Ticket, Star } from 'lucide-react';

const MOCK_BOOKINGS: Record<string, Booking> = {
  'dummy-0': {
    id: 'dummy-0',
    user_id: 'preview',
    excursion_id: 'e1',
    booking_reference: 'BK-001',
    date: '2026-10-20T09:00:00.000Z',
    status: 'confirmed',
    total_price: 149,
    booking_date: '2026-10-01',
    booking_type: 'EXCURSIONS',
    miles_earned: 149,
    loyalty_points: 149,
    activity: {
      id: 'e1',
      name: 'Grand Canyon Helicopter Tour',
      city: 'Las Vegas',
      country: 'USA',
      description: 'Experience the Grand Canyon from above on this scenic helicopter flight.',
      price: 149,
      currency: 'USD',
      duration: '45 min',
      activitytypeid: '1',
      excursionType: { id: '1', name: 'Adventures' },
      images: ['https://images.unsplash.com/photo-1566086311062-64798c024365?w=800'],
      status: 'active',
      partner_id: null,
      reviews: [],
      rating: 4.8,
    },
  },
  'hotel-0': {
    id: 'hotel-0',
    user_id: 'preview',
    excursion_id: 'hotel-0',
    booking_reference: 'HT-200',
    date: '2026-10-25T15:00:00.000Z',
    status: 'confirmed',
    total_price: 499,
    booking_date: '2026-10-01',
    booking_type: 'HOTELS',
    miles_earned: 50,
    loyalty_points: 25,
    activity: {
      id: 'hotel-0',
      name: 'The Ritz-Carlton',
      city: 'New York',
      country: 'USA',
      description: 'Luxury hotel in Midtown Manhattan. 3-night stay with breakfast included.',
      price: 499,
      currency: 'USD',
      duration: '3 nights',
      activitytypeid: '100',
      excursionType: { id: '100', name: 'Hotels' },
      images: ['https://images.unsplash.com/photo-1566086311062-64798c024365?w=800'],
      status: 'active',
      partner_id: null,
      reviews: [],
    },
  },
  'flight-0': {
    id: 'flight-0',
    user_id: 'preview',
    excursion_id: 'flight-0',
    booking_reference: 'FL-300',
    date: '2026-11-10T08:30:00.000Z',
    status: 'confirmed',
    total_price: 650,
    booking_date: '2026-10-05',
    booking_type: 'FLIGHTS',
    miles_earned: 1300,
    loyalty_points: 520,
    activity: {
      id: 'flight-0',
      name: 'AA102 - New York to London',
      city: 'JFK to LHR',
      country: 'International',
      description: 'Direct flight from JFK to London Heathrow. Economy class with carry-on.',
      price: 650,
      currency: 'USD',
      duration: 'Direct',
      activitytypeid: '200',
      excursionType: { id: '200', name: 'Flights' },
      images: ['https://images.unsplash.com/photo-1488616420687-89774db446ff?w=800'],
      status: 'active',
      partner_id: null,
      reviews: [],
    },
  },
  'package-0': {
    id: 'package-0',
    user_id: 'preview',
    excursion_id: 'package-0',
    booking_reference: 'PK-500',
    date: '2026-11-15T00:00:00.000Z',
    status: 'confirmed',
    total_price: 799,
    booking_date: '2026-10-10',
    booking_type: 'PACKAGES',
    miles_earned: 399,
    loyalty_points: 240,
    activity: {
      id: 'package-0',
      name: 'London Explorer: Hotel + Tour + Theater',
      city: 'London',
      country: 'UK',
      description: '7-day package including hotel, city tours, and West End show.',
      price: 799,
      currency: 'USD',
      duration: '7 days',
      activitytypeid: '400',
      excursionType: { id: '400', name: 'Packages' },
      images: ['https://images.unsplash.com/photo-1566086311062-64798c024365?w=800'],
      status: 'active',
      partner_id: null,
      reviews: [],
    },
  },
};

const STATUS_COLORS: Record<string, string> = {
  confirmed: 'bg-[#a6ce5e]',
  pending: 'bg-[#ebbe46]',
  cancelled: 'bg-[#db5e60]',
  completed: 'bg-[#58c0e8]',
};

const TYPE_LABELS: Record<string, string> = {
  EXCURSIONS: 'Excursion',
  HOTELS: 'Hotel',
  FLIGHTS: 'Flight',
  TRANSFERS: 'Transfer',
  PACKAGES: 'Package',
};

export default async function BookingVoucher({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let booking: Booking | null = null;
  if (user) {
    booking = await getBookingById(id);
  }

  if (!booking) {
    booking = MOCK_BOOKINGS[id] || MOCK_BOOKINGS['dummy-0'];
  }

  const activity = booking.activity!;
  const statusColor = STATUS_COLORS[booking.status] || 'bg-gray-500';
  const typeLabel = TYPE_LABELS[booking.booking_type || 'EXCURSIONS'] || booking.booking_type || 'Booking';
  const displayDate = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const qrData = `${booking.booking_reference}|${activity.name}|${displayDate}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#58c0e8] to-[#ebbe46] px-8 py-6">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-3">
                <img src="/aafare-logo.png" alt="AAFare" className="h-10 w-auto" />
                <span className="text-2xl font-bold text-white">AAFare</span>
              </a>
              <span className={`px-4 py-2 rounded-full text-sm font-bold text-white ${statusColor}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{activity.name}</h1>
                <p className="text-sm text-gray-500 mt-1">{activity.city}, {activity.country}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Reference</p>
                <p className="text-xl font-bold text-primary">{booking.booking_reference}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 mb-6">
              <div className="relative h-28 rounded-lg overflow-hidden">
                {activity.images?.[0] && (
                  <Image
                    src={activity.images[0]}
                    alt={activity.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[#58c0e8]" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p className="font-semibold">{displayDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#58c0e8]" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Duration</p>
                    <p className="font-semibold">{activity.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#58c0e8]" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Type</p>
                    <p className="font-semibold">{typeLabel}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 mb-6">
              <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
              {activity.rating && (
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-[#ebbe46] text-[#ebbe46]" />
                  <span className="text-sm font-medium">{activity.rating.toFixed(1)}</span>
                  <span className="text-sm text-gray-400">({activity.reviews?.length || 0} reviews)</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Booking Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Date</span>
                    <span className="font-medium">{new Date(booking.booking_date || booking.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Type</span>
                    <span className="font-medium">{typeLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity</span>
                    <span className="font-medium">{booking.quantity || 1} person</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Price Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Price</span>
                    <span className="font-medium">${activity.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-medium">${Math.round(Number(activity.price) * 0.1).toFixed(2)}</span>
                  </div>
                  {booking.miles_earned && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Miles Earned</span>
                      <span className="font-medium text-[#58c0e8]">{booking.miles_earned} miles</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Total Paid</span>
                    <span className="font-bold text-primary">${booking.total_price}.00 USD</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-2 rounded">
                  <img
                    src={`https://chart.googleapis.com/chart?cht=qr&chs=100x100&chl=${encodeURIComponent(qrData)}`}
                    alt="QR Code"
                    className="w-24 h-24"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono">{booking.booking_reference}</p>
                  <p className="text-sm text-gray-400 mt-1">Present this voucher at check-in</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t text-center">
              <p className="text-xs text-gray-400">
                By using this voucher, you agree to the AAFare terms and conditions.
                This booking is non-transferable and cannot be exchanged for cash.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
