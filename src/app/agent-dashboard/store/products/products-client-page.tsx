
'use client';

import { useState, useMemo } from 'react';
import type { Excursion } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { List, LayoutGrid, PlusCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { ExcursionCard } from '@/components/excursion-search/excursion-card';
import { ExcursionListCard } from '@/components/excursion-search/excursion-list-card';
import { ActionsMenu } from './actions-menu';

export default function ProductsClientPage({ initialExcursions }: { initialExcursions: Excursion[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');

    const filteredExcursions = useMemo(() => {
        if (!searchTerm) {
            return initialExcursions;
        }
        return initialExcursions.filter(ex =>
            ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ex.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ex.country.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [initialExcursions, searchTerm]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                    <p className="text-muted-foreground mt-1">Manage all your excursion listings.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Product
                    </Link>
                </Button>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        className="pl-10 h-11"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant={layout === 'grid' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setLayout('grid')}
                        aria-label="Grid view"
                    >
                        <LayoutGrid className="h-5 w-5" />
                    </Button>
                    <Button
                        variant={layout === 'list' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setLayout('list')}
                        aria-label="List view"
                    >
                        <List className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {filteredExcursions.length > 0 ? (
                layout === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredExcursions.map(excursion => (
                            <ExcursionCard
                                key={excursion.id}
                                excursion={excursion}
                                wishlistButton={<ActionsMenu excursion={excursion} />}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredExcursions.map(excursion => (
                            <ExcursionListCard
                                key={excursion.id}
                                excursion={excursion}
                                wishlistButton={<ActionsMenu excursion={excursion} />}
                            />
                        ))}
                    </div>
                )
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <h3 className="text-xl font-semibold">No products found</h3>
                    <p className="text-muted-foreground mt-2">
                        {searchTerm ? "Try adjusting your search." : "Click 'Add Product' to create your first listing."}
                    </p>
                </div>
            )}
        </div>
    );
}
