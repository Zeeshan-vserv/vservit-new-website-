import { Check, X } from 'lucide-react'
import cn from '../../lib/cn'

/**
 * Checklist row. `variant="cross"` renders the red X used in the left column
 * of the "Vserv vs. Traditional IT Providers" comparison (screenshot 23).
 */
export default function CheckItem({ children, variant = 'check', className = '' }) {
  const isCross = variant === 'cross'
  const Icon = isCross ? X : Check

  return (
    <li className={cn('flex items-center gap-3', className)}>
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
          isCross ? 'bg-danger' : 'bg-brand-500'
        )}
      >
        <Icon className="h-3 w-3 text-white" strokeWidth={3} />
      </span>
      <span className={cn('text-[15px]', isCross ? 'text-muted' : 'text-white')}>
        {children}
      </span>
    </li>
  )
}
