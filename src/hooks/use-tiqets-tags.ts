import { useState, useEffect } from 'react';
import type { TiqetsTag } from '@/types';

export function useTiqetsTags() {
  const [tags, setTags] = useState<TiqetsTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

     useEffect(() => {
       let cancelled = false;
       setLoading(true);
       fetch('/api/tags')
         .then(res => res.json())
         .then(data => {
           if (!cancelled) {
             setTags(data?.tags ?? []);
             setLoading(false);
           }
         })
         .catch(err => {
           if (!cancelled) {
             setError(err.message);
             setLoading(false);
           }
         });
     return () => { cancelled = true; };
   }, []);

  return { tags, loading, error };
}
