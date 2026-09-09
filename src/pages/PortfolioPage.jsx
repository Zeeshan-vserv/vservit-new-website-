import PageHero from '../components/layout/PageHero'
import { Portfolio, Testimonials } from '../components/sections'
import { portfolioIntro } from '../data/portfolio'

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        badge={portfolioIntro.badge}
        badgeIcon="Layers"
        title={portfolioIntro.title}
        titleMuted={portfolioIntro.titleMuted}
        description={portfolioIntro.description}
      />
      <Portfolio />
      <Testimonials />
    </>
  )
}
