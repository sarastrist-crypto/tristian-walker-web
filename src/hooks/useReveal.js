import { useIsMobile } from './useIsMobile';

/**
 * Returns motion-props for a fade/slide-in-on-scroll reveal — but ONLY on
 * desktop. On mobile (or reduced motion) it returns props that disable the
 * reveal entirely, so the element renders at its final state immediately.
 *
 * That means no IntersectionObserver, no opacity tween, no transform —
 * the section simply exists when you scroll to it. Eliminates the
 * "appears, disappears, reappears" flicker reported on phones.
 *
 * Usage:
 *   <motion.div {...useReveal({ y: 30 })}>...</motion.div>
 */
export function useReveal(opts = {}) {
  const isMobile = useIsMobile();
  if (isMobile) {
    // initial=false tells framer to render at the animate state immediately
    // and skip any whileInView setup. No observers registered.
    return { initial: false };
  }
  const {
    y = 30,
    x = 0,
    duration = 0.7,
    delay = 0,
    margin = '-50px',
    ease = [0.16, 1, 0.3, 1],
  } = opts;
  return {
    initial: { opacity: 0, x, y },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin },
    transition: { duration, delay, ease },
  };
}
