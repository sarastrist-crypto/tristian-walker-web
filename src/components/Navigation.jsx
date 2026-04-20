import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ backgroundColor: 'transparent', backdropFilter: 'blur(0px)', borderBottom: '1px solid transparent' }}
      animate={{
        backgroundColor: isScrolled ? 'rgba(248, 245, 239, 0.88)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(14px)' : 'blur(0px)',
        borderBottom: isScrolled ? '1px solid rgba(188,116,78,0.12)' : '1px solid transparent',
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '1.25rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}
    >
      <a href="#top" style={{ textDecoration: 'none' }}>
        <div style={{
          fontFamily: 'var(--font-body)', fontWeight: 700, letterSpacing: '0.18em',
          fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-main)'
        }}>
          Tristian Walker
          <em style={{
            color: 'var(--accent-primary)', fontStyle: 'italic', letterSpacing: 0,
            textTransform: 'none', fontFamily: 'var(--font-heading)', fontWeight: 400, marginLeft: '4px'
          }}>.</em>
        </div>
      </a>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700 }}>
        <a href="#about" style={{ color: 'var(--text-muted)' }}>About</a>
        <a href="#book" style={{ color: 'var(--text-muted)' }}>Speaking</a>
        <a href="#book" style={{ color: 'var(--text-muted)' }}>Book</a>
        <a href="#book" style={{ color: 'var(--text-muted)' }}>Advisory</a>
        <a href="mailto:tristian@tristianwalker.com" 
           style={{
             padding: '.65rem 1.2rem', border: '1px solid var(--accent-primary)', 
             color: 'var(--accent-primary)', borderRadius: '4px', transition: 'all 0.3s',
             textDecoration: 'none'
           }}
           onMouseOver={e => {
             e.target.style.background = 'var(--accent-primary)';
             e.target.style.color = '#fff';
           }}
           onMouseOut={e => {
             e.target.style.background = 'transparent';
             e.target.style.color = 'var(--accent-primary)';
           }}>
          Book a talk
        </a>
      </div>
    </motion.nav>
  );
}
