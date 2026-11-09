import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

// ─── Episode 1 ──────────────────────────────────────────────────────────
// Paste the YouTube link here once episode 1 is public. Any normal YouTube
// URL works (watch?v=, youtu.be/, or /embed/). Empty string shows the
// placeholder band instead of the player.
const EPISODE_1_URL = '';

const BOOKING_EMAIL = 'tristian@cobbledworks.com';
const BOOKING_PHONE_DISPLAY = '813-955-6273';
const BOOKING_PHONE_TEL = '+18139556273';

const SEGMENTS = [
  {
    num: '01',
    title: 'The quote from the truck',
    body: 'Leave the prices blank and let AI draft the rest of the quote. Your listeners walk away able to send a clean, professional quote from the driveway, before they pull out for the next stop.',
  },
  {
    num: '02',
    title: 'The one-star review',
    body: 'Give AI the facts of what happened and it writes the reply. Your listeners walk away able to answer a bad review calmly, in their own voice, without losing the evening to it.',
  },
  {
    num: '03',
    title: 'The receipt pile',
    body: 'Hand AI the pile, then check two receipts and the total yourself. Your listeners walk away with a habit that turns a shoebox of paper into numbers they can trust.',
  },
];

const QUESTIONS = [
  'Why start with one chore instead of a whole AI plan?',
  'When AI drafts a quote, why should the owner leave the prices blank?',
  'What facts do you give AI before it answers a one-star review?',
  'Why check two receipts and the total, instead of trusting the whole pile?',
  'Which chore should a listener try first this week?',
];

function toEmbed(url) {
  if (!url) return '';
  const m = url.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{6,})/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : '';
}

export default function GuestSheet() {
  const reduce = useReducedMotion();

  useEffect(() => {
    const prev = document.title;
    document.title = 'Tristian Walker, Podcast Guest Sheet';
    window.scrollTo(0, 0);
    return () => { document.title = prev; };
  }, []);

  const rise = (delay = 0) => (reduce
    ? { initial: false }
    : {
      initial: { opacity: 0, y: 18 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-40px' },
      transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
    });

  const embed = toEmbed(EPISODE_1_URL);

  return (
    <div className="gs">
      <header className="gs-top">
        <div className="wrap gs-top__inner">
          <Link to="/" className="gs-top__name">Tristian Walker</Link>
          <a className="gs-top__book" href={`mailto:${BOOKING_EMAIL}?subject=Podcast%20booking`}>Book him</a>
        </div>
      </header>

      <main>
        {/* 1. Hero */}
        <section className="gs-hero">
          <div className="wrap gs-hero__grid">
            <motion.div {...rise(0)} className="gs-hero__text">
              <div className="eyebrow">Podcast guest sheet</div>
              <h1 className="gs-hero__title">Tristian Walker</h1>
              <p className="gs-hero__series">
                <em>AI in Plain English.</em> AI on your time, to ease the second shift and give you back more Sundays.
              </p>
              <p className="gs-hero__lede">
                He teaches one chore per short video, for owners who run small service businesses.
                Window cleaning, pressure washing, pool service, home services. He's a teacher, and
                he has nothing to sell your listeners.
              </p>
              <div className="gs-hero__actions">
                <a className="btn btn-primary" href={`mailto:${BOOKING_EMAIL}?subject=Podcast%20booking`}>Book Tristian</a>
                <a className="gs-link" href="/brand/tristian-portrait-new.jpg" download>Download headshot</a>
              </div>
            </motion.div>
            <motion.figure {...rise(0.1)} className="gs-hero__portrait">
              <img
                src="/brand/tristian-portrait-new.jpg"
                alt="Portrait of Tristian Walker"
                width="560"
                height="700"
              />
            </motion.figure>
          </div>
        </section>

        {/* 2. Bios */}
        <section className="gs-section" id="bio">
          <div className="wrap gs-narrow">
            <motion.div {...rise()}>
              <div className="eyebrow">Short bio</div>
              <p className="gs-bio gs-bio--short">
                Tristian Walker teaches small business owners how to hand everyday chores to AI. He is
                the founder of CobbledWorks, which builds software for small service businesses. Before
                that he spent nearly 20 years in restaurants and close to two decades in health care,
                building provider networks and leading sales. He is the author of <em>The Quiet Line</em>.
              </p>
            </motion.div>

            <motion.div {...rise(0.05)} className="gs-long">
              <div className="eyebrow">Long bio, to read aloud</div>
              <p className="gs-bio">
                Tristian Walker is the founder and CEO of CobbledWorks. His company builds software for
                small service businesses: custom websites, a field-service CRM, and a GPS-and-photo
                proof-of-service app used by pool-service crews. In the last year and a half, he has built
                custom software for more than 80 industry verticals with today's leading AI models. His
                series, <em>AI in Plain English</em>, takes one chore at a time and shows owners how to hand
                it off. He started in the back of the house at Outback Steakhouse. He spent nearly 20 years
                in restaurants, finishing as senior bar manager at Roy's in Tampa. Then came close to two
                decades in hearing and vision care, building provider networks and leading sales. From
                2011 to 2019, he taught continuing education across the country for Sonova. He is the
                author of <em>The Quiet Line</em>, a book on professional presence. He has also sung
                professionally for more than 25 years, at Carnegie Hall and the Sydney Opera House. He
                lives in Valrico, Florida.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 3. Segments */}
        <section className="gs-section gs-section--warm">
          <div className="wrap">
            <motion.div {...rise()} className="gs-head">
              <div className="eyebrow">Segments you can book</div>
              <h2 className="gs-h2">Three chores. <em>One each.</em></h2>
            </motion.div>
            <div className="gs-cards">
              {SEGMENTS.map((s, i) => (
                <motion.article key={s.num} {...rise(i * 0.06)} className="gs-card">
                  <span className="gs-card__num">{s.num}</span>
                  <h3 className="gs-card__title">{s.title}</h3>
                  <p className="gs-card__body">{s.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Episode slot */}
        <section className="gs-section">
          <div className="wrap gs-narrow">
            <motion.div {...rise()}>
              <div className="eyebrow">Episode 1</div>
              <h2 className="gs-h2">Watch him <em>teach one.</em></h2>
            </motion.div>
          </div>
          {embed ? (
            <div className="wrap gs-narrow">
              <div className="gs-video">
                <iframe
                  src={embed}
                  title="AI in Plain English, episode 1"
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            <div className="gs-needs" role="note">
              [[ NEEDS YOU: EPISODE 1 YOUTUBE LINK ONCE POSTED ]]
            </div>
          )}
        </section>

        {/* 5. Suggested questions */}
        <section className="gs-section gs-section--warm">
          <div className="wrap gs-narrow">
            <motion.div {...rise()}>
              <div className="eyebrow">Suggested questions</div>
              <h2 className="gs-h2">Five to <em>get him going.</em></h2>
            </motion.div>
            <ol className="gs-questions">
              {QUESTIONS.map((q, i) => (
                <motion.li key={q} {...rise(i * 0.04)}>
                  <span className="gs-questions__num">{i + 1}</span>
                  <span>{q}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
        {/* 6. Booking (last, so the page ends on how to reach him) */}
        <section className="gs-book">
          <div className="wrap gs-narrow">
            <motion.div {...rise()}>
              <div className="eyebrow gs-book__eyebrow">Booking</div>
              <h2 className="gs-book__title">Want him on <em>your show?</em></h2>
              <p className="gs-book__lede">Email or call to set a date.</p>
              <div className="gs-book__rows">
                <a className="gs-book__row" href={`mailto:${BOOKING_EMAIL}?subject=Podcast%20booking`}>
                  <span className="gs-book__label">Email</span>
                  <span className="gs-book__value">{BOOKING_EMAIL}</span>
                </a>
                <a className="gs-book__row" href={`tel:${BOOKING_PHONE_TEL}`}>
                  <span className="gs-book__label">Phone</span>
                  <span className="gs-book__value">{BOOKING_PHONE_DISPLAY}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <footer className="gs-foot">
        <div className="wrap gs-foot__inner">
          <span>Tristian Walker</span>
          <Link to="/">Back to home</Link>
        </div>
      </footer>

      <style>{`
        .gs { background: var(--bg-base); color: var(--text-main); overflow-x: hidden; }
        .gs-top {
          position: sticky; top: 0; z-index: 20;
          background: rgba(248,245,239,0.88);
          backdrop-filter: blur(12px) saturate(140%);
          -webkit-backdrop-filter: blur(12px) saturate(140%);
          border-bottom: 1px solid rgba(188,116,78,0.18);
        }
        .gs-top__inner { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 64px; }
        .gs-top__name {
          font-family: var(--font-heading); font-weight: 700; font-size: 1.1rem;
          text-decoration: none; color: var(--text-main);
          display: inline-flex; align-items: center; min-height: 44px;
        }
        .gs-top__book {
          display: inline-flex; align-items: center; justify-content: center; min-height: 44px;
          padding: 0 1.1rem; border-radius: 6px; text-decoration: none;
          font-weight: 700; font-size: 0.9rem; color: var(--accent-deep);
          border: 1px solid rgba(188,116,78,0.45);
          transition: background .25s ease, color .25s ease, transform .25s ease;
        }
        .gs-top__book:hover { background: var(--accent-primary); color: #fff; transform: translateY(-1px); }

        .gs-hero {
          padding: 5rem 0 5rem;
          background:
            radial-gradient(ellipse 1100px 560px at 50% 0%, rgba(216,154,92,0.18), transparent 70%),
            radial-gradient(ellipse 700px 460px at 90% 70%, rgba(188,116,78,0.10), transparent 70%),
            linear-gradient(180deg, var(--bg-parchment) 0%, var(--bg-base) 100%);
        }
        .gs-hero__grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 3.5rem; align-items: center; }
        .gs-hero__title { font-size: clamp(2.6rem, 6vw, 4.6rem); line-height: 1.04; letter-spacing: -0.02em; margin: 0 0 1.25rem; }
        .gs-hero__series {
          font-family: var(--font-heading); font-size: clamp(1.2rem, 2.2vw, 1.55rem);
          line-height: 1.45; color: var(--text-main); margin-bottom: 1.25rem;
        }
        .gs-hero__series em { color: var(--accent-primary); font-style: italic; font-weight: 700; }
        .gs-hero__lede { font-size: 1.08rem; line-height: 1.7; max-width: 560px; }
        .gs-hero__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem 1.75rem; margin-top: 2rem; }
        .gs-link {
          display: inline-flex; align-items: center; min-height: 44px;
          font-weight: 700; color: var(--accent-deep); text-decoration: underline;
          text-decoration-color: rgba(188,116,78,0.4); text-underline-offset: 5px;
          transition: text-decoration-color .25s ease;
        }
        .gs-link:hover { text-decoration-color: var(--accent-primary); }
        .gs-hero__portrait { margin: 0; position: relative; }
        .gs-hero__portrait::before {
          content: ''; position: absolute; inset: 18px -18px -18px 18px;
          border: 1px solid rgba(188,116,78,0.35); border-radius: 10px; z-index: 0;
        }
        .gs-hero__portrait img {
          position: relative; z-index: 1; display: block; width: 100%; height: auto;
          aspect-ratio: 4 / 5; object-fit: cover;
          border-radius: 10px; box-shadow: var(--shadow-warm);
        }

        .gs-section { padding: 6rem 0; }
        .gs-section--warm {
          background: linear-gradient(180deg, var(--bg-base) 0%, #F1EBE1 50%, var(--bg-base) 100%);
        }
        .gs-narrow { max-width: 820px; }
        .gs-head { margin-bottom: 2.5rem; }
        .gs-h2 { font-size: clamp(1.9rem, 3.6vw, 2.7rem); line-height: 1.15; letter-spacing: -0.015em; margin-bottom: 2rem; }

        .gs-bio { font-size: 1.12rem; line-height: 1.8; color: var(--text-main); }
        .gs-bio em { font-style: italic; color: var(--accent-deep); }
        .gs-bio--short {
          font-family: var(--font-heading); font-size: clamp(1.15rem, 2vw, 1.35rem); line-height: 1.65;
          padding-left: 1.5rem; border-left: 3px solid var(--accent-primary);
        }
        .gs-long {
          margin-top: 3rem; padding: 2.25rem 2.25rem 0.75rem; border-radius: 12px;
          background: var(--bg-surface);
          border: 1px solid rgba(188,116,78,0.18);
          box-shadow: var(--shadow-md);
        }

        .gs-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .gs-card {
          background: var(--bg-surface); border-radius: 12px; padding: 2rem 1.75rem 1rem;
          border: 1px solid rgba(188,116,78,0.18); box-shadow: var(--shadow-md);
          position: relative; overflow: hidden;
          transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease, border-color .35s ease;
        }
        .gs-card::before {
          content: ''; position: absolute; left: 0; right: 0; top: 0; height: 3px; background: var(--grad-warm);
        }
        .gs-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: rgba(188,116,78,0.4); }
        .gs-card__num { font-family: var(--font-heading); font-style: italic; font-size: 1.3rem; color: var(--accent-primary); }
        .gs-card__title { font-size: 1.35rem; line-height: 1.25; margin: 0.75rem 0 1rem; }
        .gs-card__body { font-size: 1rem; line-height: 1.7; }

        .gs-needs {
          margin-top: 0.5rem; width: 100%;
          background: #0E2638; color: #FFC53D;
          font-family: var(--font-ui); font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; font-size: clamp(0.95rem, 2.2vw, 1.15rem); line-height: 1.5;
          text-align: center; padding: 1.75rem 1.25rem; overflow-wrap: anywhere;
        }
        .gs-video { position: relative; aspect-ratio: 16 / 9; border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-warm); background: var(--bg-ink); }
        .gs-video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }

        .gs-questions { list-style: none; margin: 0; padding: 0; border-top: 1px solid rgba(0,0,0,0.08); }
        .gs-questions li {
          display: grid; grid-template-columns: 48px 1fr; gap: 1rem; align-items: baseline;
          padding: 1.4rem 0; border-bottom: 1px solid rgba(0,0,0,0.08);
          font-family: var(--font-heading); font-size: clamp(1.05rem, 1.8vw, 1.25rem); line-height: 1.5; color: var(--text-main);
        }
        .gs-questions__num { font-style: italic; color: var(--accent-primary); font-weight: 700; }

        .gs-book {
          padding: 6rem 0;
          background:
            radial-gradient(ellipse 900px 500px at 20% 0%, rgba(216,154,92,0.18), transparent 70%),
            linear-gradient(180deg, var(--bg-dark), var(--bg-ink));
          color: var(--text-light);
        }
        .gs-book__eyebrow { color: var(--accent-amber); border-bottom-color: rgba(216,154,92,0.3); }
        .gs-book__title { color: var(--text-light); font-size: clamp(1.9rem, 3.6vw, 2.7rem); line-height: 1.15; margin-bottom: 1rem; }
        .gs-book__title em { color: var(--accent-amber); }
        .gs-book__lede { color: #CFC7BB; font-size: 1.08rem; }
        .gs-book__rows { display: grid; gap: 1rem; margin-top: 2rem; }
        .gs-book__row {
          display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem 1.5rem;
          min-height: 64px; padding: 1rem 1.5rem; border-radius: 10px; text-decoration: none;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(216,154,92,0.28);
          transition: background .25s ease, border-color .25s ease, transform .25s ease;
        }
        .gs-book__row:hover { background: rgba(216,154,92,0.12); border-color: var(--accent-amber); transform: translateY(-2px); }
        .gs-book__label { font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase; font-weight: 700; color: var(--accent-amber); }
        .gs-book__value { font-family: var(--font-heading); font-size: clamp(1.05rem, 2.4vw, 1.35rem); color: var(--text-light); overflow-wrap: anywhere; }

        .gs-foot { background: var(--bg-ink); color: var(--text-on-dark); border-top: 1px solid rgba(255,255,255,0.06); }
        .gs-foot__inner { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.5rem 1.5rem; min-height: 72px; font-size: 0.9rem; }
        .gs-foot a { color: var(--text-on-dark); display: inline-flex; align-items: center; min-height: 44px; }

        @media (max-width: 820px) {
          .gs-hero { padding: 3rem 0 4rem; }
          .gs-hero__grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .gs-hero__portrait { order: -1; max-width: 300px; }
          .gs-cards { grid-template-columns: 1fr; }
          .gs-section, .gs-book { padding: 4.5rem 0; }
        }
        @media (max-width: 600px) {
          .gs-hero__actions .btn { width: 100%; }
          .gs-hero__portrait { max-width: 240px; }
          .gs-hero__portrait::before { inset: 12px -12px -12px 12px; }
          .gs-long { padding: 1.5rem 1.25rem 0.5rem; }
          .gs-bio--short { padding-left: 1rem; }
          .gs-questions li { grid-template-columns: 32px 1fr; }
          .gs-book__row { padding: 1rem 1.15rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gs-card:hover, .gs-book__row:hover, .gs-top__book:hover { transform: none; }
        }
      `}</style>
    </div>
  );
}
