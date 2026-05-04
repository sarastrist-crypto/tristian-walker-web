import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import RevealText from './RevealText';
import { useIsMobile } from '../hooks/useIsMobile';

const VARIANTS = [
  <>A lecture on <em>Professional Drift</em> — and the practice that reclaims presence.</>,
  <>A talk for leaders who'd rather <em>hear the quiet line</em> than outrun it.</>,
  <>Two decades inside the systems. <em>One honest reckoning</em> with what they cost us.</>,
];

export default function Hero() {
  const [variantIndex, setVariantIndex] = useState(0);
  const isMobile = useIsMobile();

  // Cycle headlines on desktop only. On mobile every cycle was running
  // a `filter: blur(8px)` animation on a 5rem heading + an empty gap from
  // AnimatePresence mode="wait" — easily perceived as a "flicker" when
  // scrolling past. A single confident headline reads cleaner anyway.
  useEffect(() => {
    if (isMobile) return;
    const timer = setInterval(() => {
      setVariantIndex((prev) => (prev + 1) % VARIANTS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isMobile]);

  // Portrait parallax tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 18 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <section
      className="hero-section"
      style={{
        minHeight: '100dvh',
        padding: '7rem 0 4rem',
        background:
          'radial-gradient(ellipse 1200px 600px at 50% 0%, rgba(216,154,92,0.18), transparent 70%), radial-gradient(ellipse 800px 500px at 85% 60%, rgba(188,116,78,0.10), transparent 70%), linear-gradient(180deg, var(--bg-parchment) 0%, var(--bg-base) 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="wrap hero-grid"
        style={{
          display: 'grid',
          gap: '3rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '11px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: 'var(--text-muted)',
              marginBottom: '2rem',
            }}
          >
            <motion.div
              animate={isMobile ? undefined : { width: [44, 64, 44] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: isMobile ? 44 : undefined, height: '1px', background: 'var(--accent-primary)' }}
            />
            Author · Keynote Speaker · Advisor
          </motion.div>

          <div style={{ display: 'grid', marginBottom: '2rem' }}>
            {/* Invisible scaffold so the headline grid sizes to the tallest variant */}
            <div
              style={{
                gridArea: '1 / 1',
                display: 'grid',
                visibility: 'hidden',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {VARIANTS.map((text, idx) => (
                <h1
                  key={`hidden-${idx}`}
                  style={{
                    gridArea: '1 / 1',
                    fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    margin: 0,
                  }}
                >
                  {text}
                </h1>
              ))}
            </div>

            <h1
              style={{
                gridArea: '1 / 1',
                fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                margin: 0,
                zIndex: 10,
              }}
            >
              {isMobile ? (
                // Static, single headline on phones — no rotation, no blur,
                // no AnimatePresence gap. The cleanest possible read.
                <div>{VARIANTS[0]}</div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={variantIndex}
                    initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {VARIANTS[variantIndex]}
                  </motion.div>
                </AnimatePresence>
              )}
            </h1>
          </div>

          <div
            style={{
              fontSize: '1.15rem',
              lineHeight: 1.7,
              color: 'var(--text-muted)',
              maxWidth: '38em',
              marginBottom: '2.5rem',
            }}
          >
            <p style={{ margin: '0 0 1rem 0' }}>
              For two decades, I operated inside the highest stakes of corporate and hospitality leadership. It taught me that when process overrules presence, we lose the foundation of our character—and gradually drift into a Wall of Anonymity.
            </p>
            <p style={{ margin: 0 }}>
              Today, my work exists to cure this drift. Through my lecture on <a href="https://walkertalks.io/professional-drift" target="_blank" style={{ color: 'var(--text-main)', fontWeight: 700, textDecoration: 'underline', textDecorationColor: 'var(--accent-primary)', textUnderlineOffset: '4px' }}>Professional Drift</a>, we bear witness to the actual cost of our systems and learn how to establish a Compass of Presence rather than succumbing to the Gravity of Transaction. My book, <em style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-primary)' }}>The Quiet Line</em>, serves as the anchor for this work—teaching leaders how to bring their character, not just their credentials, back to the interaction.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <motion.a
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18 }}
              href="mailto:tristian@tristianwalker.com"
              className="btn btn-primary"
              style={{ textDecoration: 'none' }}
            >
              Book Tristian to speak →
            </motion.a>
            <motion.a
              whileHover={{ y: -3, borderColor: 'var(--accent-primary)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18 }}
              href="#library"
              className="btn"
              style={{
                background: 'var(--bg-surface)',
                color: 'var(--accent-primary)',
                border: '1px solid rgba(188,116,78,0.25)',
                boxShadow: 'var(--shadow-sm)',
                textDecoration: 'none',
              }}
            >
              Browse the library →
            </motion.a>
          </div>
        </motion.div>

        {/* Portrait — layered, parallax, ambient ring on desktop;
            stripped-down plain <img> on mobile so nothing in the layered
            stack (motion.div, perspective, preserve-3d, aspect-ratio,
            absolute-positioned children) can prevent it from rendering. */}
        {isMobile ? (
          <motion.div
            className="hero-portrait"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              width: '100%',
              maxWidth: '320px',
              margin: '0 auto',
            }}
          >
            <img
              src="/brand/tristian-portrait-new.jpg"
              alt="Tristian Walker"
              loading="eager"
              decoding="async"
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                borderRadius: '10px',
                boxShadow: 'var(--shadow-warm)',
                objectFit: 'cover',
                objectPosition: 'center 30%',
              }}
            />
          </motion.div>
        ) : (
        <motion.div
          className="hero-portrait"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{
            position: 'relative',
            perspective: '1200px',
            width: '100%',
          }}
        >
          {/* Decorative ambient ring behind portrait — desktop only.
              Continuous rotation = continuous paint; phones can't spare it. */}
          {!isMobile && (
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: '-8%',
                borderRadius: '50%',
                border: '1px dashed rgba(188,116,78,0.25)',
                zIndex: 0,
                willChange: 'transform',
              }}
            />
          )}
          {/* Soft warm glow behind portrait — desktop only.
              filter: blur(40px) on a 600px+ surface is one of the most
              expensive paints a phone GPU can be asked to do, and it stays
              static so the cost is paid every scroll frame. */}
          {!isMobile && (
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: '-12%',
                background:
                  'radial-gradient(circle at 30% 30%, rgba(216,154,92,0.45), transparent 60%)',
                filter: 'blur(40px)',
                zIndex: 0,
              }}
            />
          )}

          <motion.div
            onMouseMove={isMobile ? undefined : handleMove}
            onMouseLeave={isMobile ? undefined : handleLeave}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4/5',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-warm)',
              background: 'linear-gradient(180deg, var(--bg-dark), var(--bg-ink))',
              // 3D properties only on desktop, where parallax actually runs.
              transformStyle: isMobile ? undefined : 'preserve-3d',
              ...(isMobile ? {} : { rotateX: rx, rotateY: ry }),
              zIndex: 2,
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '1rem',
                top: '1rem',
                zIndex: 3,
                fontSize: '9.5px',
                letterSpacing: '0.4em',
                fontWeight: 700,
                textTransform: 'uppercase',
                background: 'rgba(26,26,26,0.78)',
                color: '#fff',
                padding: '.45rem .75rem',
                borderRadius: '3px',
                backdropFilter: 'blur(8px)',
              }}
            >
              The Author · 2026
            </span>

            <img
              src="/brand/tristian-portrait-new.jpg"
              alt="Tristian Walker"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 30%',
                position: 'absolute',
                inset: 0,
              }}
            />

            {/* Subtle warm gradient overlay */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, transparent 55%, rgba(26,26,26,0.55) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Floating credential chip */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(10px)',
                padding: '.6rem .9rem',
                borderRadius: '8px',
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                fontSize: '.85rem',
                color: 'var(--text-main)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.18)',
                zIndex: 4,
              }}
            >
              "From drift to direction."
            </motion.div>
          </motion.div>
        </motion.div>
        )}
      </div>

      {/* Scroll cue — desktop only. Was display:none on mobile via CSS but
          framer-motion still ran the keyframe animation in JS for an
          invisible element, wasting frames. Gating in JSX avoids that. */}
      {!isMobile && (
        <motion.div
          className="hero-scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '10px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'var(--text-subtle)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '.6rem',
            zIndex: 2,
          }}
        >
          Scroll
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '32px', background: 'var(--accent-primary)' }}
          />
        </motion.div>
      )}

      <style>{`
        .hero-grid { grid-template-columns: 1.25fr 1fr; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; gap: 2rem; }
          .hero-section { padding-top: 5.5rem; padding-bottom: 3rem; min-height: auto; }
          /* Show the portrait first on mobile — face before message. */
          .hero-portrait { order: 1; }
          .hero-text     { order: 2; }
        }
        @media (max-width: 600px) {
          .hero-scroll-cue { display: none; }
          .hero-portrait { max-width: 280px; }
        }
      `}</style>
    </section>
  );
}
