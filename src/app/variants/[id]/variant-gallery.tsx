'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

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

  // Mobile shows the single cover image; desktop (md+) shows
  // the cover plus up to four more images in a grid, with a
  // "+N" badge on the last tile when the tour has more.
  const thumbs = images.slice(1, 5);
  const remaining = images.length - 5;

  return (
    <>
      <div className="grid grid-cols-1 overflow-hidden rounded-xl bg-slate-200 md:grid-cols-4 md:grid-rows-2 md:h-[400px] lg:h-[520px]">
        <button
          type="button"
          onClick={() => setActive(0)}
          className="group relative aspect-[16/10] w-full overflow-hidden md:aspect-auto md:col-span-2 md:row-span-2 md:h-full"
          aria-label={`Open image gallery, ${images.length} images`}
        >
          <Image
            src={images[0]}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(min-width: 1024px) 50vw, 100vw"
            unoptimized
            priority
          />

          {images.length > 1 && (
            <span className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-lg bg-[rgba(45,58,92,0.92)] px-3 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur md:bottom-4 md:right-4 md:gap-2 md:px-4 md:py-2.5 md:text-base">
              <span className="h-3 w-3 md:h-[13px] md:w-[13px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M8 14h.01"></path>
                  <path d="M12 14h.01"></path>
                  <path d="M16 14h.01"></path>
                  <path d="M8 18h.01"></path>
                  <path d="M12 18h.01"></path>
                  <path d="M16 18h.01"></path>
                </svg>
              </span>
              Gallery
            </span>
          )}
        </button>

        {thumbs.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(index + 1)}
            className="group relative hidden overflow-hidden bg-slate-200 md:block"
            aria-label={`View image ${index + 2}`}
          >
            <Image
              src={src}
              alt={`${name} ${index + 2}`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, 100vw"
              unoptimized
            />
            {remaining > 0 && index === thumbs.length - 1 && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-xl font-bold text-white">
                +{remaining}
              </span>
            )}
          </button>
        ))}
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
