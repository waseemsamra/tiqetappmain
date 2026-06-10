'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Excursion, ExcursionVariant } from '@/types';
import { Star, Check, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface VariantCardProps {
  variant: ExcursionVariant;
  excursion: Excursion;
}

const StarRating = ({ rating }: { rating: number | undefined }) => (
  <div className="flex items-center gap-1">
    <Star className="h-4 w-4 text-yellow-400 fill-current" />
    <span className="text-sm font-bold text-gray-800">{Number(rating || 0).toFixed(1)}</span>
  </div>
);

export const VariantCard = ({ variant, excursion }: VariantCardProps) => {
  const fallbackImage = (excursion.images && excursion.images[0]) || 'https://placehold.co/400x300.png';
  const title =
    (typeof variant.name === 'string' && variant.name.trim()) ||
    (typeof (variant as any).label === 'string' && (variant as any).label.trim()) ||
    excursion.name;
  const price = typeof variant.price === 'number' ? variant.price : Number((excursion as any).price || 0);
  const [openIncluded, setOpenIncluded] = useState(false);

  const inclusions = useMemo(() => {
    const raw = (variant as any).whatsincluded || excursion.whatsincluded;
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
  }, [variant, excursion]);

  const durationText = variant.duration || excursion.duration || 'Not specified';

  return (
    <>
      <Link
        href={`/variants/${variant.id}`}
        className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col group h-full bg-white relative border border-gray-200/80"
      >
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={fallbackImage}
            alt={title}
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="attraction"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{excursion.city}</p>
          <h3 className="text-base font-bold text-gray-900 mt-1 group-hover:text-primary transition-colors line-clamp-2">{title}</h3>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-700">
            <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
              <Check className="h-3.5 w-3.5" />
              Available today
            </span>
            <span className="inline-flex items-center gap-1 text-gray-700">
              <Clock className="h-3.5 w-3.5" />
              {durationText}
            </span>
          </div>

          <div className="mt-3">
            <Button
              type="button"
              variant="ghost"
              className="px-0 h-auto text-xs font-semibold text-primary hover:underline"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setOpenIncluded(true);
              }}
            >
              Show what&apos;s included
            </Button>
          </div>

          <div className="flex items-center justify-between mt-auto pt-4">
            <StarRating rating={excursion.rating} />
              <div className="text-right">
                {price > 0 ? (
                  <>
                    <span className="text-xs text-gray-500">From</span>
                    <p className="font-bold text-lg text-gray-900">${price.toFixed(2)}</p>
                  </>
                ) : (
                  <p className="font-bold text-lg text-red-600">Unavailable</p>
                )}
              </div>
          </div>
        </div>
      </Link>

      <Dialog open={openIncluded} onOpenChange={setOpenIncluded}>
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
        </DialogContent>
      </Dialog>
    </>
  );
};