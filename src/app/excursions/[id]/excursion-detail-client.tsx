'use client';

import { useEffect } from 'react';
import type { Excursion } from '@/types';
import { Star } from 'lucide-react';
import { ProductHero } from './product-hero';
import { VariantCard } from './variant-card';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';

type AuthUser = { id: string; email?: string } | null;

export default function ExcursionDetailClient({
  excursion,
  user,
}: {
  excursion: Excursion & { reviewsTotal?: number };
  user: AuthUser | null;
}) {
    const { addRecentlyViewed } = useRecentlyViewed();
    
    useEffect(() => {
        addRecentlyViewed(excursion.id);
    }, [excursion.id, addRecentlyViewed]);

    return (
      <>
        <div className="container mx-auto px-4 py-8">
<div className="text-sm text-muted-foreground mb-2">
             {excursion.country}{excursion.city && ` > ${excursion.city}`} &gt; {excursion.name}
           </div>
          
          <ProductHero 
            images={excursion.images || []}
            title={excursion.name}
            description={(excursion as any).tagline || excursion.excursionType?.name || excursion.description}
            rating={excursion.rating}
            reviews={excursion.reviewsTotal || excursion.reviews?.length}
          />

          <main className="space-y-6 mt-8">
            {excursion.variants && excursion.variants.length > 0 && (
              <section className="mt-8">
                <h2 className="text-xl font-bold mb-4">Available ticket options</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {excursion.variants.map((variant) => (
                    <VariantCard 
                      key={variant.id} 
                      variant={variant} 
                      excursion={excursion}
                    />
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </>
    );
}