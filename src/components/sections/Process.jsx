import Container from '../ui/Container'
import Card from '../ui/Card'
import Reveal from '../motion/Reveal'
import IconCircle from '../ui/IconCircle'
import SectionHeading from '../ui/SectionHeading'
import { processIntro, processSteps } from '../../data/process'

/**
 * Our Proven Process (screenshots 19-20): four step cards in a 2x2 grid,
 * each centred around a glowing purple icon.
 */
export default function Process() {
  return (
    <section id="process" className="px-5 lg:px-8">
      <div className="section-panel mx-auto max-w-[1400px]">
        <Container className="relative py-24 md:py-32">
          <SectionHeading
            badge={processIntro.badge}
            badgeIcon="Globe"
            title={processIntro.title}
            titleMuted={processIntro.titleMuted}
            description={processIntro.description}
          />

          <div className="mx-auto mt-16 grid max-w-3xl gap-6 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <Reveal key={step.step} delay={(index % 2) * 0.08}>
                <Card
                  dots={false}
                  className="flex h-full flex-col items-center gap-5 bg-[#080808] p-9 text-center"
                >
                  <IconCircle icon={step.icon} size="lg" glow />
                  <h3 className="text-[17px] font-semibold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{step.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}
