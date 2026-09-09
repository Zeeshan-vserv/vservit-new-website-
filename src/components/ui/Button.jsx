import { Link } from 'react-router-dom'
import cn from '../../lib/cn'

const variants = {
  primary:
    'bg-brand-500 text-white shadow-btn hover:bg-brand-400 active:bg-brand-600',
  secondary:
    'bg-ink-800 text-white border border-line hover:border-line-strong hover:bg-ink-700',
  ghost: 'text-muted hover:text-white',
  outline:
    'border border-line-strong text-white hover:bg-white/5',
}

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-base',
}

/**
 * Renders as <Link>, <a> or <button> depending on the props given.
 * All CTAs across the site route through this component.
 */
export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-pill font-semibold',
    'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
    variants[variant],
    sizes[size],
    className
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
