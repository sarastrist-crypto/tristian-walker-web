import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const TESTIMONIALS = [
  {
    pull: "In twenty-two years of programming this festival I have never watched an audience lean forward the way they did for Tristian. He didn't perform. He remembered them to themselves. Three weeks later, our staff is still quoting him back to one another.",
    initials: "EM", name: "Elias M.", role: "Artistic Director · Arts Festival", feature: false
  },
  {
    pull: "I booked him for the kickoff. He ended up shaping the whole cabinet year. We now open every quarterly with his audit.",
    initials: "DA", name: "Dr. Aris", role: "CMO · National Medical Center", feature: true
  },
  {
    pull: "The book is the first thing in a decade I gave to all eleven of my direct reports. They're still arguing about it. That's the highest compliment I can give.",
    initials: "SP", name: "Sarah P.", role: "CEO · Global Fintech", feature: false
  }
];

export default function Testimonials() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const yTransforms = [y1, y2, y3];

  return (
    <section ref={containerRef} style={{ background: 'var(--bg-parchment)', position: 'relative', overflow: 'hidden', padding: '7rem 0' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#d8cfc1 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.45, pointerEvents: 'none', maskImage: 'linear-gradient(180deg, transparent 0%, black 20%, black 80%, transparent 100%)' }} />
      
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', gap: '3rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '1rem', borderBottom: '1px solid rgba(188,116,78,0.25)', paddingBottom: '0.5rem', display: 'inline-block' }}>03 / What people say</div>
            <h2 style={{ fontSize: 'clamp(2.4rem, 4.6vw, 3.6rem)', margin: 0, maxWidth: '12ch', lineHeight: 1.05 }}>The room goes <em style={{ fontStyle: 'italic', color: 'var(--accent-primary)' }}>still.</em> Then it leans in.</h2>
          </div>
          <p style={{ maxWidth: '28em', fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '1.15rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
            Five years of post-keynote notes, advisor emails, and the occasional handwritten card from a CEO's assistant. A few, unedited.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '1200px' }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={i}
              style={{ y: yTransforms[i] }}
              whileHover={{ y: -6, boxShadow: 'var(--shadow-xl)' }}
              transition={{ duration: 0.3 }}
              className={`quote-card`}
            >
              <div style={{
                background: t.feature ? 'var(--bg-dark)' : '#fff',
                color: t.feature ? 'var(--text-light)' : 'var(--text-main)',
                borderRadius: '12px', padding: t.feature ? '3rem' : '2.5rem',
                boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(0,0,0,0.03)',
                display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%'
              }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', color: 'var(--accent-primary)', fontSize: '3.2rem', lineHeight: 0.6, height: '1.5rem' }}>"</div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: t.feature ? '1.5rem' : '1.08rem',
                  lineHeight: t.feature ? 1.45 : 1.55,
                  fontWeight: t.feature ? 300 : 400,
                  flexGrow: 1, textWrap: 'pretty'
                }}>
                  {t.pull}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '1.25rem', borderTop: t.feature ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-tan), var(--accent-primary))', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.name}</div>
                    <div style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, color: t.feature ? 'rgba(248,245,239,0.7)' : 'var(--text-muted)', marginTop: '0.15rem' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
