/**
 * Capability cards + feature strip. Source: screenshots 4-5.
 *
 * NOTE: the reference screenshots still carry the Framer template's copy here
 * ("Nubien supports...", "AI-Speech Recognition"). Rewritten to match an
 * enterprise IT provider — original wording kept in `templateCopy` for review.
 */

export const capabilityCards = [
  {
    icon: 'Zap',
    title: 'Seamless System Integrations',
    description:
      'Vserv connects your existing tools, platforms, and enterprise systems into one coherent environment.',
    visual: 'integrations',
    templateCopy: 'Nubien supports a wide range of third-party integrations.',
  },
  {
    icon: 'Zap',
    title: 'Trusted Authentication',
    description:
      'Identity, access, and endpoint controls that keep every workflow verified and auditable.',
    visual: 'auth',
    templateCopy: 'Quickly integrate with major platforms to workflows.',
  },
  {
    icon: 'Zap',
    title: 'Continuous Monitoring',
    description:
      'Live visibility into infrastructure health, security posture, and service performance.',
    visual: 'monitoring',
    templateCopy: 'Enable your user to control or navigate your site using speech.',
  },
]

/** Four-item strip below the capability cards. */
export const featureStrip = [
  {
    icon: 'Timer',
    title: 'Real-Time Data',
    description: 'Instant insights for faster decision-making.',
  },
  {
    icon: 'Eye',
    title: 'Vision Capabilities',
    description: 'AI-powered image and video recognition.',
  },
  {
    icon: 'Sparkle',
    title: 'Optimized UX/UI',
    description: 'Smart design that enhances user experience.',
  },
  {
    icon: 'Send',
    title: 'Predictive Analytics',
    description: 'Make data-driven decisions with AI insights.',
  },
]
