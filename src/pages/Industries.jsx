import PageHero from '../components/layout/PageHero'
import { ClientArc, WhyVserv } from '../components/sections'

export default function Industries() {
  return (
    <>
      <PageHero
        badge="Industries"
        badgeIcon="Building2"
        title="Technology built for"
        titleMuted="the way your industry works."
        description="Banking, insurance, healthcare, manufacturing, logistics and retail — Vserv delivers IT that fits the operating realities of each sector."
      />
      <ClientArc />
      <WhyVserv />
    </>
  )
}
