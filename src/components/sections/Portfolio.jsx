import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '../ui/Container'
import Card from '../ui/Card'
import Pill from '../ui/Pill'
import Reveal from '../motion/Reveal'
import CheckItem from '../ui/CheckItem'
import SectionHeading from '../ui/SectionHeading'
import useMediaQuery from '../../hooks/useMediaQuery'
import { caseStudies, portfolioIntro } from '../../data/portfolio'

/** Distance from the viewport top that the first pinned card holds at. */
const STICK_TOP = 112 // px — matches `top-28`

/**
 * Each card pins this much lower than the one before it, so the covered
 * card's top edge stays visible as a sliver and the group reads as a
 * physical pile rather than a single card swapping contents.
 */
const PEEK = 14 // px

/**
 * Fraction of each card's scroll slot spent fully forward before it starts
 * receding under the next one. Lower = recedes sooner. Main tuning knob for
 * how long each case study holds the front of the pile.
 */
const HOLD = 0.55

/** How far a covered card recedes and dims once it's behind the next one. */
const COVERED_SCALE = 0.94
const COVERED_OPACITY = 0.5

/**
 * One case study in the scroll stack.
 *
 * All cards are `position: sticky` with ASCENDING z-index, so each card
 * paints above the one before it. As a card scrolls up to its pin point it
 * therefore travels OVER the previous card and lands on top of it, building
 * a pile toward the viewer. That arrival is pure CSS sticky — no JS needed.
 *
 * The scroll-linked part is only the depth cue: a card scales down and dims
 * as the next one covers it, so the pile recedes instead of looking flat.
 *
 * The driver has to be the CONTAINER, not the card: a pinned sticky
 * element's bounding box stops moving, so `useScroll` measured on the card
 * itself would freeze at 0 and never advance.
 *
 * The last card is never covered, so it never recedes.
 */
function StackedCaseStudy({ index, total, progress, children }) {
  const isLast = index === total - 1

  // A card recedes as the NEXT one rises over it, which lands around the
  // boundary into that next card's slot.
  const coverStart = (index + HOLD) / total
  const coverEnd = (index + 1) / total
  const range = [coverStart, coverEnd]

  const scale = useTransform(progress, range, isLast ? [1, 1] : [1, COVERED_SCALE])
  const opacity = useTransform(progress, range, isLast ? [1, 1] : [1, COVERED_OPACITY])

  return (
    <div className="sticky" style={{ top: STICK_TOP + index * PEEK, zIndex: index }}>
      {/* Anchored to the top edge so shrinking pulls the card down and in,
          leaving the peeking sliver in place rather than sliding it. */}
      <motion.div style={{ scale, opacity, transformOrigin: 'top center' }}>
        {children}
      </motion.div>
    </div>
  )
}

/** The three-card row: details on the left, two images filling the rest. */
function CaseStudyRow({ study }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card dots={false} className="flex flex-col p-6 ring-1 ring-brand-900/50">
        <div className="flex items-start gap-3">
          <span className="rounded-lg border border-line bg-ink-800 px-2.5 py-1 text-xs font-semibold text-white">
            {study.year}
          </span>
          <h3 className="text-[15px] font-semibold leading-snug text-white">{study.title}</h3>
        </div>

        <hr className="my-5 border-line" />

        <ul className="flex flex-col gap-4">
          {study.highlights.map((highlight) => (
            <CheckItem key={highlight}>{highlight}</CheckItem>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <Pill key={tag} tone="subtle">
              {tag}
            </Pill>
          ))}
        </div>
      </Card>

      {study.images.map((image, imageIndex) => (
        <div key={image} className="overflow-hidden rounded-card border border-line bg-ink-850">
          <img
            src={image}
            alt={`${study.title} visual ${imageIndex + 1}`}
            loading="lazy"
            className="h-full min-h-[220px] w-full object-cover transition-transform
                       duration-500 hover:scale-105"
          />
        </div>
      ))}
    </div>
  )
}

/**
 * Case-study rows (screenshots 9-11). On desktop they form a scroll stack:
 * each card peels away upward to uncover the next one, which has been
 * pinned underneath all along.
 */
export default function Portfolio() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const stackRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  })

  // Three tall cards pinned on top of each other is unreadable on a phone,
  // and the effect is pure decoration — fall back to a plain list.
  const useStack = isDesktop && !prefersReducedMotion

  return (
    <section id="portfolio" className="px-5 lg:px-8">
      {/* Not `.section-panel` — that class's glow is a symmetric top-centre
          radial, and this section wants a diagonal top-left -> bottom-right
          purple-black tilt instead. See `.portfolio-panel` in index.css. */}
      <div className="portfolio-panel mx-auto max-w-[1400px]">
        {/* Breaks up banding in the diagonal gradient above (see
            .grain-overlay in index.css). A real sibling placed before
            Container, not a ::after on the panel, so it paints under the
            heading/cards instead of on top of them. */}
        <div aria-hidden="true" className="grain-overlay rounded-panel" />

        <Container className="relative py-24 md:py-32">
          <SectionHeading
            badge={portfolioIntro.badge}
            badgeIcon="Layers"
            title={portfolioIntro.title}
            titleMuted={portfolioIntro.titleMuted}
            description={portfolioIntro.description}
            cta={portfolioIntro.cta}
          />

          {useStack ? (
            <div ref={stackRef} className="mt-20 flex flex-col gap-6">
              {caseStudies.map((study, index) => (
                <StackedCaseStudy
                  key={study.slug}
                  index={index}
                  total={caseStudies.length}
                  progress={scrollYProgress}
                >
                  <CaseStudyRow study={study} />
                </StackedCaseStudy>
              ))}
            </div>
          ) : (
            <div className="mt-20 flex flex-col gap-6">
              {caseStudies.map((study, index) => (
                <Reveal key={study.slug} delay={index * 0.06}>
                  <CaseStudyRow study={study} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </div>
    </section>
  )
}
