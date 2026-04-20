import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="contact" style={{ background: 'var(--bg-ink)', color: 'var(--text-on-dark)', padding: '4rem 0 2rem' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, letterSpacing: '0.22em', color: '#fff', fontSize: '1rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Tristian Walker<em style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)', fontStyle: 'italic', letterSpacing: 0, fontWeight: 400, textTransform: 'none', marginLeft: '4px' }}>.</em>
            </div>
            <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', color: 'rgba(168,161,150,0.6)', fontSize: '0.9rem', maxWidth: '28em', lineHeight: 1.6, margin: 0 }}>
              From drift to direction — one honest reckoning at a time. Author, keynote speaker, advisor. Based in the Hudson Valley, working where the stakes of a human interaction are impossible to automate away.
            </p>
          </div>
          <div>
            <h5 style={{ fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--accent-primary)', margin: '0 0 1.25rem' }}>Work</h5>
            {['Speaking', 'The Book', 'Advisory', 'Writing'].map(t => (
              <a href={`#${t.toLowerCase().replace(' ', '')}`} key={t} style={{ display: 'block', color: 'rgba(248,245,239,0.72)', fontSize: '0.9rem', padding: '0.3rem 0', textDecoration: 'none' }}>{t}</a>
            ))}
          </div>
          <div>
            <h5 style={{ fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--accent-primary)', margin: '0 0 1.25rem' }}>Connect</h5>
            <a href="mailto:booking@tristianwalker.com" style={{ display: 'block', color: 'rgba(248,245,239,0.72)', fontSize: '0.9rem', padding: '0.3rem 0', textDecoration: 'none' }}>booking@tristianwalker.com</a>
            <a href="mailto:advisory@tristianwalker.com" style={{ display: 'block', color: 'rgba(248,245,239,0.72)', fontSize: '0.9rem', padding: '0.3rem 0', textDecoration: 'none' }}>advisory@tristianwalker.com</a>
            <a href="#newsletter" style={{ display: 'block', color: 'rgba(248,245,239,0.72)', fontSize: '0.9rem', padding: '0.3rem 0', textDecoration: 'none' }}>The Residency</a>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(168,161,150,0.15)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(168,161,150,0.65)' }}>
          <div>© 2026 Tristian Walker</div>
          <div>Booked by <a href="#" style={{ display: 'inline', color: 'var(--accent-primary)', textDecoration: 'none' }}>Laurel & Ash Speakers</a></div>
        </div>
      </div>
    </footer>
  );
}
