import { motion } from 'framer-motion';
import RevealText from './RevealText';

const ESSAYS = [
  {
    type: 'Essay', num: '017', date: 'April 2026', readTime: '12 min read',
    title: <>Motion is when you are tired. <em style={{ fontStyle: 'italic', color: 'var(--accent-amber)', fontWeight: 400 }}>Movement</em> is when you are somewhere new.</>,
    dek: "A short piece on the distinction I keep returning to from the stage — and how to tell, on a Tuesday at 3 PM, which one you're actually in.",
    linkText: 'Read the essay →',
    bg: 'radial-gradient(ellipse 320px 220px at 30% 30%, rgba(216,154,92,0.35), transparent 65%), linear-gradient(135deg, #BC744E 0%, #5c453a 100%)',
  },
  {
    type: 'Letter', num: '016', date: 'March 2026', readTime: '9 min read',
    title: <>A letter to the <em style={{ fontStyle: 'italic', color: 'var(--accent-amber)', fontWeight: 400 }}>capable and quietly disconnected.</em></>,
    dek: 'On the exact words I use with readers who write in saying "I don\'t know when I stopped being present, but I know I have stopped."',
    linkText: 'Read the letter →',
    bg: 'radial-gradient(ellipse 280px 200px at 70% 40%, rgba(212,176,104,0.38), transparent 65%), linear-gradient(160deg, #312d29 0%, #1a1a1a 100%)',
  },
  {
    type: 'Lecture note', num: '015', date: 'February 2026', readTime: '15 min read',
    title: <>Three questions I ask before <em style={{ fontStyle: 'italic', color: 'var(--accent-amber)', fontWeight: 400 }}>every keynote.</em></>,
    dek: 'A behind-the-scenes look at the prep ritual for a large room — and why the most important question has nothing to do with the talk.',
    linkText: 'Read the notes →',
    bg: 'radial-gradient(ellipse 280px 200px at 50% 70%, rgba(216,154,92,0.35), transparent 60%), linear-gradient(135deg, #C4A484 0%, #7a5e43 100%)',
  },
];

export default function Writing() {
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
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
            whileHover={{ x: 6 }}
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {ESSAYS.map((essay, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
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
              <motion.div
                whileHover={{ scale: 1.06 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                style={{
                  aspectRatio: '16/10',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.5rem',
                  color: '#fff',
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontSize: '0.95rem',
                  letterSpacing: '0.02em',
                  background: essay.bg,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span
                  aria-hidden
                  className="essay-card__sheen"
                  style={{
                    position: 'absolute',
                    inset: '-50%',
                    background:
                      'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 1.1s ease',
                    pointerEvents: 'none',
                  }}
                />
                <span
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    fontStyle: 'normal',
                    fontFamily: 'var(--font-body)',
                    color: 'rgba(255,255,255,0.92)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {essay.type} &nbsp;·&nbsp; {essay.num}
                </span>
              </motion.div>
              <div
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  gap: '1rem',
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
                    gap: '1rem',
                    alignItems: 'center',
                  }}
                >
                  <span>{essay.date}</span>
                  <div style={{ width: '3px', height: '3px', background: 'var(--accent-primary)', borderRadius: '50%' }} />
                  <span>{essay.readTime}</span>
                </div>
                <h3
                  style={{
                    fontSize: '1.35rem',
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
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  {essay.linkText}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .essay-card:hover { box-shadow: var(--shadow-warm); }
        .essay-card:hover .essay-card__sheen { transform: translateX(100%); }
      `}</style>
    </section>
  );
}
