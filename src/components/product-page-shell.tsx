'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useT } from '@/components/language-provider';

/**
 * Shared shell for the per-product pages that the hero tabs navigate to
 * (stays, flights, packages, transfers).
 *
 * The site header and footer come from the root layout, so this only supplies
 * the page body: breadcrumb, title, subtitle and content.
 */
export function ProductPageShell({
  titleKey,
  subtitleKey,
  showHeader = true,
  children,
}: {
  titleKey: string;
  subtitleKey: string;
  /** Set false to keep only the breadcrumb, for pages that supply their own heading. */
  showHeader?: boolean;
  children: ReactNode;
}) {
  const t = useT();

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-8 max-md:py-6">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-1.5 text-[13px] text-slate-500">
            <li>
              <Link href="/" className="hover:text-slate-900">
                {t('search.breadcrumbHome')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-slate-900">{t(titleKey)}</li>
          </ol>
        </nav>

        {showHeader && (
          <>
            <h1 className="text-[26px] font-semibold tracking-[-0.3px] text-slate-900 max-md:text-[21px]">
              {t(titleKey)}
            </h1>
            <p className="mt-1.5 text-[15px] text-slate-600">{t(subtitleKey)}</p>
          </>
        )}

        <div className={showHeader ? 'mt-7' : 'mt-4'}>{children}</div>
      </div>
    </div>
  );
}
