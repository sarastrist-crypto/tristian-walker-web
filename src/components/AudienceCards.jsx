import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import RevealText from './RevealText';
import { useIsMobile } from '../hooks/useIsMobile';

function TiltCard({ children, ...rest }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 18 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100, transformStyle: 'preserve-3d' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default function AudienceCards() {
  const isMobile = useIsMobile();
  return (
    <section
      id="book"
      style={{
        padding: '8rem 0',
        background: 'linear-gradient(180deg, var(--bg-base) 0%, var(--bg-warm) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft accent orb — desktop only. blur(60px) on a 500px element
          is permanently being filtered by the GPU; not worth it on mobile
          when the section already has its own warm gradient background. */}
      {!isMobile && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '20%',
            right: '-10%',
            width: 500,
            height: 500,
            background:
              'radial-gradient(circle, rgba(216,154,92,0.18), transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
      )}

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          {...(isMobile
            ? { initial: false }
            : {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: '-100px' },
                transition: { duration: 0.8 },
              })}
          style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 4rem' }}
        >
          <div className="eyebrow">02 / Three rooms</div>
          <RevealText as="h2" style={{ fontSize: 'clamp(2.4rem, 4.6vw, 3.6rem)', margin: '0 0 1rem', letterSpacing: '-0.015em' }}>
            One practice. <em>Three rooms.</em>
          </RevealText>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
            Most people find this work through one door. It helps to know there are three — and which one you are walking through.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Card 1: Speaking */}
          <motion.div
            {...(isMobile
              ? { initial: false }
              : {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: '-50px' },
                  transition: { duration: 0.7 },
                })}
          >
            <TiltCard
              whileHover={{ y: -6 }}
              className="audience-card"
              style={{
                background: 'var(--bg-surface)',
                borderRadius: '18px',
                padding: 'clamp(1.75rem, 4vw, 3.5rem)',
                display: 'grid',
                gap: 'clamp(2rem, 4vw, 3.5rem)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid rgba(0,0,0,0.03)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span aria-hidden style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                background: 'linear-gradient(90deg, var(--accent-deep), var(--accent-primary), var(--accent-amber))',
              }} />
              <div>
                <motion.div
                  {...(isMobile
                    ? { initial: false }
                    : {
                        initial: { opacity: 0, scale: 0.85 },
                        whileInView: { opacity: 1, scale: 1 },
                        viewport: { once: true },
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      })}
                  style={{
                    fontFamily: 'var(--font-heading)', fontStyle: 'italic',
                    fontSize: 'clamp(3.4rem, 8vw, 5.5rem)', lineHeight: 1, marginBottom: '1rem',
                    background: 'linear-gradient(135deg, var(--accent-deep), var(--accent-amber))',
                    WebkitBackgroundClip: 'text', backgroundClip: 'text',
                    color: 'transparent', WebkitTextFillColor: 'transparent',
                  }}
                >
                  01
                </motion.div>
                <div style={{ fontSize: '12.5px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '1.25rem' }}>
                  For event organizers
                </div>
                <h3 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', letterSpacing: '-0.01em', margin: '0 0 1rem', lineHeight: 1.15 }}>
                  A keynote built for rooms that can't <em style={{ fontStyle: 'italic', color: 'var(--accent-primary)' }}>afford a bad hour.</em>
                </h3>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-main)', marginBottom: '1rem' }}>
                  C-Suite off-sites · Medical conventions · Arts Galas
                </div>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  A 45-minute lecture on <em>Professional Drift</em> — what it is, how it decays character, and the specific practice that reclaims presence. Adapted to your industry's language.
                </p>
                <motion.a
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                  href="mailto:tristian@tristianwalker.com"
                  className="btn btn-primary"
                  style={{ display: 'inline-block', textDecoration: 'none' }}
                >
                  Request a booking kit →
                </motion.a>
              </div>
              <div style={{
                background: 'var(--bg-parchment)', borderRadius: '14px', padding: '2rem',
                border: '1px solid rgba(188,116,78,0.10)', position: 'relative',
              }}>
                <div style={{
                  alignSelf: 'flex-start', fontSize: '12.5px', letterSpacing: '0.4em',
                  textTransform: 'uppercase', fontWeight: 700, color: 'var(--accent-primary)',
                  marginBottom: '1.25rem', paddingBottom: '0.75rem',
                  borderBottom: '1px solid rgba(188,116,78,0.2)',
                }}>
                  What the lecture covers
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['The Foundation: Character at Scale', 'The Diagnosis: The Wall of Anonymity', 'The Reframe: The Compass of Presence', 'The Close: The Quiet Line & The Flicker'].map((item, i) => (
                    <motion.li
                      key={i}
                      {...(isMobile
                        ? { initial: false }
                        : {
                            initial: { opacity: 0, x: -12 },
                            whileInView: { opacity: 1, x: 0 },
                            viewport: { once: true },
                            transition: { duration: 0.5, delay: 0.12 * i },
                            whileHover: { x: 6, color: 'var(--accent-primary)' },
                          })}
                      style={{
                        display: 'flex', gap: '1rem', padding: '1rem 0',
                        borderTop: i === 0 ? 'none' : '1px dashed rgba(0,0,0,0.08)',
                        cursor: 'default',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-primary)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                        0{i + 1}
                      </span>
                      <span style={{ color: 'inherit', fontSize: '0.95rem' }}>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 2: Book */}
          <motion.div
            {...(isMobile
              ? { initial: false }
              : {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: '-50px' },
                  transition: { duration: 0.7 },
                })}
          >
            <TiltCard
              whileHover={{ y: -6 }}
              className="audience-card"
              style={{
                background: 'var(--bg-surface)',
                borderRadius: '18px',
                padding: 'clamp(1.75rem, 4vw, 3.5rem)',
                display: 'grid',
                gap: 'clamp(2rem, 4vw, 3.5rem)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid rgba(0,0,0,0.03)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span aria-hidden style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                background: 'linear-gradient(90deg, var(--accent-amber), var(--accent-primary), var(--accent-deep))',
              }} />
              <div>
                <motion.div
                  {...(isMobile
                    ? { initial: false }
                    : {
                        initial: { opacity: 0, scale: 0.85 },
                        whileInView: { opacity: 1, scale: 1 },
                        viewport: { once: true },
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      })}
                  style={{
                    fontFamily: 'var(--font-heading)', fontStyle: 'italic',
                    fontSize: '5.5rem', lineHeight: 1, marginBottom: '1rem',
                    background: 'linear-gradient(135deg, var(--accent-amber), var(--accent-deep))',
                    WebkitBackgroundClip: 'text', backgroundClip: 'text',
                    color: 'transparent', WebkitTextFillColor: 'transparent',
                  }}
                >
                  02
                </motion.div>
                <div style={{ fontSize: '12.5px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '1.25rem' }}>
                  For readers
                </div>
                <h3 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)', letterSpacing: '-0.01em', margin: '0 0 1rem', lineHeight: 1.15 }}>
                  The Quiet <em style={{ fontStyle: 'italic', color: 'var(--accent-primary)' }}>Line.</em>
                </h3>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-main)', marginBottom: '1rem' }}>
                  A book for the capable & quietly disconnected
                </div>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  A measured, literary reckoning with <strong style={{ color: 'var(--text-main)' }}>professional drift</strong> — the slow trade of presence for process, and the practice that brings a person back.
                </p>
                <motion.a
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                  href="https://quietlinebook.com"
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'inline-block', textDecoration: 'none' }}
                >
                  Visit quietlinebook.com →
                </motion.a>
              </div>

              <div style={{
                background: 'var(--bg-parchment)', borderRadius: '14px', padding: '2rem',
                border: '1px solid rgba(188,116,78,0.10)', display: 'flex',
                flexDirection: 'column', alignItems: 'center',
              }}>
                <div style={{
                  alignSelf: 'flex-start', fontSize: '12.5px', letterSpacing: '0.4em',
                  textTransform: 'uppercase', fontWeight: 700, color: 'var(--accent-primary)',
                  marginBottom: '2rem', paddingBottom: '0.75rem',
                  borderBottom: '1px solid rgba(188,116,78,0.2)', width: '100%',
                }}>
                  The Book
                </div>

                <motion.a
                  href="https://quietlinebook.com"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ rotateY: 18, rotateX: 4, scale: 1.06, y: -6 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                  style={{
                    display: 'block',
                    width: 'min(250px, 70vw)',
                    aspectRatio: '2/3',
                    backgroundColor: 'var(--bg-dark)',
                    boxShadow: '0 30px 60px rgba(140,70,40,0.35), 0 8px 20px rgba(0,0,0,0.18)',
                    borderRadius: '4px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d',
                    margin: '1rem auto',
                  }}
                >
                  <img
                    src="/brand/book-cover-new.jpg"
                    alt="The Quiet Line Book Cover"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML =
                        '<div style="position: absolute; inset: 0; background: linear-gradient(135deg, var(--accent-deep), var(--accent-primary), var(--accent-amber)); display: flex; flex-direction: column; padding: 1.5rem; justify-content: center; align-items: center; text-align: center;"><div style="font-size: 8px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,255,255,0.7); margin-bottom: 1rem;">Tristian Walker</div><div style="font-family: var(--font-heading); font-size: 1.4rem; color: #fff; line-height: 1.2;">The Quiet<br/><em style="font-style: italic;">Line.</em></div></div>';
                    }}
                  />
                  {/* spine highlight */}
                  <span aria-hidden style={{
                    position: 'absolute', top: 0, bottom: 0, left: 0, width: 6,
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.30), rgba(0,0,0,0))',
                  }} />
                </motion.a>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      <style>{`
        .audience-card { grid-template-columns: 1fr 1.4fr; }
        @media (max-width: 900px) {
          .audience-card { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
