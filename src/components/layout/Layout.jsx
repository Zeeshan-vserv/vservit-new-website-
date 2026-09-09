import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

/** Shell shared by every route: fixed navbar, page outlet, footer. */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
