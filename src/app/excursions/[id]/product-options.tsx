'use client';

import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Excursion, ExcursionVariant } from '@/types';
import { Clock, Check } from 'lucide-react';

interface ProductOptionsProps {
  excursion: Excursion;
  onVariantChange?: (variant: ExcursionVariant | null) => void;
}

const defaultVariants = (excursion: Excursion): ExcursionVariant[] => {
  if (excursion.variants && excursion.variants.length > 0) {
    return excursion.variants;
  }
  return [
    {
      id: 'default',
      name: 'Standard Ticket',
      price: excursion.price,
      duration: excursion.duration,
      description: 'Entry ticket with standard access'
    }
  ];
};

export const ProductOptions = ({ excursion, onVariantChange }: ProductOptionsProps) => {
  const variants = defaultVariants(excursion);
  const [selectedVariant, setSelectedVariant] = useState<ExcursionVariant>(variants[0]);

  const handleVariantChange = (variantId: string) => {
    const variant = variants.find(v => v.id === variantId);
    if (variant) {
      setSelectedVariant(variant);
      onVariantChange?.(variant);
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Select your tickets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup
          value={selectedVariant.id}
          onValueChange={handleVariantChange}
          className="space-y-3"
        >
          {variants.map((variant) => (
            <div key={variant.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors">
              <RadioGroupItem value={variant.id} id={variant.id} className="mt-1" />
              <Label htmlFor={variant.id} className="flex-1 cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{variant.name}</p>
                    {variant.duration && (
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{variant.duration}</span>
                      </div>
                    )}
                    {variant.description && (
                      <p className="text-sm text-muted-foreground mt-1">{variant.description}</p>
                    )}
                  </div>
                  <p className="font-bold text-lg text-primary">${variant.price.toFixed(2)}</p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
        {selectedVariant && (
          <div className="pt-3 border-t">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Check className="h-4 w-4" />
              <span>Instant confirmation</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};