import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
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
