import { motion, useScroll, useSpring } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

// Hook calls live here. By extracting the bar to its own component, the
// useScroll/useSpring hooks ONLY register listeners when this component
// mounts — i.e. on desktop. On mobile the hooks are never called, so
// there is no scroll subscription doing per-frame work in the background.
function Bar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        transformOrigin: '0% 50%',
        scaleX,
        background:
          'linear-gradient(90deg, var(--accent-deep) 0%, var(--accent-primary) 35%, var(--accent-amber) 70%, var(--accent-gold) 100%)',
        boxShadow: '0 0 18px rgba(216,154,92,0.55)',
        zIndex: 200,
      }}
    />
  );
}

export default function ScrollProgress() {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return <Bar />;
}
