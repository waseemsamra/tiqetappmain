'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export type RelatedProduct = {
  id: string;
  title: string;
  summary: string;
  image: string;
  rating: number | null;
  reviewsTotal: number | null;
  price: string;
  promoLabel: string | null;
};

export function RelatedProducts({
  title,
  products,
}: {
  title: string;
  products: RelatedProduct[];
}) {
  const [api, setApi] = useState<any>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const syncState = useCallback((embla: any) => {
    if (!embla) return;
    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) return;
    syncState(api);
    api.on('select', syncState);
    api.on('reInit', syncState);
    return () => {
      api.off('select', syncState);
      api.off('reInit', syncState);
    };
  }, [api, syncState]);

  /**
   * Horizontal wheel support for desktop users, who have no drag gesture.
   *
   * Vertical wheel input is only hijacked while the carousel can still move in
   * that direction, and only when the input is not already horizontal, so the
   * page keeps scrolling normally once the track reaches its end.
   */
  useEffect(() => {
    if (!api) return;
    const node = api.containerNode?.() as HTMLElement | undefined;
    if (!node) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      const goingForward = event.deltaY > 0;
      if (goingForward ? !api.canScrollNext() : !api.canScrollPrev()) return;

      event.preventDefault();
      api.scrollBy(goingForward ? 320 : -320);
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [api]);

  if (products.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous options"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-slate-900 disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next options"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-slate-900 disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Carousel opts={{ align: 'start', loop: false }} setApi={setApi} className="relative">
        <CarouselContent className="-ml-5">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-5 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Link
                href={`/variants/${product.id}`}
                className="group block h-full overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 45vw"
                    unoptimized
                  />
                  {product.promoLabel && (
                    <span className="absolute left-2.5 top-2.5 rounded bg-[#E53E3E] px-2 py-1 text-sm font-bold tracking-wide text-white">
                      {product.promoLabel}
                    </span>
                  )}
                </div>
                <div className="p-3.5">
                  <h3 className="mb-1 line-clamp-2 text-base font-bold leading-snug text-slate-900">
                    {product.title}
                  </h3>
                  {product.summary && (
                    <p className="mb-2.5 line-clamp-2 text-sm leading-relaxed text-slate-500">
                      {product.summary}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    {typeof product.rating === 'number' ? (
                      <span className="flex items-center gap-1 text-sm text-slate-600">
                        <Star className="h-3 w-3 fill-[#F6B93B] text-[#F6B93B]" />
                        {product.rating.toFixed(1)}
                        {product.reviewsTotal != null &&
                          ` (${product.reviewsTotal.toLocaleString()})`}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="text-base font-bold text-slate-900">{product.price}</span>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
