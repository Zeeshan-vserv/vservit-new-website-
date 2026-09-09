import Reveal from '../motion/Reveal'
import SectionBadge from './SectionBadge'
import Button from './Button'
import cn from '../../lib/cn'

/**
 * Section header used by most sections: badge, two-tone headline (white first
 * line, grey second line), description and an optional CTA.
 */
export default function SectionHeading({
  badge,
  badgeIcon,
  title,
  titleMuted,
  description,
  cta,
  align = 'center',
  size = 'lg',
  className = '',
  descriptionClassName = '',
}) {
  const isCentered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        isCentered ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {badge && (
        <Reveal>
          <SectionBadge icon={badgeIcon}>{badge}</SectionBadge>
        </Reveal>
      )}

      {(title || titleMuted) && (
        <Reveal delay={0.05}>
          <h2
            className={cn(
              'font-display font-semibold text-balance',
              size === 'lg' ? 'text-display-lg' : 'text-display-md'
            )}
          >
            {title}
            {/* Block, not inline: run inline the two halves flow as one text
                run and wrap mid-phrase, orphaning the last word of `title`
                onto its own line. Every section's reference art starts the
                muted half on a fresh line. */}
            {titleMuted && <span className="heading-muted block">{titleMuted}</span>}
          </h2>
        </Reveal>
      )}

      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'text-balance text-[15px] leading-relaxed text-muted',
              // descriptionClassName REPLACES the default width, rather than
              // being appended alongside it: cn() is a plain string joiner
              // (no tailwind-merge), so two competing max-w-* classes on the
              // same element would both land in the className string, and
              // which one actually wins would depend on Tailwind's internal
              // generation order — not on which one the caller intended.
              descriptionClassName || (isCentered ? 'max-w-2xl' : 'max-w-xl')
            )}
          >
            {description}
          </p>
        </Reveal>
      )}

      {cta && (
        <Reveal delay={0.15}>
          <Button to={cta.to}>{cta.label}</Button>
        </Reveal>
      )}
    </div>
  )
}
