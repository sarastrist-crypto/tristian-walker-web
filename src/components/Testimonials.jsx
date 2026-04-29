import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import RevealText from './RevealText';
import { useIsMobile } from '../hooks/useIsMobile';

const TESTIMONIALS = [
  {
    pull: "In twenty-two years of programming this festival I have never watched an audience lean forward the way they did for Tristian. He didn't perform. He remembered them to themselves. Three weeks later, our staff is still quoting him back to one another.",
    initials: 'EM', name: 'Elias M.', role: 'Artistic Director · Arts Festival', feature: false,
  },
  {
    pull: 'I booked him for the kickoff. He ended up shaping the whole cabinet year. We now open every quarterly with his audit.',
    initials: 'DA', name: 'Dr. Aris', role: 'CMO · National Medical Center', feature: true,
  },
  {
    pull: "The book is the first thing in a decade I gave to all eleven of my direct reports. They're still arguing about it. That's the highest compliment I can give.",
    initials: 'SP', name: 'Sarah P.', role: 'CEO · Global Fintech', feature: false,
  },
];

function QuoteCard({ t, y }) {
  const ref = useRef(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const bgImage = useTransform(
    [mx, my],
    ([x, y]) =>
      `radial-gradient(circle 240px at ${x}% ${y}%, rgba(216,154,92,0.18), transparent 70%)`
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      style={{ y }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <div
        style={{
          position: 'relative',
          background: t.feature ? 'var(--bg-dark)' : '#fff',
          color: t.feature ? 'var(--text-light)' : 'var(--text-main)',
          borderRadius: '14px',
          padding: t.feature ? 'clamp(1.75rem, 4vw, 3rem)' : 'clamp(1.5rem, 3.5vw, 2.5rem)',
          boxShadow: t.feature
            ? '0 30px 60px rgba(140,70,40,0.30), 0 8px 20px rgba(0,0,0,0.18)'
            : 'var(--shadow-md)',
          border: '1px solid rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          height: '100%',
          overflow: 'hidden',
          isolation: 'isolate',
        }}
      >
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: bgImage,
            zIndex: 0,
            pointerEvents: 'none',
            mixBlendMode: t.feature ? 'screen' : 'multiply',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontStyle: 'italic',
              color: 'var(--accent-primary)',
              fontSize: '3.2rem',
              lineHeight: 0.6,
              height: '1.5rem',
            }}
          >
            "
          </div>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: t.feature ? '1.5rem' : '1.08rem',
              lineHeight: t.feature ? 1.45 : 1.55,
              fontWeight: t.feature ? 300 : 400,
              flexGrow: 1,
              textWrap: 'pretty',
            }}
          >
            {t.pull}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              paddingTop: '1.25rem',
              borderTop: t.feature
                ? '1px solid rgba(255,255,255,0.1)'
                : '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-amber), var(--accent-primary), var(--accent-deep))',
                color: '#fff',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 14px rgba(140,70,40,0.25)',
              }}
            >
              {t.initials}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.name}</div>
              <div
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: t.feature ? 'rgba(248,245,239,0.7)' : 'var(--text-muted)',
                  marginTop: '0.15rem',
                }}
              >
                {t.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Parallax variant — only mounts on desktop. By extracting the useScroll +
// useTransform calls into their own component, we ensure the scroll-linked
// motion-value pipeline is NEVER set up on mobile. (Hooks only run when the
// component renders.)
function ParallaxGrid({ children }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [140, -140]);
  return children({ containerRef, yTransforms: [y1, y2, y3] });
}

export default function Testimonials() {
  const isMobile = useIsMobile();
  const staticRef = useRef(null);
  const flatY = useMotionValue(0);

  if (isMobile) {
    return (
      <TestimonialsLayout containerRef={staticRef} yTransforms={[flatY, flatY, flatY]} />
    );
  }
  return (
    <ParallaxGrid>
      {({ containerRef, yTransforms }) => (
        <TestimonialsLayout containerRef={containerRef} yTransforms={yTransforms} />
      )}
    </ParallaxGrid>
  );
}

function TestimonialsLayout({ containerRef, yTransforms }) {

  return (
    <section
      ref={containerRef}
      style={{
        background: 'var(--bg-parchment)',
        position: 'relative',
        overflow: 'hidden',
        padding: '7rem 0',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#d8cfc1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.45,
          pointerEvents: 'none',
          maskImage: 'linear-gradient(180deg, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4rem',
            gap: '3rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div className="eyebrow">03 / What people say</div>
            <RevealText
              as="h2"
              style={{
                fontSize: 'clamp(2.4rem, 4.6vw, 3.6rem)',
                margin: 0,
                maxWidth: '12ch',
                lineHeight: 1.05,
              }}
            >
              The room goes <em>still.</em> Then it leans in.
            </RevealText>
          </div>
          <p
            style={{
              maxWidth: '28em',
              fontFamily: 'var(--font-heading)',
              fontStyle: 'italic',
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
            }}
          >
            Five years of post-keynote notes, advisor emails, and the occasional handwritten card from a CEO's assistant. A few, unedited.
          </p>
        </motion.div>

        <div
          className="testimonials-grid"
          style={{
            display: 'grid',
            gap: '1.5rem',
            maxWidth: '1200px',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <QuoteCard key={i} t={t} y={yTransforms[i]} />
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 980px) {
          .testimonials-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
