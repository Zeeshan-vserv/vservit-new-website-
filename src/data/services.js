/**
 * Services section. Source: screenshots 5-8.
 * Six primary service cards + the pill row beneath them.
 */

export const servicesIntro = {
  badge: 'Services',
  title: 'Technology services that cover',
  titleMuted: 'the complete IT journey.',
  description:
    'From infrastructure and cyber security to cloud, AI, software, and IT talent — Vserv brings the capabilities enterprises need to build, secure, manage, and scale their technology environment.',
  cta: { label: 'Explore All Services', to: '/services' },
}

export const services = [
  {
    slug: 'cyber-security',
    icon: 'ShieldCheck',
    title: 'Cyber Security',
    subtitle: 'Secure What Matters Most',
    description:
      'Protect your digital environment with layered security, continuous monitoring, threat detection, and incident response.',
    image: '/images/services/cyber-security.jpg',
  },
  {
    slug: 'infrastructure-management',
    icon: 'Server',
    title: 'Infrastructure Management',
    subtitle: 'Keep Your IT Running',
    description:
      'End-to-end infrastructure management for servers, networks, data centres, and enterprise IT operations.',
    image: '/images/services/infrastructure.jpg',
  },
  {
    slug: 'ai-services',
    icon: 'Sparkles',
    title: 'AI Services',
    subtitle: 'Turn AI Into Business Value',
    description:
      'Leverage Consumable AI, AI-as-a-Service, and Embedded AI to automate processes and improve operational efficiency.',
    image: '/images/services/ai-services.jpg',
  },
  {
    slug: 'cloud-solutions',
    icon: 'Cloud',
    title: 'Cloud Solutions',
    subtitle: 'Scale Without Limits',
    description:
      'Build secure and scalable cloud environments with multi-cloud and hybrid architecture, migration, backup, and disaster recovery.',
    image: '/images/services/cloud.jpg',
  },
  {
    slug: 'software-solutions',
    icon: 'Code2',
    title: 'Software Solutions',
    subtitle: 'Technology Built Around Your Business',
    description:
      'Develop custom and ERP applications designed around your business needs, workflows, and growth objectives.',
    image: '/images/services/software.jpg',
  },
  {
    slug: 'staffing-resourcing',
    icon: 'Users',
    title: 'Staffing & Resourcing',
    subtitle: 'The Right IT Talent, When You Need It',
    description:
      'Access pre-vetted and certified IT professionals for contract, permanent, infrastructure, and technology requirements.',
    image: '/images/services/staffing.jpg',
  },
]

/** Pill row under the service grid — screenshot 8. */
export const servicePills = [
  { label: 'Infrastructure Management', icon: 'Network', to: '/services/infrastructure-management' },
  { label: 'Cybersecurity', icon: 'Lock', to: '/services/cyber-security' },
  { label: 'Cloud Solutions', icon: 'Cloud', to: '/services/cloud-solutions' },
  { label: 'Software Solutions', icon: 'MonitorPlay', to: '/services/software-solutions' },
  { label: 'IT Support', icon: 'LifeBuoy', to: '/services/it-support' },
  { label: 'Annual Maintenance', icon: 'Wrench', to: '/services/annual-maintenance' },
  { label: 'Managed IT Services', icon: 'Settings2', to: '/services/managed-it' },
  { label: 'IT Staffing', icon: 'UserCheck', to: '/services/it-staffing' },
]
