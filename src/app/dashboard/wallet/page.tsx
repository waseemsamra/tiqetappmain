
'use client';

import { Suspense, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, ArrowDownUp, Download, Award, BrainCircuit, LineChart, Star, Loader2 } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { createClient } from '@/lib/supabase/client';
import type { Booking, Excursion, PointTransaction } from '@/types';
import { getPastBookingsForUser, getPointsHistoryForUser } from './actions';
import { analyzeSpendingAndSuggestExcursions } from '@/ai/flows/analyze-spending-flow';
import AttractionListingSection from '@/app/attraction-listing';
import { Skeleton } from '@/components/ui/skeleton';

const chartData = [
  { month: 'Jan', points: 10 },
  { month: 'Feb', points: 25 },
  { month: 'Mar', points: 15 },
  { month: 'Apr', points: 40 },
  { month: 'May', points: 30 },
  { month: 'Jun', points: 50 },
];

const chartConfig = {
  points: {
    label: 'Points Earned',
    color: 'hsl(var(--primary))',
  },
};


const AIAnalysis = ({ bookings }: { bookings: Booking[] }) => {
    const [analysis, setAnalysis] = useState<{ profile: string; recommendations: Excursion[] } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (bookings.length > 0) {
            analyzeSpendingAndSuggestExcursions({ bookings })
                .then(setAnalysis)
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [bookings]);

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BrainCircuit /> AI Spending Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-64 w-full" />
                    </div>
                </CardContent>
            </Card>
        )
    }
    
    if (!analysis || analysis.recommendations.length === 0) {
        return null; // Don't show the section if there's nothing to show
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Your Traveler Profile</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{analysis.profile}</p>
            </div>

            <AttractionListingSection
                title="Based on Your History, You Might Like..."
                excursions={analysis.recommendations}
                layout="carousel"
                showViewAllButton={false}
                showTabs={false}
            />
        </div>
    );
};


function WalletPageContent() {
    const [pastBookings, setPastBookings] = useState<Booking[]>([]);
    const [pointsHistory, setPointsHistory] = useState<PointTransaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([getPastBookingsForUser(), getPointsHistoryForUser()])
            .then(([bookings, points]) => {
                setPastBookings(bookings);
                setPointsHistory(points);
            })
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return (
             <div className="space-y-8">
                 <Skeleton className="h-24 w-full" />
                 <Skeleton className="h-64 w-full" />
                 <Skeleton className="h-64 w-full" />
             </div>
        );
    }

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Wallet & Loyalty Hub</h1>
                <p className="text-muted-foreground">Manage your funds, points, and see personalized recommendations.</p>
            </div>

            <AIAnalysis bookings={pastBookings} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Points History</CardTitle>
                        <CardDescription>A summary of the points you've earned.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius)" }}
                                />
                                <Legend />
                                <Bar dataKey="points" fill="var(--color-points)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Points Ledger</CardTitle>
                        <CardDescription>A detailed breakdown of your points activity.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Activity</TableHead>
                                    <TableHead className="text-right">Points</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pointsHistory.map((tx) => (
                                    <TableRow key={tx.id}>
                                        <TableCell>{new Date(tx.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>{tx.description}</TableCell>
                                        <TableCell className="text-right font-medium text-green-600">
                                            +{tx.points_change}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         {pointsHistory.length === 0 && (
                            <div className="text-center py-10 text-muted-foreground">
                                You haven't earned any points yet.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


export default function WalletPage() {
    return (
        <Suspense fallback={<div className="text-center p-8">Loading your wallet...</div>}>
            <WalletPageContent />
        </Suspense>
    );
}
