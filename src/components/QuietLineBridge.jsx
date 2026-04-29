import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

export default function QuietLineBridge() {
  const isMobile = useIsMobile();
  return (
    <motion.a
      href="https://quietlinebook.com"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="quiet-line-bridge"
      style={{
        position: 'fixed',
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.25rem)',
        right: 'calc(env(safe-area-inset-right, 0px) + 1.25rem)',
        zIndex: 100,
        // Backdrop-filter on a fixed pill is one of iOS Safari's most
        // expensive scroll-time operations because the underlying area has
        // to be re-blurred every frame as content scrolls underneath it.
        // Use a solid near-white on mobile and keep the glass effect on desktop.
        background: isMobile ? 'rgba(255, 255, 255, 0.97)' : 'rgba(255, 255, 255, 0.86)',
        backdropFilter: isMobile ? 'none' : 'blur(16px) saturate(160%)',
        WebkitBackdropFilter: isMobile ? 'none' : 'blur(16px) saturate(160%)',
        border: '1px solid rgba(188,116,78,0.20)',
        borderRadius: '999px',
        padding: '0.6rem 1.1rem 0.6rem 0.6rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        boxShadow: '0 20px 40px rgba(140,70,40,0.18), 0 4px 10px rgba(0,0,0,0.05)',
        textDecoration: 'none',
        color: 'var(--text-main)',
        cursor: 'pointer',
        maxWidth: 'calc(100vw - 2rem)',
      }}
    >
      {/* Actual book cover thumbnail with subtle 3D depth */}
      <motion.div
        whileHover={isMobile ? undefined : { rotateY: 18, rotateX: 4 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        style={{
          width: 36,
          height: 50,
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow:
            '0 6px 14px rgba(0,0,0,0.25), 0 2px 4px rgba(140,70,40,0.30)',
          transformStyle: 'preserve-3d',
          flexShrink: 0,
        }}
      >
        <img
          src="/brand/book-cover-new.jpg"
          alt="The Quiet Line — book cover"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Spine highlight — adds the "this is a real book" cue */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 3,
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.35), rgba(0,0,0,0))',
          }}
        />
        {/* Soft warm halo — desktop only (constant repaint isn't worth it on phones). */}
        {!isMobile && (
          <motion.span
            aria-hidden
            animate={{ opacity: [0.0, 0.25, 0.0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: -8,
              borderRadius: 4,
              background:
                'radial-gradient(circle at 50% 50%, rgba(216,154,92,0.5), transparent 70%)',
              pointerEvents: 'none',
              zIndex: -1,
            }}
          />
        )}
      </motion.div>

      <div className="qlb-text" style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontSize: '9px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'var(--accent-primary)',
          }}
        >
          Order the book
        </span>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.95rem',
            whiteSpace: 'nowrap',
          }}
        >
          The Quiet{' '}
          <em
            style={{
              fontStyle: 'italic',
              color: 'var(--accent-primary)',
              fontWeight: 400,
            }}
          >
            Line
          </em>
        </span>
      </div>

      <style>{`
        /* Phone: drop the second text line, keep just the cover icon — the
           pill becomes a small circular shortcut that doesn't crowd content */
        @media (max-width: 480px) {
          .quiet-line-bridge .qlb-text { display: none; }
          .quiet-line-bridge { padding: 0.45rem; border-radius: 999px; }
        }
      `}</style>
    </motion.a>
  );
}
