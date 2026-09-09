import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import Card from '../ui/Card'
import Pill from '../ui/Pill'
import Reveal from '../motion/Reveal'
import IconCircle from '../ui/IconCircle'
import LightRays from '../ui/LightRays'
import SectionHeading from '../ui/SectionHeading'
import { services, servicePills, servicesIntro } from '../../data/services'

/**
 * Services panel (screenshots 5-8): glowing header block, six service cards
 * in a 3-column grid, then the centred pill row.
 */
export default function Services() {
  return (
    <section id="services" className="px-5 lg:px-8">
      {/* Not `.section-panel` — that class's ::before paints bg-panel-glow
          (a site-wide purple wash) across the FULL panel height, not just
          the top band. LightRays already supplies this section's own purple
          effect for its top 500px; panel-glow's faint tail was still
          leaking through everywhere BELOW that, composited over #080808 as
          a visible off-black tint (~#0F0C17 — measured in the browser as
          #0D0B13) instead of a true flat #080808. Built directly with just
          the structural pieces `.section-panel` would have provided, minus
          the pseudo-element. */}
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-panel bg-[#080808]">
        {/* Volumetric god-rays behind the heading. `absolute` is load-bearing
            here, not `relative` — this box must sit BEHIND the heading as an
            overlapping background, not push it down 500px in normal flow.
            LightRays fills whatever height this box is given. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px]">
          <LightRays />
        </div>

        <Container className="relative py-24 md:py-32">
          <SectionHeading
            badge={servicesIntro.badge}
            badgeIcon="Settings"
            title={servicesIntro.title}
            titleMuted={servicesIntro.titleMuted}
            description={servicesIntro.description}
            // Narrower than the shared max-w-2xl default: the reference has
            // a visibly narrower description column under a wider heading,
            // and this is scoped to Services rather than changed globally,
            // since other sections using SectionHeading haven't been
            // reviewed against this reference.
            descriptionClassName="max-w-[560px]"
            cta={servicesIntro.cta}
          />

          <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={(index % 3) * 0.08}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group block h-full"
                  aria-label={service.title}
                >
                  {/* bg-[#080808] overrides Card's default bg-ink-850, to
                      match the flat panel background here. This wins over
                      .card-surface's own background despite equal selector
                      specificity because .card-surface lives in Tailwind's
                      "components" layer, which is emitted before the
                      "utilities" layer that arbitrary-value classes land in
                      — verified in the compiled CSS, not assumed. */}
                  <Card className="flex h-full flex-col bg-[#080808] p-7">
                    <div className="flex items-start justify-between">
                      <IconCircle icon={service.icon} />
                      <ArrowUpRight
                        className="h-5 w-5 text-muted-soft transition-all duration-300
                                   group-hover:-translate-y-0.5 group-hover:translate-x-0.5
                                   group-hover:text-white"
                        strokeWidth={1.8}
                      />
                    </div>

                    <h3 className="mt-6 text-lg font-semibold text-white">{service.title}</h3>
                    <p className="mt-1 text-sm text-muted">{service.subtitle}</p>

                    <hr className="my-6 border-line" />

                    <p className="text-sm leading-relaxed text-muted">{service.description}</p>

                    <div className="mt-6 overflow-hidden rounded-xl">
                      <img
                        src={service.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover transition-transform
                                   duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
              {servicePills.map((pill) => (
                <Pill key={pill.label} icon={pill.icon} to={pill.to}>
                  {pill.label}
                </Pill>
              ))}
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  )
}
