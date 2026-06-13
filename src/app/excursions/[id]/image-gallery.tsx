'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { GalleryHorizontal } from 'lucide-react';


export const ImageGallery = ({ images }: { images: string[] }) => {
     if (!images || images.length === 0 || !images[0] || images[0].length === 0) {
         images = ['https://placehold.co/800x600.png?text=Image+Not+Available'];
     }

     const mainImage = images[0];
    const gridImages = images.slice(1, 5);

    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[50vh] max-h-[500px]">
          {/* Main Image */}
          <div className="relative md:col-span-1 h-full">
            <Image
              src={mainImage}
              alt="Main excursion image"
              fill
              className="object-cover rounded-l-md"
              priority
            />
          </div>
          {/* Small Images Grid */}
          <div className="hidden md:grid md:grid-cols-2 md:grid-rows-2 gap-2 h-full">
            {gridImages.map((img, index) => (
              <div key={index} className="relative h-full w-full">
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className={cn(
                    "object-cover",
                    index === 1 && "rounded-tr-md",
                    index === 3 && "rounded-br-md"
                  )}
                />
                {index === 3 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-br-md">
                      <Button variant="secondary">
                          <GalleryHorizontal className="mr-2 h-4 w-4" />
                          Show all photos
                      </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};
