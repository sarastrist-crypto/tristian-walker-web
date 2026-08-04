import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer
      id="contact"
      style={{
        background:
          'radial-gradient(ellipse 800px 400px at 20% 0%, rgba(188,116,78,0.18), transparent 60%), var(--bg-ink)',
        color: 'var(--text-on-dark)',
        padding: 'clamp(3rem, 8vw, 5rem) 0 calc(env(safe-area-inset-bottom, 0px) + 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative conic glow — desktop only. On mobile the constant rotation
          repaints a 600px filtered surface every frame for no visible benefit. */}
      {!isMobile && (
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 130, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'conic-gradient(from 0deg, rgba(216,154,92,0.10), transparent 60%, rgba(188,116,78,0.10))',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        />
      )}

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          <div style={{ gridColumn: 'span 2' }}>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: '#fff',
                fontSize: '1rem',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              Tristian Walker
              <em
                style={{
                  color: 'var(--accent-primary)',
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  letterSpacing: 0,
                  fontWeight: 400,
                  textTransform: 'none',
                  marginLeft: '4px',
                }}
              >
                .
              </em>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                color: 'rgba(168,161,150,0.7)',
                fontSize: '0.95rem',
                maxWidth: '32em',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              From drift to direction — one honest reckoning at a time. Author, keynote speaker, advisor. Based in the Hudson Valley, working where the stakes of a human interaction are impossible to automate away.
            </p>
          </div>

          <div>
            <h5
              style={{
                fontSize: '10px',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                margin: '0 0 1.25rem',
              }}
            >
              Library
            </h5>
            {[
              { label: 'The Book',  href: '#book' },
              { label: 'Speaking',  href: '#book' },
              { label: 'Writing',   href: '#writing' },
              { label: 'Advisory',  href: 'mailto:hello@tristianwalker.com' },
              { label: 'Library',   href: '#library' },
            ].map((t) => (
              <motion.a
                key={t.label}
                href={t.href}
                whileHover={{ x: 4, color: 'var(--accent-amber)' }}
                style={{
                  display: 'block',
                  color: 'rgba(248,245,239,0.72)',
                  fontSize: '0.92rem',
                  padding: '0.35rem 0',
                  textDecoration: 'none',
                }}
              >
                {t.label}
              </motion.a>
            ))}
          </div>

          <div>
            <h5
              style={{
                fontSize: '10px',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                margin: '0 0 1.25rem',
              }}
            >
              Connect
            </h5>
            {[
              { label: 'hello@tristianwalker.com',  href: 'mailto:hello@tristianwalker.com' },
              { label: 'The Residency',               href: '#newsletter' },
            ].map((t) => (
              <motion.a
                key={t.label}
                href={t.href}
                whileHover={{ x: 4, color: 'var(--accent-amber)' }}
                style={{
                  display: 'block',
                  color: 'rgba(248,245,239,0.72)',
                  fontSize: '0.92rem',
                  padding: '0.35rem 0',
                  textDecoration: 'none',
                }}
              >
                {t.label}
              </motion.a>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(168,161,150,0.15)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '10px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'rgba(168,161,150,0.65)',
          }}
        >
          <div>© 2026 Tristian Walker</div>
        </div>
      </div>
    </footer>
  );
}
