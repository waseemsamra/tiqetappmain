'use client';

import { useState, useMemo } from 'react';
import type { Package } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { List, LayoutGrid, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { PackageListItem } from './package-list-item';
import { PackageGridItem } from './package-grid-item';

export default function PackagesClientPage({ initialPackages }: { initialPackages: Package[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [layout, setLayout] = useState<'grid' | 'list'>('list');

    const filteredPackages = useMemo(() => {
        if (!searchTerm) {
            return initialPackages;
        }
        return initialPackages.filter(pkg =>
            pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pkg.tier.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [initialPackages, searchTerm]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                 <div className="relative flex-grow w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search packages..."
                        className="pl-10 h-11"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="flex items-center gap-2">
                        <Button
                            variant={layout === 'list' ? 'default' : 'outline'}
                            size="icon"
                            onClick={() => setLayout('list')}
                            aria-label="List view"
                        >
                            <List className="h-5 w-5" />
                        </Button>
                        <Button
                            variant={layout === 'grid' ? 'default' : 'outline'}
                            size="icon"
                            onClick={() => setLayout('grid')}
                            aria-label="Grid view"
                        >
                            <LayoutGrid className="h-5 w-5" />
                        </Button>
                    </div>
                     <Button asChild className="w-full md:w-auto">
                        <Link href="#">
                            <Plus className="mr-2 h-4 w-4" />
                            Add
                        </Link>
                    </Button>
                </div>
            </div>

            {filteredPackages.length > 0 ? (
                layout === 'list' ? (
                    <div className="space-y-4">
                        {filteredPackages.map(pkg => (
                            <PackageListItem
                                key={pkg.id}
                                packageItem={pkg}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredPackages.map(pkg => (
                            <PackageGridItem
                                key={pkg.id}
                                packageItem={pkg}
                            />
                        ))}
                    </div>
                )
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <h3 className="text-xl font-semibold">No packages found</h3>
                    <p className="text-muted-foreground mt-2">
                        {searchTerm ? "Try adjusting your search." : "Click 'Add' to create your first package."}
                    </p>
                </div>
            )}
        </div>
    );
}
