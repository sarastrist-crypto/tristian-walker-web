import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import RevealText from './RevealText';
import { useReveal } from '../hooks/useReveal';

// AI in Plain English: the show's episodes live on cobbledworks.com. This
// section points there, in this site's own warm palette.
const GALLERY = 'https://cobbledworks.com/ai-in-plain-english/';
const LATEST = {
  num: 'Episode 1',
  title: 'Talk your quote into your phone',
  body: 'Say what you saw on the job, and let your phone write the quote. You set the prices.',
  href: 'https://cobbledworks.com/ai-in-plain-english/episode-1/',
  thumb: '/uploads/ai-in-plain-english-ep1.jpg',
  length: '1:44',
};

export default function ShowFeature() {
  const textReveal = useReveal({ y: 24, duration: 0.7 });
  const filmReveal = useReveal({ y: 36, duration: 0.8, delay: 0.1 });
  return (
    <section
      id="show"
      style={{
        padding: '7rem 0',
        background:
          'radial-gradient(ellipse 900px 480px at 85% 10%, rgba(216,154,92,0.16), transparent 70%), var(--bg-warm)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="wrap show-feature">
        <motion.div {...textReveal} className="show-feature__copy">
          <div className="eyebrow">New · On video</div>
          <RevealText
            as="h2"
            style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)', margin: '0 0 1rem', letterSpacing: '-0.015em' }}
          >
            AI in <em>Plain English.</em>
          </RevealText>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '34rem' }}>
            A short show for owners who run crews. One idea each episode, shown on a real phone, in plain words, so
            the paperwork after the field takes less of the night.
          </p>
          <div className="show-feature__actions">
            <a className="btn btn-primary" href={LATEST.href} target="_blank" rel="noreferrer">
              Watch {LATEST.num}
            </a>
            <a className="show-feature__all" href={GALLERY} target="_blank" rel="noreferrer">
              All episodes →
            </a>
          </div>
        </motion.div>

        <motion.a
          {...filmReveal}
          href={LATEST.href}
          target="_blank"
          rel="noreferrer"
          className="show-feature__film"
          aria-label={`Watch ${LATEST.num}: ${LATEST.title}, ${LATEST.length}`}
        >
          <span className="show-feature__frame">
            <img src={LATEST.thumb} width="1280" height="720" alt="" loading="lazy" decoding="async" />
            <span className="show-feature__play" aria-hidden>
              <Play size={26} fill="currentColor" strokeWidth={0} />
            </span>
            <span className="show-feature__len" aria-hidden>{LATEST.length}</span>
          </span>
          <span className="show-feature__caption">
            <span className="show-feature__num">{LATEST.num}</span>
            <span className="show-feature__title">{LATEST.title}</span>
            <span className="show-feature__body">{LATEST.body}</span>
          </span>
        </motion.a>
      </div>
    </section>
  );
}
