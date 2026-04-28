import { motion } from 'framer-motion';
import { Children, isValidElement } from 'react';

/**
 * RevealText splits children into words and animates each word up
 * on scroll into view. Renders the original element type (h1/h2/p/etc.)
 * so semantics + styling are preserved.
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
  const Tag = motion[as] || motion.span;

  // Walk children and explode strings into per-word spans;
  // preserve nested React elements (like <em>) and recurse into them.
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
              viewport={{ once, margin: '-80px' }}
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
