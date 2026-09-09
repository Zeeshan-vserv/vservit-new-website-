import { Link } from 'react-router-dom'
import { getIcon } from '../../lib/icons'
import cn from '../../lib/cn'

/**
 * Small rounded chip. Used for service pills (screenshot 8), case-study tags
 * (screenshot 10) and the card tags in the About section (screenshot 14).
 */
export default function Pill({ icon, children, to, className = '', tone = 'default' }) {
  const Icon = icon ? getIcon(icon) : null

  const tones = {
    default: 'border-line bg-ink-800 text-white',
    subtle: 'border-brand-900/60 bg-brand-950/50 text-muted-strong',
  }

  const content = (
    <>
      {Icon && (
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500">
          <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
        </span>
      )}
      <span>{children}</span>
    </>
  )

  const classes = cn(
    'inline-flex items-center gap-2.5 rounded-pill border py-1.5 text-sm font-medium',
    Icon ? 'pl-1.5 pr-4' : 'px-4 py-2',
    tones[tone],
    to && 'transition-colors duration-200 hover:border-line-strong hover:bg-ink-700',
    className
  )

  return to ? (
    <Link to={to} className={classes}>
      {content}
    </Link>
  ) : (
    <span className={classes}>{content}</span>
  )
}
