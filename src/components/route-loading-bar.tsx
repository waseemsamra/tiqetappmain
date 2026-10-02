'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function RouteLoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    setIsLoading(true);
    setProgress(0);

    progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 10, 90));
    }, 100);

    timeout = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => setIsLoading(false), 200);
    }, 300);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-primary/20"
      style={{ transform: `translateX(-${100 - progress}%)` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-primary origin-left"
        style={{ transform: `scaleX(${progress / 100})`, transformOrigin: 'left' }}
      />
    </div>
  );
}