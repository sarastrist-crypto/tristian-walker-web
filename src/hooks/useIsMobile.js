import { useEffect, useState } from 'react';

/**
 * Reads a media query and returns whether it currently matches.
 * The initial value is computed synchronously from window.matchMedia so
 * mobile devices don't render a desktop frame before the effect runs.
 */
export function useIsMobile(query = '(max-width: 820px)') {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, [query]);

  return matches;
}

/** Combines mobile + reduced-motion into one signal for "go gentle". */
export function useGentleMotion() {
  const isMobile = useIsMobile();
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  return isMobile || reduced;
}
