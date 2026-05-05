import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { essays } from '../content/loadEssays';
import Navigation from './Navigation';
import Footer from './Footer';

export default function EssayIndex() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navigation />
      <main style={{ background: 'var(--bg-base)', minHeight: '100vh', paddingTop: '8rem' }}>
        <section style={{ padding: '2rem 0 6rem' }}>
          <div className="wrap">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ maxWidth: '760px', marginBottom: '4rem' }}
            >
              <div className="eyebrow">All writing</div>
              <h1 style={{ fontSize: 'clamp(2.4rem, 4.6vw, 3.6rem)', margin: 0, letterSpacing: '-0.015em' }}>
                Essays, <em>letters, lecture notes.</em>
              </h1>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-muted)', marginTop: '1.25rem' }}>
                Short pieces that travel further than the keynote can reach. New entry roughly every three weeks.
              </p>
            </motion.div>

            <ol className="essay-index">
              {essays.map((essay, i) => (
                <motion.li
                  key={essay.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Row navigation temporarily disabled — interior pages
                      not yet populated. Render row markup as a div so the
                      list still reads correctly. */}
                  <div className="essay-index__row" aria-disabled="true">
                    <span className="essay-index__num">{essay.num}</span>
                    <span className="essay-index__inner">
                      <span className="essay-index__type">{essay.type}</span>
                      <span className="essay-index__title">{essay.title}</span>
                      <span className="essay-index__meta">
                        {essay.date && new Date(essay.date + 'T00:00:00').toLocaleDateString('en-US', {
                          year: 'numeric', month: 'long', day: 'numeric',
                        })}
                        <span className="essay-index__dot" />
                        {essay.readTime}
                      </span>
                    </span>
                    <span className="essay-index__arrow" aria-hidden>→</span>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .essay-index {
          list-style: none;
          padding: 0;
          margin: 0;
          border-top: 1px solid rgba(0,0,0,0.08);
        }
        .essay-index li { border-bottom: 1px solid rgba(0,0,0,0.08); }
        .essay-index__row {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          align-items: center;
          gap: 1.5rem;
          padding: 2rem 0;
          text-decoration: none;
          color: inherit;
          transition: background .25s ease, padding .25s ease;
        }
        .essay-index__row:hover {
          background: linear-gradient(90deg, rgba(188,116,78,0.06), transparent 75%);
          padding-left: 1rem;
          padding-right: 1rem;
        }
        .essay-index__num {
          font-family: var(--font-heading);
          font-style: italic;
          font-size: 1.4rem;
          color: var(--accent-primary);
          letter-spacing: 0.05em;
        }
        .essay-index__inner {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .essay-index__type {
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--accent-primary);
        }
        .essay-index__title {
          font-family: var(--font-heading);
          font-size: clamp(1.2rem, 2.2vw, 1.65rem);
          line-height: 1.25;
          letter-spacing: -0.01em;
          color: var(--text-main);
          text-wrap: balance;
        }
        .essay-index__title em { color: var(--accent-primary); font-style: italic; font-weight: 700; }
        .essay-index__meta {
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-top: 0.25rem;
        }
        .essay-index__dot { width: 3px; height: 3px; background: var(--accent-primary); border-radius: 50%; }
        .essay-index__arrow {
          font-size: 1.4rem;
          color: var(--accent-primary);
          opacity: 0.6;
          transition: transform .3s ease, opacity .3s ease;
        }
        .essay-index__row:hover .essay-index__arrow {
          transform: translateX(6px);
          opacity: 1;
        }
        @media (max-width: 600px) {
          .essay-index__row { grid-template-columns: 60px 1fr auto; gap: 1rem; padding: 1.5rem 0; }
          .essay-index__num { font-size: 1.15rem; }
        }
      `}</style>
    </>
  );
}
