'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface NavigatingCardProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function NavigatingCard({ href, children, className = '', onClick }: NavigatingCardProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsNavigating(true);
      router.push(href);
      onClick?.(e);
    },
    [href, router, onClick]
  );

  return (
    <article
      onClick={handleClick}
      className={`
        ${className}
        transition-all duration-100 ease-out
        cursor-pointer
        ${isNavigating ? 'opacity-60 scale-[0.99]' : 'hover:-translate-y-0.5 hover:shadow-lg'}
      `}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
    >
      {children}
    </article>
  );
}