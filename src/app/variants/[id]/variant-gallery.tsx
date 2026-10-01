'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react';

const DESKTOP_SLOTS = [
  'md:col-start-2 md:row-start-1',
  'md:col-start-3 md:row-start-1',
  'md:col-start-2 md:row-start-2',
  'md:col-start-3 md:row-start-2',
];

export function VariantGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (delta: number) =>
      setActive((current) =>
        current === null ? current : (current + delta + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, close, step]);

  if (images.length === 0) return null;

  const desktopThumbs = images.slice(1, DESKTOP_SLOTS.length + 1);
  const mobileThumb = images[1];

  return (
    <>
      <div className="relative grid grid-cols-1 gap-1 overflow-hidden rounded-xl md:h-[400px] md:grid-cols-[2fr_1fr_1fr] md:grid-rows-2 lg:h-[520px] lg:grid-cols-[2.2fr_1fr_1fr]">
        <button
          type="button"
          onClick={() => setActive(0)}
          className="group relative aspect-[16/10] w-full overflow-hidden bg-slate-200 md:col-start-1 md:row-span-2 md:aspect-auto"
          aria-label={`Open image gallery, ${images.length} images`}
        >
          <Image
            src={images[0]}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
            unoptimized
            priority
          />
        </button>

        {desktopThumbs.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => setActive(index + 1)}
            className={`group relative hidden w-full overflow-hidden bg-slate-200 md:block ${DESKTOP_SLOTS[index]}`}
            aria-label={`Open image ${index + 2} of ${images.length}`}
          >
            <Image
              src={src}
              alt={`${name} ${index + 2}`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(min-width: 1024px) 17vw, 17vw"
              unoptimized
            />
          </button>
        ))}

        {mobileThumb && (
          <button
            type="button"
            onClick={() => setActive(1)}
            className="group relative aspect-[16/10] w-full overflow-hidden bg-slate-200 md:hidden"
            aria-label={`Open image 2 of ${images.length}`}
          >
            <Image
              src={mobileThumb}
              alt={`${name} 2`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="100vw"
              unoptimized
            />
          </button>
        )}

        {images.length > 1 && (
          <button
            type="button"
            onClick={() => setActive(0)}
            className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-lg bg-[rgba(45,58,92,0.92)] px-3 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:-translate-y-px hover:bg-[rgba(45,58,92,1)] active:translate-y-0 md:bottom-4 md:right-4 md:gap-2 md:px-4 md:py-2.5 md:text-base"
          >
            <Images className="h-3 w-3 md:h-[13px] md:w-[13px]" />
            Gallery
          </button>
        )}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} image gallery`}
        >
          <div className="flex items-center justify-between p-4 text-white">
            <span className="text-base">
              {active + 1} / {images.length}
            </span>
            <button type="button" onClick={close} aria-label="Close gallery">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative flex-1 px-4 pb-4">
            <Image
              src={images[active]}
              alt={`${name} ${active + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              unoptimized
              priority
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
