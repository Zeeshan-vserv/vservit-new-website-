import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import {
  BadgeCheck,
  Boxes,
  Cloud,
  Database,
  Layers,
  Mail,
  Mic,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react'
import useMediaQuery from '../../hooks/useMediaQuery'
import Marquee from './Marquee'
import cn from '../../lib/cn'

/**
 * The illustration panel inside each capability card (screenshot 4).
 *
 * The well is a saturated indigo — clearly *lighter* than the card around it,
 * not darker. Sampling the reference put it near rgb(38,29,80) mid-panel,
 * fading to rgb(33,26,68) at the bottom, with a violet hairline border.
 */
const PANEL_CLASS = 'capability-panel'

/** Six platform chips fanning connector lines down into a single hub. */
const INTEGRATION_ICONS = [Cloud, Mail, Database, MessageSquare, Boxes, ShieldCheck]

/** Seconds for one pulse to travel from the chips to the hub. */
const PULSE_SECONDS = 2.6

/** Length in SVG user-units of the glowing travelling segment. */
const DASH_LENGTH = 28

/**
 * Real arc length of each connector curve, precomputed by numeric
 * integration of its cubic bezier (chip -> convergence point). Needed
 * because `strokeDasharray`/`strokeDashoffset` work in real path units, not
 * Framer's normalised 0-1 `pathLength` — the outer curves are ~54% longer
 * than the inner ones, so the same pixel offset means a different fraction
 * travelled on each. Recompute if `chipY`, `chipR`, the `xs` spacing, or
 * `converge` below ever change.
 */
const PATH_LENGTHS = [185.88, 147.07, 120.94, 120.94, 147.07, 185.88]

/**
 * One travelling dash. A separate component (not inline in a `.map`) because
 * `useTransform` is a hook — six calls in a loop inside the parent's render
 * body would violate the rules of hooks; six sibling components each calling
 * it once is the correct pattern (mirrors `ArcCard` in ClientArc.jsx).
 *
 * `progress` is one motion value shared by all six dashes, so they are
 * synced by construction: `useTransform` maps that single 0-1 driver into
 * each dash's own real-unit offset, so every dash leaves its chip and
 * reaches the hub at exactly the same instant, regardless of curve length.
 */
function PulseDash({ d, length, progress }) {
  const dashoffset = useTransform(progress, [0, 1], [length + DASH_LENGTH, -DASH_LENGTH])

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#C4A9FF"
      strokeWidth={1.6}
      strokeLinecap="round"
      filter="url(#cv-glow)"
      strokeDasharray={`${DASH_LENGTH} ${length}`}
      style={{ strokeDashoffset: dashoffset }}
    />
  )
}

function IntegrationsVisual() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  // A single driver for every pulse — one animation, six readers.
  const pulseOffset = useMotionValue(0)

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const controls = animate(pulseOffset, 1, {
      duration: PULSE_SECONDS,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    })

    return () => controls.stop()
  }, [pulseOffset, prefersReducedMotion])

  // One SVG coordinate system for chips and lines, so they always align, with
  // an aspect matching the panel so the diagram fills it edge to edge.
  const chipY = 36
  const chipR = 15
  const converge = { x: 170, y: 168 }
  const hub = { x: 170, y: 196, r: 18 }
  const xs = INTEGRATION_ICONS.map((_, i) => 37 + i * 53.2)

  // Each path runs chip -> convergence point, so a pulse travelling from
  // pathOffset 0 to 1 reads as data flowing down into the hub.
  const paths = xs.map(
    (x) => `M ${x} ${chipY + chipR} C ${x} 112, ${converge.x} 126, ${converge.x} ${converge.y}`
  )

  return (
    <svg viewBox="0 0 340 232" className="h-full w-full" role="presentation">
      <defs>
        <linearGradient id="cv-line" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C7B7FF" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#C7B7FF" stopOpacity="0.45" />
        </linearGradient>
        {/* Soft bloom so the travelling segment reads as light, not just a
            brighter stroke. */}
        <filter id="cv-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.map((d, i) => (
        <path key={`line-${i}`} d={d} stroke="url(#cv-line)" strokeWidth="1" fill="none" />
      ))}

      {!prefersReducedMotion &&
        paths.map((d, i) => (
          <PulseDash key={`pulse-${i}`} d={d} length={PATH_LENGTHS[i]} progress={pulseOffset} />
        ))}
      {/* Short stem: the fan meets above the hub, then drops straight in. */}
      <line
        x1={converge.x}
        y1={converge.y}
        x2={hub.x}
        y2={hub.y - hub.r}
        stroke="#C7B7FF"
        strokeOpacity="0.45"
        strokeWidth="1"
      />

      {xs.map((x, i) => {
        const Icon = INTEGRATION_ICONS[i]
        return (
          <g key={`chip-${i}`}>
            <circle
              cx={x}
              cy={chipY}
              r={chipR}
              fill="#0D0D12"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="1"
            />
            <g transform={`translate(${x - 8}, ${chipY - 8})`}>
              <Icon width={16} height={16} color="#FFFFFF" strokeWidth={2.1} />
            </g>
          </g>
        )
      })}

      <circle cx={hub.x} cy={hub.y} r={hub.r} fill="#7C4DFF" />
      <g transform={`translate(${hub.x - 10}, ${hub.y - 10})`}>
        <Layers width={20} height={20} color="#FFFFFF" strokeWidth={2} />
      </g>
    </svg>
  )
}

/**
 * Drifting capability tags behind a single verified badge. Rows alternate
 * direction — first travels right, second left, third right — so the field
 * reads as a living mesh rather than one sliding block.
 *
 * Four tags per row (rather than three) so a row is comfortably wider than
 * the panel: the marquee duplicates its children and shifts by -50%, which
 * only loops seamlessly while one copy already overflows the container.
 */
const AUTH_TAGS = [
  ['Infrastructure', 'Intelligent', 'Cognitive', 'Automation'],
  ['Capabilities', 'Chatbots', 'Data Analysis', 'Monitoring'],
  ['Data Analysis', 'Capabilities', 'Intelligent', 'Endpoint'],
  ['Intelligent', 'Capabilities', 'Cognitive', 'Identity'],
  ['Intelligent', 'Capabilities', 'Data Analysis', 'Access'],
]

/** Per-row seconds, varied slightly so the rows don't march in lockstep. */
const AUTH_ROW_SECONDS = [30, 26, 34, 28, 32]

function AuthTag({ children }) {
  return (
    <span
      className="mx-[5px] whitespace-nowrap rounded-lg border border-white/[0.12] bg-white/[0.04]
                 px-3.5 py-2 text-[12px] leading-none text-muted-strong"
    >
      {children}
    </span>
  )
}

function AuthVisual() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  return (
    <div className="relative h-full w-full">
      <div
        className="flex h-full flex-col justify-center gap-2.5"
        // Fades the tag field out toward every edge, which also hides the
        // tags entering and leaving as each row scrolls.
        style={{
          maskImage:
            'radial-gradient(80% 75% at 50% 50%, #000 45%, rgba(0,0,0,0.4) 72%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(80% 75% at 50% 50%, #000 45%, rgba(0,0,0,0.4) 72%, transparent 100%)',
        }}
      >
        {AUTH_TAGS.map((row, rowIndex) =>
          prefersReducedMotion ? (
            <div key={rowIndex} className="flex shrink-0 items-center justify-center">
              {row.map((tag, tagIndex) => (
                <AuthTag key={`${tag}-${tagIndex}`}>{tag}</AuthTag>
              ))}
            </div>
          ) : (
            <Marquee
              key={rowIndex}
              // Even rows travel right, odd rows left.
              direction={rowIndex % 2 === 0 ? 'right' : 'left'}
              duration={AUTH_ROW_SECONDS[rowIndex]}
              className="shrink-0"
            >
              {row.map((tag, tagIndex) => (
                <AuthTag key={`${tag}-${tagIndex}`}>{tag}</AuthTag>
              ))}
            </Marquee>
          )
        )}
      </div>

      <span
        className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2
                   items-center justify-center rounded-full bg-brand-500
                   shadow-[0_0_0_10px_rgba(124,77,255,0.18),0_10px_30px_-6px_rgba(124,77,255,0.75)]"
      >
        <BadgeCheck className="h-6 w-6 text-white" strokeWidth={2} />
      </span>
    </div>
  )
}

/**
 * Signal trace. Mirrors the reference's labelled control — callout chip with a
 * pointer, then a dark pill holding a round button beside a waveform inset.
 */
/**
 * Denser and thinner than a simple bar chart — the reference reads as a real
 * audio trace, so heights alternate irregularly with a few tall peaks rather
 * than following a smooth curve.
 */
const BARS = [
  8, 14, 10, 18, 12, 22, 16, 28, 20, 34, 24, 16, 30, 12, 26, 38, 18, 32, 14, 24, 10, 20, 16, 28,
  12, 22, 18, 30, 14, 24, 10, 16, 12, 8,
]

const BAR_MAX = Math.max(...BARS)

/** Seconds for the scan line to sweep once across the full waveform. */
const SCAN_SECONDS = 3.2

function MonitoringVisual() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  // 0 -> 1 across the waveform's width, looping. Both the line's position
  // and the dimming veil read this same value, so the "leading edge" of
  // the veil and the line are pixel-locked to each other by construction.
  const scan = useMotionValue(0)

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const controls = animate(scan, 1, {
      duration: SCAN_SECONDS,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    })

    return () => controls.stop()
  }, [scan, prefersReducedMotion])

  // Left of the line reads as already-scanned (full brightness); right of it
  // is dimmed, as if still loading. A CSS gradient veil over the existing
  // bars, rather than duplicating them into a second clipped layer, so
  // there's no risk of the two layers drifting out of pixel alignment.
  const veil = useTransform(scan, (v) => {
    const pct = v * 100
    return `linear-gradient(90deg, transparent 0%, transparent ${pct}%, rgba(8,8,12,0.6) ${pct}%, rgba(8,8,12,0.6) 100%)`
  })
  const lineLeft = useTransform(scan, (v) => `${v * 100}%`)

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-3">
      {/* Callout chip: a lit gradient rather than a flat fill, with a glow
          that spreads past its own edges — the reference chip visibly
          brightens the dark background behind it. */}
      <span
        className="relative rounded-xl bg-gradient-to-b from-brand-400 to-brand-600 px-4 py-2.5
                   text-[13px] font-semibold text-white
                   shadow-[0_0_24px_4px_rgba(139,92,246,0.45),0_12px_28px_-8px_rgba(109,63,240,0.9)]
                   after:absolute after:left-[20%] after:top-full after:h-0 after:w-0
                   after:border-l-[8px] after:border-r-[8px] after:border-t-[10px]
                   after:border-l-transparent after:border-r-transparent after:border-t-brand-600
                   after:content-['']"
      >
        Live Monitoring
      </span>

      {/* Full pill, not a rounded rectangle — the ends are semicircular.
          `relative` so the arrow flourish below can anchor to the pill
          itself rather than the whole card. */}
      <div className="relative flex w-full items-center gap-2.5 rounded-full bg-[#101015] p-2">
        {/* Gradient + halo, not a flat fill — the reference button reads as
            genuinely lit, brighter at the top-left than the bottom-right. */}
        <span
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full
                     bg-gradient-to-br from-brand-300 to-brand-600
                     shadow-[0_0_0_6px_rgba(139,92,246,0.16),0_6px_16px_-4px_rgba(139,92,246,0.8)]"
        >
          <Mic className="h-[18px] w-[18px] text-white" strokeWidth={2.2} />
        </span>

        <div className="relative flex h-11 min-w-0 flex-1 items-center justify-center gap-[2px] overflow-hidden rounded-full bg-[#08080C] px-4">
          {BARS.map((height, index) => (
            <span
              key={index}
              className="w-[2px] shrink-0 rounded-full bg-white"
              style={{ height, opacity: 0.4 + (height / BAR_MAX) * 0.6 }}
            />
          ))}

          {!prefersReducedMotion && (
            <>
              {/* Dims everything the scan line hasn't reached yet. */}
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{ background: veil }}
              />

              {/* The scan line itself: a soft vertical glow with a bright
                  diamond handle at the foot, exactly where the veil's edge
                  sits — both driven by `scan`, so they can't drift apart. */}
              <motion.div
                className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2"
                style={{ left: lineLeft }}
              >
                <div className="h-full w-px bg-gradient-to-b from-transparent via-brand-300 to-brand-400 shadow-[0_0_8px_1px_rgba(167,139,250,0.7)]" />
                <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 rounded-[1px] bg-brand-300 shadow-[0_0_6px_2px_rgba(167,139,250,0.8)]" />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// The SVG diagram carries its own margins in the viewBox, so it fills the
// panel edge to edge; the HTML-based visuals need real padding.
const VARIANTS = {
  integrations: { Visual: IntegrationsVisual, pad: '' },
  auth: { Visual: AuthVisual, pad: 'p-2' },
  monitoring: { Visual: MonitoringVisual, pad: 'p-3' },
}

export default function CapabilityVisual({ variant, className = '' }) {
  const { Visual, pad } = VARIANTS[variant] ?? VARIANTS.integrations

  return (
    <div className={cn(PANEL_CLASS, className)} style={{ height: 232 }}>
      <div className={cn('absolute inset-0', pad)}>
        <Visual />
      </div>
    </div>
  )
}
