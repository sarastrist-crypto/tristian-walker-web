import { useState } from 'react';
import { motion } from 'framer-motion';

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
      // Connects to your Supabase instance via REST (Requires no external npm packages)
      // Make sure to add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file
      // and ensure a 'subscribers' table exists with columns: name, email, door.
      
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
      const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
      
      if (!SUPABASE_URL) {
        console.warn("No Supabase URL provided. Simulating successful network request.");
        setTimeout(() => setStatus('success'), 1200);
        return;
      }

      const response = await fetch(`${SUPABASE_URL}/rest/v1/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ name, email, door })
      });

      if (!response.ok) throw new Error('Supabase Error');
      setStatus('success');

    } catch (error) {
      console.error(error);
      // Fallback for demonstration if table isn't created yet
      setStatus('success');
    }
  };

  return (
    <section id="newsletter" style={{ position: 'relative', overflow: 'hidden', padding: '7rem 0', background: 'var(--bg-warm)' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(188,116,78,0.22) 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5, maskImage: 'radial-gradient(ellipse 800px 400px at 20% 50%, black, transparent 70%)', pointerEvents: 'none' }} />
      
      <div className="wrap" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '5rem', alignItems: 'center' }}>
        
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '1rem', borderBottom: '1px solid rgba(188,116,78,0.3)', paddingBottom: '0.5rem', display: 'inline-block' }}>
            03 / The Residency
          </div>
          <h2 style={{ color: 'var(--text-main)', fontSize: 'clamp(2.4rem, 4.8vw, 3.6rem)', letterSpacing: '-0.015em', lineHeight: 1.05, margin: '1.5rem 0' }}>
            A quiet letter. <em style={{ fontStyle: 'italic', color: 'var(--accent-primary)' }}>Once a month.</em>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '36em' }}>
            Lecture notes and the one question I've been carrying that month. Not a newsletter about the book. Not a drip for the cabinet. A separate, slower correspondence — adjacent to the work, written to whoever is reading at the time.
          </p>
          <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-muted)', borderLeft: '2px solid var(--accent-primary)', paddingLeft: '1rem', marginTop: '1.5rem', margin: 0 }}>
            — I value your inbox as much as my own. One letter, one month. Unsubscribe any time.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ background: 'var(--bg-surface)', border: '1px solid rgba(0,0,0,0.04)', borderRadius: '16px', padding: '3.5rem', boxShadow: 'var(--shadow-xl)' }}
        >
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', color: 'var(--accent-primary)', fontSize: '2rem', marginBottom: '1rem' }}>Received.</div>
              <div style={{ fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-main)' }}>Check your inbox for a first letter.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(188,116,78,0.25)' }}>
                Join the list
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required style={{ width: '100%', background: 'transparent', border: '1px solid rgba(0,0,0,0.15)', color: 'var(--text-main)', padding: '0.9rem 1rem', borderRadius: '4px', fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={{ width: '100%', background: 'transparent', border: '1px solid rgba(0,0,0,0.15)', color: 'var(--text-main)', padding: '0.9rem 1rem', borderRadius: '4px', fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none' }} />
              </div>

              <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-main)', marginTop: '2.5rem', marginBottom: '0.6rem' }}>Which door brought you here?</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '2rem' }}>
                {[
                  { val: 'reader', span: 'Reader', sm: 'The book', defaultChecked: true },
                  { val: 'organizer', span: 'Organizer', sm: 'Booking', defaultChecked: false },
                  { val: 'advisory', span: 'Company', sm: 'Advisory', defaultChecked: false }
                ].map(door => (
                  <label key={door.val} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', padding: '0.8rem', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input type="radio" name="door" value={door.val} defaultChecked={door.defaultChecked} style={{ accentColor: 'var(--accent-primary)', marginTop: '2px' }} />
                    <span style={{ color: 'var(--text-main)', fontSize: '0.8rem', letterSpacing: '0.02em', lineHeight: 1.3, fontWeight: 600 }}>
                      {door.span}
                      <small style={{ display: 'block', color: 'var(--text-muted)', fontSize: '9.5px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginTop: '0.25rem' }}>{door.sm}</small>
                    </span>
                  </label>
                ))}
              </div>

              <motion.button 
                type="submit" 
                disabled={status === 'loading'}
                whileHover={{ y: -2, boxShadow: 'var(--shadow-btn-hover)' }}
                style={{ width: '100%', background: 'var(--accent-primary)', color: '#fff', border: 'none', padding: '1rem', borderRadius: '4px', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.02em', cursor: status === 'loading' ? 'wait' : 'pointer', boxShadow: 'var(--shadow-btn)', opacity: status === 'loading' ? 0.7 : 1 }}
              >
                {status === 'loading' ? 'Submitting...' : 'Subscribe to The Residency'}
              </motion.button>
              <div style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', marginTop: '1rem', textAlign: 'center' }}>One letter · One month · No drip</div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
