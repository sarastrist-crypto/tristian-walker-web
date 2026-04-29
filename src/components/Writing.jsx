import { motion } from 'framer-motion';
import { Feather, Mail, Mic } from 'lucide-react';
import RevealText from './RevealText';
import { useIsMobile } from '../hooks/useIsMobile';

const ESSAYS = [
  {
    type: 'Essay',
    typeFull: 'The essay',
    icon: Feather,
    num: '017',
    pull: 'Motion. Movement.',
    date: 'April 2026',
    readTime: '12 min read',
    title: <>Motion is when you are tired. <em style={{ fontStyle: 'italic', color: 'var(--accent-amber)', fontWeight: 400 }}>Movement</em> is when you are somewhere new.</>,
    dek: "A short piece on the distinction I keep returning to from the stage — and how to tell, on a Tuesday at 3 PM, which one you're actually in.",
    linkText: 'Read the essay →',
    palette: {
      bg: 'linear-gradient(160deg, #C7855E 0%, #A05E3D 60%, #7A4528 100%)',
      numeral: 'rgba(255,255,255,0.92)',
      pull: 'rgba(255,255,255,0.85)',
      meta: 'rgba(255,255,255,0.70)',
      icon: 'rgba(255,255,255,0.18)',
      rule: 'rgba(255,255,255,0.30)',
    },
  },
  {
    type: 'Letter',
    typeFull: 'The letter',
    icon: Mail,
    num: '016',
    pull: 'To the quietly disconnected.',
    date: 'March 2026',
    readTime: '9 min read',
    title: <>A letter to the <em style={{ fontStyle: 'italic', color: 'var(--accent-amber)', fontWeight: 400 }}>capable and quietly disconnected.</em></>,
    dek: 'On the exact words I use with readers who write in saying "I don\'t know when I stopped being present, but I know I have stopped."',
    linkText: 'Read the letter →',
    palette: {
      bg: 'linear-gradient(160deg, #3A332D 0%, #1F1B17 100%)',
      numeral: '#D89A5C',
      pull: 'rgba(255,255,255,0.92)',
      meta: 'rgba(216,154,92,0.85)',
      icon: 'rgba(216,154,92,0.18)',
      rule: 'rgba(216,154,92,0.30)',
    },
  },
  {
    type: 'Lecture note',
    typeFull: 'The lecture',
    icon: Mic,
    num: '015',
    pull: 'Three questions before the room.',
    date: 'February 2026',
    readTime: '15 min read',
    title: <>Three questions I ask before <em style={{ fontStyle: 'italic', color: 'var(--accent-amber)', fontWeight: 400 }}>every keynote.</em></>,
    dek: 'A behind-the-scenes look at the prep ritual for a large room — and why the most important question has nothing to do with the talk.',
    linkText: 'Read the notes →',
    palette: {
      bg: 'linear-gradient(160deg, #D4B068 0%, #A88547 60%, #7A5E33 100%)',
      numeral: 'rgba(255,255,255,0.95)',
      pull: 'rgba(255,255,255,0.88)',
      meta: 'rgba(255,255,255,0.72)',
      icon: 'rgba(255,255,255,0.20)',
      rule: 'rgba(255,255,255,0.32)',
    },
  },
];

export default function Writing() {
  const isMobile = useIsMobile();

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
          <motion.a
            whileHover={isMobile ? undefined : { x: 6 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            href="#writing"
            style={{
              fontSize: '11px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: 'var(--accent-primary)',
              paddingBottom: '0.25rem',
              borderBottom: '1px solid rgba(188,116,78,0.35)',
              textDecoration: 'none',
            }}
          >
            All essays →
          </motion.a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {ESSAYS.map((essay, i) => {
            const Icon = essay.icon;
            return (
              <motion.article
                key={i}
                {...(isMobile
                  ? { initial: false }
                  : {
                      initial: { opacity: 0, y: 30 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                      whileHover: { y: -10 },
                    })}
                style={{
                  background: 'var(--bg-surface)',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'box-shadow .35s ease',
                }}
                className="essay-card"
              >
                {/* Cover — typographic composition. Big italic numeral as the
                    visual anchor, watermark icon, type label + date. No more
                    "blob": each cover communicates type, number, and a pull
                    line at a glance. */}
                <div
                  className="essay-cover"
                  style={{
                    position: 'relative',
                    aspectRatio: '4/3',
                    padding: '1.5rem 1.5rem 1.25rem',
                    background: essay.palette.bg,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Watermark icon, top-right */}
                  <Icon
                    aria-hidden
                    size={92}
                    strokeWidth={1.1}
                    style={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      color: essay.palette.icon,
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Top: type label */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      fontSize: '10px',
                      letterSpacing: '0.4em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      color: essay.palette.meta,
                    }}
                  >
                    {essay.type}
                  </div>

                  {/* Center: huge italic numeral */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      fontFamily: 'var(--font-heading)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(4.2rem, 11vw, 6rem)',
                      lineHeight: 0.9,
                      color: essay.palette.numeral,
                      letterSpacing: '-0.02em',
                      marginTop: '0.5rem',
                      textShadow: '0 4px 20px rgba(0,0,0,0.18)',
                    }}
                  >
                    {essay.num}
                  </div>

                  {/* Hairline + pull line */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div
                      style={{
                        width: 36,
                        height: 1,
                        background: essay.palette.rule,
                        marginBottom: '0.75rem',
                      }}
                    />
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontStyle: 'italic',
                        fontSize: '1rem',
                        lineHeight: 1.3,
                        color: essay.palette.pull,
                      }}
                    >
                      {essay.pull}
                    </div>
                  </div>
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
                    <span>{essay.date}</span>
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
                    {essay.linkText}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <style>{`
        .essay-card:hover { box-shadow: var(--shadow-warm); }
        @media (hover: none) and (pointer: coarse) {
          .essay-card:hover { box-shadow: var(--shadow-md); }
        }
      `}</style>
    </section>
  );
}
