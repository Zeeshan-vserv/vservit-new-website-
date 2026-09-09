import { useEffect } from 'react'
import Lenis from 'lenis'
import useMediaQuery from '../../hooks/useMediaQuery'

/**
 * Wraps the whole page in inertia-based smooth scrolling. Lenis intercepts
 * wheel/touch input and eases the native scroll position toward it every
 * frame, rather than jumping in the browser's default per-tick steps — it
 * still drives real `window.scrollTop`, so framer-motion's `useScroll` and
 * `whileInView` triggers (Hero parallax, Portfolio's sticky stack, WordReveal)
 * keep working unmodified.
 *
 * Skipped entirely under `prefers-reduced-motion`: eased scrolling is a
 * motion effect like any other, and Lenis has no way to honour that
 * preference on its own.
 */
export default function SmoothScroll() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [prefersReducedMotion])

  return null
}
