import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * MagneticButton — wraps a child element so that on hover, it gently
 * attracts toward the cursor. Use for primary CTAs to add tactile life
 * without overpowering the brand voice.
 */
export default function MagneticButton({ children, strength = 0.35, as: As = 'a', style, className, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  // Inner content drifts a hair more than the wrapper for a layered feel
  const innerX = useTransform(sx, (v) => v * 0.55);
  const innerY = useTransform(sy, (v) => v * 0.55);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const reset = () => { x.set(0); y.set(0); };

  const MotionAs = motion[As] || motion(As);

  return (
    <MotionAs
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: 'inline-flex', ...style }}
      className={className}
      {...rest}
    >
      <motion.span style={{ x: innerX, y: innerY, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        {children}
      </motion.span>
    </MotionAs>
  );
}
