import Container from '../ui/Container'
import Card from '../ui/Card'
import Reveal from '../motion/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { finalCta } from '../../data/home'

/** Closing CTA card above the footer (screenshot 28). */
export default function FinalCta() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <Card className="px-8 py-20 md:px-16">
            <SectionHeading
              badge={finalCta.badge}
              badgeIcon="Aperture"
              title={finalCta.title}
              titleMuted={finalCta.titleMuted}
              description={finalCta.description}
              cta={finalCta.cta}
            />
          </Card>
        </Reveal>
      </Container>
    </section>
  )
}
