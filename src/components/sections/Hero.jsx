import { motion } from 'framer-motion'
import { hero } from '../../data/home'
import useMediaQuery from '../../hooks/useMediaQuery'

/**
 * Full-bleed hero (screenshot 1): background media runs edge to edge under
 * the transparent fixed navbar, with the headline and sub-copy overlaid and
 * constrained to a readable width.
 */
export default function Hero() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  return (
    <section className="relative overflow-hidden pt-[84px]">
      {/* Background media: poster shows immediately, video plays over it
          once loaded. Reduced-motion users get the still poster only.
          Full viewport width — no side gutters. */}
      <div className="relative aspect-[16/10] w-full md:aspect-[16/8]">
        <img
          src={hero.poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {!prefersReducedMotion && (
          <video
            src={hero.media}
            poster={hero.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/70" />
      </div>

      {/* Overlay copy */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h1 className="font-display text-display-xl font-semibold text-balance text-white">
            {hero.titleLines.map((line, index) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          >
            {hero.description}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
