
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DatePicker } from '@/app/agent-dashboard/financial/e-wallet/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, RefreshCw } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';


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


export default function MemberIncomeClientPage({ initialData }: { initialData: any[] }) {

    return (
        <div className="space-y-6">
            <Card>
                 <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        {/* Can be used for title if needed */}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">Total Amount</p>
                            <p className="text-xl font-bold">$0</p>
                        </div>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end mb-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Pick Start Date</label>
                            <DatePicker />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Pick End Date</label>
                            <DatePicker />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Search User</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Search User" />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* Add user options here */}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2 col-span-1 md:col-span-2 lg:col-span-1">
                            <Button className="w-full">
                                <Search className="mr-2 h-4 w-4" /> Search
                            </Button>
                            <Button variant="outline" className="w-full">
                                <RefreshCw className="mr-2 h-4 w-4" /> Reset
                            </Button>
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>User name</TableHead>
                                <TableHead>Bonus Type</TableHead>
                                <TableHead>Credit</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <NoDataAvailable />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                     <div className="mt-6 flex justify-end">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                <PaginationLink href="#" isActive>1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
