import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import RevealText from './RevealText';
import { useIsMobile } from '../hooks/useIsMobile';

function CountUp({ to = 20, duration = 2, suffix = '' }) {
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

  return <span ref={ref}>{val}{suffix}</span>;
}

const PILLARS = [
  'Corporate Leadership',
  'Hospitality Leadership',
  'Power of Personal Agency',
  'Strategic Advisory',
  'Mastery of Process',
  'Global Lectures',
];

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

  // Desktop orbit moons. Side offsets tightened from -8% to -2% so the long
  // labels sit inside the column on narrower desktop widths instead of
  // breaching it.
  const moons = [
    { title: 'Corporate Leadership',     top: '-4%',    left: '50%',  x: '-50%', delay: 0 },
    { title: 'Power of Personal Agency', top: '20%',    right: '-2%', x: '0%',   delay: 1.2 },
    { title: 'Hospitality Leadership',   bottom: '20%', right: '-2%', x: '0%',   delay: 2.5 },
    { title: 'Mastery of Process',       bottom: '-4%', left: '50%',  x: '-50%', delay: 0.8 },
    { title: 'Global Lectures',          bottom: '20%', left: '-2%',  x: '0%',   delay: 3.1 },
    { title: 'Strategic Advisory',       top: '20%',    left: '-2%',  x: '0%',   delay: 1.8 },
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
        // On mobile we skip the staggered fade-in entirely. The section just
        // renders at full opacity immediately when scrolled into view.
        {...(isMobile
          ? { initial: false }
          : {
              variants: containerVariants,
              initial: 'hidden',
              whileInView: 'visible',
              viewport: { once: true, margin: '-100px' },
            })}
        style={{
          display: 'grid',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        {isMobile ? (
          <div className="about-experience-mobile">
            {/* Centered 20+ YEARS badge */}
            <div className="about-badge">
              <div className="about-badge-ring about-badge-ring-outer" />
              <div className="about-badge-ring about-badge-ring-inner" />
              <div className="about-badge-count">
                <CountUp to={20} duration={2.2} suffix="+" />
              </div>
              <div className="about-badge-label">Years</div>
            </div>

            {/* 2-column pill grid */}
            <ul className="about-pillars">
              {PILLARS.map((title) => (
                <li key={title} className="about-pillar">
                  <span className="about-pillar-dot" aria-hidden />
                  <span className="about-pillar-label">{title}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
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
                maxWidth: '460px',
                aspectRatio: '1/1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
              }}
            >
              {/* Static planet — pulses subtly. */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
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
                  <CountUp to={20} duration={2.2} suffix="+" />
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

              {/* Rotating rings — desktop only. */}
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

              {/* Soft inner glow. */}
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

              {moons.map((moon, i) => (
                <motion.div
                  key={i}
                  initial={{ x: moon.x, opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  animate={{ y: [-7, 7, -7] }}
                  whileHover={{ scale: 1.06, boxShadow: '0 14px 30px rgba(140,70,40,0.18)' }}
                  transition={{
                    opacity: { duration: 1 },
                    y: { duration: 7, delay: moon.delay, repeat: Infinity, ease: 'easeInOut' },
                    scale: { type: 'spring', stiffness: 320, damping: 18 },
                  }}
                  style={{
                    position: 'absolute',
                    top: moon.top, bottom: moon.bottom, left: moon.left, right: moon.right,
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
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
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
        )}

        {/* Narrative */}
        <motion.div {...(isMobile ? { initial: false } : { variants: itemVariants })}>
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
              Before the lecture circuit, Tristian Walker built a 20+ year foundation across high-stakes corporate management and elite hospitality leadership.
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
        }

        /* ─── Mobile experience block ─────────────────────────────── */
        .about-experience-mobile {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 0.5rem 0;
        }

        /* 20+ YEARS badge — small disc with two static rings */
        .about-badge {
          position: relative;
          width: 200px;
          height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: none;
        }
        .about-badge-ring {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .about-badge-ring-outer {
          inset: 0;
          border: 1px dashed rgba(188,116,78,0.30);
        }
        .about-badge-ring-inner {
          inset: 18%;
          border: 1px solid rgba(188,116,78,0.10);
          background: radial-gradient(circle at 50% 50%, rgba(216,154,92,0.16), transparent 70%);
        }
        .about-badge-count {
          font-family: var(--font-heading);
          font-style: italic;
          font-size: 4.25rem;
          line-height: 0.85;
          background: linear-gradient(135deg, var(--accent-deep) 0%, var(--accent-primary) 50%, var(--accent-amber) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          z-index: 1;
        }
        .about-badge-label {
          margin-top: 0.85rem;
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          font-weight: 900;
          color: var(--text-main);
          z-index: 1;
        }

        /* 2-column pill grid */
        .about-pillars {
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
          max-width: 520px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
        }
        .about-pillar {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          background: #fff;
          border: 1px solid rgba(188,116,78,0.25);
          border-radius: 10px;
          padding: 0.7rem 0.85rem;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--text-main);
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          line-height: 1.25;
        }
        .about-pillar-dot {
          flex: none;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(188,116,78,0.12);
        }
        .about-pillar-label {
          /* Allow long titles to wrap onto a second line cleanly. */
          word-break: normal;
        }

        /* Phones narrower than ~360px: drop to a single column so
           "Power of Personal Agency" doesn't jam against itself. */
        @media (max-width: 360px) {
          .about-pillars { grid-template-columns: 1fr; max-width: 320px; }
        }
      `}</style>
    </section>
  );
}
