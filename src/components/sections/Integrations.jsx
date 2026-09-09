import { Check } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Marquee from '../ui/Marquee'
import Reveal from '../motion/Reveal'
import useMediaQuery from '../../hooks/useMediaQuery'
import { integrations } from '../../data/home'

/**
 * Integrations panel (screenshots 15-16): centred heading over a horizontal
 * rail of circular platform logos that scrolls continuously right -> left,
 * with a pulsing "verified" badge fixed at centre — logos visibly pass
 * behind its solid fill as they travel under it.
 */
function LogoChip({ logo }) {
  return (
    <span
      className="mx-3 flex h-16 w-16 shrink-0 items-center justify-center rounded-full
                 border border-line bg-ink-800 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.6)] md:mx-4"
    >
      <img src={`/images/integrations/${logo}.svg`} alt={logo} loading="lazy" className="h-6 w-6" />
    </span>
  )
}

export default function Integrations() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const rail = integrations.logos.map((logo) => <LogoChip key={logo} logo={logo} />)

  return (
    <section className="px-5 lg:px-8">
      <div className="section-panel mx-auto max-w-[1400px]">
        <Container className="relative py-24 md:py-32">
          <SectionHeading
            badge={integrations.badge}
            badgeIcon="Blocks"
            title={integrations.title}
            titleMuted={integrations.titleMuted}
            description={integrations.description}
            cta={integrations.cta}
          />

          <Reveal delay={0.1} className="relative mt-24">
            {/* Glow behind the pulsing badge */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2
                         -translate-y-1/2 rounded-full bg-brand-500/25 blur-3xl"
            />

            <div
              className="relative flex items-center overflow-hidden"
              // Fades the rail out toward both edges, which also hides logos
              // entering and leaving as the marquee scrolls.
              style={{
                maskImage:
                  'linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
              }}
            >
              {prefersReducedMotion ? (
                <div className="flex w-full items-center justify-center">{rail}</div>
              ) : (
                <Marquee duration={34} className="w-full">
                  {rail}
                </Marquee>
              )}
            </div>

            {/* Verified badge: a later, positioned stacking layer than the
                rail above, so scrolling logos visibly pass behind its solid
                fill instead of showing through it. */}
            <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {!prefersReducedMotion && (
                <>
                  <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/50 [animation-duration:2.4s]" />
                  <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/40 [animation-delay:1.2s] [animation-duration:2.4s]" />
                </>
              )}
              <span
                className="relative flex h-20 w-20 items-center justify-center rounded-full
                           bg-gradient-to-br from-brand-300 to-brand-600
                           shadow-[0_0_0_12px_rgba(124,77,255,0.16),0_14px_36px_-8px_rgba(124,77,255,0.8)]"
              >
                <Check className="h-8 w-8 text-white" strokeWidth={2.5} />
              </span>
            </span>
          </Reveal>
        </Container>
      </div>
    </section>
  )
}
