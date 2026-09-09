/**
 * "Vserv by the Numbers" cards. Source: screenshots 17-18.
 *
 * NOTE: the reference cards end with "Email support" and "30-Days Money-back
 * Guarantee" — leftovers from the template's pricing table. Replaced with
 * capability points that fit an IT services company.
 */

export const statsIntro = {
  badge: 'Vserv by the Numbers',
  title: 'Technology Expertise.',
  titleMuted: 'Measured by Scale.',
  description:
    'Our capabilities are built around experienced professionals, nationwide delivery, and dependable enterprise IT operations.',
}

export const statCards = [
  {
    icon: 'Rocket',
    value: '1,000+ Experts',
    title: 'Certified IT Professionals',
    description:
      'A growing team of certified technology professionals supporting infrastructure, security, cloud, software, and enterprise IT operations.',
    points: [
      'Certified Engineering Teams',
      'Multi-Discipline Expertise',
      'Enterprise IT Experience',
      'OEM-Certified Engineers',
      'Dedicated Account Management',
    ],
    cta: { label: 'Meet Our Expertise', to: '/about' },
  },
  {
    icon: 'Siren',
    value: '26 Cities',
    title: 'Pan-India Presence',
    description:
      'Our delivery capabilities extend across major business hubs and emerging technology centres, bringing IT support closer to your operations.',
    points: [
      '26 Cities Across India',
      '10 Service Desks',
      'On-Ground Support',
      'Regional SLA Coverage',
      'Rapid On-Site Dispatch',
    ],
    cta: { label: 'Explore Our Presence', to: '/about' },
    featured: true,
  },
  {
    icon: 'MessageSquare',
    value: '150+ Clients',
    title: 'Trusted by Enterprises',
    description:
      'Vserv supports a growing base of enterprise customers with managed IT, infrastructure, security, cloud, and technology services.',
    points: [
      '150+ Active Clients',
      '24×7×365 Support',
      '99.95% Managed Hosting Uptime',
      'Enterprise-Grade SLAs',
      'Long-Term Service Contracts',
    ],
    cta: { label: 'Talk to Our Team', to: '/contact' },
  },
]
