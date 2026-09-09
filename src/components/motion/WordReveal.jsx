import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import cn from '../../lib/cn'

/**
 * A single word whose opacity is a direct function of scroll progress within
 * `range` — not a triggered animation, so it brightens on the way down and
 * dims again on the way back up, tracking the scrollbar exactly.
 */
function Word({ children, range, progress, className }) {
  const opacity = useTransform(progress, range, [0.15, 1])

  return (
    <motion.span style={{ opacity }} className={cn('inline-block', className)}>
      {children}
    </motion.span>
  )
}

/**
 * Word-by-word brightening used for the big "About Us" statement
 * (screenshot 2). Each word's opacity is driven by `scrollYProgress` as the
 * paragraph transits the viewport, so the highlight scrubs forward when
 * scrolling down and retreats when scrolling up — matching the reference
 * site rather than a fire-once reveal.
 */
export default function WordReveal({ text, className = '', wordClassName = '' }) {
  const containerRef = useRef(null)
  const words = text.split(' ')

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // progress 0 as the paragraph's top edge enters from the bottom of the
    // viewport; progress 1 once its bottom edge reaches the upper-middle of
    // the viewport — i.e. the reveal finishes as soon as the whole paragraph
    // has scrolled into a comfortable reading position, not only once it has
    // scrolled entirely past the top edge.
    offset: ['start 0.85', 'end 0.65'],
  })

  return (
    <p ref={containerRef} className={cn('text-balance', className)}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length

        return (
          <Word
            key={`${word}-${i}`}
            range={[start, end]}
            progress={scrollYProgress}
            className={wordClassName}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </Word>
        )
      })}
    </p>
  )
}
