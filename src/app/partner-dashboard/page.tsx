
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Ticket, DollarSign, Users, PlusCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getExcursionsByPartner } from '@/app/actions';
import { getPartnerProfile } from '@/lib/user-service';
import { notFound } from 'next/navigation';
import { PartnerProfileForm } from './profile/partner-profile-form';

const chartData = [
  { month: "Jan", bookings: 120 },
  { month: "Feb", bookings: 150 },
  { month: "Mar", bookings: 170 },
  { month: "Apr", bookings: 210 },
  { month: "May", bookings: 250 },
  { month: "Jun", bookings: 230 },
];

const chartConfig = {
  bookings: {
    label: "Bookings",
    color: "hsl(var(--primary))",
  },
};

export default async function PartnerDashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== 'partner') {
    return redirect('/login?message=You must be a partner to view this page.');
  }

  const [partnerExcursions, partnerProfile] = await Promise.all([
      getExcursionsByPartner(user.id),
      getPartnerProfile(user.id)
  ]);
  
  if (!partnerProfile) {
    notFound();
  }


  const stats = {
      totalExcursions: partnerExcursions.length,
      activeExcursions: partnerExcursions.filter(e => e.status === 'active').length,
      pendingExcursions: partnerExcursions.filter(e => e.status === 'pending_approval').length,
  }
  
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Partner Dashboard</h1>
                <p className="text-muted-foreground mt-1">Manage your excursions and track your performance.</p>
            </header>
            <Button asChild>
                <Link href="/admin/create">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Excursion
                </Link>
            </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Excursions</CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalExcursions}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Excursions</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.activeExcursions}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.pendingExcursions}</div>
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader className="flex items-center justify-between">
                <div>
                    <CardTitle>Your Excursions</CardTitle>
                    <CardDescription>A quick look at your most recent listings.</CardDescription>
                </div>
                 <Button asChild variant="outline">
                    <Link href="/partner-dashboard/excursions">
                       Manage All
                       <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Excursion</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {partnerExcursions.slice(0, 5).map((excursion) => (
                            <TableRow key={excursion.id}>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <Image src={excursion.images[0] || 'https://placehold.co/100x75.png'} alt={excursion.name} width={64} height={48} className="rounded-md object-cover" />
                                        <div>
                                            <p className="font-medium">{excursion.name}</p>
                                            <p className="text-sm text-muted-foreground">{excursion.city}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={
                                        excursion.status === 'active' ? 'default' : 
                                        excursion.status === 'pending_approval' ? 'secondary' : 
                                        'destructive'
                                    } className="capitalize">
                                        {excursion.status?.replace('_', ' ') || 'Inactive'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-mono">${excursion.price.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <div className="mt-8">
          <PartnerProfileForm partnerProfile={partnerProfile} />
        </div>
    </div>
  );
}
