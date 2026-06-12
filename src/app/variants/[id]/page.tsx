import { notFound } from 'next/navigation';
import { fetchTiqetsProductById } from '@/lib/tiqets-api';
import { Star } from 'lucide-react';
import { VariantBookingClient } from './variant-booking-client';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export const dynamic = 'force-dynamic';

export default async function VariantDetailPage({ params }: { params: { id: string } }) {
  const variant = await fetchTiqetsProductById(params.id);

  if (!variant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-2">Booking</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">This option is currently unavailable</h1>
        <p className="text-gray-600">Please go back and choose another ticket option.</p>
      </div>
    );
  }

  const allImages = Array.isArray(variant.images)
    ? variant.images
    : ['https://placehold.co/800x600.png'];
  const thumbs = allImages.slice(1, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm text-muted-foreground mb-2">
        </div>
      </p>
      
      <div className="mb-8 md:hidden overflow-x-auto hide-scrollbar snap-x snap-mandatory relative">
        <div className="flex">
          {allImages.map((src, idx) => (
            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-2" key={idx}>
              <Image
                src={src}
                alt={variant.name}
                fill
                className="object-cover w-full h-full rounded-lg"
                priority={idx === 0}
              >
                {idx === 0 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none">
                    <div className="absolute bottom-4 left-4 text-sm font-medium text-white">
                      {variant.name}
                    </div>
                  </div>
                )}
              </Image>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-1">
        <div className="md:sticky md:top-8 bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
          <div className="mb-4">
            <span className="text-sm text-gray-500">Price</span>
            <p className="font-bold text-2xl">
              {variant.currency === "EUR" ? "â¬" : variant.currency === "USD" ? "$" : variant.currency === "GBP" ? "£" : variant.currency}
              {Number(variant.price || 0).toFixed(2)}
            </p>
          </div>
          <VariantBookingClient productId={variant.id} />
        </div>
      </div>
    </div>
  );
};
