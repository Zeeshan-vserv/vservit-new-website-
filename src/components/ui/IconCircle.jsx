import { getIcon } from '../../lib/icons'
import cn from '../../lib/cn'

/**
 * Purple icon badge that heads most cards. `shape="square"` is the rounded
 * square used on the stat cards (screenshot 17); the rest are circles.
 */
export default function IconCircle({
  icon = 'Zap',
  size = 'md',
  shape = 'circle',
  glow = false,
  className = '',
}) {
  const Icon = getIcon(icon)

  const sizes = {
    sm: 'h-9 w-9 [&>svg]:h-4 [&>svg]:w-4',
    md: 'h-11 w-11 [&>svg]:h-5 [&>svg]:w-5',
    lg: 'h-14 w-14 [&>svg]:h-6 [&>svg]:w-6',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center bg-brand-500 text-white',
        shape === 'square' ? 'rounded-xl' : 'rounded-full',
        glow && 'shadow-glow',
        sizes[size],
        className
      )}
    >
      <Icon strokeWidth={2} />
    </span>
  )
}
