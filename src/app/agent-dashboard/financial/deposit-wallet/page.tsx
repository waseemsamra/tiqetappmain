
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, DollarSign } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DatePicker } from '../e-wallet/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

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

const StatCard = ({ title, amount, iconColor }: { title: string, amount: string, iconColor: string }) => (
    <Card>
        <CardContent className="pt-6">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-2xl font-bold">{amount}</p>
                </div>
                <div className={`p-2 rounded-full bg-opacity-20 ${iconColor === 'green' ? 'bg-green-100 text-green-600' : iconColor === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                    <DollarSign className="h-6 w-6" />
                </div>
            </div>
        </CardContent>
    </Card>
);

export default function DepositWalletPage() {

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Deposit Wallet</h1>
                <Breadcrumb className="mt-2">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/agent-dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Deposit Wallet</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Balance" amount="$991" iconColor="green" />
                <StatCard title="Expense" amount="$11" iconColor="blue" />
                <StatCard title="Total Credits" amount="$6202" iconColor="red" />
            </div>

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
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Username" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user1">User One</SelectItem>
                                    <SelectItem value="user2">User Two</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Amount Type</label>
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="deducted_by_admin">Deducted By Admin</SelectItem>
                                    <SelectItem value="credited_by_admin">Credited By Admin</SelectItem>
                                    <SelectItem value="product_purchased">Product Purchased</SelectItem>
                                    <SelectItem value="fund_transfer">Fund Transfer</SelectItem>
                                    <SelectItem value="deposit_wallet">Deposit Wallet</SelectItem>
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
                                <TableHead>Payment Amount</TableHead>
                                <TableHead>Payment Type</TableHead>
                                <TableHead>Amount Type</TableHead>
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
