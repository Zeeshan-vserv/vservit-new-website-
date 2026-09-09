import { Star } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Reveal from '../motion/Reveal'
import SectionBadge from '../ui/SectionBadge'
import useMediaQuery from '../../hooks/useMediaQuery'
import { startJourney } from '../../data/home'

/**
 * Split banner above the team section (screenshot 21): a visual on the left
 * and the CTA block on the right, fading from dark into light.
 */
export default function StartJourney() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden rounded-panel border border-line bg-ink-900 lg:grid-cols-[4fr_5fr]">
            {/* Poster shows immediately; video plays over it once loaded.
                Reduced-motion users get the still poster only. */}
            <div className="relative min-h-[220px]">
              <img
                src={startJourney.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {!prefersReducedMotion && (
                <video
                  src={startJourney.video}
                  poster={startJourney.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              {/* Was `from-ink via-ink/70 to-transparent`, which put 100%
                  black over the video's left edge and 70% across its middle —
                  a holdover from when the copy overlaid the video. The copy
                  now lives in its own grid column, so nothing needs
                  darkening for legibility. All that's left is a short fade on
                  the RIGHT edge so the footage blends into the content panel
                  instead of ending on a hard vertical seam. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent
                           to-ink-900/90"
              />
            </div>

            <div className="relative flex flex-col justify-center gap-5 overflow-hidden bg-ink-900 bg-dot-grid p-8 lg:p-10">
              {/* Violet bloom bleeding in from the top-right corner. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_100%_0%,rgba(124,77,255,0.22)_0%,rgba(124,77,255,0)_70%)]"
              />

              <SectionBadge icon="Rocket" className="self-start">
                {startJourney.badge}
              </SectionBadge>

              <h2 className="font-display text-display-sm font-semibold text-balance">
                {startJourney.title}
                <span className="mt-1 block heading-muted">{startJourney.titleMuted}</span>
              </h2>

              <hr className="max-w-[120px] border-line" />

              <p className="max-w-md text-[15px] leading-relaxed text-muted">
                {startJourney.description}
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <Button to={startJourney.cta.to}>{startJourney.cta.label}</Button>

                <span aria-hidden="true" className="h-9 w-px bg-line" />

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: startJourney.rating.stars }).map((_, index) => (
                      <Star
                        key={index}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted">{startJourney.rating.label}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
