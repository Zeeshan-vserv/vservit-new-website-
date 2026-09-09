import PageHero from '../components/layout/PageHero'
import { Process, Services, Stats, WhyVserv } from '../components/sections'

export default function Explore() {
  return (
    <>
      <PageHero
        badge="Explore Vserv IT"
        badgeIcon="Compass"
        title="One partner across"
        titleMuted="your entire IT estate."
        description="Infrastructure, cyber security, cloud, AI, software, staffing and managed services — see how the pieces fit together."
      />
      <Services />
      <Stats />
      <Process />
      <WhyVserv />
    </>
  )
}
