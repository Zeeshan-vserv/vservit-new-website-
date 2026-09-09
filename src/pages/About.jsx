import PageHero from '../components/layout/PageHero'
import { AboutStatement, Stats, Team, WhoWeAre } from '../components/sections'

export default function About() {
  return (
    <>
      <PageHero
        badge="About Us"
        badgeIcon="Aperture"
        title="Experience Meets"
        titleMuted="Enterprise Capability"
        description="Vserv Infosystems combines experienced professionals and enterprise technology capabilities to help businesses operate securely, efficiently, and at scale."
      />
      <AboutStatement />
      <WhoWeAre />
      <Stats />
      <Team />
    </>
  )
}
