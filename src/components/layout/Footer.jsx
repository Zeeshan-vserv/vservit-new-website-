import { Link } from 'react-router-dom'
import Logo from './Logo'
import Container from '../ui/Container'
import { brand, copyright, footerNav, legalNav, newsletter } from '../../data/site'

/** Footer with the purple light-shaft rising from the bottom (screenshot 29). */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      {/* Light shaft */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]
                   bg-[radial-gradient(60%_100%_at_50%_0%,rgba(124,77,255,0.35)_0%,rgba(124,77,255,0.06)_45%,transparent_75%)]"
      />

      <Container className="relative py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(2,0.8fr)_1.2fr]">
          <div>
            <Logo />
            <hr className="my-8 max-w-[220px] border-line" />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              <span className="text-muted-strong">{brand.tagline}</span>
              <br />
              {brand.description}
            </p>
          </div>

          {footerNav.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-base font-semibold text-white">{column.title}</h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="link-muted text-sm"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to} className="link-muted text-sm">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-5 text-base font-semibold text-white">{newsletter.title}</h3>
            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex items-center gap-2 rounded-pill border border-line bg-ink-850 p-1.5 pl-5"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder={newsletter.placeholder}
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-muted-soft"
              />
              <button
                type="submit"
                className="shrink-0 rounded-pill bg-brand-500 px-5 py-2.5 text-sm font-semibold
                           text-white transition-colors hover:bg-brand-400"
              >
                {newsletter.cta}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-sm text-muted">{copyright}</p>
          <div className="flex items-center gap-4 text-sm">
            {legalNav.map((item, index) => (
              <span key={item.to} className="flex items-center gap-4">
                {index > 0 && <span className="text-line-strong">|</span>}
                <Link to={item.to} className="link-muted">
                  {item.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
