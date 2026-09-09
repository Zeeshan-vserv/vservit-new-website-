import Container from '../ui/Container'
import Reveal from '../motion/Reveal'
import Accordion from '../ui/Accordion'
import SectionHeading from '../ui/SectionHeading'
import { faqIntro, faqs } from '../../data/faq'

/**
 * FAQ (screenshots 26-27): split layout — heading column on the left,
 * accordion on the right.
 */
export default function Faq() {
  return (
    <section id="faq" className="px-5 lg:px-8">
      <div className="section-panel mx-auto max-w-[1400px]">
        <Container className="relative py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              badge={faqIntro.badge}
              badgeIcon="CircleHelp"
              title={faqIntro.title}
              titleMuted={faqIntro.titleMuted}
              description={faqIntro.description}
              align="left"
              className="lg:sticky lg:top-28 lg:h-fit"
            />

            <Reveal delay={0.1}>
              <Accordion items={faqs} />
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  )
}
