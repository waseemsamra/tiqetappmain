
'use client';

import * as React from 'react';
import type { Payout } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const payoutStatusVariant = {
  paid: 'default',
  pending: 'secondary',
  failed: 'destructive',
} as const;

const NoDataAvailable = () => (
    <div className="text-center py-16">
        <div className="inline-block p-6 bg-muted rounded-full">
             <div className="p-4 bg-background rounded-full border-2 border-dashed flex items-center justify-center h-24 w-24">
                <div className="relative">
                    <Search className="h-12 w-12 text-muted-foreground" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground font-bold text-lg">?</span>
                </div>
             </div>
        </div>
        <p className="mt-4 text-muted-foreground">No Data Available</p>
    </div>
);


export default function PayoutsPage() {
    // This would fetch real data in a production app
    const payouts: Payout[] = [];
    
    return (
        <div className="space-y-8">
            <header>
                 <h1 className="text-3xl font-bold tracking-tight">Payout</h1>
                <Breadcrumb className="mt-2">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/agent-dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Payout</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <Tabs defaultValue="request" className="w-full">
                <TabsList>
                    <TabsTrigger value="request">Payout Request</TabsTrigger>
                    <TabsTrigger value="history">Payout History</TabsTrigger>
                </TabsList>
                <TabsContent value="request">
                    <Card>
                        <CardContent className="pt-6">
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Username</TableHead>
                                        <TableHead>User Balance</TableHead>
                                        <TableHead>Payout Method</TableHead>
                                        <TableHead>Payout Information</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Requested Amount</TableHead>
                                        <TableHead>Admin Fee Deducted</TableHead>
                                        <TableHead>Amount Released</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={10}>
                                            <NoDataAvailable />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="history">
                   <Card>
                        <CardContent className="pt-6">
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
                                    {payouts.length > 0 ? (
                                        payouts.map(payout => (
                                            <TableRow key={payout.id}>
                                                <TableCell className="font-mono text-xs">{payout.id}</TableCell>
                                                <TableCell>{new Date(payout.created_at).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <Badge variant={payoutStatusVariant[payout.status]}>
                                                        {payout.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right font-medium">${payout.amount.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                       <TableRow>
                                            <TableCell colSpan={4}>
                                                <NoDataAvailable />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
