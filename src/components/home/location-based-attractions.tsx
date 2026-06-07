
'use client';

import { useState, useTransition, useEffect } from 'react';
import type { Excursion } from '@/types';
import { findNearbyExcursionsAction } from './actions';
import { Button } from '../ui/button';
import { Loader2, MapPin } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import AttractionListingSection from '../attraction-listing';
import { getWishlistIdsAction, searchExcursionsAction } from '@/app/actions';

type User = { id: string; email?: string } | null;

export const LocationBasedAttractions = ({ user }: { user: User}) => {
    const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [isPending, startTransition] = useTransition();
    const [excursions, setExcursions] = useState<Excursion[]>([]);
    const [locationName, setLocationName] = useState('UAE');
    const [errorMsg, setErrorMsg] = useState('');
    const [wishlistIds, setWishlistIds] = useState(new Set<string>());

    useEffect(() => {
        // Fetch wishlist IDs if the user is logged in
        if (user) {
            getWishlistIdsAction().then(ids => setWishlistIds(new Set(ids)));
        }
    }, [user]);

    useEffect(() => {
        // Automatically load UAE excursions on initial render
        const fetchUAEExcursions = async () => {
            setState('loading');
            startTransition(async () => {
                const uaeExcursions = await searchExcursionsAction({ country: 'United Arab Emirates' });
                if (uaeExcursions && uaeExcursions.length > 0) {
                    setExcursions(uaeExcursions);
                    setLocationName('UAE');
                    setState('success');
                } else {
                    setErrorMsg("Could not load excursions for UAE.");
                    setState('error');
                }
            });
        };
        fetchUAEExcursions();
    }, []); // Empty dependency array ensures this runs only once

    if (state === 'idle' || (isPending && state === 'loading')) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                 <Skeleton className="h-8 w-1/3 mb-8" />
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-4">
                           <Skeleton className="h-48 w-full" />
                           <Skeleton className="h-4 w-3/4" />
                           <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (state === 'error' && errorMsg) {
         return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center bg-destructive/10 border border-destructive/20 p-8 rounded-lg">
                    <h2 className="text-xl font-semibold text-destructive">Could Not Load Experiences</h2>
                    <p className="text-destructive/80 mt-2">{errorMsg}</p>
                </div>
            </div>
         )
    }

    if (state === 'success' && excursions.length > 0) {
        return (
            <AttractionListingSection
                title={`Top Experiences in ${locationName}`}
                excursions={excursions}
                user={user}
                wishlistIds={wishlistIds}
                showTabs={true}
                tabType="city"
                layout="carousel"
                showViewAllButton={true}
            />
        );
    }
    
    // Fallback in case there are no excursions to show
    return null;
};
