import { getIcon } from '../../lib/icons'
import cn from '../../lib/cn'

/**
 * The pill that labels every section — a small purple icon circle followed by
 * the section name (e.g. "About Us", "Services", "FAQ").
 */
export default function SectionBadge({ icon = 'Sparkles', children, className = '' }) {
  const Icon = getIcon(icon)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-pill border border-line',
        'bg-ink-850/80 py-1.5 pl-1.5 pr-4 text-sm font-medium text-white backdrop-blur',
        className
      )}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500">
        <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
      </span>
      {children}
    </span>
  )
}
