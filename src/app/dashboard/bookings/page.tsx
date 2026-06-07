
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getUpcomingBookingsForUser, getPastBookingsForUser } from '@/app/actions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UpcomingTrips from './upcoming-trips';
import PastBookings from './past-bookings';

export default async function BookingsPage() {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect('/login?message=You must be logged in to view your bookings.');
    }

    const [upcomingBookings, pastBookings] = await Promise.all([
        getUpcomingBookingsForUser(user.id),
        getPastBookingsForUser()
    ]);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
                <p className="text-muted-foreground">View your upcoming and past trips.</p>
            </div>
            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:w-[300px]">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="mt-6">
                    <UpcomingTrips bookings={upcomingBookings} />
                </TabsContent>

                <TabsContent value="past" className="mt-6">
                    <PastBookings bookings={pastBookings} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
