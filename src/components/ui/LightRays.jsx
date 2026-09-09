import { motion, useReducedMotion } from 'framer-motion'

// Signature Framer "smooth out" easing.
const EASE_OUT = [0.22, 1, 0.36, 1]

/* ============================================================================
   Volumetric "god-rays" background for the Services panel.
   ~11 individual blurred gradient beams radiate from ONE convergence point
   above top-center. They BLOOM in on load, then SWAY + SHIMMER forever.

   Recolored from the source snippet's red/scarlet palette onto this site's
   purple brand (brand-500 #7C4DFF and friends) — everything else (beam
   count, angles, widths, blur, timing) is unchanged.

   Fills its nearest positioned ancestor via absolute inset-0, so the caller
   supplies a `relative` box of whatever height it needs (a full hero, or a
   fixed-height band like the Services panel here) — the beam geometry below
   is expressed in percentages of that box, not the viewport, so it scales
   to either.

   Everything below is config-driven — tweak these constants to taste.
   ========================================================================== */

const COLORS = {
  base: '#080808', // flat neutral black, matched to the Services panel bg
  // Hue ~268-269deg on both (true purple) rather than the previous
  // ~253-256deg (blue-violet/indigo) — same hue at every stop so the beam
  // reads as one consistent purple as it fades, not a color shift.
  beamCore: '214, 175, 255', // bright purple inner of each beam
  beamMid: '130, 50, 220', // saturated purple as the beam fades down
}

// Convergence anchor: all beams pivot from here, just ABOVE the panel's top edge.
const CONVERGENCE_TOP = '-12%'

const BLOOM = { size: 440, baseOpacity: 0.38 }

// 11 beams = center + 5 mirrored pairs. Denser/brighter/wider toward center.
const BEAMS = [
  // swayDeg was 2-3deg, which is imperceptible on a shape blurred this hard —
  // raised ~2.5x and the cycles shortened ~30%. Durations are deliberately
  // non-multiples of each other so the fan never falls into a single
  // synchronised pulse; each beam drifts in and out of phase with the rest.
  { angle: 0, width: 116, opacity: 0.62, blur: 14, swayDeg: 5.0, swayDur: 7.5, shimmerDur: 4.8, delay: 0.0 },
  { angle: -10, width: 100, opacity: 0.58, blur: 16, swayDeg: 5.5, swayDur: 6.2, shimmerDur: 4.2, delay: 0.08 },
  { angle: 10, width: 100, opacity: 0.58, blur: 16, swayDeg: 5.5, swayDur: 8.2, shimmerDur: 5.5, delay: 0.08 },
  { angle: -20, width: 88, opacity: 0.52, blur: 18, swayDeg: 6.2, swayDur: 6.8, shimmerDur: 3.5, delay: 0.16 },
  { angle: 20, width: 88, opacity: 0.52, blur: 18, swayDeg: 6.2, swayDur: 8.8, shimmerDur: 5.2, delay: 0.16 },
  { angle: -30, width: 80, opacity: 0.44, blur: 22, swayDeg: 7.0, swayDur: 5.5, shimmerDur: 4.5, delay: 0.24 },
  { angle: 30, width: 80, opacity: 0.44, blur: 22, swayDeg: 7.0, swayDur: 7.8, shimmerDur: 3.8, delay: 0.24 },
  { angle: -40, width: 72, opacity: 0.36, blur: 26, swayDeg: 7.5, swayDur: 8.2, shimmerDur: 4.8, delay: 0.32 },
  { angle: 40, width: 72, opacity: 0.36, blur: 26, swayDeg: 7.5, swayDur: 6.5, shimmerDur: 3.2, delay: 0.32 },
  { angle: -50, width: 64, opacity: 0.28, blur: 30, swayDeg: 7.5, swayDur: 8.8, shimmerDur: 5.5, delay: 0.4 },
  { angle: 50, width: 64, opacity: 0.28, blur: 30, swayDeg: 7.5, swayDur: 7.2, shimmerDur: 4.2, delay: 0.4 },
]

export default function LightRays() {
  const reduce = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ contain: 'paint' }} aria-hidden>
      {/* 1. Base — flat #080808, no tint. The rays below carry all the
            purple; this layer used to add its own radial glow on top of
            them, which is what showed as a soft purple wash before the
            beams had scrolled into view. */}
      <div className="absolute inset-0" style={{ background: COLORS.base }} />

      {/* 2. Ray fan — each beam is 3-level nested so the load-in (scaleY/opacity)
            and the ambient loop (sway/shimmer) never overwrite each other. */}
      {BEAMS.map((b, i) => {
        const A = b.opacity
        return (
          // outer: static fan rotation, anchored at the convergence point.
          // The blend lives HERE (not the inner) so it composites against the
          // base + already-painted beams -> additive volumetric glow.
          <div
            key={i}
            className="absolute"
            style={{
              top: CONVERGENCE_TOP,
              left: '50%',
              width: b.width,
              height: '130vh',
              transformOrigin: 'top center',
              transform: `translateX(-50%) rotate(${b.angle}deg)`,
              mixBlendMode: 'screen',
            }}
          >
            {/* middle: load-in bloom (grows down from the source + fades up) */}
            <motion.div
              style={{ width: '100%', height: '100%', transformOrigin: 'top' }}
              initial={reduce ? false : { scaleY: 0.7, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: reduce ? 0 : b.delay, ease: EASE_OUT }}
            >
              {/* inner: the visible beam + infinite sway/shimmer via CSS */}
              <div
                className="lr-beam-inner"
                style={{
                  width: '100%',
                  height: '100%',
                  transformOrigin: 'top center',
                  background: `linear-gradient(to bottom, rgba(${COLORS.beamCore}, ${A}) 0%, rgba(${COLORS.beamMid}, ${A * 0.6}) 38%, rgba(${COLORS.beamMid}, ${A * 0.26}) 68%, transparent 100%)`,
                  filter: `blur(${b.blur}px)`,
                  willChange: 'transform, opacity',
                  '--sway': `${b.swayDeg}deg`,
                  animation: reduce
                    ? 'none'
                    : `lr-sway ${b.swayDur}s ease-in-out infinite alternate, lr-shimmer ${b.shimmerDur}s ease-in-out infinite`,
                }}
              />
            </motion.div>
          </div>
        )
      })}

      {/* 3. Central bloom — soft glow on the convergence point */}
      <motion.div
        className="absolute"
        style={{
          top: CONVERGENCE_TOP,
          left: '50%',
          width: BLOOM.size,
          height: BLOOM.size,
          transform: 'translate(-50%, -50%)',
        }}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, ease: EASE_OUT }}
      >
        <div
          className="lr-bloom"
          style={{
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(${COLORS.beamCore}, 0.5) 28%, rgba(${COLORS.beamMid}, 0.18) 50%, transparent 70%)`,
            filter: 'blur(8px)',
            opacity: BLOOM.baseOpacity,
            willChange: 'transform, opacity',
            animation: reduce ? 'none' : 'lr-bloom 8s ease-in-out infinite',
          }}
        />
      </motion.div>

      {/* 4. Vignette — beams melt to black at edges/bottom; keeps headline readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 95% at 50% 0%, transparent 62%, rgba(0,0,0,0.5) 100%), linear-gradient(to bottom, transparent 64%, #000 100%)',
        }}
      />
    </div>
  )
}
