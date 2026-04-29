import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

const LINKS = [
  { href: '#about',      label: 'About' },
  { href: '#library',    label: 'Library' },
  { href: '#book',       label: 'Speaking' },
  { href: '#book',       label: 'Book' },
  { href: '#writing',    label: 'Writing' },
  { href: '#newsletter', label: 'Letters' },
];

export default function Navigation() {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const linkRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // Lightweight passive scroll listener instead of framer's useScroll.
  // useScroll subscribes a motion-value pipeline that updates every frame
  // even when only a boolean threshold is needed. A passive listener +
  // a single state set per threshold cross is significantly cheaper.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (hoverIndex == null) return;
    const el = linkRefs.current[hoverIndex];
    if (!el) return;
    const parent = el.parentElement.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setIndicator({ left: rect.left - parent.left, width: rect.width });
  }, [hoverIndex]);

  // Lock body scroll while mobile menu is open + signal to other fixed UI
  // (QuietLineBridge) so they can hide.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    document.documentElement.dataset.mobileMenu = mobileOpen ? 'open' : '';
    return () => {
      document.body.style.overflow = '';
      delete document.documentElement.dataset.mobileMenu;
    };
  }, [mobileOpen]);

  // Close on Escape + on hash navigation
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMobileOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        // Mobile: always solid cream. No transparent → solid transition.
        // The transition itself was running for 0.3s every time the user
        // crossed the 50px threshold (which can happen multiple times when
        // pull-to-refreshing or rubber-banding) — visible as a pulse at
        // the very top of the screen.
        // Desktop: keep the glass effect with backdrop-filter.
        initial={false}
        animate={
          isMobile
            ? {
                backgroundColor: 'rgba(248, 245, 239, 1)',
                borderBottom: isScrolled
                  ? '1px solid rgba(188,116,78,0.12)'
                  : '1px solid rgba(188,116,78,0.08)',
              }
            : {
                backgroundColor:
                  isScrolled || mobileOpen
                    ? 'rgba(248, 245, 239, 0.86)'
                    : 'rgba(248, 245, 239, 0)',
                backdropFilter:
                  isScrolled || mobileOpen ? 'blur(16px) saturate(160%)' : 'blur(0px)',
                borderBottom: isScrolled
                  ? '1px solid rgba(188,116,78,0.12)'
                  : '1px solid transparent',
                boxShadow: isScrolled ? '0 8px 32px rgba(140,70,40,0.06)' : 'none',
              }
        }
        transition={isMobile ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
        className="nav-bar"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 80,
          paddingTop: 'max(1.1rem, env(safe-area-inset-top))',
          paddingBottom: '1.1rem',
          paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
          paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <a href="#top" style={{ textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              letterSpacing: '0.18em',
              fontSize: '13px',
              textTransform: 'uppercase',
              color: 'var(--text-main)',
              display: 'inline-flex',
              alignItems: 'baseline',
            }}
          >
            Tristian Walker
            <motion.em
              animate={isMobile ? undefined : { opacity: [1, 0.35, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                color: 'var(--accent-primary)',
                fontStyle: 'italic',
                letterSpacing: 0,
                textTransform: 'none',
                fontFamily: 'var(--font-heading)',
                fontWeight: 400,
                marginLeft: '4px',
              }}
            >
              .
            </motion.em>
          </div>
        </a>

        {/* Desktop links */}
        <div
          className="nav-desktop"
          onMouseLeave={() => setHoverIndex(null)}
          style={{
            position: 'relative',
            display: 'flex',
            gap: '1.6rem',
            alignItems: 'center',
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          <AnimatePresence>
            {hoverIndex != null && (
              <motion.div
                layout
                initial={{ opacity: 0, scaleX: 0.8 }}
                animate={{ opacity: 1, scaleX: 1, left: indicator.left, width: indicator.width }}
                exit={{ opacity: 0, scaleX: 0.8 }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                style={{
                  position: 'absolute',
                  bottom: -6,
                  height: 2,
                  background:
                    'linear-gradient(90deg, var(--accent-deep), var(--accent-primary), var(--accent-amber))',
                  borderRadius: 2,
                  pointerEvents: 'none',
                }}
              />
            )}
          </AnimatePresence>

          {LINKS.map((link, i) => (
            <a
              key={`${link.href}-${i}`}
              ref={(el) => (linkRefs.current[i] = el)}
              href={link.href}
              onMouseEnter={() => setHoverIndex(i)}
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                padding: '0.25rem 0',
              }}
            >
              {link.label}
            </a>
          ))}

          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            href="mailto:tristian@tristianwalker.com"
            className="nav-cta"
            style={{
              padding: '.65rem 1.2rem',
              border: '1px solid var(--accent-primary)',
              color: 'var(--accent-primary)',
              borderRadius: '4px',
              textDecoration: 'none',
              background: 'transparent',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--accent-primary)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(188,116,78,0.30)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--accent-primary)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Book a talk
          </motion.a>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="nav-burger"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          style={{
            background: 'transparent',
            border: '1px solid rgba(188,116,78,0.30)',
            color: 'var(--accent-primary)',
            width: 44,
            height: 44,
            borderRadius: 8,
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: 'inline-flex' }}
              >
                <X size={22} strokeWidth={1.6} />
              </motion.span>
            ) : (
              <motion.span
                key="m"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: 'inline-flex' }}
              >
                <Menu size={22} strokeWidth={1.6} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 'calc(env(safe-area-inset-top) + 64px)',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 75,
              // Fully opaque cream — no backdrop-filter. Mobile Safari renders
              // a fixed solid layer cheaply; backdrop-filter on a fullscreen
              // overlay is one of the worst-performing patterns there is.
              background:
                'linear-gradient(180deg, var(--bg-base) 0%, var(--bg-parchment) 100%)',
              padding: '2rem 1.5rem calc(env(safe-area-inset-bottom) + 2rem)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div
              style={{
                maxWidth: 480,
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
              }}
            >
              {LINKS.map((link, i) => (
                <motion.a
                  key={`m-${link.href}-${i}`}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.1rem 0.5rem',
                    borderBottom: '1px solid rgba(188,116,78,0.14)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    color: 'var(--text-main)',
                    textDecoration: 'none',
                    minHeight: 56,
                  }}
                >
                  <span>{link.label}</span>
                  <span
                    aria-hidden
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontStyle: 'italic',
                      color: 'var(--accent-primary)',
                      fontSize: '0.9rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.a>
              ))}

              <motion.a
                href="mailto:tristian@tristianwalker.com"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * LINKS.length + 0.1, duration: 0.4 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  marginTop: '2rem',
                  padding: '1.1rem 1.25rem',
                  background:
                    'linear-gradient(135deg, var(--accent-amber) 0%, var(--accent-primary) 50%, var(--accent-deep) 100%)',
                  color: '#fff',
                  borderRadius: 10,
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  fontSize: '1rem',
                  boxShadow: '0 14px 30px rgba(188,116,78,0.30)',
                  minHeight: 56,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Book Tristian to speak →
              </motion.a>

              <div
                style={{
                  marginTop: '2rem',
                  fontSize: '10px',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: 'var(--text-subtle)',
                  textAlign: 'center',
                }}
              >
                tristian@tristianwalker.com
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 820px) {
          .nav-desktop { display: none !important; }
          .nav-burger  { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
