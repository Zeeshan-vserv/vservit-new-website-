import { useEffect, useState } from 'react'

/**
 * True once the page has scrolled past `threshold`. Drives the navbar's
 * transparent -> blurred background transition.
 */
export default function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
