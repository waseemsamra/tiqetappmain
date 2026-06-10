
'use client';

import { useState, useTransition, useEffect } from 'react';
import type { Excursion } from '@/types';

import { findNearbyExcursionsAction } from './actions';
import { Button } from '../ui/button';
import { Loader2, MapPin } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import AttractionListingSection from '@/app/attraction-listing';
import { getWishlistIdsAction } from '@/app/actions';

export const NearbyAttractionsSection = ({ user }: { user?: any;}) => {
    const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [isPending, startTransition] = useTransition();
    const [nearbyExcursions, setNearbyExcursions] = useState<Excursion[]>([]);
    const [locationName, setLocationName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [wishlistIds, setWishlistIds] = useState(new Set<string>());

    useEffect(() => {
        if (user) {
            getWishlistIdsAction().then(ids => setWishlistIds(new Set(ids)));
        }
    }, [user]);

    const handleFindNearby = () => {
        setErrorMsg('');
        setState('loading');
        
        if (navigator.geolocation) {
            startTransition(() => {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        const result = await findNearbyExcursionsAction(latitude, longitude);
                        if (result.success && result.excursions && result.excursions.length > 0) {
                            setNearbyExcursions(result.excursions);
                            setLocationName(result.locationName || 'your area');
                            setState('success');
                        } else {
                            setErrorMsg(result.error || "No activities found near you.");
                            setState('error');
                        }
                    },
                    (error) => {
                        console.error("Geolocation error:", error);
                        setErrorMsg("Could not access your location. Please enable location services in your browser settings.");
                        setState('error');
                    }
                );
            });
        } else {
            setErrorMsg("Geolocation is not supported by your browser.");
            setState('error');
        }
    };

    if (state === 'idle') {
         return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center bg-muted/50 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold">Find Adventures Nearby</h2>
                    <p className="text-muted-foreground mt-2 mb-4">Let us use your location to find the best experiences right around the corner.</p>
                    <Button onClick={handleFindNearby}>
                        <MapPin className="mr-2 h-4 w-4" />
                        Find Adventures Nearby
                    </Button>
                </div>
            </div>
        );
    }
    
    if (state === 'loading' || isPending) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                 <Skeleton className="h-8 w-1/3 mb-8" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

    if (state === 'success' && nearbyExcursions.length > 0) {
        return (
            <AttractionListingSection
                title={`Top Activities Near ${locationName}`}
                excursions={nearbyExcursions}
                user={user}
                wishlistIds={wishlistIds}
                showTabs={false}
                showViewAllButton={false}
            />
        );
    }
    
    if (state === 'error' && errorMsg) {
         return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center bg-destructive/10 border border-destructive/20 p-8 rounded-lg">
                    <h2 className="text-xl font-semibold text-destructive">Could Not Find Nearby Attractions</h2>
                    <p className="text-destructive/80 mt-2">{errorMsg}</p>
                </div>
            </div>
         )
    }

    return null;
};
