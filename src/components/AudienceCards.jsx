import { motion } from 'framer-motion';

export default function AudienceCards() {
  return (
    <section id="book" style={{ padding: '8rem 0', background: 'linear-gradient(180deg, var(--bg-base) 0%, var(--bg-warm) 100%)' }}>
      <div className="wrap">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 4rem' }}
        >
          <div style={{ fontSize: '12px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--accent-primary)', fontWeight: 700, paddingBottom: '0.5rem', borderBottom: '1px solid rgba(188,116,78,0.25)', display: 'inline-block', marginBottom: '1.5rem' }}>
            02 / Three rooms
          </div>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4.6vw, 3.6rem)', margin: '0 0 1rem', letterSpacing: '-0.015em' }}>
            One practice. <em style={{ fontStyle: 'italic', color: 'var(--accent-primary)' }}>Three rooms.</em>
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
            Most people find this work through one door. It helps to know there are three — and which one you are walking through.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Card 1: Speaking */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -6, boxShadow: 'var(--shadow-xl)' }} transition={{ duration: 0.6 }}
            style={{ background: 'var(--bg-surface)', borderRadius: '16px', padding: '3.5rem', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3.5rem', boxShadow: 'var(--shadow-md)', border: '1px solid rgba(0,0,0,0.03)' }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '5.5rem', color: 'var(--accent-primary)', lineHeight: 1, marginBottom: '1rem' }}>01</div>
              <div style={{ fontSize: '12.5px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '1.25rem' }}>For event organizers</div>
              <h3 style={{ fontSize: '2.1rem', letterSpacing: '-0.01em', margin: '0 0 1rem', lineHeight: 1.1 }}>A keynote built for rooms that can't <em style={{ fontStyle: 'italic', color: 'var(--accent-primary)' }}>afford a bad hour.</em></h3>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-main)', marginBottom: '1rem' }}>C-Suite off-sites · Medical conventions · Arts Galas</div>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '2rem' }}>
                A 45-minute lecture on <em>Professional Drift</em> — what it is, how it decays character, and the specific practice that reclaims presence. Adapted to your industry's language.
              </p>
              <a href="mailto:tristian@tristianwalker.com" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>Request a booking kit →</a>
            </div>
            <div style={{ background: 'var(--bg-parchment)', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(188,116,78,0.1)' }}>
              <div style={{ alignSelf: 'flex-start', fontSize: '12.5px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(188,116,78,0.2)' }}>What the lecture covers</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['The Foundation: Character at Scale', 'The Diagnosis: The Wall of Anonymity', 'The Reframe: The Compass of Presence', 'The Close: The Quiet Line & The Flicker'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem 0', borderTop: i===0? 'none' : '1px dashed rgba(0,0,0,0.08)' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-primary)', fontSize: '0.9rem', fontStyle: 'italic' }}>0{i+1}</span>
                    <span style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 2: 3D Book */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -6, boxShadow: 'var(--shadow-xl)' }} transition={{ duration: 0.6 }}
            style={{ background: 'var(--bg-surface)', borderRadius: '16px', padding: '3.5rem', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3.5rem', boxShadow: 'var(--shadow-md)', border: '1px solid rgba(0,0,0,0.03)' }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '5.5rem', color: 'var(--accent-primary)', lineHeight: 1, marginBottom: '1rem' }}>02</div>
              <div style={{ fontSize: '12.5px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '1.25rem' }}>For readers</div>
              <h3 style={{ fontSize: '2.4rem', letterSpacing: '-0.01em', margin: '0 0 1rem', lineHeight: 1.1 }}>The Quiet <em style={{ fontStyle: 'italic', color: 'var(--accent-primary)' }}>Line.</em></h3>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-main)', marginBottom: '1rem' }}>A book for the capable & quietly disconnected</div>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '2rem' }}>
                A measured, literary reckoning with <strong style={{ color: 'var(--text-main)' }}>professional drift</strong> — the slow trade of presence for process, and the practice that brings a person back.
              </p>
              <a href="https://quietlinebook.com" className="btn btn-primary" target="_blank" rel="noreferrer" style={{ display: 'inline-block', textDecoration: 'none' }}>Visit quietlinebook.com →</a>
            </div>

            <div style={{ background: 'var(--bg-parchment)', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(188,116,78,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ alignSelf: 'flex-start', fontSize: '12.5px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '2rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(188,116,78,0.2)', width: '100%' }}>The Book</div>
              
              <motion.a 
                href="https://quietlinebook.com" target="_blank"
                whileHover={{ rotateY: 15, rotateX: 5, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  display: 'block', width: '250px', aspectRatio: '2/3', backgroundColor: 'var(--bg-dark)',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.22)', borderRadius: '3px', position: 'relative',
                  overflow: 'hidden', cursor: 'pointer', perspective: '1200px', margin: '1rem auto'
                }}
              >
                <img 
                  src="/brand/book-cover-new.jpg" 
                  alt="The Quiet Line Book Cover" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div style="position: absolute; inset: 0; background: var(--accent-primary); display: flex; flex-direction: column; padding: 1.5rem; justify-content: center; align-items: center; text-align: center;"><div style="font-size: 8px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,255,255,0.7); margin-bottom: 1rem;">Tristian Walker</div><div style="font-family: var(--font-heading); font-size: 1.4rem; color: #fff; line-height: 1.2;">The Quiet<br/><em style="font-style: italic;">Line.</em></div></div>';
                  }}
                />
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
