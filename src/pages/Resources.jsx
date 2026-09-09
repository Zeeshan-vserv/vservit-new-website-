import PageHero from '../components/layout/PageHero'
import { Faq } from '../components/sections'

export default function Resources() {
  return (
    <>
      <PageHero
        badge="Resources"
        badgeIcon="BookOpen"
        title="Insights, guides and"
        titleMuted="answers from our engineers."
        description="Practical material on infrastructure, security, cloud and AI — written by the teams who run these environments every day."
      />
      <Faq />
    </>
  )
}
