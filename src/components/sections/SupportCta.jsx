import { motion } from 'framer-motion'
import Container from '../ui/Container'
import Card from '../ui/Card'
import Reveal from '../motion/Reveal'
import IconCircle from '../ui/IconCircle'
import SectionHeading from '../ui/SectionHeading'
import { viewportOnce } from '../motion/variants'
import { supportCta } from '../../data/home'

/** Placeholder art for the fanned deck until the real assets land. */
const deckCards = [
  '/images/deck/deck-1.jpg',
  '/images/deck/deck-2.jpg',
  '/images/deck/deck-3.jpg',
  '/images/deck/deck-4.jpg',
  '/images/deck/deck-5.jpg',
  '/images/deck/deck-6.jpg',
  '/images/deck/deck-7.jpg',
]

/**
 * Enterprise IT Support CTA (screenshots 11-13): heading, a fanned deck of
 * cards with two floating chat labels, then three support cards.
 */
export default function SupportCta() {
  const middle = (deckCards.length - 1) / 2

  return (
    <section className="px-5 lg:px-8">
      <div className="section-panel mx-auto max-w-[1400px]">
        <Container className="relative py-24 md:py-32">
          <SectionHeading
            badge={supportCta.badge}
            badgeIcon="Headphones"
            title={supportCta.title}
            titleMuted={supportCta.titleMuted}
            description={supportCta.description}
            cta={supportCta.cta}
          />

          {/* Fanned card deck */}
          <div className="relative mx-auto mt-20 h-[260px] w-full max-w-3xl">
            <span
              className="absolute -top-2 left-[12%] z-20 rotate-[-8deg] rounded-xl rounded-bl-sm
                         bg-[#2E7DFF] px-4 py-2 text-sm font-semibold text-white shadow-lg"
            >
              {supportCta.floatingLabels[0]}
            </span>
            <span
              className="absolute -top-4 right-[10%] z-20 rotate-[8deg] rounded-xl rounded-br-sm
                         bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-lg"
            >
              {supportCta.floatingLabels[1]}
            </span>

            {deckCards.map((image, index) => {
              const offset = index - middle

              return (
                <motion.div
                  key={image}
                  className="absolute left-1/2 top-10 h-[190px] w-[150px] overflow-hidden
                             rounded-2xl border border-line bg-ink-800 shadow-2xl"
                  initial={{ opacity: 0, y: 40, rotate: 0, x: '-50%' }}
                  whileInView={{
                    opacity: 1,
                    y: Math.abs(offset) * 10,
                    rotate: offset * 7,
                    x: `calc(-50% + ${offset * 95}px)`,
                  }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ zIndex: 10 - Math.abs(offset) }}
                >
                  <img
                    src={image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              )
            })}
          </div>

          {/* Support cards */}
          <div className="mt-24 grid gap-5 border-t border-line pt-16 md:grid-cols-3">
            {supportCta.cards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.08}>
                <Card className="flex h-full flex-col gap-4 p-6">
                  <div className="flex items-center gap-3">
                    <IconCircle icon={card.icon} size="sm" />
                    <h3 className="text-[15px] font-semibold text-white">{card.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{card.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}
