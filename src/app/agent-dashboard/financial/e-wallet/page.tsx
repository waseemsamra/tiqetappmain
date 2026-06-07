
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DatePicker } from './date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const NoDataAvailable = () => (
    <div className="text-center py-16">
        <div className="inline-block p-6 bg-muted rounded-full">
             <div className="p-4 bg-background rounded-full border-2 border-dashed">
                <Search className="h-12 w-12 text-muted-foreground" />
             </div>
        </div>
        <p className="mt-4 text-muted-foreground">No Data Available</p>
    </div>
);


export default function EWalletPage() {

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">E-wallet</h1>
                <Breadcrumb className="mt-2">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/agent-dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>E-wallet</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <Card>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Pick Start Date</label>
                            <DatePicker />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Pick End Date</label>
                            <DatePicker />
                        </div>
                         <div className="space-y-2">
                            <label className="text-sm font-medium">Username</label>
                            <Input placeholder="Username" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Amount Type</label>
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="referral_bonus">Referral Bonus</SelectItem>
                                    <SelectItem value="deducted_by_admin">Deducted By Admin</SelectItem>
                                    <SelectItem value="credited_by_admin">Credited By Admin</SelectItem>
                                    <SelectItem value="fund_transfer">Fund Transfer</SelectItem>
                                    <SelectItem value="first_order_bonus">First Order Bonus</SelectItem>
                                    <SelectItem value="level_commission">Level Commission</SelectItem>
                                    <SelectItem value="binary_bonus">Binary Bonus</SelectItem>
                                    <SelectItem value="rank_bonus">Rank Bonus</SelectItem>
                                    <SelectItem value="binary_matching_bonus">Binary Matching Bonus</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end">
                            <Button className="w-full">Get Report</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>From User</TableHead>
                                <TableHead>Amount Type</TableHead>
                                <TableHead>Payment Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <NoDataAvailable />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
