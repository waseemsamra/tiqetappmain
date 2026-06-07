
import {
  ArrowRight,
  Ticket,
  Wallet,
  DollarSign,
  Users,
  Award,
  PlusCircle,
  MapPin,
  Network
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import Image from 'next/image';
import { getWishlistItems, getUpcomingBookingsForUser, getAgentStats, getAgentReferrals, getAgentRank } from '@/app/actions';
import { format } from 'date-fns';
import type { Excursion, Booking, Referral } from '@/types';
import { LoyaltyHub } from './loyalty-hub';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getLoyaltyTier } from '@/lib/loyalty';


const UpcomingTripCard = ({ booking }: { booking: Booking }) => (
    <Link href={`/booking/${booking.id}`} className="block group">
        <Card className="overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 flex-grow flex flex-col">
                 <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-primary font-semibold">{format(new Date(booking.booking_date), "MMM d, yyyy")}</p>
                        <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors mt-1 flex-grow">{booking.activity.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {booking.activity.city}, {booking.activity.country}
                        </p>
                    </div>
                 </div>
            </CardContent>
        </Card>
    </Link>
);


const WishlistItemCard = ({ excursion }: { excursion: Excursion }) => (
    <Link href={`/excursions/${excursion.id}`} className="block group">
        <Card className="overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col">
            <div className="relative aspect-video">
                <Image src={excursion.images?.[0] || 'https://placehold.co/400x300.png'} alt={excursion.name} fill className="object-cover" data-ai-hint="attraction" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <CardContent className="p-4 flex-grow">
                 <h3 className="font-bold text-base leading-snug group-hover:text-primary transition-colors mt-1 flex-grow">{excursion.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    {excursion.city}, {excursion.country}
                </p>
            </CardContent>
        </Card>
    </Link>
);

const CustomerDashboardView = async ({ user, userName }: { user: any, userName: string }) => {
    const [upcomingBookings, wishlistItems] = await Promise.all([
        getUpcomingBookingsForUser(user.id, 3),
        getWishlistItems(user.id, 3)
    ]);

    const userPoints = user.user_metadata?.points || 0;
    const loyaltyTier = getLoyaltyTier(userPoints);

    return (
        <div className="space-y-8">
            <section>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userName}!</h1>
                        <p className="text-muted-foreground mt-1">Here's a snapshot of your adventures.</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/search">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Explore New Excursions
                        </Link>
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <LoyaltyHub 
                        userPoints={userPoints} 
                        tierName={loyaltyTier.name}
                        progress={loyaltyTier.progress}
                        pointsToNext={loyaltyTier.pointsToNext}
                    />
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-bold">My Wallet</CardTitle>
                            <Wallet className="h-6 w-6 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-extrabold">$0.00</div>
                            <p className="text-xs text-muted-foreground">Available Balance</p>
                            <div className="flex gap-2 mt-4">
                            <Button size="sm">Add Funds</Button>
                            <Button size="sm" variant="outline">Withdraw</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        
            {upcomingBookings.length > 0 && (
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold tracking-tight">Your Upcoming Trips</h2>
                        <Button asChild variant="link">
                            <Link href="/dashboard/bookings">View All <ArrowRight className="h-4 w-4 ml-1" /></Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingBookings.map(booking => (
                            <UpcomingTripCard key={booking.id} booking={booking} />
                        ))}
                    </div>
                </section>
            )}

            {wishlistItems.length > 0 && (
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold tracking-tight">From Your Wishlist</h2>
                        <Button asChild variant="link">
                            <Link href="/dashboard/wishlist">View All <ArrowRight className="h-4 w-4 ml-1" /></Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistItems.map(item => (
                            <WishlistItemCard key={item.id} excursion={item} />
                        ))}
                    </div>
                </section>
            )}

            {upcomingBookings.length === 0 && wishlistItems.length === 0 && (
                <Card className="text-center py-16">
                    <CardContent>
                        <h2 className="text-2xl font-semibold">Ready for your next adventure?</h2>
                        <p className="text-muted-foreground mt-2 mb-6">You don't have any upcoming trips or items on your wishlist yet.</p>
                        <Button asChild>
                            <Link href="/search">Explore Excursions</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

const AgentDashboardView = async ({ user, userName }: { user: any, userName: string }) => {
    const [statsData, referralsData] = await Promise.all([
        getAgentStats(user.id),
        getAgentReferrals(user.id, 5)
    ]);
    const rank = await getAgentRank(statsData.totalReferrals);

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Agent Dashboard</h1>
                <p className="text-muted-foreground mt-1">Welcome back, {userName}! Here's an overview of your affiliate activity.</p>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/dashboard/payouts">
                    <Card className="hover:bg-muted transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${statsData.totalEarnings.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month (demo)</p>
                        </CardContent>
                    </Card>
                </Link>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{rank}</div>
                        <p className="text-xs text-muted-foreground">Based on your referrals</p>
                    </CardContent>
                </Card>
                 <Link href="/dashboard/downline">
                    <Card className="hover:bg-muted transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statsData.totalReferrals}</div>
                            <p className="text-xs text-muted-foreground">in your direct downline</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Recent Referral Activity</CardTitle>
                    <CardDescription>Commission earned from new bookings via your referral code.</CardDescription>
                </CardHeader>
                <CardContent>
                   <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Activity</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Commission</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {referralsData.map((referral: Referral) => (
                                <TableRow key={referral.id}>
                                    <TableCell>
                                        <div className="font-medium">New Referral: {referral.booking.activity.name}</div>
                                        <div className="text-sm text-muted-foreground">Booking: {referral.booking.booking_reference}</div>
                                    </TableCell>
                                    <TableCell>{new Date(referral.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right text-green-600 font-medium">+${referral.commission_amount.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                     {referralsData.length === 0 && (
                        <div className="text-center p-8 text-muted-foreground">
                            You have no recent referral activity.
                        </div>
                    )}
                </CardContent>
            </Card>

        </div>
    );
};


export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?message=You must be logged in to view this page.');
  }

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Explorer';
  const userRole = user.user_metadata?.role;
  
  if (userRole === 'agent') {
    return <AgentDashboardView user={user} userName={userName} />;
  }
  
  return <CustomerDashboardView user={user} userName={userName} />;
}
