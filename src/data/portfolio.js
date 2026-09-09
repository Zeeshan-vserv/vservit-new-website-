/**
 * Portfolio & case studies. Source: screenshots 9-11.
 * Each row: year badge, title, checklist, tag pills, and two images.
 */

export const portfolioIntro = {
  badge: 'Portfolio & Case Studies',
  title: 'Showcasing Our Best',
  titleMuted: 'Work with Proven Precision.',
  description:
    'Explore how Vserv helps enterprises strengthen infrastructure, improve security, adopt cloud and AI technologies, and build reliable IT operations that are ready for growth.',
  cta: { label: 'View More Works', to: '/portfolio' },
}

export const caseStudies = [
  {
    slug: 'cloud-ai-transformation',
    year: '2024',
    title: 'Cloud & AI Transformation',
    highlights: ['Cloud Solutions', 'Hybrid Cloud', 'AI Services', 'Automation'],
    tags: ['Cloud', 'AI & Automation'],
    images: [
      '/images/portfolio/cloud-ai-1.jpg',
      '/images/portfolio/cloud-ai-2.jpg',
    ],
  },
  {
    slug: 'cyber-security-soc',
    year: '2025',
    title: 'Cyber Security & SOC Operations',
    highlights: ['24×7 SOC Monitoring', 'Threat Detection', 'VAPT', 'Endpoint Security'],
    tags: ['Cyber Security', 'SOC'],
    images: [
      '/images/portfolio/soc-1.jpg',
      '/images/portfolio/soc-2.jpg',
    ],
  },
  {
    slug: 'managed-infrastructure',
    year: '2025',
    title: 'Managed Infrastructure Modernisation',
    highlights: ['Data Centre Ops', 'Network Management', 'Service Desk', 'AMC'],
    tags: ['Infrastructure', 'Managed IT'],
    images: [
      '/images/portfolio/infra-1.jpg',
      '/images/portfolio/infra-2.jpg',
    ],
  },
]
