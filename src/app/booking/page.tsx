'use client';

import { Suspense, useEffect, useState } from 'react';
import { notFound, useSearchParams } from 'next/navigation';
import { getExcursionById } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';

const SCRIPT_ID = 'tiqets-booking-engine-script';

function TiqetsBookingEngine({ productId }: { productId: string }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [productId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = window.setTimeout(() => {
      const container = document.getElementById('tiqets-booking-container');
      if (container && container.children.length === 0) {
        container.innerHTML = '<p class="p-4 text-sm text-gray-500">Booking engine is loading or unavailable for this product.</p>';
      }
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [productId]);

  return (
    <div className="min-h-[600px]">
      <div
        id="tiqets-booking-container"
        data-tiqets-widget="booking"
        data-product-id={productId}
        data-trigger-selector="#tiqets-booking-trigger"
      />
      <button
        id="tiqets-booking-trigger"
        type="button"
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}

function BookingPageContent() {
  const searchParams = useSearchParams();
  const activityId = searchParams.get('activityId');
  const [productId, setProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!activityId) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const excursion = await getExcursionById(activityId);
        if (cancelled) return;

        if (!excursion) {
          setError(true);
        } else {
          const firstProductId = Array.isArray(excursion.product_ids) && excursion.product_ids.length > 0
            ? String(excursion.product_ids[0])
            : activityId;
          setProductId(firstProductId);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [activityId]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <Skeleton className="h-12 w-1/2 mb-6" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  if (error || !productId) {
    notFound();
  }

  return <TiqetsBookingEngine productId={productId} />;
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading booking...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
