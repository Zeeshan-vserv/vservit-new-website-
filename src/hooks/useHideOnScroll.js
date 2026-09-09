import { useEffect, useRef, useState } from 'react'

/**
 * True while the page is being scrolled DOWN — used to slide the header out
 * of view, and bring it back the moment the user scrolls up.
 *
 * Two things make this feel smooth rather than twitchy:
 *
 * 1. A direction-change deadzone. Raw `scrollY` deltas reverse sign constantly
 *    on a trackpad or a momentum fling, so reacting to every delta makes the
 *    header strobe. Deltas are accumulated instead, and the header only flips
 *    once movement in one direction passes `threshold`; any reversal resets
 *    the accumulator.
 * 2. rAF throttling, so the listener does at most one measurement per frame.
 *
 * Because state only changes on an actual direction flip, React re-renders a
 * handful of times per page rather than on every scroll event.
 */
export default function useHideOnScroll({
  threshold = 10,
  revealAt = 84,
  disabled = false,
} = {}) {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const travelled = useRef(0)

  useEffect(() => {
    if (disabled) {
      setHidden(false)
      return undefined
    }

    lastY.current = window.scrollY
    travelled.current = 0
    let frame = null

    const evaluate = () => {
      frame = null

      const y = window.scrollY
      const delta = y - lastY.current
      lastY.current = y

      // Near the top the header is always visible — otherwise it could stay
      // hidden while the user is looking at the hero.
      if (y <= revealAt) {
        travelled.current = 0
        setHidden(false)
        return
      }

      // Reversing direction restarts the count, so a flick the other way has
      // to be deliberate before it flips the header.
      if (delta > 0 !== travelled.current > 0) travelled.current = 0
      travelled.current += delta

      if (travelled.current > threshold) {
        setHidden(true)
        travelled.current = 0
      } else if (travelled.current < -threshold) {
        setHidden(false)
        travelled.current = 0
      }
    }

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(evaluate)
    }

    evaluate()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [threshold, revealAt, disabled])

  return hidden
}
