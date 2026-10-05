'use client';

import Image from 'next/image';
import type { HeroContent } from '@/types';
import { HeroSearchWidget } from '@/components/hero-search-widget';

/**
 * Hero, matching the main-screen mockup: a full-width
 * banner with the headline and subheading centred at
 * the top of the background image, and the search
 * widget overlapping the banner's bottom edge.
 *
 * The banner image comes from the CMS (content
 * .backgroundImage), not a stock URL, so every
 * market can serve its own hero art.
 */
export default function HeroSection({ content }: { content: HeroContent | null }) {
  if (!content) {
    return (
      <div className="relative flex h-[360px] w-full items-center justify-center bg-slate-200 max-lg:h-[320px] max-sm:h-[260px]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {/* Banner */}
      <section className="relative h-[360px] w-full overflow-hidden max-lg:h-[320px] max-sm:h-[260px]">
        {content.backgroundImage && content.backgroundImage.length > 0 && (
          <Image
            src={content.backgroundImage}
            alt={content.headline}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        )}
        <h1 className="absolute left-1/2 top-[22px] z-[3] -translate-x-1/2 whitespace-nowrap text-center text-[33.9px] font-extrabold tracking-[-0.4px] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.25)] max-lg:top-5 max-lg:text-[26.6px] max-sm:top-4 max-sm:text-[21.8px]">
          {content.headline}
        </h1>
        <p className="absolute left-1/2 top-[58px] z-[3] -translate-x-1/2 whitespace-nowrap text-center text-[15px] leading-snug text-white/95 [text-shadow:0_1px_8px_rgba(0,0,0,0.3)] max-lg:top-[52px] max-lg:max-w-[600px] max-lg:whitespace-normal max-lg:px-5 max-lg:text-[13px] max-sm:top-11 max-sm:max-w-[320px] max-sm:text-xs">
          {content.subheading}
        </p>
      </section>

      {/* Search wrapper — overlaps the banner bottom, as wide as the page sections */}
      <div className="relative z-10 mx-auto -mt-[200px] flex w-full max-w-7xl flex-col items-center px-4 pb-20 sm:px-6 lg:px-8 max-lg:-mt-[180px] max-lg:pb-[60px] max-sm:-mt-[160px]">
        <HeroSearchWidget />
      </div>
    </>
  );
}
