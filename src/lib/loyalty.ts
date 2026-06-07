

import { Award, Shield, Gem } from 'lucide-react';

// This structure is now for internal use within this file.
const loyaltyTiers = [
  { name: 'Explorer', minPoints: 0, nextTierPoints: 100 },
  { name: 'Adventurer', minPoints: 100, nextTierPoints: 500 },
  { name: 'Globetrotter', minPoints: 500, nextTierPoints: Infinity },
];

// The return type no longer includes the Icon component
export const getLoyaltyTier = (points: number): { name: string; progress: number; pointsToNext: number } => {
    let currentTier = loyaltyTiers[0];
    for (let i = loyaltyTiers.length - 1; i >= 0; i--) {
        if (points >= loyaltyTiers[i].minPoints) {
            currentTier = loyaltyTiers[i];
            break;
        }
    }
    
    const progress = currentTier.nextTierPoints === Infinity 
        ? 100 
        : Math.max(0, Math.min(100, (points / currentTier.nextTierPoints) * 100));

    const pointsToNext = currentTier.nextTierPoints !== Infinity 
        ? currentTier.nextTierPoints - points 
        : 0;

    return { 
        name: currentTier.name,
        progress, 
        pointsToNext 
    };
};
