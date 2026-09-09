import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from './variants'

/**
 * Wraps children in a scroll-triggered reveal. Used by nearly every section,
 * so keep the API minimal: `delay` and an optional custom `variants`.
 */
export default function Reveal({
  children,
  delay = 0,
  variants = fadeUp,
  as = 'div',
  className = '',
  ...rest
}) {
  const Component = motion[as] ?? motion.div

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Component>
  )
}
