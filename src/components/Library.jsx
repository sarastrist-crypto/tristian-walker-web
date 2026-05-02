import { motion } from 'framer-motion';
import { BookOpen, Feather, Mic, User } from 'lucide-react';
import RevealText from './RevealText';
import { useReveal } from '../hooks/useReveal';
import { useIsMobile } from '../hooks/useIsMobile';

const SHELVES = [
  {
    icon: BookOpen,
    numeral: 'I',
    eyebrow: 'The Book',
    title: <>The Quiet <em>Line.</em></>,
    body:
      'A measured, literary reckoning with professional drift — and the practice that brings a person back. Available now.',
    cta: 'Order the book →',
    href: 'https://thequietlinebook.com',
    external: true,
  },
  {
    icon: Feather,
    numeral: 'II',
    eyebrow: 'Essays & Letters',
    title: <>The <em>writing.</em></>,
    body:
      'Essays, letters, and lecture notes — short pieces that travel further than the keynote can reach. New entry roughly every three weeks.',
    cta: 'Read the latest →',
    href: '#writing',
    external: false,
  },
  {
    icon: Mic,
    numeral: 'III',
    eyebrow: 'The Lecture',
    title: <>Professional <em>Drift.</em></>,
    body:
      "A 45-minute lecture for rooms that can't afford a bad hour. Adapted to your industry — boards, hospitals, conservatories, festivals.",
    cta: 'Request a booking kit →',
    href: 'mailto:tristian@tristianwalker.com',
    external: false,
  },
  {
    icon: User,
    numeral: 'IV',
    eyebrow: 'About Tristian',
    title: <>The <em>bio.</em></>,
    body:
      'Twenty years inside the highest stakes of corporate and hospitality leadership — the foundation under everything else on this site.',
    cta: 'Read the bio →',
    href: '#about',
    external: false,
  },
];

export default function Library() {
  const isMobile = useIsMobile();
  const headerReveal = useReveal({ y: 24, duration: 0.7 });
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
          {...headerReveal}
          style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 4rem' }}
        >
          <div className="eyebrow">Everything · in one source</div>
          <RevealText
            as="h2"
            style={{
              fontSize: 'clamp(2.4rem, 4.6vw, 3.6rem)',
              margin: '0 0 1rem',
              letterSpacing: '-0.015em',
            }}
          >
            The book. The writing. The <em>lecture.</em>
          </RevealText>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
            One shelf. Pick your door.
          </p>
        </motion.div>

        <div className="library-grid">
          {SHELVES.map((shelf, i) => {
            const Icon = shelf.icon;
            return (
              <motion.a
                key={i}
                href={shelf.href}
                target={shelf.external ? '_blank' : undefined}
                rel={shelf.external ? 'noreferrer' : undefined}
                {...(isMobile
                  ? { initial: false }
                  : {
                      initial: { opacity: 0, y: 36 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, margin: '-50px' },
                      transition: { duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
                      whileHover: { y: -8 },
                    })}
                className="library-card"
              >
                {/* Top accent strip */}
                <span aria-hidden className="library-card__strip" />

                {/* Centered formal icon medallion */}
                <div className="library-card__medallion">
                  <span aria-hidden className="library-card__ring library-card__ring--outer" />
                  <span aria-hidden className="library-card__ring library-card__ring--inner" />
                  <Icon
                    size={44}
                    strokeWidth={1.25}
                    color="var(--accent-primary)"
                    className="library-card__icon"
                    aria-hidden
                  />
                </div>

                {/* Roman numeral — literary catalog feel */}
                <div className="library-card__numeral">{shelf.numeral}</div>

                {/* Ornamental hairline divider */}
                <span aria-hidden className="library-card__divider" />

                <div className="library-card__eyebrow">{shelf.eyebrow}</div>

                <h3 className="library-card__title">{shelf.title}</h3>

                <p className="library-card__body">{shelf.body}</p>

                <div className="library-card__cta">{shelf.cta}</div>
              </motion.a>
            );
          })}
        </div>
      </div>

      <style>{`
        .library-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.75rem;
        }

        .library-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: var(--bg-surface);
          border-radius: 18px;
          padding: 3rem 1.75rem 2.25rem;
          text-decoration: none;
          color: var(--text-main);
          border: 1px solid rgba(0,0,0,0.04);
          box-shadow: var(--shadow-md);
          overflow: hidden;
          isolation: isolate;
          min-height: 460px;
          transition: box-shadow .35s ease;
        }
        .library-card:hover { box-shadow: var(--shadow-warm); }

        .library-card__strip {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--accent-deep), var(--accent-primary), var(--accent-amber), var(--accent-gold));
        }

        /* Medallion: large centered icon framed by a double hairline ring */
        .library-card__medallion {
          position: relative;
          width: 110px;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: var(--accent-primary);
        }
        .library-card__ring {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .library-card__ring--outer {
          inset: 0;
          border: 1px solid rgba(188,116,78,0.45);
          background:
            radial-gradient(circle at 50% 30%, rgba(216,154,92,0.18), transparent 70%);
          transition: transform .6s cubic-bezier(.16,1,.3,1);
        }
        .library-card__ring--inner {
          inset: 8px;
          border: 1px solid rgba(188,116,78,0.18);
        }
        .library-card:hover .library-card__ring--outer {
          transform: rotate(45deg) scale(1.04);
        }

        .library-card__icon {
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 4px 8px rgba(140,70,40,0.18));
        }

        .library-card__numeral {
          font-family: var(--font-heading);
          font-style: italic;
          font-size: 1.6rem;
          color: var(--accent-primary);
          line-height: 1;
          margin-bottom: .9rem;
          letter-spacing: 0.05em;
        }

        .library-card__divider {
          width: 36px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
          margin: 0 auto 1rem;
          display: block;
        }

        .library-card__eyebrow {
          font-size: 10.5px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--accent-primary);
          margin-bottom: .85rem;
        }

        .library-card__title {
          font-size: 1.6rem;
          margin: 0 0 .85rem;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .library-card__body {
          font-size: .94rem;
          line-height: 1.6;
          color: var(--text-muted);
          margin: 0;
          flex-grow: 1;
        }

        .library-card__cta {
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          width: 100%;
          border-top: 1px dashed rgba(0,0,0,0.08);
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--accent-primary);
        }

        /* Tablet */
        @media (max-width: 1100px) {
          .library-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .library-grid { grid-template-columns: 1fr; gap: 1.25rem; }
          .library-card {
            padding: 2.5rem 1.5rem 2rem;
            min-height: 0;
          }
          .library-card__medallion { width: 96px; height: 96px; }
          .library-card__title { font-size: 1.45rem; }
        }
      `}</style>

    </section>
  );
}
