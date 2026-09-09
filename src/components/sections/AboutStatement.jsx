import Container from '../ui/Container'
import Reveal from '../motion/Reveal'
import SectionBadge from '../ui/SectionBadge'
import WordReveal from '../motion/WordReveal'
import { aboutStatement } from '../../data/home'

/**
 * Large centred statement that brightens word by word as it scrolls in
 * (screenshot 2).
 */
export default function AboutStatement() {
  return (
    <section className="py-24 md:py-32">
      <Container size="narrow" className="max-w-4xl">
        <div className="flex flex-col items-center gap-10 text-center">
          <Reveal>
            <SectionBadge icon="Aperture">{aboutStatement.badge}</SectionBadge>
          </Reveal>

          <WordReveal
            text={aboutStatement.text}
            className="font-display text-[clamp(1.5rem,3.4vw,2.6rem)] font-medium leading-[1.35] tracking-tight text-white"
          />
        </div>
      </Container>
    </section>
  )
}
