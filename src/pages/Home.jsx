import {
  AboutStatement,
  Capabilities,
  ClientArc,
  Faq,
  FinalCta,
  Hero,
  Integrations,
  Portfolio,
  Process,
  Services,
  StartJourney,
  Stats,
  SupportCta,
  Team,
  Testimonials,
  WhoWeAre,
  WhyVserv,
} from '../components/sections'

/**
 * Home page — section order mirrors the reference screenshots 1 through 29.
 * Reordering the page means reordering this list, nothing else.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <AboutStatement />
      <ClientArc />
      <Capabilities />
      <Services />
      <Portfolio />
      <SupportCta />
      <WhoWeAre />
      <Integrations />
      <Stats />
      <Process />
      <StartJourney />
      <Team />
      <WhyVserv />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  )
}
