import cn from '../../lib/cn'

/**
 * Infinite horizontal ticker. Children are rendered twice so the CSS
 * translate(-50%) loop is seamless. Used for the client-stories strip
 * (screenshots 24-25), the partner logo rail, and the alternating tag rows
 * in the Trusted Authentication card.
 *
 * `direction` is the way the content *travels*: the keyframes run 0 ->
 * -50%, so the default carries it leftward; "right" flips it with
 * animation-direction. `duration` overrides the class-based speed when a
 * row needs its own pace.
 */
export default function Marquee({
  children,
  speed = 'default',
  direction = 'left',
  duration,
  className = '',
}) {
  const animation = speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee'

  return (
    <div className={cn('relative flex overflow-hidden', className)}>
      <div
        className={cn(
          'flex w-max shrink-0 items-center',
          animation,
          direction === 'right' && '[animation-direction:reverse]'
        )}
        style={duration ? { animationDuration: `${duration}s` } : undefined}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
