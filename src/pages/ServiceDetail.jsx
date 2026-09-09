import { useParams } from 'react-router-dom'
import PageHero from '../components/layout/PageHero'
import NotFound from './NotFound'
import { services } from '../data/services'
import { Process, SupportCta } from '../components/sections'

/**
 * Detail page for a single service. Content beyond the header still needs a
 * design; the route and data lookup are wired so it can be filled in place.
 */
export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((item) => item.slug === slug)

  if (!service) return <NotFound />

  return (
    <>
      <PageHero
        badge="Service"
        badgeIcon="Settings"
        title={service.title}
        titleMuted={service.subtitle}
        description={service.description}
        cta={{ label: 'Talk to Vserv', to: '/contact' }}
      />
      <Process />
      <SupportCta />
    </>
  )
}
