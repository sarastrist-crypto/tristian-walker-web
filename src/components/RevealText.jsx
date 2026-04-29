import { createElement } from 'react';
import { motion } from 'framer-motion';
import { Children, isValidElement } from 'react';
import { useGentleMotion } from '../hooks/useIsMobile';

/**
 * Desktop: per-word stagger reveal on scroll into view.
 * Mobile / reduced-motion: TRUE pass-through. The element renders as plain
 * HTML with zero motion props — no IntersectionObserver, no transforms,
 * no opacity tweens. The text is just there when you scroll to it.
 *
 * That's the smoothest possible read on a phone.
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

  // ── Gentle path: plain HTML element, no motion at all ──────────────
  if (gentle) {
    return createElement(as, { className, style, ...rest }, children);
  }

  // ── Rich path: per-word stagger (desktop only) ─────────────────────
  const Tag = motion[as] || motion.span;
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
