
'use client';

import Image from 'next/image';
import type { HeroContent } from '@/types';
import { HeroSearchWidget } from '@/components/hero-search-widget';

export default function HeroSection({ content }: { content: HeroContent | null }) {

  if (!content) {
    return (
        <div className="relative min-h-[60vh] flex items-center justify-center bg-gray-200">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <div className="relative flex items-start pb-10 md:pb-14">
      <div className="absolute inset-0">
        {(content.backgroundImage && content.backgroundImage.length > 0) && (
          <Image
            src={content.backgroundImage}
            alt={content.headline}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* z-20 outranks the z-index controls in the sections that follow, so the
          search dropdown paints over them rather than under them. */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-left mb-6">
            {content.headline}
          </h1>
          <p className="hidden md:block text-xl text-white text-left max-w-2xl mb-10 opacity-95">
            {content.subheading}
          </p>

          <HeroSearchWidget />
          
        </div>
      </div>
    </div>
  );
};
