
'use client';

import { useState, useEffect, useCallback } from 'react';

const RECENTLY_VIEWED_KEY = 'recentlyViewedExcursions';
const MAX_RECENTLY_VIEWED = 10;

export const useRecentlyViewed = () => {
    const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);

    useEffect(() => {
        // This effect runs only on the client side, after the initial render.
        // This prevents hydration errors.
        try {
            const item = window.localStorage.getItem(RECENTLY_VIEWED_KEY);
            setRecentlyViewedIds(item ? JSON.parse(item) : []);
        } catch (error) {
            console.error('Error reading from localStorage', error);
            setRecentlyViewedIds([]);
        }
    }, []);

    const addRecentlyViewed = useCallback((excursionId: string) => {
        // This function should only be called on the client.
        if (typeof window === 'undefined') return;

        // Use a functional update to get the latest state
        setRecentlyViewedIds(prevIds => {
            try {
                // Remove the id if it already exists to move it to the front
                const updatedIds = prevIds.filter(id => id !== excursionId);
                
                // Add the new id to the beginning of the array
                updatedIds.unshift(excursionId);

                // Limit the number of recently viewed items
                const newIds = updatedIds.slice(0, MAX_RECENTLY_VIEWED);
                
                window.localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(newIds));
                return newIds;
            } catch (error) {
                console.error('Error writing to localStorage', error);
                return prevIds; // Return previous state on error
            }
        });
    }, []);

    return { recentlyViewedIds, addRecentlyViewed };
};
