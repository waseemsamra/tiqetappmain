
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/app/admin/data-table';
import { columns as faqColumns } from './columns';
import { columns as categoryColumns } from './category-columns';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function FaqClientPage({ initialFaqs, initialCategories }: { initialFaqs: any[], initialCategories: any[] }) {
    const [faqRowSelection, setFaqRowSelection] = useState({});
    const [categoryRowSelection, setCategoryRowSelection] = useState({});

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">FAQ's</h1>
                <div className="flex gap-2">
                    <Button asChild>
                        <Link href="#">
                            <Plus className="mr-2 h-4 w-4" />
                            FAQ's
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="#">
                            <Plus className="mr-2 h-4 w-4" />
                            FAQ's Category
                        </Link>
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="faqs">
                <TabsList>
                    <TabsTrigger value="faqs">FAQ's</TabsTrigger>
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                </TabsList>
                <TabsContent value="faqs" className="mt-4">
                     <Card>
                        <CardContent className="pt-6">
                            <DataTable
                                columns={faqColumns}
                                data={initialFaqs}
                                rowSelection={faqRowSelection}
                                setRowSelection={setFaqRowSelection}
                                filterColumn="question"
                                filterPlaceholder="Filter by question..."
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="categories" className="mt-4">
                    <Card>
                        <CardContent className="p-6">
                             <DataTable
                                columns={categoryColumns}
                                data={initialCategories}
                                rowSelection={categoryRowSelection}
                                setRowSelection={setCategoryRowSelection}
                                filterColumn="categoryName"
                                filterPlaceholder="Filter by category name..."
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
