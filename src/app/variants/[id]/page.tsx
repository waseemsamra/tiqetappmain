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
        {variant.country} &gt; {variant.city} &gt; {variant.name}
      </div>

      <div className="mb-8 md:hidden overflow-x-auto hide-scrollbar snap-x snap-mandatory relative">
        <div className="flex">
          {allImages.map((src, idx) => (
            <div key={idx} className="shrink-0 snap-start w-full">
              <picture>
                <source media="(min-width: 600px)" srcSet={`${src}?auto=format%2Ccompress&dpr=1&fit=crop&h=420&q=40&w=630 1x, ${src}?auto=format%2Ccompress&dpr=2&fit=crop&h=420&q=30&w=630 2x`} />
                <img
                  src={src}
                  alt={`${variant.name} ${idx + 1}`}
                  className="w-full h-auto bg-grey-200"
                />
              </picture>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 right-0 mb-4 mr-4 rounded px-2 py-1 text-white font-medium text-xs z-10" style={{ backgroundColor: 'rgba(0, 0, 0, .6)' }}>
          {allImages.length > 0 ? `1 / ${allImages.length}` : ''}
        </div>
      </div>

      <div className="hidden md:flex gap-3 mb-8">
        <div className="w-1/2">
          <div className="relative h-[500px] rounded-xl overflow-hidden">
            <img
              src={allImages[0]}
              alt={`${variant.name} main`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-1/2 grid grid-cols-2 gap-1.5">
          {thumbs.map((src, idx) => (
            <div key={idx} className="relative h-[246px] rounded-xl overflow-hidden">
              <img src={src} alt={`${variant.name} ${idx + 2}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-start mb-6">
            <div>
              {variant.rating !== undefined && (
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-lg">{variant.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">
                    ({variant.reviewsTotal?.toLocaleString() || 0} reviews)
                  </span>
                </div>
              )}

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {variant.name}
              </h1>

              {variant.excursionType?.name && (
                <p className="text-lg text-gray-600 max-w-3xl mb-4">
                  {variant.excursionType.name}
                </p>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-500 mb-6">
            Provider: Tiqets International B.V.
          </div>

          <div className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-2">Before you go</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Instant ticket delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Duration: {variant.duration || 'Not specified'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Age: All ages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Live guide: English, German, Spanish</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Smartphone tickets accepted</span>
              </li>
            </ul>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="included">
              <AccordionTrigger>What&apos;s included</AccordionTrigger>
              <AccordionContent>
                {variant.whatsincluded ? (
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {variant.whatsincluded
                      .split(/\r?\n|,\s*/)
                      .map((item) => item.trim())
                      .filter(Boolean)
                      .map((item, idx) => (
                        <li key={idx}>{item.replace(/^\*\s*/, '')}</li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">Not specified</p>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  {variant.description || variant.excursionType?.name || 'No description available.'}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="hours">
              <AccordionTrigger>Opening hours</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  {variant.operatinghours || 'See supplier website for opening hours'}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cancellation">
              <AccordionTrigger>Reschedule and cancellation policy</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  {variant.cancellationpolicy || 'See supplier website for cancellation policy'}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="reviews">
              <AccordionTrigger>Ratings & reviews</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-500">No reviews available yet.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="md:col-span-1">
          <div className="md:sticky md:top-8 bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
            <div className="mb-4">
              <span className="text-sm text-gray-500">Price</span>
              <p className="font-bold text-2xl">${Number(variant.price || 0).toFixed(2)}</p>
            </div>
            <VariantBookingClient productId={variant.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
