import cn from '../../lib/cn'

/** Page gutter + max width. The reference content column caps around 1200px. */
export default function Container({ children, className = '', size = 'default', ...rest }) {
  const sizes = {
    narrow: 'max-w-3xl',
    default: 'max-w-[1200px]',
    wide: 'max-w-[1400px]',
  }

  return (
    <div className={cn('mx-auto w-full px-5 lg:px-8', sizes[size], className)} {...rest}>
      {children}
    </div>
  )
}
