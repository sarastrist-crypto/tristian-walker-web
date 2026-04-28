import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RevealText from './RevealText';

export default function Newsletter() {
  const [status, setStatus] = useState('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    const door = formData.get('door');

    try {
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
      const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
      if (!SUPABASE_URL) {
        setTimeout(() => setStatus('success'), 1200);
        return;
      }
      const response = await fetch(`${SUPABASE_URL}/rest/v1/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ name, email, door }),
      });
      if (!response.ok) throw new Error('Supabase Error');
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('success');
    }
  };

  return (
    <section
      id="newsletter"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '8rem 0 9rem',
        // Smooth gradient: fades from previous cream into warm beige and continues toward dark footer.
        // No more "brick wall" of solid colors meeting at hard seams.
        background:
          'linear-gradient(180deg, var(--bg-base) 0%, var(--bg-warm) 22%, var(--bg-warm) 70%, #2a2521 100%)',
      }}
    >
      {/* Soft dotted texture, masked so it fades with the gradient */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(140,70,40,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.35,
          maskImage:
            'radial-gradient(ellipse 1100px 500px at 30% 50%, black, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 1100px 500px at 30% 50%, black, transparent 75%)',
          pointerEvents: 'none',
        }}
      />

      {/* Slow conic glow accent */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          right: '-220px',
          top: '15%',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background:
            'conic-gradient(from 0deg, rgba(216,154,92,0.10), transparent 60%, rgba(188,116,78,0.10))',
          filter: 'blur(10px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="wrap newsletter-grid"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gap: '4.5rem',
          alignItems: 'start',
        }}
      >
        {/* LEFT COLUMN — copy + letter-preview card fills the previously empty space */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="eyebrow">05 / The Residency</div>
          <RevealText
            as="h2"
            style={{
              color: 'var(--text-main)',
              fontSize: 'clamp(2.4rem, 4.8vw, 3.6rem)',
              letterSpacing: '-0.015em',
              lineHeight: 1.05,
              margin: '1.5rem 0 2rem',
            }}
          >
            A quiet letter. <em>Once a month.</em>
          </RevealText>

          {/* The letter-preview card — fills the empty space with a literary artifact */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -1.2 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.2 }}
            whileHover={{ y: -4, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              background:
                'linear-gradient(180deg, #FBF8F2 0%, #F4EFE5 100%)',
              borderRadius: '6px',
              padding: '2rem 2.25rem 2rem',
              boxShadow:
                '0 25px 50px -15px rgba(140,70,40,0.30), 0 6px 14px rgba(0,0,0,0.08)',
              border: '1px solid rgba(188,116,78,0.18)',
              maxWidth: '460px',
              marginBottom: '2.5rem',
              overflow: 'hidden',
            }}
          >
            {/* Decorative paper edge — subtle deckle-edge top stripe */}
            <span
              aria-hidden
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: 3,
                background:
                  'linear-gradient(90deg, var(--accent-deep), var(--accent-primary), var(--accent-amber))',
              }}
            />

            {/* TW monogram seal */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
              }}
            >
              <div
                aria-hidden
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 30% 30%, var(--accent-amber), var(--accent-primary) 60%, var(--accent-deep))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  letterSpacing: '0.02em',
                  boxShadow:
                    'inset 0 -2px 4px rgba(0,0,0,0.20), 0 4px 8px rgba(140,70,40,0.30)',
                }}
              >
                TW
              </div>
              <div
                style={{
                  fontSize: '9.5px',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textAlign: 'right',
                }}
              >
                Residency № 017
                <div style={{ marginTop: 4, color: 'var(--accent-primary)' }}>April 2026</div>
              </div>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                fontSize: '0.78rem',
                color: 'var(--text-subtle)',
                letterSpacing: '0.05em',
                marginBottom: '0.75rem',
              }}
            >
              From the desk of —
            </div>

            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                lineHeight: 1.65,
                color: 'var(--text-main)',
                margin: '0 0 1.25rem',
              }}
            >
              "The line between motion and movement is rarely visible from inside the day. This month I asked twelve readers a single question, and what came back surprised me…"
            </p>

            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                fontSize: '1.4rem',
                color: 'var(--accent-primary)',
                lineHeight: 1,
              }}
            >
              — T.
            </div>

            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px dashed rgba(140,70,40,0.20)',
                fontSize: '9.5px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: 'var(--text-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>A sample · last month's letter</span>
              <span style={{ color: 'var(--accent-primary)' }}>9 min read</span>
            </div>
          </motion.div>

          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              marginBottom: '1.25rem',
              maxWidth: '36em',
            }}
          >
            Lecture notes and the one question I've been carrying that month. Not a newsletter about the book. Not a drip for the cabinet. A separate, slower correspondence — adjacent to the work, written to whoever is reading at the time.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontStyle: 'italic',
              fontSize: '0.95rem',
              color: 'var(--text-muted)',
              borderLeft: '2px solid var(--accent-primary)',
              paddingLeft: '1rem',
              margin: 0,
            }}
          >
            — I value your inbox as much as my own. One letter, one month. Unsubscribe any time.
          </p>
        </motion.div>

        {/* RIGHT COLUMN — form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid rgba(0,0,0,0.04)',
            borderRadius: '18px',
            padding: '3.5rem',
            boxShadow:
              'var(--shadow-xl), 0 30px 60px -20px rgba(140,70,40,0.18)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span aria-hidden style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 4,
            background: 'linear-gradient(90deg, var(--accent-deep), var(--accent-primary), var(--accent-amber))',
          }} />

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: 'center', padding: '3rem 0' }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
                  style={{
                    width: 80, height: 80, margin: '0 auto 1.5rem', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-amber), var(--accent-primary))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 20px 40px rgba(140,70,40,0.30)',
                  }}
                >
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <motion.path
                      d="M5 12l5 5 9-11"
                      stroke="#fff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                    />
                  </svg>
                </motion.div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  color: 'var(--accent-primary)',
                  fontSize: '2rem',
                  marginBottom: '1rem',
                }}>
                  Received.
                </div>
                <div style={{
                  fontSize: '10px',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                }}>
                  Check your inbox for a first letter.
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
              >
                <div style={{
                  fontSize: '10px',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: 'var(--accent-primary)',
                  marginBottom: '1.5rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid rgba(188,116,78,0.25)',
                }}>
                  Join the list
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{
                    display: 'block', fontSize: '10px', letterSpacing: '0.3em',
                    textTransform: 'uppercase', fontWeight: 700,
                    color: 'var(--text-main)', marginBottom: '0.6rem',
                  }}>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="input-quiet"
                  />
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{
                    display: 'block', fontSize: '10px', letterSpacing: '0.3em',
                    textTransform: 'uppercase', fontWeight: 700,
                    color: 'var(--text-main)', marginBottom: '0.6rem',
                  }}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="input-quiet"
                  />
                </div>

                <label style={{
                  display: 'block', fontSize: '10px', letterSpacing: '0.3em',
                  textTransform: 'uppercase', fontWeight: 700,
                  color: 'var(--text-main)', marginTop: '2.5rem', marginBottom: '0.6rem',
                }}>
                  Which door brought you here?
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '0.5rem',
                  marginBottom: '2rem',
                }}>
                  {[
                    { val: 'reader',    span: 'Reader',    sm: 'The book',  defaultChecked: true  },
                    { val: 'organizer', span: 'Organizer', sm: 'Booking',   defaultChecked: false },
                    { val: 'advisory',  span: 'Company',   sm: 'Advisory',  defaultChecked: false },
                  ].map((door) => (
                    <motion.label
                      key={door.val}
                      whileHover={{ y: -2, borderColor: 'var(--accent-primary)' }}
                      style={{
                        display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
                        padding: '0.85rem',
                        border: '1px solid rgba(0,0,0,0.1)',
                        borderRadius: '6px', cursor: 'pointer',
                        fontSize: '0.85rem',
                        background: 'rgba(255,255,255,0.4)',
                        transition: 'border-color .2s ease',
                      }}
                    >
                      <input
                        type="radio"
                        name="door"
                        value={door.val}
                        defaultChecked={door.defaultChecked}
                        style={{ accentColor: 'var(--accent-primary)', marginTop: '2px' }}
                      />
                      <span style={{
                        color: 'var(--text-main)',
                        fontSize: '0.8rem', letterSpacing: '0.02em',
                        lineHeight: 1.3, fontWeight: 600,
                      }}>
                        {door.span}
                        <small style={{
                          display: 'block', color: 'var(--text-muted)',
                          fontSize: '9.5px', letterSpacing: '0.2em',
                          textTransform: 'uppercase', fontWeight: 700,
                          marginTop: '0.25rem',
                        }}>
                          {door.sm}
                        </small>
                      </span>
                    </motion.label>
                  ))}
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ y: -2, boxShadow: '0 14px 32px rgba(188,116,78,0.40)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    background:
                      'linear-gradient(135deg, var(--accent-amber) 0%, var(--accent-primary) 50%, var(--accent-deep) 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    letterSpacing: '0.02em',
                    cursor: status === 'loading' ? 'wait' : 'pointer',
                    boxShadow: 'var(--shadow-btn)',
                    opacity: status === 'loading' ? 0.7 : 1,
                  }}
                >
                  {status === 'loading' ? 'Submitting…' : 'Subscribe to The Residency'}
                </motion.button>
                <div style={{
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  marginTop: '1rem',
                  textAlign: 'center',
                }}>
                  One letter · One month · No drip
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .newsletter-grid {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 980px) {
          .newsletter-grid { grid-template-columns: 1fr; gap: 3rem; }
        }
      `}</style>
    </section>
  );
}
