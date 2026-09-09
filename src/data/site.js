/**
 * Global site metadata: brand, navigation and footer.
 * Source: screenshots 1 (navbar) and 28-29 (footer).
 */

export const brand = {
  name: 'VSERV',
  suffix: 'INFOSYSTEMS',
  legalName: 'VSERV Infosystems Private Limited',
  tagline: 'Technology That Moves Your Business Forward',
  description:
    'We help businesses build secure, scalable, and future-ready technology environments through innovative IT solutions and expert support.',
}

export const mainNav = [
  { label: 'VservAI', to: '/vserv-ai' },
  { label: 'About', to: '/about' },
  { label: 'Service', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Resources', to: '/resources' },
  { label: 'Explore Vserv IT', to: '/explore' },
]

export const navCta = { label: 'Get In Touch', to: '/contact' }

export const footerNav = [
  {
    title: 'Company',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About US', to: '/about' },
      { label: 'Our Team', to: '/about#team' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    // NOTE: in the reference this column is titled "Services" but lists social
    // profiles. Kept the layout, corrected the label to match its contents.
    title: 'Follow Us',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/', external: true },
      { label: 'Instagram', href: 'https://www.instagram.com/', external: true },
      { label: 'YouTube', href: 'https://www.youtube.com/', external: true },
      { label: 'Facebook', href: 'https://www.facebook.com/', external: true },
    ],
  },
]

export const legalNav = [
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy' },
]

export const newsletter = {
  title: 'Stay Connected',
  placeholder: 'Enter Your Email...',
  cta: 'Subscribe Us',
}

export const copyright = `© ${new Date().getFullYear()} ${brand.legalName}. All Rights Reserved.`
