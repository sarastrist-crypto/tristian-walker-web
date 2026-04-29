import { motion } from 'framer-motion';
import { Children, isValidElement } from 'react';
import { useGentleMotion } from '../hooks/useIsMobile';

/**
 * RevealText splits children into words and animates each word up
 * on scroll into view (desktop). On mobile or with reduced-motion preferred,
 * it falls back to a single fade-up of the whole block — same intent,
 * a fraction of the work, no risk of "word-by-word stutter" during scroll.
 *
 * Usage:
 *   <RevealText as="h1" style={...}>The room goes <em>still</em>.</RevealText>
 */
export default function RevealText({
  as = 'span',
  children,
  delay = 0,
  stagger = 0.035,
  duration = 0.7,
  y = '120%',
  style,
  className,
  once = true,
  ...rest
}) {
  const gentle = useGentleMotion();
  const Tag = motion[as] || motion.span;

  // ── Gentle path: one fade-up for the whole element ─────────────────
  if (gentle) {
    return (
      <Tag
        className={className}
        style={style}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
        {...rest}
      >
        {children}
      </Tag>
    );
  }

  // ── Rich path: per-word stagger (desktop only) ─────────────────────
  let counter = { i: 0 };

  const renderNode = (node) => {
    if (typeof node === 'string') {
      return node.split(/(\s+)/).map((token, idx) => {
        if (/^\s+$/.test(token)) return token;
        const i = counter.i++;
        return (
          <span
            key={`w-${i}-${idx}`}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'baseline' }}
          >
            <motion.span
              initial={{ y, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once, margin: '-50px' }}
              transition={{ duration, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block', willChange: 'transform' }}
            >
              {token}
            </motion.span>
          </span>
        );
      });
    }
    if (isValidElement(node)) {
      const inner = Children.map(node.props.children, renderNode);
      return { ...node, props: { ...node.props, children: inner } };
    }
    if (Array.isArray(node)) return node.map(renderNode);
    return node;
  };

  return (
    <Tag className={className} style={style} {...rest}>
      {Children.map(children, renderNode)}
    </Tag>
  );
}
