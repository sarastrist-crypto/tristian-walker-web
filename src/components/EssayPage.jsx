import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { essayBySlug } from '../content/loadEssays';
import Navigation from './Navigation';
import Footer from './Footer';

export default function EssayPage() {
  const { slug } = useParams();
  const essay = essayBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!essay) {
    return (
      <>
        <Navigation />
        <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="wrap" style={{ textAlign: 'center', padding: '6rem 0' }}>
            <div className="eyebrow">404 — Not found</div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>That writing isn't here yet.</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              The essay, letter, or lecture note you were looking for may have moved or been retired.
            </p>
            <Link to="/writing" className="btn btn-primary">See all writing →</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const formattedDate = essay.date
    ? new Date(essay.date + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <>
      <Navigation />
      <main style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>
        {/* Hero — photo + tint + title overlay */}
        <header className="essay-hero">
          <div
            className="essay-hero__photo"
            style={{ backgroundImage: `url('${essay.cover}')` }}
            aria-hidden
          />
          <span className="essay-hero__tint" style={{ background: essay.tint }} aria-hidden />
          <span className="essay-hero__shade" aria-hidden />

          <div className="wrap essay-hero__inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="essay-hero__type">{essay.type}</div>
              <h1 className="essay-hero__title">{essay.title}</h1>
              <div className="essay-hero__meta">
                <span>{formattedDate}</span>
                <span className="essay-hero__dot" />
                <span>{essay.readTime}</span>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Body */}
        <article className="essay-body">
          <div className="wrap">
            {essay.dek && <p className="essay-body__dek">{essay.dek}</p>}
            <ReactMarkdown
              components={{
                a: ({ href, children, ...props }) => {
                  const external = /^https?:\/\//.test(href || '');
                  if (!external && href?.startsWith('/')) {
                    return <Link to={href} {...props}>{children}</Link>;
                  }
                  return (
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      {...props}
                    >
                      {children}
                    </a>
                  );
                },
                blockquote: ({ children }) => (
                  <blockquote className="essay-pullquote">{children}</blockquote>
                ),
                hr: () => <hr className="essay-flourish" aria-hidden />,
              }}
            >
              {essay.body}
            </ReactMarkdown>

            <div className="essay-body__footer">
              <Link to="/writing" className="essay-body__back">← All writing</Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />

      <style>{`
        .essay-hero {
          position: relative;
          min-height: 60vh;
          display: flex;
          align-items: flex-end;
          padding: 8rem 0 3rem;
          overflow: hidden;
          isolation: isolate;
          color: #fff;
        }
        .essay-hero__photo {
          position: absolute;
          inset: -4%;
          background-size: cover;
          background-position: center;
          z-index: 0;
        }
        .essay-hero__tint, .essay-hero__shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .essay-hero__shade {
          background: linear-gradient(
            180deg,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0) 35%,
            rgba(20,18,16,0.75) 100%
          );
        }
        .essay-hero__inner {
          position: relative;
          z-index: 2;
        }
        .essay-hero__type {
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          margin-bottom: 1rem;
          text-shadow: 0 1px 8px rgba(0,0,0,0.45);
        }
        .essay-hero__title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          line-height: 1.15;
          letter-spacing: -0.015em;
          color: #fff;
          margin: 0 0 1.25rem;
          max-width: 880px;
          text-shadow: 0 2px 22px rgba(0,0,0,0.45);
          text-wrap: balance;
        }
        .essay-hero__title em {
          color: var(--accent-amber);
          font-style: italic;
          font-weight: 400;
        }
        .essay-hero__meta {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
        }
        .essay-hero__dot {
          width: 3px;
          height: 3px;
          background: var(--accent-amber);
          border-radius: 50%;
        }

        .essay-body {
          padding: 4.5rem 0 6rem;
        }
        .essay-body .wrap {
          max-width: 720px;
        }
        .essay-body__dek {
          font-family: var(--font-heading);
          font-style: italic;
          font-size: clamp(1.15rem, 2vw, 1.4rem);
          line-height: 1.45;
          color: var(--text-main);
          border-left: 2px solid var(--accent-primary);
          padding-left: 1.25rem;
          margin: 0 0 2.5rem;
        }
        .essay-body p {
          font-family: var(--font-body);
          font-size: 1.075rem;
          line-height: 1.75;
          color: var(--text-main);
          margin: 0 0 1.4rem;
        }
        .essay-body h2 {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 2.6vw, 2rem);
          margin: 3rem 0 1.25rem;
          letter-spacing: -0.01em;
        }
        .essay-body h3 {
          font-family: var(--font-heading);
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          margin: 2.25rem 0 1rem;
          letter-spacing: -0.01em;
        }
        .essay-body a {
          color: var(--accent-primary);
          text-decoration: none;
          border-bottom: 1px solid rgba(188,116,78,0.35);
          transition: border-color .2s ease, color .2s ease;
        }
        .essay-body a:hover {
          color: var(--accent-hover);
          border-bottom-color: var(--accent-primary);
        }
        .essay-body strong { color: var(--text-main); font-weight: 700; }
        .essay-body em { font-style: italic; }
        .essay-body ul, .essay-body ol {
          padding-left: 1.5rem;
          margin: 0 0 1.5rem;
          color: var(--text-main);
        }
        .essay-body li { margin-bottom: 0.5rem; line-height: 1.7; }

        .essay-pullquote {
          margin: 2.75rem 0;
          padding: 1.5rem 1.5rem 1.5rem 2rem;
          border-left: 3px solid var(--accent-primary);
          background: linear-gradient(90deg, rgba(188,116,78,0.06), transparent 60%);
          font-family: var(--font-heading);
          font-style: italic;
          font-size: clamp(1.25rem, 2.2vw, 1.55rem);
          line-height: 1.45;
          color: var(--text-main);
        }
        .essay-pullquote p { margin: 0; font-family: inherit; font-size: inherit; line-height: inherit; color: inherit; }

        .essay-flourish {
          border: 0;
          height: 1.5rem;
          margin: 3rem auto;
          width: 80px;
          background:
            radial-gradient(circle 3px at 14px 50%, var(--accent-primary) 95%, transparent 100%),
            radial-gradient(circle 3px at 50% 50%, var(--accent-primary) 95%, transparent 100%),
            radial-gradient(circle 3px at calc(100% - 14px) 50%, var(--accent-primary) 95%, transparent 100%);
          background-repeat: no-repeat;
        }

        .essay-body__footer {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(0,0,0,0.08);
        }
        .essay-body__back {
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--accent-primary);
          text-decoration: none;
          border-bottom: none;
        }
      `}</style>
    </>
  );
}
