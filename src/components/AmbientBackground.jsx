import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

const ORBS_DESKTOP = [
  { bg: 'var(--grad-orb-1)', size: 720, top: '-12%', left: '-8%',  dur: 26, delay: 0,  blur: 80 },
  { bg: 'var(--grad-orb-2)', size: 560, top: '38%',  right: '-10%', dur: 32, delay: 4,  blur: 90 },
  { bg: 'var(--grad-orb-3)', size: 640, top: '78%',  left: '20%',  dur: 30, delay: 8,  blur: 100 },
  { bg: 'var(--grad-orb-1)', size: 480, top: '120%', right: '15%', dur: 28, delay: 2,  blur: 80 },
];

export default function AmbientBackground() {
  const isMobile = useIsMobile();

  // On mobile we render nothing. Each section already has its own warm
  // gradient background; layering blurred fixed orbs with mixBlendMode on top
  // of that just costs paint cycles during scroll without adding visible
  // depth at small sizes. This is the single biggest scroll-smoothness win
  // for iOS Safari.
  if (isMobile) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        animation: 'ambient-hue 18s ease-in-out infinite',
      }}
    >
      {ORBS_DESKTOP.map((orb, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 2.2, delay: 0.3 + i * 0.2 }}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            background: orb.bg,
            filter: `blur(${orb.blur}px)`,
            borderRadius: '50%',
            mixBlendMode: 'multiply',
            animation: `drift ${orb.dur}s ease-in-out ${orb.delay}s infinite`,
            willChange: 'transform',
          }}
        />
      ))}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          backgroundImage:
            'radial-gradient(rgba(140,70,40,0.06) 1px, transparent 1px)',
          backgroundSize: '3px 3px',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );
}
