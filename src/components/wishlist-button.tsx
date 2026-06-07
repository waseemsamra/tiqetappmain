
'use client';

import { Heart } from 'lucide-react';
import { Button } from './ui/button';

export function WishlistButton({ activityId, isInitialWishlisted }: { activityId: string, isInitialWishlisted?: boolean }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
      disabled={true}
      aria-label="Wishlist (not available)"
    >
      <Heart className="h-4 w-4 text-white" />
    </Button>
  );
}
