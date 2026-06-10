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
        description: 'Entry ticket with standard access',
        images: excursion.images,
      }
    ];
  }
  return variants.filter((v) => {
    if (typeof v.status === 'boolean') return v.status;
    if (typeof v.status === 'string') return v.status !== 'inactive' && v.status !== 'sold_out' && v.status !== 'unavailable';
    return true;
  });
};

export const ProductOptions = ({ excursion, onVariantChange }: ProductOptionsProps) => {
  const variants = defaultVariants(excursion);
  const [selectedVariant, setSelectedVariant] = useState<ExcursionVariant>(variants[0]);
  const [showIncludedDialog, setShowIncludedDialog] = useState(false);

  const handleVariantChange = (variantId: string) => {
    const variant = variants.find(v => v.id === variantId);
    if (variant) {
      setSelectedVariant(variant);
      onVariantChange?.(variant);
    }
  };

  const inclusions = useMemo(() => {
    const raw = (selectedVariant as any).whatsincluded || excursion.whatsincluded;
    if (typeof raw === 'string') {
      if (!raw.trim()) {
        return [
          '2-hour luxury cruise',
          'Welcome drinks',
          'International and Asian buffet dinner',
          'Live entertainment',
        ];
      }
      return raw.split(',').map((s: string) => s.trim()).filter(Boolean);
    }
    if (Array.isArray(raw) && raw.length > 0) {
      return raw as string[];
    }
    return [
      '2-hour luxury cruise',
      'Welcome drinks',
      'International and Asian buffet dinner',
      'Live entertainment',
    ];
  }, [selectedVariant, excursion]);

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-4 pt-6">
        <CardTitle className="text-lg font-semibold text-gray-900">
          {excursion.name}
        </CardTitle>
        <div className="flex items-center gap-4 mt-2 text-sm">
          <span className="flex items-center gap-1.5 text-green-600 font-medium">
            <Check className="h-4 w-4" />
            Available today
          </span>
          {selectedVariant && (
            <span className="flex items-center gap-1.5 text-gray-600">
              <Clock className="h-4 w-4" />
              Duration: {selectedVariant.duration || excursion.duration || 'Not specified'}
            </span>
          )}
        </div>
        <div className="mt-3 border-t pt-3">
          <Button
            type="button"
            variant="ghost"
            className="px-0 h-auto text-sm font-semibold text-primary hover:underline"
            onClick={() => setShowIncludedDialog(true)}
          >
            Show what&apos;s included
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <RadioGroup
          value={selectedVariant.id}
          onValueChange={handleVariantChange}
          className="space-y-3"
        >
          {variants.map((variant) => {
            const rawName = (variant as any).name || (variant as any).label || 'Ticket option';
            const variantName = rawName.replace(/^.*? - /, '');
            const ageMatch = variant.description?.match(/Age:\s*([\d\s\-\+]+\.?\s*[\w\s]*)/i);
            const ageRange = ageMatch ? ageMatch[1] : '';
            const showPrice = variant.variant_type_raw !== 'infant' && variant.variant_type_raw !== 'addon';

            return (
              <div key={variant.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                <RadioGroupItem value={variant.id} id={variant.id} className="mt-1" />
                <Label htmlFor={variant.id} className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {variantName}
                        {ageRange && <span className="text-gray-500 font-normal ml-1">({ageRange})</span>}
                      </p>
                      {variant.description && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{variant.description}</p>
                      )}
                    </div>
                    {showPrice && (
                      <div className="text-right shrink-0">
                        <span className="text-xs text-gray-500">From</span>
                        <p className="font-bold text-lg text-primary">
                          {variant.price > 0 ? `$${variant.price.toFixed(2)}` : 'Select'}
                        </p>
                      </div>
                    )}
                    {!showPrice && (
                      <span className="text-xs text-gray-400 mt-1">Free</span>
                    )}
                  </div>
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        {selectedVariant && (
          <div className="pt-4 border-t">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 text-base">
              {selectedVariant.price > 0 ? `Reserve - $${selectedVariant.price.toFixed(2)}` : 'Reserve'}
            </Button>
          </div>
        )}
      </CardContent>

      <Dialog open={showIncludedDialog} onOpenChange={setShowIncludedDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>What&apos;s included?</DialogTitle>
            <DialogDescription>
              This option includes the following — conditions may apply to some items.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {inclusions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowIncludedDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
