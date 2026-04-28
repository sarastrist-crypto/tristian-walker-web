import { motion } from 'framer-motion';

export default function QuietLineBridge() {
  return (
    <motion.a
      href="https://quietlinebook.com"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, y: -4 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.86)',
        backdropFilter: 'blur(16px) saturate(160%)',
        WebkitBackdropFilter: 'blur(16px) saturate(160%)',
        border: '1px solid rgba(188,116,78,0.20)',
        borderRadius: '999px',
        padding: '0.75rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        boxShadow: '0 20px 40px rgba(140,70,40,0.18), 0 4px 10px rgba(0,0,0,0.05)',
        textDecoration: 'none',
        color: 'var(--text-main)',
        cursor: 'pointer',
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.06, 1], boxShadow: ['2px 2px 5px rgba(0,0,0,0.2)', '2px 2px 14px rgba(216,154,92,0.55)', '2px 2px 5px rgba(0,0,0,0.2)'] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '28px',
          height: '36px',
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.22) 100%), linear-gradient(135deg, var(--accent-amber), var(--accent-primary), var(--accent-deep))',
          borderRadius: '2px',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontSize: '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'var(--accent-primary)',
          }}
        >
          Order the book
        </span>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem' }}>
          The Quiet <em style={{ fontStyle: 'italic', color: 'var(--accent-primary)', fontWeight: 400 }}>Line</em>
        </span>
      </div>
    </motion.a>
  );
}
