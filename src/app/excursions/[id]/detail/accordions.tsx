'use client';

import { useState } from 'react';
import { ChevronDown, FileText, Clock, Route, ShieldCheck, Ticket, Info, Accessibility } from 'lucide-react';
import type { ExcursionVariant } from '@/types';
import { useT } from '@/components/language-provider';

type T = (key: string, vars?: Record<string, string | number>) => string;

export type AccordionItem = {
  key: string;
  title: string;
  body: string;
  icon?: 'file' | 'clock' | 'route' | 'shield' | 'ticket' | 'info' | 'access';
};

const ICONS = {
  file: FileText,
  clock: Clock,
  route: Route,
  shield: ShieldCheck,
  ticket: Ticket,
  info: Info,
  access: Accessibility,
};

/** Bordered accordion matching the reference design. */
export function Accordion({ items, defaultOpen }: { items: AccordionItem[]; defaultOpen?: string }) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);
  if (items.length === 0) return null;

  return (
    <div>
      {items.map((item) => {
        const Icon = item.icon ? ICONS[item.icon] : null;
        const isOpen = open === item.key;

        return (
          <div key={item.key} className="mb-2 overflow-hidden rounded-lg border border-gray-200 bg-white last:mb-0">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : item.key)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3.5 px-4 py-4 text-left text-base font-semibold text-gray-900 transition-colors hover:text-[#00B4D8]"
            >
              {Icon && (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-[#00B4D8]">
                  <Icon className="h-4 w-4" />
                </span>
              )}
              <span className="flex-1">{item.title}</span>
              <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-sm leading-relaxed text-gray-600">
                {Icon && <div className="pb-1" />}
                <p className="whitespace-pre-line">{item.body}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function bullets(value?: string | null): string[] {
  if (!value) return [];
  return value
    .split(/[\r\n]+/)
    .map((line) => line.replace(/^\s*[*\-•]\s*/, '').trim())
    .filter(Boolean);
}

function cancellationText(variant?: ExcursionVariant): string | null {
  const policy = variant?.cancellation;
  if (!policy) return null;
  if (policy.window == null) {
    return policy.policy === 'never'
      ? 'This ticket is non-refundable and cannot be cancelled.'
      : 'Cancellation terms apply to this ticket.';
  }
  return `Free cancellation up to ${policy.window} hours before your visit.`;
}

/** Overview blocks built from the first ticket's real product fields. */
export function buildOverviewItems(
  experienceDescription: string,
  variant: ExcursionVariant | undefined,
  excursion: { duration?: string } | undefined,
  t: T,
  experienceName: string,
): AccordionItem[] {
  const items: AccordionItem[] = [];

  if (experienceDescription) {
    items.push({ key: 'overview', title: t('detail.overview', { name: experienceName }), body: experienceDescription, icon: 'file' });
  }

  const included = bullets(variant?.whats_included);
  if (included.length) {
    items.push({ key: 'included', title: t('detail.included'), body: included.map((l) => `• ${l}`).join('\n'), icon: 'ticket' });
  }

  const excluded = bullets(variant?.whats_excluded);
  if (excluded.length) {
    items.push({ key: 'excluded', title: t('detail.excluded'), body: excluded.map((l) => `• ${l}`).join('\n'), icon: 'info' });
  }

  const cancellation = cancellationText(variant);
  if (cancellation) {
    items.push({ key: 'cancellation', title: t('detail.cancellation'), body: cancellation, icon: 'shield' });
  }

  const goodToKnow = [variant?.good_to_know, variant?.must_know].filter(Boolean).join('\n\n');
  if (goodToKnow) {
    items.push({ key: 'good-to-know', title: t('detail.goodToKnow'), body: goodToKnow, icon: 'info' });
  }

  const access: string[] = [];
  if (variant?.wheelchair_access) access.push('• Wheelchair accessible');
  if (variant?.instant_ticket_delivery) access.push('• Instant confirmation by email');
  if (variant?.smartphone_ticket) access.push('• Mobile ticket accepted at the gate');
  if (variant?.advance_arrival_time) {
    access.push(`• Arrive at least ${variant.advance_arrival_time.replace(/^0:/, '')} before your slot`);
  }
  if (access.length) {
    items.push({ key: 'access', title: t('detail.visitorInfo'), body: access.join('\n'), icon: 'access' });
  }

  if (excursion?.duration && !/^not specified$/i.test(excursion.duration.trim())) {
    items.push({ key: 'duration', title: t('detail.duration'), body: excursion.duration, icon: 'clock' });
  }

  return items;
}
