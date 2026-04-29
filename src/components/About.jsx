import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import RevealText from './RevealText';
import { useIsMobile } from '../hooks/useIsMobile';

function CountUp({ to = 20, duration = 2 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return <span ref={ref}>{val}</span>;
}

export default function About() {
  const isMobile = useIsMobile();
  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  const moons = [
    { title: 'Corporate Leadership',     top: '-2%',    left: '50%',  x: '-50%', delay: 0 },
    { title: 'Power of Personal Agency', top: '20%',    right: '-8%', x: '0%',   delay: 1.2 },
    { title: 'Hospitality Leadership',   bottom: '20%', right: '-8%', x: '0%',   delay: 2.5 },
    { title: 'Mastery of Process',       bottom: '-2%', left: '50%',  x: '-50%', delay: 0.8 },
    { title: 'Global Lectures',          bottom: '20%', left: '-8%',  x: '0%',   delay: 3.1 },
    { title: 'Strategic Advisory',       top: '20%',    left: '-8%',  x: '0%',   delay: 1.8 },
  ];

  return (
    <section
      id="about"
      style={{
        padding: '7rem 0',
        background: 'var(--bg-base)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <motion.div
        className="wrap about-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        style={{
          display: 'grid',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        <motion.div
          variants={itemVariants}
          className="about-orbit"
          style={{
            position: 'relative',
            width: '100%',
            height: '520px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '420px',
              aspectRatio: '1/1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            {/* Static planet — pulses on desktop only. Subtle and gentle but
                still a transform every frame; cumulative cost on mobile. */}
            <motion.div
              animate={isMobile ? undefined : { scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(4.5rem, 9vw, 6.5rem)',
                  lineHeight: 0.85,
                  background:
                    'linear-gradient(135deg, var(--accent-deep) 0%, var(--accent-primary) 50%, var(--accent-amber) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <CountUp to={20} duration={2.2} />
              </div>
              <div
                style={{
                  fontSize: 'clamp(10px, 2vw, 12.5px)',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  fontWeight: 900,
                  color: 'var(--text-main)',
                  marginTop: '1.25rem',
                }}
              >
                Years
              </div>
            </motion.div>

            {/* Rings — same hairlines either way. Rotation only on desktop;
                mobile renders them static to avoid permanent paint cycles. */}
            {isMobile ? (
              <>
                <div style={{ position: 'absolute', inset: '8%', borderRadius: '50%', border: '1px dashed rgba(188,116,78,0.30)', zIndex: 1 }} />
                <div style={{ position: 'absolute', inset: '28%', borderRadius: '50%', border: '1px solid rgba(188,116,78,0.10)', zIndex: 1 }} />
              </>
            ) : (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', inset: '8%', borderRadius: '50%', border: '1px dashed rgba(188,116,78,0.30)', zIndex: 1, willChange: 'transform' }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', inset: '28%', borderRadius: '50%', border: '1px solid rgba(188,116,78,0.10)', zIndex: 1, willChange: 'transform' }}
                />
              </>
            )}
            {/* Soft inner glow — desktop only. blur(20px) on a transformed
                surface costs paint each frame; the radial-gradient alone
                reads fine on mobile without the additional filter. */}
            {!isMobile && (
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: '20%',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(216,154,92,0.30), transparent 70%)',
                  filter: 'blur(20px)',
                  zIndex: 0,
                }}
              />
            )}

            {moons.map((moon, i) => (
              <motion.div
                key={i}
                initial={{ x: moon.x, opacity: 0 }}
                whileInView={{ opacity: 1 }}
                animate={isMobile ? undefined : { y: [-7, 7, -7] }}
                whileHover={{ scale: 1.06, boxShadow: '0 14px 30px rgba(140,70,40,0.18)' }}
                transition={{
                  opacity: { duration: 1 },
                  y: isMobile ? { duration: 0 } : { duration: 7, delay: moon.delay, repeat: Infinity, ease: 'easeInOut' },
                  scale: { type: 'spring', stiffness: 320, damping: 18 },
                }}
                style={{
                  position: 'absolute',
                  top: moon.top, bottom: moon.bottom, left: moon.left, right: moon.right,
                  // Solid background instead of backdrop-blur — removing the
                  // blur lets the y-bob animation composite without forcing
                  // the GPU to re-blur the underlying area on every frame.
                  background: '#fff',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '99px',
                  border: '1px solid rgba(188,116,78,0.25)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                  fontSize: 'clamp(8.5px, 1.2vw, 10.5px)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  zIndex: 15,
                  cursor: 'default',
                }}
              >
                <motion.div
                  animate={isMobile ? undefined : { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                  }}
                />
                {moon.title}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Narrative */}
        <motion.div variants={itemVariants}>
          <RevealText
            as="h2"
            style={{
              fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)',
              lineHeight: 1.1,
              margin: '0 0 2rem',
              letterSpacing: '-0.015em',
            }}
          >
            A life spent inside the <em>interaction nobody meant to lose.</em>
          </RevealText>
          <div
            style={{
              borderLeft: '3px solid var(--accent-primary)',
              paddingLeft: '1.5rem',
              marginBottom: '2rem',
              position: 'relative',
            }}
          >
            <motion.div
              animate={isMobile ? undefined : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                left: '-3px',
                top: 0,
                bottom: 0,
                width: '3px',
                background: 'linear-gradient(180deg, var(--accent-amber), var(--accent-primary), var(--accent-deep))',
              }}
            />
            <p style={{ fontSize: '1.15rem', lineHeight: 1.75, color: 'var(--text-main)', maxWidth: '36em', margin: 0, fontWeight: 500 }}>
              Before the lecture circuit, Tristian Walker built a 20-year foundation across high-stakes corporate management and elite hospitality leadership.
            </p>
          </div>
          <p style={{ fontSize: '1.08rem', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: '36em' }}>
            He is the author of <em style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>The Quiet Line</em> and now works with institutions where the stakes of a human interaction are impossible to automate away — operating rooms, concert halls, trading floors, and executive retreats.
          </p>
          <p style={{ fontSize: '1.08rem', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: '36em' }}>
            The through-line of his work is simple: drift is what happens when you perform the task perfectly, but lose the human entirely. He helps leaders find the flicker — that preceding moment of awareness — and build a practice around it. The audience remains the same whether it's an operating room or an executive retreat: people who are highly capable, but quietly disconnected.
          </p>
          <motion.p
            whileHover={{ x: 8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontStyle: 'italic',
              color: 'var(--accent-primary)',
              fontSize: '1.05rem',
              marginTop: '2.5rem',
              cursor: 'default',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.75rem',
            }}
          >
            <motion.span
              animate={isMobile ? undefined : { width: [16, 32, 16] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: isMobile ? 24 : undefined, height: 1, background: 'var(--accent-primary)', display: 'inline-block' }}
            />
            From drift to direction, one honest reckoning at a time.
          </motion.p>
        </motion.div>
      </motion.div>

      <style>{`
        .about-grid { grid-template-columns: 1fr 1.4fr; }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .about-orbit { height: 380px; }
        }
        @media (max-width: 600px) {
          .about-orbit { height: 320px; }
        }
      `}</style>
    </section>
  );
}
