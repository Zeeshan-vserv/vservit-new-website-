/**
 * Shared Framer Motion variants. The reference site reveals almost everything
 * on scroll with a short upward drift, so these are the defaults.
 */

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Parent that staggers its children — use with fadeUp on each child. */
export const stagger = (delayChildren = 0, staggerChildren = 0.08) => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
})

/** Default viewport config so sections animate once, slightly before entry. */
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' }
