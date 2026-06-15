'use client';

import { useMemo } from 'react';
import type { ExcursionVariant } from '@/types';
import { Button } from '@/components/ui/button';

interface ProductOptionsProps {
  variants: ExcursionVariant[];
  productId?: string;
  experienceUrl?: string;
}

export const ProductOptions = ({ variants, productId, experienceUrl }: ProductOptionsProps) => {
  const firstAvailable = useMemo(() => variants.find(v => Number(v.price || 0) > 0) || null, [variants]);
  const [selectedVariant, setSelectedVariant] = useState<ExcursionVariant | null>(firstAvailable);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <Button
            key={variant.id}
            variant={selectedVariant?.id === variant.id ? 'default' : 'outline'}
            onClick={() => setSelectedVariant(variant)}
          >
            {Number(variant.price || 0) > 0 ? `€${Number(variant.price || 0).toFixed(2)}` : 'Select'}
          </Button>
        ))}
      </div>
      <Button className="w-full" disabled={!selectedVariant || Number(selectedVariant.price || 0) === 0}>
        {selectedVariant && Number(selectedVariant.price || 0) > 0 ? `Reserve - €${Number(selectedVariant.price || 0).toFixed(2)}` : 'Reserve'}
      </Button>
    </div>
  );
};
