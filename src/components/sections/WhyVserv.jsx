import Container from '../ui/Container'
import Button from '../ui/Button'
import Reveal from '../motion/Reveal'
import CheckItem from '../ui/CheckItem'
import SectionHeading from '../ui/SectionHeading'
import { comparisonIntro, traditionalPoints, vservPoints } from '../../data/comparison'

/**
 * Vserv vs. Traditional IT Providers (screenshot 23): a two-column comparison
 * panel — red crosses on the left, purple checks on the right.
 */
export default function WhyVserv() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          badge={comparisonIntro.badge}
          badgeIcon="Aperture"
          title={comparisonIntro.title}
          titleMuted={comparisonIntro.titleMuted}
          description={comparisonIntro.description}
        />

        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-6 rounded-panel border border-line bg-ink-900/70 p-8 md:grid-cols-2 md:p-12">
            <ul className="flex flex-col gap-6 md:border-r md:border-line md:pr-10">
              {traditionalPoints.map((point) => (
                <CheckItem key={point} variant="cross">
                  {point}
                </CheckItem>
              ))}
            </ul>

            <ul className="flex flex-col gap-6 md:pl-6">
              {vservPoints.map((point) => (
                <CheckItem key={point}>{point}</CheckItem>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center gap-6 text-center">
            <p className="text-[15px] text-muted">{comparisonIntro.footnote}</p>
            <Button to={comparisonIntro.cta.to}>{comparisonIntro.cta.label}</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
