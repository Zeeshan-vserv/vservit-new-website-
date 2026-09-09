import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'

// Home ships in the main bundle; every other route is code-split.
const About = lazy(() => import('../pages/About'))
const ServicesPage = lazy(() => import('../pages/ServicesPage'))
const ServiceDetail = lazy(() => import('../pages/ServiceDetail'))
const PortfolioPage = lazy(() => import('../pages/PortfolioPage'))
const Industries = lazy(() => import('../pages/Industries'))
const Resources = lazy(() => import('../pages/Resources'))
const VservAI = lazy(() => import('../pages/VservAI'))
const Explore = lazy(() => import('../pages/Explore'))
const Contact = lazy(() => import('../pages/Contact'))
const NotFound = lazy(() => import('../pages/NotFound'))

function RouteFallback() {
  return <div className="min-h-[60vh]" aria-busy="true" />
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/vserv-ai" element={<VservAI />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
