import PageHero from '../components/layout/PageHero'
import { Capabilities, Integrations } from '../components/sections'

export default function VservAI() {
  return (
    <>
      <PageHero
        badge="VservAI"
        badgeIcon="Sparkles"
        title="Turn AI into"
        titleMuted="measurable business value."
        description="Consumable AI, AI-as-a-Service and Embedded AI that automate processes and improve operational efficiency inside the systems your teams already use."
        cta={{ label: 'Talk to Vserv', to: '/contact' }}
      />
      <Capabilities />
      <Integrations />
    </>
  )
}
