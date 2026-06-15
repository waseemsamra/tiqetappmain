import { notFound } from 'next/navigation';
import { fetchTiqetsProductById } from '@/lib/tiqets-api';
import { Star } from 'lucide-react';
import { VariantBookingClient } from './variant-booking-client';
import Image from 'next/image';
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

     const allImages: string[] = Array.isArray(variant.images)
       ? variant.images
       : [];
    const thumbs = allImages.slice(1, 5); // Get next 4 images for thumbnails

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-2">
          {variant.country} &gt; {variant.city} &gt; {variant.name}
        </div>
        
        {/* Hero Section: Responsive Layout */}
        <div className="flex w-full">
            {/* Mobile: Show only large image (full width) */}
            <div className="w-full md:w-1/2">
              {allImages[0] && allImages[0].length > 0 && (
                <div className="relative h-[500px] w-full">
                  <Image
                    src={allImages[0]}
                    alt={variant.name}
                    fill
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
              )}
            </div>
          
           {/* Desktop Only: 2x2 Thumbnail Grid (hidden on mobile) */}
           <div className="hidden md:block w-0 md:w-1/2">
             <div className="grid grid-cols-2 gap-4 h-[500px] w-full">
               {thumbs.map((src, idx) => (
                 <div key={idx} className="relative h-full w-full">
                   {src && src.length > 0 && (
                     <Image
                       src={src}
                       alt={`${variant.name} ${idx + 2}`}
                       fill
                       className="object-cover w-full h-full"
                       unoptimized
                     />
                   )}
                 </div>
               ))}
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-start mb-6">
              <div>
                {variant.rating !== undefined && (
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-bold text-lg">{Number(variant.rating || 0).toFixed(1)}</span>
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
                <p className="font-bold text-2xl">
                  €{Number(variant.price || 0).toFixed(2)}
                </p>
              </div>
               <VariantBookingClient key={variant.id} productId={variant.id} experienceUrl={variant.experience_url} />
            </div>
          </div>
        </div>
      </div>
    );
}
