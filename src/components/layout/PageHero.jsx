import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

/**
 * Shared header for inner pages. The reference screenshots only cover the home
 * page, so inner pages reuse the same badge + two-tone heading treatment to
 * stay visually consistent until their own designs arrive.
 */
export default function PageHero({ badge, badgeIcon, title, titleMuted, description, cta }) {
  return (
    <section className="px-5 pt-[84px] lg:px-8">
      <div className="section-panel mx-auto max-w-[1400px]">
        <Container className="relative py-24 md:py-32">
          <SectionHeading
            badge={badge}
            badgeIcon={badgeIcon}
            title={title}
            titleMuted={titleMuted}
            description={description}
            cta={cta}
          />
        </Container>
      </div>
    </section>
  )
}
