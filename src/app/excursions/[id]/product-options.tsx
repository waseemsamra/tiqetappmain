'use client';

import { useState, useMemo } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Check, Clock } from 'lucide-react';
import type { Excursion, ExcursionVariant } from '@/types';

interface ProductOptionsProps {
  excursion: Excursion;
  onVariantChange?: (variant: ExcursionVariant | null) => void;
}

const defaultVariants = (excursion: Excursion): ExcursionVariant[] => {
  let variants = excursion.variants || [];
  if (variants.length === 0) {
    variants = [
      {
        id: 'default',
        name: 'Standard Ticket',
        price: excursion.price,
        duration: excursion.duration,
        description: excursion.description,
        images: excursion.images,
        status: 'available',
        whatsincluded: '',
        whatsnotincluded: '',
      } as ExcursionVariant,
    ];
  }
  return variants;
};

export const ProductOptions = ({ excursion, user, isInitialWishlisted }: { excursion: Excursion, user: User | null, isInitialWishlisted?: boolean, onVariantChange?: (variant: ExcursionVariant | null) => void }) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const variants = useMemo(() => defaultVariants(excursion), [excursion]);
  const selectedVariant = variants.find(v => v.id === selectedVariantId) ?? null;

  const handleVariantChange = (variantId: string | null) => {
    setSelectedVariantId(variantId);
    onVariantChange?.(variantId ? variants.find(v => v.id === variantId) ?? null : null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <H2 className="text-2xl font-bold text-gray-900">Select Your Ticket</H2>
          {selectedVariant && (
            <div className="text-sm text-muted-foreground">
              Selected: {selectedVariant.name}
            </div>
          )}
        </div>
        
        <RadioGroup 
          value={selectedVariantId} 
          onValueChange={handleVariantChange}
          row={false}
        >
          {variants.map((variant) => (
            <RadioGroupItem key={variant.id} value={variant.id}>
              <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-gray-900">{variant.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{variant.city}</span>
                    {variant.duration !== 'Not specified' && (
                      <span className="text-xs text-gray-600">{variant.duration}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">{variant.description}</p>
                  {variant.whatsincluded && (
                    <div className="space-y-2">
                      <span className="font-medium text-gray-900">Includes:</span>
                      <p className="text-sm text-gray-600 line-clamp-3">{variant.whatsincluded}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{variant.city}</span>
                    <span className="text-sm text-gray-600">{variant.duration !== 'Not specified' ? variant.duration : 'Not specified'}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    {variant.price > 0 ? (
                      <>
                        <span className="text-xs text-gray-500">From</span>
                        <span className="font-bold text-lg text-gray-900">
                          {variant.currency === "EUR" ? "â¬" : variant.currency === "USD" ? "$" : variant.currency === "GBP" ? "£" : variant.currency}
                          {Number(variant.price).toFixed(2)}
                        </>
                      >
                    ) : (
                      <span className="text-xs text-italic text-gray-500">Price on request</span>
                    )}
                  </div>
                </CardFooter>
              </Card>
            )
          ))}
        </RadioGroup>
      </div>
      
      {selectedVariant && (
        <div className="mt-6">
          <Button 
            onClick={() => {
              // TODO: Implement booking logic
            }}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded"
          >
            Continue to Booking
          </Button>
        </div>
      )}
    </div>
  );
};
