import Container from '../ui/Container'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Reveal from '../motion/Reveal'
import CheckItem from '../ui/CheckItem'
import IconCircle from '../ui/IconCircle'
import SectionHeading from '../ui/SectionHeading'
import { statCards, statsIntro } from '../../data/stats'
import cn from '../../lib/cn'

/**
 * "Vserv by the Numbers" (screenshots 17-18): left-aligned heading, then three
 * tall cards laid out like a pricing table, each ending in its own CTA.
 */
export default function Stats() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          badge={statsIntro.badge}
          badgeIcon="Target"
          title={statsIntro.title}
          titleMuted={statsIntro.titleMuted}
          description={statsIntro.description}
          align="left"
        />

        <div className="mt-16 rounded-panel border border-line bg-ink-900/60 p-3">
          <div className="grid gap-3 lg:grid-cols-3">
            {statCards.map((card, index) => (
              <Reveal key={card.value} delay={index * 0.08}>
                <Card
                  className={cn(
                    'flex h-full flex-col bg-[#080808] p-7',
                    card.featured && 'border-line-strong'
                  )}
                >
                  <IconCircle icon={card.icon} shape="square" size="lg" glow />

                  <p className="mt-6 text-lg font-semibold text-white">{card.value}</p>
                  <p className="mt-2 text-[15px] font-semibold text-white">{card.title}</p>

                  <hr className="my-5 border-line" />

                  <p className="text-sm leading-relaxed text-muted">{card.description}</p>

                  <ul className="mt-7 flex flex-col gap-4">
                    {card.points.map((point) => (
                      <CheckItem key={point}>{point}</CheckItem>
                    ))}
                  </ul>

                  <Button to={card.cta.to} className="mt-8 w-full rounded-xl">
                    {card.cta.label}
                  </Button>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
