
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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


export default function FundCreditPage() {

    return (
        <div className="space-y-6">
            <header>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/agent-dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Fund Credits</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <Card>
                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                        <div className="space-y-2">
                           <Label htmlFor="search-user">Search User</Label>
                           <Select>
                               <SelectTrigger id="search-user">
                                   <SelectValue placeholder="Search User" />
                               </SelectTrigger>
                               <SelectContent>
                                   <SelectItem value="user1">User One</SelectItem>
                                   <SelectItem value="user2">User Two</SelectItem>
                               </SelectContent>
                           </Select>
                       </div>
                       <div className="space-y-2">
                           <Label htmlFor="amount">Amount ($)</Label>
                           <Input id="amount" placeholder="Amount ($)" />
                       </div>
                        <div className="space-y-2">
                           <Label htmlFor="to-user">To</Label>
                           <Select>
                               <SelectTrigger id="to-user">
                                   <SelectValue placeholder="To" />
                               </SelectTrigger>
                               <SelectContent>
                                   <SelectItem value="ewallet">E-Wallet</SelectItem>
                                   <SelectItem value="depositwallet">Deposit Wallet</SelectItem>
                               </SelectContent>
                           </Select>
                       </div>
                       <div className="space-y-2">
                           <Label htmlFor="note">Note</Label>
                           <Textarea id="note" placeholder="Note" />
                       </div>
                       <div className="flex gap-4">
                           <Button variant="outline">Deduct Fund</Button>
                           <Button>Add Amount</Button>
                       </div>
                   </div>
                   <div className="bg-muted/50 rounded-lg flex items-center justify-center p-8">
                      <p className="text-muted-foreground">Form context area</p>
                   </div>
                </CardContent>
            </Card>

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
                            <label className="text-sm font-medium">Payment Type</label>
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Payment Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="credit">Credit</SelectItem>
                                    <SelectItem value="debit">Debit</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Wallet Type</label>
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Wallet Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ewallet">E-Wallet</SelectItem>
                                    <SelectItem value="deposit">Deposit Wallet</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="lg:col-span-5 flex items-end">
                            <Button className="w-full lg:w-auto">Get Report</Button>
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
                                <TableHead>Amount</TableHead>
                                <TableHead>Payment Type</TableHead>
                                <TableHead>Wallet Type</TableHead>
                                <TableHead>Notes</TableHead>
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
