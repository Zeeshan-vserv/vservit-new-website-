import PageHero from '../components/layout/PageHero'
import { Capabilities, Process, Services } from '../components/sections'
import { servicesIntro } from '../data/services'

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge={servicesIntro.badge}
        badgeIcon="Settings"
        title={servicesIntro.title}
        titleMuted={servicesIntro.titleMuted}
        description={servicesIntro.description}
      />
      <Services />
      <Capabilities />
      <Process />
    </>
  )
}
