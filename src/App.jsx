import AppRoutes from './routes'
import ScrollToTop from './components/layout/ScrollToTop'
import SmoothScroll from './components/layout/SmoothScroll'

export default function App() {
  return (
    <>
      <SmoothScroll />
      <ScrollToTop />
      <AppRoutes />
    </>
  )
}
