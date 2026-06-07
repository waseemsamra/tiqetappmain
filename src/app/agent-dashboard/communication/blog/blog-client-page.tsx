'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/app/agent-dashboard/financial/e-wallet/date-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/app/admin/data-table';
import { columns } from './columns';
import { Plus, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export default function BlogClientPage({ initialBlogs }: { initialBlogs: any[] }) {
    const [rowSelection, setRowSelection] = useState({});

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
                <div className="flex gap-2">
                    <Button asChild>
                        <Link href="#">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Post
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="#">
                            <LayoutGrid className="mr-2 h-4 w-4" />
                            Categories
                        </Link>
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input placeholder="Title" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Pick Start Date</label>
                            <DatePicker />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Pick End Date</label>
                            <DatePicker />
                        </div>
                        <Button>Get Report</Button>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="published">
                <TabsList>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                </TabsList>
                <TabsContent value="published" className="mt-4">
                     <Card>
                        <CardContent className="pt-6">
                            <DataTable
                                columns={columns}
                                data={initialBlogs}
                                rowSelection={rowSelection}
                                setRowSelection={setRowSelection}
                                filterColumn="title"
                                filterPlaceholder="Filter by blog title..."
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="drafts" className="mt-4">
                    <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                            No draft posts found.
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
