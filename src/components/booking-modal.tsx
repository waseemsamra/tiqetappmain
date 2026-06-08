'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const SCRIPT_ID = 'tiqets-booking-engine-script';

export function BookingModal({ productId, open, onOpenChange }: { productId: string; open: boolean; onOpenChange: (open: boolean) => void }) {
  const [scriptState, setScriptState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const retryCountRef = useRef(0);

  const triggerBooking = () => {
    const trigger = document.getElementById('tiqets-booking-modal-trigger');
    if (trigger) {
      trigger.click();
      retryCountRef.current += 1;
    }
  };

  useEffect(() => {
    if (!open) return;

    setScriptState('loading');
    if (typeof window === 'undefined') return;

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      setScriptState('ready');
      const timer = window.setTimeout(triggerBooking, 300);
      return () => window.clearTimeout(timer);
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setScriptState('ready');
      const timer = window.setTimeout(triggerBooking, 300);
      return () => window.clearTimeout(timer);
    };
    script.onerror = () => setScriptState('error');
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [open, productId]);

  useEffect(() => {
    if (!open || scriptState !== 'ready') return;
    triggerBooking();
  }, [open, scriptState]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Complete your booking</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6">
          {scriptState === 'loading' && <p className="text-sm text-muted-foreground">Loading booking engine...</p>}
          {scriptState === 'error' && (
            <p className="text-sm text-red-600">Failed to load booking engine. Please try again later.</p>
          )}
          <div
            id="tiqets-booking-modal-container"
            data-tiqets-widget="booking"
            data-product-id={productId}
            data-trigger-selector="#tiqets-booking-modal-trigger"
            className="tiqets-booking-wrapper"
          />
          <button
            id="tiqets-booking-modal-trigger"
            type="button"
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
