import Container from '../ui/Container'
import Button from '../ui/Button'
import Reveal from '../motion/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { getIcon } from '../../lib/icons'
import { whoWeAre } from '../../data/home'

/**
 * Card glyph. Rendered directly rather than through IconCircle because the
 * reference draws a bare thin-stroked mark inside the violet tile — no
 * second badge, no purple fill of its own.
 */
function CardIcon({ icon }) {
  const Icon = getIcon(icon)
  return <Icon className="h-5 w-5" strokeWidth={1.8} />
}

/**
 * About Vserv (screenshots 13-15): three stacked cards on the left, a sticky
 * image on the right that stays in view while the cards scroll past.
 */
export default function WhoWeAre() {
  return (
    <section id="about" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          badge={whoWeAre.badge}
          badgeIcon="Aperture"
          title={whoWeAre.title}
          titleMuted={whoWeAre.titleMuted}
          description={whoWeAre.description}
          align="left"
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            {whoWeAre.cards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.08}>
                <div className="about-card-frame">
                  <div className="about-card">
                    <div className="flex items-start justify-between gap-4">
                      <span className="about-card-icon">
                        <CardIcon icon={card.icon} />
                      </span>
                      <span className="about-card-tag">{card.tag}</span>
                    </div>

                    <h3 className="mt-8 text-[19px] font-semibold tracking-[-0.01em] text-white">
                      {card.title}
                    </h3>

                    <div className="about-card-separator my-5" />

                    <p className="text-[14.5px] leading-relaxed text-white/50">{card.description}</p>

                    {card.pills && (
                      <div className="mt-8 flex flex-wrap gap-2.5">
                        {card.pills.map((pill) => (
                          <span key={pill} className="about-card-pill">
                            {pill}
                          </span>
                        ))}
                      </div>
                    )}

                    {card.cta && (
                      <Button to={card.cta.to} className="mt-8">
                        {card.cta.label}
                      </Button>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-panel border border-line bg-ink-850 p-2">
                <img
                  src={whoWeAre.image}
                  alt="Vserv engineer working in a modern office"
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-[1.25rem] object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
