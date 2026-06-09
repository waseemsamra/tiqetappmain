import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { fetchTiqetsProductById } from '@/lib/tiqets-api';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const DEFAULT_IMAGES = [
  'https://aws-tiqets-cdn.imgix.net/images/content/b3f321f3770643ada7b10a1ac63ae6dd.jpg?auto=format%2Ccompress&fit=crop&h=600&q=80&w=800',
  'https://aws-tiqets-cdn.imgix.net/images/content/6c8e12edaac6478c8a516e426aeba0e9.jpg?auto=format%2Ccompress&fit=crop&h=300&q=70&w=400',
  'https://aws-tiqets-cdn.imgix.net/images/content/d24a345a9f1d4d2c84f62135273ca6a8.jpg?auto=format%2Ccompress&fit=crop&h=300&q=70&w=400',
  'https://aws-tiqets-cdn.imgix.net/images/content/f0e72dabc8a84d8da75bbfc233e8955a.jpg?auto=format%2Ccompress&fit=crop&h=300&q=70&w=400',
  'https://aws-tiqets-cdn.imgix.net/images/content/0705416b76ea47a0bc402954454c7f26.jpg?auto=format%2Ccompress&fit=crop&h=300&q=70&w=400',
];

export const dynamic = 'force-dynamic';

export default async function VariantDetailPage({ params }: { params: { id: string } }) {
  const variant = await fetchTiqetsProductById(params.id);
  
  if (!variant) {
    notFound();
  }

  const allImages = (variant.images?.length || 0) > 0 ? [...variant.images, ...DEFAULT_IMAGES].slice(0, 5) : DEFAULT_IMAGES;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm text-muted-foreground mb-2">
        {variant.country} &gt; {variant.city} &gt; {variant.name}
      </div>
      
      <div className="flex gap-3 mb-8">
        <div className="w-1/2">
          <div className="relative h-[500px] rounded-xl overflow-hidden">
            <Image
              src={allImages[0]}
              alt={`${variant.name} main`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        <div className="w-1/2 grid grid-cols-2 gap-1.5">
          <div className="relative h-[246px] rounded-xl overflow-hidden">
            <Image src={allImages[1]} alt={`${variant.name} 2`} fill className="object-cover" />
          </div>
          <div className="relative h-[246px] rounded-xl overflow-hidden">
            <Image src={allImages[2]} alt={`${variant.name} 3`} fill className="object-cover" />
          </div>
          <div className="relative h-[246px] rounded-xl overflow-hidden">
            <Image src={allImages[3]} alt={`${variant.name} 4`} fill className="object-cover" />
          </div>
          <div className="relative h-[246px] rounded-xl overflow-hidden">
            <Image src={allImages[4]} alt={`${variant.name} 5`} fill className="object-cover" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="flex items-start mb-6">
            <div>
              {variant.rating !== undefined && (
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-lg">{variant.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({variant.reviewsTotal?.toLocaleString() || 0} reviews)</span>
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

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="included">
              <AccordionTrigger>What's included</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">{variant.whatsincluded || 'Not specified'}</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">{variant.description || variant.excursionType?.name || 'No description available.'}</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="hours">
              <AccordionTrigger>Opening hours</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">{variant.operatinghours || 'See supplier website for opening hours'}</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cancellation">
              <AccordionTrigger>Reschedule and cancellation policy</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">{variant.cancellationpolicy || 'See supplier website for cancellation policy'}</p>
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
        
<div className="col-span-1">
           <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 sticky top-8">
             <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
             <div className="mb-4">
               <span className="text-sm text-gray-500">Price</span>
               <p className="font-bold text-2xl">${Number(variant.price || 0).toFixed(2)}</p>
             </div>
             <div
               id="tiqets-booking-container-variant"
               data-tiqets-widget="booking"
               data-product-id={variant.id}
               data-trigger-selector="#cta_button_variant"
             />
             <button
               id="cta_button_variant"
               type="button"
               className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
             >
               Book Now
             </button>
           </div>
         </div>
      </div>
    </div>
  );
}
