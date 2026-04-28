import { motion } from 'framer-motion';
import { BookOpen, Mic, FileText, User } from 'lucide-react';
import RevealText from './RevealText';

const SHELVES = [
  {
    icon: BookOpen,
    eyebrow: 'The Book',
    title: <>The Quiet <em>Line.</em></>,
    body: 'A measured, literary reckoning with professional drift — and the practice that brings a person back. Available now.',
    cta: 'Order the book →',
    href: 'https://quietlinebook.com',
    external: true,
    accent: 'linear-gradient(135deg, #BC744E 0%, #8B4A2A 100%)',
  },
  {
    icon: FileText,
    eyebrow: 'Essays & Letters',
    title: <>The <em>writing.</em></>,
    body: 'Essays, letters, and lecture notes — short pieces that travel further than the keynote can reach. New entry roughly every three weeks.',
    cta: 'Read the latest →',
    href: '#writing',
    external: false,
    accent: 'linear-gradient(135deg, #C28B6E 0%, #BC744E 100%)',
  },
  {
    icon: Mic,
    eyebrow: 'The Lecture',
    title: <>Professional <em>Drift.</em></>,
    body: 'A 45-minute lecture for rooms that can\'t afford a bad hour. Adapted to your industry — boards, hospitals, conservatories, festivals.',
    cta: 'Request a booking kit →',
    href: 'mailto:tristian@tristianwalker.com',
    external: false,
    accent: 'linear-gradient(135deg, #D89A5C 0%, #BC744E 100%)',
  },
  {
    icon: User,
    eyebrow: 'About Tristian',
    title: <>The <em>bio.</em></>,
    body: 'Twenty years inside the highest stakes of corporate and hospitality leadership — the foundation under everything else on this site.',
    cta: 'Read the bio →',
    href: '#about',
    external: false,
    accent: 'linear-gradient(135deg, #D4B068 0%, #BC744E 100%)',
  },
];

export default function Library() {
  return (
    <section
      id="library"
      style={{
        padding: '8rem 0',
        background:
          'radial-gradient(ellipse 1100px 500px at 50% 0%, rgba(216,154,92,0.10), transparent 70%), var(--bg-base)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 4rem' }}
        >
          <div className="eyebrow">Everything · in one source</div>
          <RevealText
            as="h2"
            style={{ fontSize: 'clamp(2.4rem, 4.6vw, 3.6rem)', margin: '0 0 1rem', letterSpacing: '-0.015em' }}
          >
            The book. The writing. The <em>lecture.</em>
          </RevealText>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
            One shelf. Pick your door.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {SHELVES.map((shelf, i) => {
            const Icon = shelf.icon;
            return (
              <motion.a
                key={i}
                href={shelf.href}
                target={shelf.external ? '_blank' : undefined}
                rel={shelf.external ? 'noreferrer' : undefined}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--bg-surface)',
                  borderRadius: '18px',
                  padding: '2.25rem 2rem 2rem',
                  textDecoration: 'none',
                  color: 'var(--text-main)',
                  border: '1px solid rgba(0,0,0,0.04)',
                  boxShadow: 'var(--shadow-md)',
                  overflow: 'hidden',
                  isolation: 'isolate',
                  minHeight: '320px',
                  transition: 'box-shadow .35s ease, transform .35s ease',
                }}
                className="library-card"
              >
                {/* Top accent strip */}
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: shelf.accent,
                  }}
                />
                {/* Hover gradient wash */}
                <span
                  aria-hidden
                  className="library-card__wash"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: shelf.accent,
                    opacity: 0,
                    transition: 'opacity .45s ease',
                    zIndex: -1,
                  }}
                />

                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    background: 'rgba(188,116,78,0.10)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: 'var(--accent-primary)',
                  }}
                >
                  <Icon size={24} strokeWidth={1.6} />
                </div>

                <div
                  style={{
                    fontSize: '10.5px',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    color: 'var(--accent-primary)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {shelf.eyebrow}
                </div>

                <h3
                  style={{
                    fontSize: '1.7rem',
                    margin: '0 0 0.75rem',
                    lineHeight: 1.15,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {shelf.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.97rem',
                    lineHeight: 1.6,
                    color: 'var(--text-muted)',
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {shelf.body}
                </p>

                <div
                  style={{
                    marginTop: '1.75rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px dashed rgba(0,0,0,0.08)',
                    fontSize: '11px',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    color: 'var(--accent-primary)',
                  }}
                >
                  {shelf.cta}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      <style>{`
        .library-card:hover { box-shadow: var(--shadow-warm); }
        .library-card:hover .library-card__wash { opacity: 0.06; }
      `}</style>
    </section>
  );
}
