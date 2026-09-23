import { motion } from 'framer-motion';
import RevealText from './RevealText';
import { useIsMobile } from '../hooks/useIsMobile';
import { essays as ALL_ESSAYS } from '../content/loadEssays';

const LINK_TEXT = {
  Essay: 'Read the essay →',
  Letter: 'Read the letter →',
  'Lecture note': 'Read the notes →',
};

function formatMonthYear(iso) {
  if (!iso) return '';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
}

export default function Writing() {
  const isMobile = useIsMobile();
  const ESSAYS = ALL_ESSAYS.slice(0, 3);

  return (
    <section id="writing" style={{ background: 'var(--bg-base)', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '2rem',
            marginBottom: '3.5rem',
            flexWrap: 'wrap',
          }}
        >
          <motion.div
            {...(isMobile
              ? { initial: false }
              : {
                  initial: { opacity: 0, x: -20 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                })}
          >
            <div className="eyebrow">04 / Recent writing</div>
            <RevealText
              as="h2"
              style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', margin: 0, letterSpacing: '-0.015em' }}
            >
              Essays, <em>letters, lecture notes.</em>
            </RevealText>
          </motion.div>
          {/* "All essays →" link temporarily disabled — interior pages not
              yet ready. Render as a non-interactive span to preserve layout. */}
          <motion.div
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
          >
            <span
              aria-disabled="true"
              style={{
                fontSize: '11px',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                paddingBottom: '0.25rem',
                borderBottom: '1px solid rgba(188,116,78,0.35)',
                textDecoration: 'none',
                cursor: 'default',
              }}
            >
              All essays →
            </span>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {ESSAYS.map((essay, i) => {
            return (
              // Card navigation temporarily disabled — interior essay/letter/
              // lecture-note pages not yet ready. Cards remain visible so the
              // section reads as designed during the talk; clicks are no-ops.
              <div
                key={essay.slug}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <motion.article
                  {...(isMobile
                    ? { initial: false }
                    : {
                        initial: { opacity: 0, y: 30 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true },
                        transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                      })}
                  style={{
                    background: 'var(--bg-surface)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'default',
                    transition: 'box-shadow .35s ease',
                    height: '100%',
                  }}
                  className="essay-card"
                >
                  {/* Cover — photograph + slow drift, gradient for legibility,
                      per-card color tint to preserve brand identity. */}
                  <div className={`essay-cover essay-cover--${essay.num}`}>
                    <div
                      className="essay-cover__photo"
                      style={{ backgroundImage: `url('${essay.cover}')` }}
                      aria-hidden
                    />
                    <span
                      className="essay-cover__tint"
                      style={{ background: essay.tint }}
                      aria-hidden
                    />
                    <span className="essay-cover__shade" aria-hidden />

                    <div className="essay-cover__type">{essay.type}</div>
                    <div className="essay-cover__pull">{essay.pull}</div>
                  </div>

                  {/* Body */}
                  <div
                    style={{
                      padding: '1.75rem 1.75rem 1.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                      gap: '0.85rem',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        display: 'flex',
                        gap: '0.85rem',
                        alignItems: 'center',
                      }}
                    >
                      <span>{formatMonthYear(essay.date)}</span>
                      <span style={{ width: '3px', height: '3px', background: 'var(--accent-primary)', borderRadius: '50%' }} />
                      <span>{essay.readTime}</span>
                    </div>
                    <h3
                      style={{
                        fontSize: '1.3rem',
                        lineHeight: 1.2,
                        margin: 0,
                        letterSpacing: '-0.01em',
                        textWrap: 'balance',
                      }}
                    >
                      {essay.title}
                    </h3>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.55, color: 'var(--text-muted)', flexGrow: 1, margin: 0 }}>
                      {essay.dek}
                    </p>
                    <div
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        color: 'var(--accent-primary)',
                        paddingTop: '0.85rem',
                        borderTop: '1px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      {LINK_TEXT[essay.type] || 'Read more →'}
                    </div>
                  </div>
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .essay-card:hover { box-shadow: var(--shadow-warm); }
        @media (hover: none) and (pointer: coarse) {
          .essay-card:hover { box-shadow: var(--shadow-md); }
        }

        .essay-cover {
          position: relative;
          aspect-ratio: 4/3;
          padding: 1.5rem 1.5rem 1.5rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #1a1714;
          isolation: isolate;
        }
        .essay-cover__photo {
          position: absolute;
          inset: -4%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          will-change: transform;
          transform: scale(1.04);
          z-index: 0;
        }
        .essay-cover__tint,
        .essay-cover__shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .essay-cover__shade {
          background: linear-gradient(
            180deg,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0) 45%,
            rgba(20,18,16,0.55) 100%
          );
        }
        .essay-cover__type {
          position: relative;
          z-index: 2;
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          font-weight: 700;
          color: rgba(255,255,255,0.92);
          text-shadow: 0 1px 8px rgba(0,0,0,0.45);
        }
        .essay-cover__pull {
          position: relative;
          z-index: 2;
          font-family: var(--font-heading);
          font-style: italic;
          font-size: 1.15rem;
          line-height: 1.3;
          color: rgba(255,255,255,0.96);
          text-shadow: 0 2px 14px rgba(0,0,0,0.55);
          max-width: 92%;
        }

        /* Slow drift / Ken Burns — different motion per card to match intent.
           017 forward push (motion.movement.), 016 lateral drift (presence
           muffled), 015 slow zoom (held breath before the room). */
        @media (prefers-reduced-motion: no-preference) {
          .essay-cover--017 .essay-cover__photo {
            animation: cover-push 18s ease-in-out infinite;
          }
          .essay-cover--016 .essay-cover__photo {
            animation: cover-drift 22s ease-in-out infinite;
          }
          .essay-cover--015 .essay-cover__photo {
            animation: cover-breath 16s ease-in-out infinite;
          }
          .essay-card:hover .essay-cover__photo {
            animation-play-state: paused;
            transform: scale(1.10);
            transition: transform 1.6s cubic-bezier(.16,1,.3,1);
          }
        }
        @keyframes cover-push {
          0%, 100% { transform: scale(1.04) translate(0, 0); }
          50%      { transform: scale(1.10) translate(-8px, -4px); }
        }
        @keyframes cover-drift {
          0%, 100% { transform: scale(1.05) translate(0, 0); }
          50%      { transform: scale(1.07) translate(10px, -3px); }
        }
        @keyframes cover-breath {
          0%, 100% { transform: scale(1.04) translate(0, 0); }
          50%      { transform: scale(1.10) translate(0, -6px); }
        }
      `}</style>
    </section>
  );
}
