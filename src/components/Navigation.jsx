import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

const LINKS = [
  { href: '#about',      label: 'About' },
  { href: '#library',    label: 'Library' },
  { href: '#book',       label: 'Speaking' },
  { href: '#book',       label: 'Book' },
  { href: '#writing',    label: 'Writing' },
  { href: '#newsletter', label: 'Letters' },
];

export default function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const linkRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    return scrollY.on('change', (latest) => setIsScrolled(latest > 50));
  }, [scrollY]);

  useEffect(() => {
    if (hoverIndex == null) return;
    const el = linkRefs.current[hoverIndex];
    if (!el) return;
    const parent = el.parentElement.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setIndicator({ left: rect.left - parent.left, width: rect.width });
  }, [hoverIndex]);

  return (
    <motion.nav
      initial={{ backgroundColor: 'rgba(248,245,239,0)', backdropFilter: 'blur(0px)' }}
      animate={{
        backgroundColor: isScrolled ? 'rgba(248, 245, 239, 0.82)' : 'rgba(248,245,239,0)',
        backdropFilter: isScrolled ? 'blur(16px) saturate(160%)' : 'blur(0px)',
        borderBottom: isScrolled ? '1px solid rgba(188,116,78,0.12)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 8px 32px rgba(140,70,40,0.06)' : 'none',
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        padding: '1.1rem 2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <a href="#top" style={{ textDecoration: 'none' }}>
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
            animate={{ opacity: [1, 0.35, 1] }}
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

      <div
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
              transition: 'color .25s ease',
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
          style={{
            padding: '.65rem 1.2rem',
            border: '1px solid var(--accent-primary)',
            color: 'var(--accent-primary)',
            borderRadius: '4px',
            textDecoration: 'none',
            background: 'linear-gradient(180deg, transparent, transparent)',
            position: 'relative',
            overflow: 'hidden',
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
    </motion.nav>
  );
}
