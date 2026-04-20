import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

const VARIANTS = [
  <>A lecture on <em>Professional Drift</em> — and the practice that reclaims presence.</>,
  <>A talk for leaders who'd rather <em>hear the quiet line</em> than outrun it.</>,
  <>Two decades inside the systems. <em>One honest reckoning</em> with what they cost us.</>
];

export default function Hero() {
  const [variantIndex, setVariantIndex] = useState(0);

  // Cycle variants slowly for demonstration
  useEffect(() => {
    const timer = setInterval(() => {
      setVariantIndex((prev) => (prev + 1) % VARIANTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      padding: '8rem 0 4rem',
      background: 'radial-gradient(ellipse 1200px 600px at 50% 0%, rgba(188,116,78,0.08), transparent 70%), linear-gradient(180deg, var(--bg-parchment) 0%, var(--bg-base) 100%)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '5rem', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '2rem' }}>
            <div style={{ width: '44px', height: '1px', background: 'var(--accent-primary)' }} />
            Author · Keynote Speaker · Advisor
          </div>
          
          <div style={{ display: 'grid', marginBottom: '2rem' }}>
            {/* Invisible Scaffold containing ALL variants. This forces the grid to perfectly size itself to the tallest paragraph at any screen width, completely eliminating overlap or walking, even if you edit the copy. */}
            <div style={{ gridArea: '1 / 1', display: 'grid', visibility: 'hidden', pointerEvents: 'none', userSelect: 'none' }}>
              {VARIANTS.map((text, idx) => (
                 <h1 key={`hidden-${idx}`} style={{ gridArea: '1 / 1', fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0 }}>
                   {text}
                 </h1>
              ))}
            </div>
            
            {/* The Animated Text */}
            <h1 style={{ gridArea: '1 / 1', fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, zIndex: 10 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={variantIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  {VARIANTS[variantIndex]}
                </motion.div>
              </AnimatePresence>
            </h1>
          </div>
          
          <div style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '38em', marginBottom: '2.5rem' }}>
            <p style={{ margin: '0 0 1rem 0' }}>
              For two decades, I operated inside the highest stakes of corporate and hospitality leadership. It taught me that when process overrules presence, we lose the foundation of our character—and gradually drift into a Wall of Anonymity.
            </p>
            <p style={{ margin: 0 }}>
              Today, my work exists to cure this drift. Through my lecture on <strong style={{ color: 'var(--text-main)' }}>Professional Drift</strong>, we bear witness to the actual cost of our systems and learn how to establish a Compass of Presence rather than succumbing to the Gravity of Transaction. My book, <em style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-primary)' }}>The Quiet Line</em>, serves as the anchor for this work—teaching leaders how to bring their character, not just their credentials, back to the interaction.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="mailto:tristian@tristianwalker.com" className="btn btn-primary" style={{ textDecoration: 'none' }}>Book Tristian to speak →</a>
            <a href="/lecture" className="btn" style={{ background: 'var(--bg-surface)', color: 'var(--accent-primary)', border: '1px solid rgba(188,116,78,0.25)', boxShadow: 'var(--shadow-sm)', textDecoration: 'none' }}>Join his Meet the Author Series →</a>
          </div>
        </motion.div>

        {/* Media Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{
            position: 'relative', aspectRatio: '4/5', borderRadius: '8px', 
            overflow: 'hidden', boxShadow: 'var(--shadow-lg)',
            background: 'linear-gradient(180deg, var(--bg-dark), var(--bg-ink))'
          }}
        >
          <span style={{ position: 'absolute', left: '1rem', top: '1rem', zIndex: 3, fontSize: '9.5px', letterSpacing: '0.4em', fontWeight: 700, textTransform: 'uppercase', background: 'rgba(26,26,26,0.78)', color: '#fff', padding: '.45rem .75rem', borderRadius: '3px', backdropFilter: 'blur(8px)' }}>
            The Author · 2026
          </span>
          
          <img src="/brand/tristian-portrait-new.jpg" alt="Tristian Walker" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', position: 'absolute', inset: 0 }} />
          
        </motion.div>

      </div>
    </section>
  );
}
