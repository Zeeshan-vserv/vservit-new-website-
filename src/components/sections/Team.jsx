import Container from '../ui/Container'
import Reveal from '../motion/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { teamIntro, teamMembers } from '../../data/team'

/**
 * Leadership grid (screenshots 21-22): two columns of rows, each row a photo
 * tile beside a name/role plate with an X link on the right.
 */
export default function Team() {
  return (
    <section id="team" className="px-5 lg:px-8">
      <div className="section-panel mx-auto max-w-[1400px]">
        <Container className="relative py-24 md:py-32">
          <SectionHeading
            badge={teamIntro.badge}
            badgeIcon="UsersRound"
            title={teamIntro.title}
            titleMuted={teamIntro.titleMuted}
            description={teamIntro.description}
            cta={teamIntro.cta}
          />

          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            {teamMembers.map((member, index) => (
              <Reveal key={member.name} delay={(index % 2) * 0.06}>
                <div className="flex items-stretch gap-3 rounded-card border border-line bg-ink-900/70 p-2.5">
                  <img
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                    className="h-[72px] w-[72px] shrink-0 rounded-xl object-cover"
                  />

                  <div className="flex flex-1 items-center justify-between gap-4 rounded-xl border border-line bg-ink-850 px-5">
                    <div>
                      <h3 className="text-[15px] font-semibold text-white">{member.name}</h3>
                      <p className="mt-0.5 text-sm text-muted">{member.role}</p>
                    </div>

                    <a
                      href={member.social}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} on X`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                                 bg-brand-500 text-white transition-colors hover:bg-brand-400"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}
