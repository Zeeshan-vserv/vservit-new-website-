import cn from '../../lib/cn'

/**
 * Base card surface: dark fill, hairline border, glowing purple top line and
 * an optional dotted texture. Matches the cards in screenshots 4, 6-8, 17-20.
 */
export default function Card({
  children,
  className = '',
  dots = true,
  hover = true,
  as: Component = 'div',
  ...rest
}) {
  return (
    <Component
      className={cn(
        'card-surface',
        dots && 'card-dots',
        hover && 'transition-colors duration-300 hover:border-line-strong',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}
