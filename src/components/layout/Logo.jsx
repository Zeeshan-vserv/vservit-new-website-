import { Link } from 'react-router-dom'
import { brand } from '../../data/site'
import cn from '../../lib/cn'

/**
 * Real brand asset. White artwork on a transparent background (163x72), so
 * it only works on a dark surface — which is every surface here.
 *
 * The filename contains a space, hence the %20: an unencoded space in a URL
 * is not guaranteed to survive every server/CDN. Renaming the file to
 * `logo-dark.png` would let this be a plain path.
 */
const LOGO_SRC = '/images/Logo%20Dark.png'

/**
 * Site logo. Defaults to the CSS wordmark that stood in before the real
 * asset arrived (screenshots 1 and 29); pass `asImage` for the artwork.
 */
export default function Logo({ className = '', asImage = false }) {
  const label = `${brand.name} ${brand.suffix} — home`

  if (asImage) {
    return (
      <Link to="/" aria-label={label} className={cn('inline-flex items-center', className)}>
        {/* alt="" because the link already carries an aria-label — giving
            both would make a screen reader announce the name twice.
            width/height are the intrinsic pixel size so the browser can
            reserve the box before the PNG loads and avoid a layout shift. */}
        <img
          src={LOGO_SRC}
          alt=""
          width={163}
          height={72}
          className="h-9 w-auto"
        />
      </Link>
    )
  }

  return (
    <Link
      to="/"
      aria-label={label}
      className={cn('inline-flex flex-col leading-none', className)}
    >
      <span className="font-display text-lg font-extrabold tracking-[0.08em] text-white">
        VS<span className="text-brand-400">Ξ</span>RV
      </span>
      <span className="mt-0.5 text-[9px] font-semibold tracking-[0.34em] text-muted">
        {brand.suffix}
      </span>
    </Link>
  )
}
