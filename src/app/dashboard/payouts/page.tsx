
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getAgentPayouts } from '@/app/actions';
import type { Payout } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const payoutStatusVariant = {
  paid: 'default',
  pending: 'secondary',
  failed: 'destructive',
} as const;

export default async function PayoutsPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.user_metadata?.role !== 'agent') {
        redirect('/login?message=You must be an agent to view this page.');
    }
    
    const payouts = await getAgentPayouts(user.id);
    
    const stats = {
        totalPaid: payouts.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
        pendingPayout: payouts.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">My Commissions</h1>
                <p className="text-muted-foreground mt-1">Track your commission earnings and payout history.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Commissions Paid</CardTitle>
                        <CardDescription>The total commission you've received so far.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">${Number(stats.totalPaid || 0).toFixed(2)}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Pending Commissions</CardTitle>
                        <CardDescription>The amount that will be included in your next payout.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">${Number(stats.pendingPayout || 0).toFixed(2)}</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Commission Statement</CardTitle>
                        <CardDescription>A record of all your commission payouts.</CardDescription>
                    </div>
                     <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download Statement
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Payout ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payouts.map(payout => (
                                <TableRow key={payout.id}>
                                    <TableCell className="font-mono text-xs">{payout.id}</TableCell>
                                    <TableCell>{new Date(payout.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={payoutStatusVariant[payout.status]}>
                                            {payout.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-medium">${Number(payout.amount || 0).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {payouts.length === 0 && (
                        <div className="text-center p-12 text-muted-foreground">
                            You have no payout history yet.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
