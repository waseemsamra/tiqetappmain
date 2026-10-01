'use client';

import { Bed, Luggage, Plane } from 'lucide-react';
import { useT } from '@/components/language-provider';

const ICONS = {
  stays: Bed,
  flights: Plane,
  packages: Luggage,
} as const;

/**
 * Placeholder body for the product pages whose search is not built yet.
 * Client component because it reads the active language for its copy, and it
 * owns the icon mapping so server pages only pass plain strings.
 */
export function ProductComingSoon({
  product,
  messageKey,
}: {
  product: keyof typeof ICONS;
  messageKey: string;
}) {
  const t = useT();
  const Icon = ICONS[product];

  return (
    <div className="rounded-[12px] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
      <Icon className="mx-auto h-7 w-7 text-slate-400" />
      <p className="mt-3 text-[15px] text-slate-600">{t(messageKey)}</p>
    </div>
  );
}