'use client';

import type { ExcursionVariant } from '@/types';
import { useT } from '@/components/language-provider';
import type { AccordionItem } from './accordions';

type T = (key: string, vars?: Record<string, string | number>) => string;

function bullets(value?: string | null): string[] {
  if (!value) return [];
  return value
    .split(/[\r\n]+/)
    .map((line) => line.replace(/^\s*[*\-•]\s*/, '').trim())
    .filter(Boolean);
}

/**
 * Visitor questions built from the product's own fields.
 *
 * Tiqets exposes no FAQ content: the Content API has no FAQ field and
 * `/products/{id}/faq` 404s. Rather than invent answers, each question is a
 * generic prompt paired with a real fact taken from the ticket — duration,
 * inclusions, cancellation window, access, delivery method. When a field is
 * absent the question is simply not shown, so nothing is ever guessed.
 */
export function buildFaqItems(
  variant: ExcursionVariant | undefined,
  excursion: { duration?: string; address?: string } | undefined,
  t: T,
): AccordionItem[] {
  const items: AccordionItem[] = [];
  if (!variant) return items;

  const included = bullets(variant.whats_included);
  const excluded = bullets(variant.whats_excluded);

  if (included.length) {
    items.push({
      key: 'faq-included',
      title: t('detail.faqWhatsIncluded'),
      body: included.map((line) => `• ${line}`).join('\n'),
      icon: 'ticket',
    });
  }

  if (excluded.length) {
    items.push({
      key: 'faq-excluded',
      title: t('detail.faqWhatsExcluded'),
      body: excluded.map((line) => `• ${line}`).join('\n'),
      icon: 'info',
    });
  }

  if (variant.cancellation) {
    const window = variant.cancellation.window;
    items.push({
      key: 'faq-cancel',
      title: t('detail.faqCancellation'),
      body:
        window != null
          ? t('detail.freeCancellation', { hours: window })
          : variant.cancellation.policy === 'never'
            ? t('detail.faqNoCancellation')
            : t('detail.faqCancellationTerms'),
      icon: 'shield',
    });
  }

  const access: string[] = [];
  if (variant.wheelchair_access) access.push(t('detail.visitorWheelchair'));
  if (variant.smartphone_ticket) access.push(t('detail.visitorMobileTicket'));
  if (variant.instant_ticket_delivery) access.push(t('detail.visitorInstantDelivery'));
  if (variant.advance_arrival_time) {
    access.push(t('detail.visitorArriveEarly', { time: variant.advance_arrival_time }));
  }
  if (access.length) {
    items.push({ key: 'faq-access', title: t('detail.faqVisitorInfo'), body: access.map((l) => `• ${l}`).join('\n'), icon: 'access' });
  }

  if (variant.audio_guide_languages?.length) {
    items.push({
      key: 'faq-audio',
      title: t('detail.faqAudioGuide'),
      body: variant.audio_guide_languages.join(', '),
      icon: 'info',
    });
  }

  const duration = excursion?.duration;
  if (duration && !/^not specified$/i.test(duration.trim())) {
    items.push({ key: 'faq-duration', title: t('detail.faqDuration'), body: duration, icon: 'clock' });
  }

  if (excursion?.address) {
    items.push({ key: 'faq-where', title: t('detail.faqGettingThere'), body: excursion.address, icon: 'route' });
  }

  return items;
}

export function useFaqItems(
  variant: ExcursionVariant | undefined,
  excursion: { duration?: string; address?: string } | undefined,
): AccordionItem[] {
  const t = useT() as T;
  return buildFaqItems(variant, excursion, t);
}