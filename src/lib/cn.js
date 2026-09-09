/**
 * Tiny className joiner. Filters out falsy values so conditional classes
 * can be written inline: cn('base', isActive && 'text-white').
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default cn
