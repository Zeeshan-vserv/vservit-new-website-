import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import Button from '../ui/Button'
import Container from '../ui/Container'
import useScrolled from '../../hooks/useScrolled'
import useHideOnScroll from '../../hooks/useHideOnScroll'
import useMediaQuery from '../../hooks/useMediaQuery'
import { mainNav, navCta } from '../../data/site'
import cn from '../../lib/cn'

/**
 * Seconds for the header to slide out or back in. Long enough to read as a
 * glide rather than a snap, but kept under ~0.7s — the bar reappears in
 * response to a scroll-up, so anything slower feels unresponsive.
 */
const NAV_SLIDE_SECONDS = 0.6

/**
 * Fixed header — transparent over the hero, blurred once scrolled, and it
 * slides up out of the way on scroll down / drops back in on scroll up.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const scrolled = useScrolled()
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  // Three cases where hiding would be a bug rather than a feature: the mobile
  // menu is open (the panel would slide away with the header), something
  // inside has keyboard focus (focus would be pushed off-screen), or the user
  // has asked for reduced motion.
  const hidden = useHideOnScroll({ disabled: open || focused || prefersReducedMotion })

  const linkClass = ({ isActive }) =>
    cn(
      'text-sm transition-colors duration-200',
      isActive ? 'text-white' : 'text-muted hover:text-white'
    )

  return (
    <motion.header
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={() => setFocused(false)}
      animate={{ y: hidden ? '-100%' : '0%', opacity: hidden ? 0 : 1 }}
      // Transform + opacity only, so this stays on the compositor. The
      // background/blur swap keeps its own CSS transition — animating
      // backdrop-blur here would force a repaint every frame.
      //
      // easeInOutSine (0.37, 0, 0.63, 1) rather than the site's usual
      // [0.22, 1, 0.36, 1]: that curve has an near-instant initial velocity,
      // which snaps the bar away and reads as abrupt on a slide this large.
      // This one eases gently in AND out, so there's no hard edge at either
      // end of the travel.
      transition={{ duration: NAV_SLIDE_SECONDS, ease: [0.37, 0, 0.63, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300',
        scrolled ? 'border-b border-line bg-ink/80 backdrop-blur-xl' : 'bg-transparent'
      )}
    >
      <Container className="flex h-[84px] items-center justify-between gap-6">
        <Logo asImage />

        <nav className="hidden items-center gap-7 lg:flex">
          {mainNav.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button to={navCta.to} className="hidden sm:inline-flex">
            {navCta.label}
          </Button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-5">
              {mainNav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-xl px-3 py-3 text-[15px] transition-colors',
                      isActive ? 'bg-ink-800 text-white' : 'text-muted hover:text-white'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Button to={navCta.to} className="mt-3 w-full" onClick={() => setOpen(false)}>
                {navCta.label}
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
