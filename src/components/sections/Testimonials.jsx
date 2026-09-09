import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import Container from '../ui/Container'
import Marquee from '../ui/Marquee'
import Reveal from '../motion/Reveal'
import SectionHeading from '../ui/SectionHeading'
import useMediaQuery from '../../hooks/useMediaQuery'
import {
  partnerLogos,
  testimonials,
  testimonialsIntro,
  tickerItems,
} from '../../data/testimonials'
import cn from '../../lib/cn'

/** How long each testimonial holds before advancing on its own. */
const AUTOPLAY_MS = 7000

/**
 * Client Stories (screenshots 24-25): heading, a scrolling ticker strip, then
 * a split slider — video reel on the left, quote on a white card on the right.
 * The slider advances on its own, pausing while the reader is on it.
 */
export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const active = testimonials[index]

  const go = (direction) =>
    setIndex((current) => (current + direction + testimonials.length) % testimonials.length)

  /**
   * Depending on `index` is deliberate: it restarts the timer on EVERY slide
   * change, including manual ones. Without it, clicking next just before the
   * interval fired would skip a second slide almost immediately, so a manual
   * click always buys a full interval to read.
   *
   * Auto-advance is suppressed entirely under `prefers-reduced-motion` —
   * content that updates on its own is exactly what that setting is asking
   * us not to do.
   */
  useEffect(() => {
    if (paused || prefersReducedMotion || testimonials.length < 2) return undefined

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length)
    }, AUTOPLAY_MS)

    return () => clearInterval(id)
  }, [index, paused, prefersReducedMotion])

  return (
    <section id="testimonials" className="px-5 lg:px-8">
      <div className="section-panel mx-auto max-w-[1400px]">
        <Container className="relative pt-24 md:pt-32">
          <SectionHeading
            badge={testimonialsIntro.badge}
            badgeIcon="Aperture"
            title={testimonialsIntro.title}
            titleMuted={testimonialsIntro.titleMuted}
            description={testimonialsIntro.description}
            cta={testimonialsIntro.cta}
          />
        </Container>

        {/* Ticker strip — full bleed inside the panel */}
        <Marquee className="mt-16 border-y border-line bg-ink py-3">
          {tickerItems.map((item, itemIndex) => (
            <span
              key={`${item}-${itemIndex}`}
              className="flex items-center gap-6 whitespace-nowrap px-6 text-xs font-bold tracking-wider text-white"
            >
              <span className="text-brand-400">•</span>
              {item}
            </span>
          ))}
        </Marquee>

        <Container className="relative pb-24 md:pb-32">
          {/* Hold the current quote while someone is actually on the slider —
              having it change mid-sentence is the main failure mode of an
              auto-rotating carousel. Focus handlers cover keyboard users,
              who get no hover event. */}
          <div
            className="relative mt-16"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div className="grid overflow-hidden rounded-panel lg:grid-cols-2">
              {/* Reel */}
              <div className="relative flex min-h-[320px] items-center justify-center bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500">
                <button
                  type="button"
                  className="flex items-center gap-2.5 rounded-pill bg-white px-6 py-3.5
                             text-sm font-semibold text-ink transition-transform hover:scale-105"
                >
                  <Play className="h-4 w-4 fill-ink" strokeWidth={0} />
                  PLAY REEL
                </button>
              </div>

              {/* Quote */}
              <div className="flex flex-col justify-between bg-white p-10 lg:p-14">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <span className="font-display text-3xl font-bold text-brand-500">&rdquo;</span>
                    <blockquote className="mt-8 text-[22px] font-medium leading-snug text-ink">
                      &ldquo;{active.quote}&rdquo;
                    </blockquote>
                  </motion.div>
                </AnimatePresence>

                <p className="mt-10 text-sm font-semibold text-ink">
                  {active.author} <span className="text-ink/40">·</span> {active.company}
                </p>
              </div>
            </div>

            {/* Controls */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center
                         justify-center rounded-full bg-ink/70 text-white backdrop-blur
                         transition-colors hover:bg-ink"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center
                         justify-center rounded-full bg-white/70 text-ink backdrop-blur
                         transition-colors hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-pill bg-ink/60 px-3 py-2 backdrop-blur">
              {testimonials.map((item, dotIndex) => (
                <button
                  key={item.author + dotIndex}
                  type="button"
                  onClick={() => setIndex(dotIndex)}
                  aria-label={`Go to testimonial ${dotIndex + 1}`}
                  className={cn(
                    'h-2 w-2 rounded-full transition-colors',
                    dotIndex === index ? 'bg-white' : 'bg-white/35'
                  )}
                />
              ))}
            </div>
          </div>

          {/* Partner logo strip */}
          <Reveal delay={0.1}>
            <Marquee speed="slow" className="mt-20">
              {partnerLogos.map((logo, logoIndex) => (
                <img
                  key={`${logo.name}-${logoIndex}`}
                  src={logo.logo}
                  alt={logo.name}
                  loading="lazy"
                  className="mx-12 h-6 opacity-30 grayscale transition-opacity hover:opacity-60"
                />
              ))}
            </Marquee>
          </Reveal>
        </Container>
      </div>
    </section>
  )
}
