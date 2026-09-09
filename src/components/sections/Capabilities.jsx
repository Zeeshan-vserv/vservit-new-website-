import { getIcon } from '../../lib/icons'
import Container from '../ui/Container'
import Card from '../ui/Card'
import Reveal from '../motion/Reveal'
import IconCircle from '../ui/IconCircle'
import CapabilityVisual from '../ui/CapabilityVisual'
import { capabilityCards, featureStrip } from '../../data/capabilities'

/**
 * Three capability cards, each with an illustrative panel, followed by the
 * four-item feature strip (screenshots 4-5).
 */
export default function Capabilities() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {capabilityCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.08}>
              <Card className="flex h-full flex-col items-center px-6 pb-6 pt-8 text-center">
                {/* 44px — the reference circle measures ~45px at this scale;
                    `lg` (56px) rendered visibly oversized. */}
                <IconCircle icon={card.icon} size="md" />

                <h3 className="mt-5 font-display text-display-sm font-semibold leading-[1.15] text-balance">
                  {card.title}
                </h3>

                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  {card.description}
                </p>

                {/* mt-auto pins the panels to a shared baseline across all
                    three cards, whose titles and copy differ in length. */}
                <div className="mt-auto w-full pt-7">
                  <CapabilityVisual variant={card.visual} />
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-4">
          {featureStrip.map((feature, index) => {
            const Icon = getIcon(feature.icon)

            return (
              <Reveal key={feature.title} delay={index * 0.06}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-white" strokeWidth={2.2} />
                    <h4 className="text-[15px] font-semibold text-white">{feature.title}</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{feature.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
