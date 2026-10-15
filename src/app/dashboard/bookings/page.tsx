import { createClient } from '@/lib/supabase/server';
import { getUpcomingBookingsForUser, getPastBookingsForUser } from '@/app/actions';
import type { Booking, Excursion } from '@/types';
import FilterBar from './filter-bar';

const MOCK_EXCURSIONS: Excursion[] = [
  { id: 'exc-0', name: 'Grand Canyon Helicopter Tour', city: 'Las Vegas', country: 'USA', description: 'Scenic helicopter flight over the Grand Canyon.', price: 149, currency: 'USD', duration: '45 min', activitytypeid: '1', excursionType: { id: '1', name: 'Adventures' }, images: ['https://images.unsplash.com/photo-1566086311062-64798c024365?w=400'], status: 'active', partner_id: null, reviews: [] },
  { id: 'exc-1', name: 'Paris City Bike Tour', city: 'Paris', country: 'France', description: 'Guided bike tour through the streets of Paris.', price: 89, currency: 'USD', duration: '3 hours', activitytypeid: '2', excursionType: { id: '2', name: 'Sightseeing' }, images: ['https://images.unsplash.com/photo-1514585407827-19089dfc548d?w=400'], status: 'active', partner_id: null, reviews: [] },
  { id: 'exc-2', name: 'Tokyo Food Walking Tour', city: 'Tokyo', country: 'Japan', description: 'Explore Tokyo\'s best street food on a guided walking tour.', price: 79, currency: 'USD', duration: '4 hours', activitytypeid: '3', excursionType: { id: '3', name: 'Food & Drink' }, images: ['https://images.unsplash.com/photo-c5729c4643977-1c2d93f2e6ab?w=400'], status: 'active', partner_id: null, reviews: [] },
  { id: 'exc-3', name: 'Iceland Northern Lights Tour', city: 'Reykjavik', country: 'Iceland', description: 'Chase the Northern Lights on a guided minibus tour.', price: 129, currency: 'USD', duration: '6 hours', activitytypeid: '4', excursionType: { id: '4', name: 'Nature' }, images: ['https://images.unsplash.com/photo-145145737135-9b9c5e6e6e3a?w=400'], status: 'active', partner_id: null, reviews: [] },
];

function excursionToBooking(excursion: Excursion, index: number, status: Booking['status']): Booking {
  const baseDate = new Date(2026, 9, 15 + index * 2);
  const bookingDate = new Date(2026, 8, 1 + index);
  return {
    id: `dummy-${index}`,
    user_id: 'preview',
    excursion_id: excursion.id,
    booking_reference: `BK-${String(100 + index).padStart(3, '0')}`,
    date: baseDate.toISOString(),
    status,
    total_price: typeof excursion.price === 'number' ? excursion.price : Number(excursion.price),
    booking_date: bookingDate.toISOString(),
    booking_type: 'EXCURSIONS',
    miles_earned: Math.round(typeof excursion.price === 'number' ? excursion.price : Number(excursion.price)),
    loyalty_points: Math.round(typeof excursion.price === 'number' ? excursion.price : Number(excursion.price)),
    activity: excursion,
  };
}

function makeHotelBooking(index: number, status: Booking['status']): Booking {
  const hotels = [
    { name: 'The Ritz-Carlton', city: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1566086311062-64798c024365?w=800', price: 499, desc: 'Luxury hotel in Midtown Manhattan.' },
    { name: 'Le Meurice', city: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1514585407827-19089dfc548d?w=800', price: 599, desc: 'Iconic 5-star hotel near the Tuileries.' },
    { name: 'Park Hyatt Tokyo', city: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-c5729c4643977-1c2d93f2e6ab?w=800', price: 399, desc: 'Modern luxury with views of the city skyline.' },
    { name: 'Hotel Casa Caldera', city: 'Barcelona', country: 'Spain', image: 'https://images.unsplash.com/photo-1544553057-984598145193?w=800', price: 249, desc: 'Boutique hotel in the heart of the Gothic Quarter.' },
    { name: 'The Standard', city: 'Miami', country: 'USA', image: 'https://images.unsplash.com/photo-1582845939778-154449321334?w=800', price: 320, desc: 'Modern beachfront hotel with rooftop pool.' },
  ];
  const h = hotels[index % hotels.length];
  const baseDate = new Date(2026, 9, 20 + index * 2);
  return {
    id: `hotel-${index}`,
    user_id: 'preview',
    excursion_id: `hotel-${index}`,
    booking_reference: `HT-${String(200 + index).padStart(3, '0')}`,
    date: baseDate.toISOString(),
    status,
    total_price: h.price,
    booking_date: new Date(2026, 8, 10 + index).toISOString(),
    booking_type: 'HOTELS' as const,
    miles_earned: Math.round(h.price * 0.1),
    loyalty_points: Math.round(h.price * 0.05),
    activity: {
      id: `hotel-${index}`,
      name: h.name,
      city: h.city,
      country: h.country,
      description: h.desc,
      price: h.price,
      currency: 'USD',
      duration: '3 nights',
      activitytypeid: '100',
      excursionType: { id: '100', name: 'Hotels' },
      images: [h.image],
      status: 'active',
      partner_id: null,
      reviews: [],
    },
  };
}

function makeFlightBooking(index: number, status: Booking['status']): Booking {
  const flights = [
    { name: 'AA102 - New York to London', city: 'JFK → LHR', country: 'International', image: 'https://images.unsplash.com/photo-1488616420687-89774db446ff?w=800', price: 650, desc: 'Direct flight from JFK to London Heathrow.' },
    { name: 'UA428 - San Francisco to Tokyo', city: 'SFO → HND', country: 'International', image: 'https://images.unsplash.com/photo-1514585407827-19089dfc548d?w=800', price: 850, desc: 'Overnight flight to Tokyo Haneda.' },
    { name: 'DL205 - Los Angeles to Paris', city: 'LAX → CDG', country: 'International', image: 'https://images.unsplash.com/photo-1582845939778-154449321334?w=800', price: 720, desc: 'Morning departure to Paris Charles de Gaulle.' },
    { name: 'BA112 - London to Rome', city: 'LHR → FCO', country: 'Europe', image: 'https://images.unsplash.com/photo-1566086311062-64798c024365?w=800', price: 220, desc: 'Short-haul flight to Rome.' },
    { name: 'QF902 - Sydney to Bangkok', city: 'SYD → BKK', country: 'Asia', image: 'https://images.unsplash.com/photo-c5729c4643977-1c2d93f2e6ab?w=800', price: 780, desc: 'Overnight flight to Bangkok.' },
  ];
  const f = flights[index % flights.length];
  const baseDate = new Date(2026, 9, 22 + index * 2);
  return {
    id: `flight-${index}`,
    user_id: 'preview',
    excursion_id: `flight-${index}`,
    booking_reference: `FL-${String(300 + index).padStart(3, '0')}`,
    date: baseDate.toISOString(),
    status,
    total_price: f.price,
    booking_date: new Date(2026, 8, 12 + index).toISOString(),
    booking_type: 'FLIGHTS' as const,
    miles_earned: Math.round(f.price * 2),
    loyalty_points: Math.round(f.price * 0.8),
    activity: {
      id: `flight-${index}`,
      name: f.name,
      city: f.city,
      country: f.country,
      description: f.desc,
      price: f.price,
      currency: 'USD',
      duration: f.city.includes('→') ? 'Direct' : '6h',
      activitytypeid: '200',
      excursionType: { id: '200', name: 'Flights' },
      images: [f.image],
      status: 'active',
      partner_id: null,
      reviews: [],
    },
  };
}

function makeTransferBooking(index: number, status: Booking['status']): Booking {
  const transfers = [
    { name: 'Airport Transfer - JFK to Hotel', city: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1493793173660-661d0e3aa1d6?w=800', price: 65, desc: 'Private car transfer from JFK to Midtown hotel.' },
    { name: 'Port Transfer - Cruise Terminal', city: 'Miami', country: 'USA', image: 'https://images.unsplash.com/photo-1544553057-984598145193?w=800', price: 45, desc: 'Shared shuttle from Miami port to hotel.' },
    { name: 'Train Station Transfer', city: 'London', country: 'UK', image: 'https://images.unsplash.com/photo-1587473392085-4e5d2e3a3b0a?w=800', price: 38, desc: 'Private transfer from Paddington Station.' },
    { name: 'Resort Transfer - Bali', city: 'Ubud', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1582845939778-154449321334?w=800', price: 28, desc: 'Shared minivan transfer to Ubud resort.' },
  ];
  const t = transfers[index % transfers.length];
  const baseDate = new Date(2026, 10, 2 + index * 2);
  return {
    id: `transfer-${index}`,
    user_id: 'preview',
    excursion_id: `transfer-${index}`,
    booking_reference: `TR-${String(400 + index).padStart(3, '0')}`,
    date: baseDate.toISOString(),
    status,
    total_price: t.price,
    booking_date: new Date(2026, 9, 15 + index).toISOString(),
    booking_type: 'TRANSFERS' as const,
    miles_earned: Math.round(t.price * 3),
    loyalty_points: Math.round(t.price * 2),
    activity: {
      id: `transfer-${index}`,
      name: t.name,
      city: t.city,
      country: t.country,
      description: t.desc,
      price: t.price,
      currency: 'USD',
      duration: '30 min',
      activitytypeid: '300',
      excursionType: { id: '300', name: 'Transfers' },
      images: [t.image],
      status: 'active',
      partner_id: null,
      reviews: [],
    },
  };
}

function makePackageBooking(index: number, status: Booking['status']): Booking {
  const packages = [
    { name: 'London Explorer: Hotel + Tour + Theater', city: 'London', country: 'UK', image: 'https://images.unsplash.com/photo-1566086311062-64798c024365?w=800', price: 799, desc: '7-day package including hotel, city tours, and West End show.' },
    { name: 'Tokyo Discovery: Flight + Hotel + Sushi Tour', city: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-c5729c4643977-1c2d93f2e6ab?w=800', price: 1299, desc: '10-day package with flights, 4-star hotel, and food tour.' },
    { name: 'Barcelona Beach Break: Hotel + Excursion', city: 'Barcelona', country: 'Spain', image: 'https://images.unsplash.com/photo-1544553057-984598145193?w=800', price: 649, desc: '5-day beach holiday with hotel and coastal excursion.' },
    { name: 'New York City Escape: Flight + Hotel', city: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1488616420687-89774db446ff?w=800', price: 899, desc: '4-day city break with flights and boutique hotel.' },
  ];
  const p = packages[index % packages.length];
  const baseDate = new Date(2026, 10, 5 + index * 3);
  return {
    id: `package-${index}`,
    user_id: 'preview',
    excursion_id: `package-${index}`,
    booking_reference: `PK-${String(500 + index).padStart(3, '0')}`,
    date: baseDate.toISOString(),
    status,
    total_price: p.price,
    booking_date: new Date(2026, 9, 20 + index).toISOString(),
    booking_type: 'PACKAGES' as const,
    miles_earned: Math.round(p.price * 0.5),
    loyalty_points: Math.round(p.price * 0.3),
    activity: {
      id: `package-${index}`,
      name: p.name,
      city: p.city,
      country: p.country,
      description: p.desc,
      price: p.price,
      currency: 'USD',
      duration: '7 days',
      activitytypeid: '400',
      excursionType: { id: '400', name: 'Packages' },
      images: [p.image],
      status: 'active',
      partner_id: null,
      reviews: [],
    },
  };
}

export default async function BookingsPage({ searchParams }: { searchParams: Promise<{ type?: string; sort?: string }> }) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { type = 'ALL TYPES', sort = 'UPCOMING' } = await searchParams;

    let upcomingBookings: Booking[] = [];
    let pastBookings: Booking[] = [];

    if (user) {
      [upcomingBookings, pastBookings] = await Promise.all([
          getUpcomingBookingsForUser(user.id),
          getPastBookingsForUser()
      ]);
    }

    if (!upcomingBookings.length && !pastBookings.length) {
      const excursionBookings = MOCK_EXCURSIONS.slice(0, 4).map((e, i) =>
          excursionToBooking(e, i, i === 2 ? 'cancelled' : 'confirmed')
        );
        const hotels = Array.from({ length: 4 }, (_, i) => makeHotelBooking(i, i === 3 ? 'cancelled' : 'confirmed'));
        const flights = Array.from({ length: 4 }, (_, i) => makeFlightBooking(i, i === 3 ? 'cancelled' : 'confirmed'));
        const transfers = Array.from({ length: 3 }, (_, i) => makeTransferBooking(i, 'confirmed'));
        const packages_ = Array.from({ length: 3 }, (_, i) => makePackageBooking(i, 'confirmed'));

        upcomingBookings = [
          ...excursionBookings.filter(b => b.status === 'confirmed'),
          ...hotels.filter(b => b.status === 'confirmed'),
          ...flights.filter(b => b.status === 'confirmed'),
          ...transfers,
          ...packages_,
        ];
        pastBookings = [
          ...excursionBookings.filter(b => b.status === 'cancelled'),
          ...hotels.filter(b => b.status === 'cancelled'),
          ...flights.filter(b => b.status === 'cancelled'),
          makeHotelBooking(4, 'completed'),
          makeFlightBooking(4, 'completed'),
          makeFlightBooking(5, 'cancelled'),
          makeTransferBooking(3, 'completed'),
          makePackageBooking(2, 'completed'),
          makePackageBooking(3, 'cancelled'),
        ];
      }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-primary">Trips You have Booked!</h1>
                <p className="text-sm text-muted-foreground">View your upcoming and past trips.</p>
            </div>

            <FilterBar
              upcomingBookings={upcomingBookings}
              pastBookings={pastBookings}
              initialType={type}
              initialSort={sort}
            />
        </div>
    );
}
