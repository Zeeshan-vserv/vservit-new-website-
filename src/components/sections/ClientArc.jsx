import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import Container from '../ui/Container'
import Reveal from '../motion/Reveal'
import { clientLogos, clientsIntro } from '../../data/clients'
import useMediaQuery from '../../hooks/useMediaQuery'

/**
 * Rotating client-logo ring (screenshot 3).
 *
 * Geometry reverse-engineered from the reference: cards sit on a circle of
 * radius ~580px at a 15° pitch, which divides 360° into exactly 24 slots.
 * The 12 logos are laid out twice around that full ring, so a logo and its
 * duplicate are always 180° apart — one on the visible top arc, the other
 * below the panel's clip. That makes the rotation seamless: no wrapping
 * seam, no gap, and no logo ever visible twice at once.
 *
 * A card at angle θ (0° = apex) sits at x = R·sin(θ), y = R·(1 − cos(θ))
 * from the apex and is rotated by θ itself, so it reads as tangent to the
 * circle. Cards past the horizon fall outside the panel and are clipped by
 * the panel's own overflow-hidden (below) — which is what leaves the two
 * partial cards in the bottom corners.
 *
 * Below `lg` the ring is replaced by a plain grid — the tiles are unreadable
 * at this radius on mobile.
 */
const ARC_RADIUS = 580 // px
const CARD_SIZE = 92 // px
const ARC_TOP_OFFSET = 0 // px from box top down to the apex card's centre
const ARC_BOX_HEIGHT = 385 // px reserved; sets how much of the corner cards shows
// Rotation isn't wrapped to ±90° — every card sweeps the full circle, so at
// roughly ±35° a card's *rotated* bounding box (up to 41% wider than its
// side) briefly dips as low as y≈184 before rising back toward the horizon.
// 210 keeps a >20px margin below that at every angle, not just the angles
// visible in any one static reference frame.
const HEADING_TOP = 210 // px from box top down to the headline
const REVOLUTION_SECONDS = 36 // one full turn of the ring

function ArcCard({ client, baseAngle, rotation }) {
  const angle = useTransform(rotation, (r) => baseAngle + r)
  const x = useTransform(angle, (a) => ARC_RADIUS * Math.sin((a * Math.PI) / 180))
  const y = useTransform(angle, (a) => ARC_RADIUS * (1 - Math.cos((a * Math.PI) / 180)))

  return (
    <motion.div
      className="absolute flex items-center justify-center rounded-[20px] bg-white p-3
                 shadow-[0_22px_45px_-12px_rgba(0,0,0,0.7)]"
      style={{
        // Centred with margins rather than translate(-50%), leaving Motion's
        // x / y / rotate free to own the transform.
        left: '50%',
        top: ARC_TOP_OFFSET,
        width: CARD_SIZE,
        height: CARD_SIZE,
        marginLeft: -CARD_SIZE / 2,
        marginTop: -CARD_SIZE / 2,
        x,
        y,
        rotate: angle,
      }}
    >
      <img src={client.logo} alt="" className="max-h-full max-w-full object-contain" />
    </motion.div>
  )
}

function Headline() {
  return (
    <>
      <Reveal>
        <h2 className="font-display text-display-lg font-semibold text-balance">
          {clientsIntro.title}
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        {/* 400px is what breaks the copy into the reference's three lines —
            max-w-md (448px) pulls "certified" up onto the first line. */}
        <p className="mx-auto mt-5 max-w-[400px] text-[15px] leading-relaxed text-muted">
          {clientsIntro.description}
        </p>
      </Reveal>
    </>
  )
}

export default function ClientArc() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  // Two laps of the logo list fill the ring, so the pitch always divides 360°.
  const slots = clientLogos.length * 2
  const step = 360 / slots

  const rotation = useMotionValue(0)

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return undefined

    // Positive rotation carries the cards left-to-right across the apex.
    // +360° lands exactly back on 0°, so the loop restarts without a jump,
    // and `linear` keeps the speed constant — any easing would make the ring
    // visibly surge and stall once per lap.
    const controls = animate(rotation, 360, {
      duration: REVOLUTION_SECONDS,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    })

    return () => controls.stop()
  }, [rotation, isDesktop, prefersReducedMotion])

  return (
    <section className="px-5 lg:px-8">
      {/* Not `.section-panel` — this section reads near-black with only a
          faint violet whisper behind the apex card, unlike the wider,
          brighter beam `panel-glow` gives Services/Process. See `arc-glow`
          in tailwind.config.js. */}
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-panel bg-ink-900">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-arc-glow" />
        <div className="relative py-24 md:py-32">
          {isDesktop ? (
            <div
              className="relative mx-auto max-w-[1300px]"
              style={{ height: ARC_BOX_HEIGHT }}
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                {Array.from({ length: slots }, (_, slot) => (
                  <ArcCard
                    key={slot}
                    client={clientLogos[slot % clientLogos.length]}
                    baseAngle={slot * step}
                    rotation={rotation}
                  />
                ))}
              </div>

              <Container
                className="absolute inset-x-0 text-center"
                style={{ top: HEADING_TOP }}
              >
                <div className="mx-auto max-w-xl">
                  <Headline />
                </div>
              </Container>

              {/* The ring is decorative and duplicated, so name the clients
                  once for assistive tech. */}
              <ul className="sr-only">
                {clientLogos.map((client) => (
                  <li key={client.name}>{client.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <Container className="relative text-center">
              <div className="mx-auto max-w-xl">
                <Headline />
              </div>

              <div className="mt-14 grid grid-cols-3 gap-4 sm:grid-cols-4">
                {clientLogos.map((client) => (
                  <div
                    key={client.name}
                    className="flex aspect-square items-center justify-center rounded-2xl bg-white p-3"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </Container>
          )}
        </div>
      </div>
    </section>
  )
}
