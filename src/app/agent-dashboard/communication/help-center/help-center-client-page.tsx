
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    LayoutGrid,
    AlertCircle,
    FolderOpen,
    CheckCircle,
    XCircle,
    Clock,
    MessageSquare,
    Book,
    Tag,
    Archive,
    Star,
    PlusCircle,
    Search
} from 'lucide-react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/app/admin/data-table';
import { columns } from './columns';

const NavItem = ({ icon: Icon, label, href = "#" }: { icon: React.ElementType, label: string, href?: string }) => (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors">
        <Icon className="h-5 w-5" />
        <span>{label}</span>
    </Link>
);


export default function HelpCenterClientPage({ initialTickets }: { initialTickets: any[] }) {
    const [rowSelection, setRowSelection] = React.useState({});

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="md:col-span-1 space-y-6">
                <Button className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Ticket
                </Button>
                 <nav className="space-y-1">
                    <NavItem icon={LayoutGrid} label="Tickets Dashboard" />
                    <NavItem icon={Book} label="All tickets" />
                    <NavItem icon={AlertCircle} label="Overdue" />
                    <NavItem icon={FolderOpen} label="Open" />
                    <NavItem icon={CheckCircle} label="Resolved" />
                    <NavItem icon={XCircle} label="Closed" />
                    <NavItem icon={Clock} label="In Progress" />
                    <NavItem icon={MessageSquare} label="Responded" />
                    <NavItem icon={Book} label="Departments" />
                    <NavItem icon={Tag} label="Categories" />
                    <NavItem icon={Archive} label="Canned Response" />
                    <NavItem icon={Star} label="Priorities" />
                </nav>
            </aside>
            <main className="md:col-span-3">
                <Card>
                    <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <Select><SelectTrigger><SelectValue placeholder="Departments" /></SelectTrigger><SelectContent></SelectContent></Select>
                            <Select><SelectTrigger><SelectValue placeholder="Priority" /></SelectTrigger><SelectContent></SelectContent></Select>
                            <Select><SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger><SelectContent></SelectContent></Select>
                            <Select><SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger><SelectContent></SelectContent></Select>
                            <Input placeholder="Ticket Id" />
                            <Select><SelectTrigger><SelectValue placeholder="Search User" /></SelectTrigger><SelectContent></SelectContent></Select>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="overdue" />
                                <label htmlFor="overdue" className="text-sm font-medium leading-none">Show Only Overdue Items</label>
                            </div>
                            <Button className="col-start-1 lg:col-start-auto">Get Report</Button>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="mt-6">
                    <CardContent className="pt-6">
                        <h3 className="text-xl font-semibold mb-4">Open Tickets</h3>
                         <DataTable
                            columns={columns}
                            data={initialTickets}
                            rowSelection={rowSelection}
                            setRowSelection={setRowSelection}
                            filterColumn="subject"
                            filterPlaceholder="Filter tickets..."
                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
