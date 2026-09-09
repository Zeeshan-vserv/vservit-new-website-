/**
 * Copy for the remaining home-page sections that don't warrant their own file:
 * hero, about statement, support CTA, who-we-are, integrations, start-journey
 * and the final CTA. Sources noted per block.
 */

/** Screenshot 1 */
export const hero = {
  title: 'Building smarter IT',
  titleLines: ['Building smarter IT', 'ecosystems', 'for businesses'],
  description:
    'Vserv Infosystems brings infrastructure, cyber security, cloud, AI, software and IT talent together under one accountable technology partner.',
  media: '/videos/hero-video.mp4',
  poster: '/images/hero/hero-warehouse.jpg',
}

/** Screenshot 2 — animates word by word on scroll. */
export const aboutStatement = {
  badge: 'About Us',
  text: 'Vserv Infosystems Pvt Ltd was formed by experienced IT service professionals with expertise across infrastructure service delivery, facility management and project management for enterprise clients.',
}

/** Screenshots 11-13 */
export const supportCta = {
  badge: 'Enterprise IT Support',
  title: 'Ready to make your IT',
  titleMuted: 'environment more secure, scalable and easier to manage?',
  description:
    "From infrastructure and cyber security to cloud, AI, and managed IT, Vserv helps enterprises build technology environments that are secure, scalable, and ready for what's next.",
  cta: { label: 'Talk to Vserv', to: '/contact' },
  floatingLabels: ["Let's Talk", 'Built to Scale'],
  cards: [
    {
      icon: 'Smile',
      title: 'Fast Response',
      description: 'Get the support you need, when you need it.',
    },
    {
      icon: 'Star',
      title: 'Certified Expertise',
      description: 'Experienced professionals backed by enterprise IT capabilities.',
    },
    {
      icon: 'Headphones',
      title: 'Always-On Support',
      description: '24×7×365 support to keep your critical operations moving.',
    },
  ],
}

/** Screenshots 13-15 — sticky image on the right, stacked cards on the left. */
export const whoWeAre = {
  badge: 'About Vserv Infosystems',
  title: 'Experience Meets',
  titleMuted: 'Enterprise Capability',
  description:
    'Vserv combines experienced professionals and enterprise technology capabilities to help businesses operate securely, efficiently, and at scale.',
  image: '/images/about/workspace.jpg',
  cards: [
    {
      icon: 'Component',
      tag: 'Assist',
      title: 'Proven Expertise',
      description:
        'Experienced IT professionals delivering infrastructure and technology solutions for enterprise environments.',
      pills: ['IT Expertise', 'Enterprise Solutions'],
    },
    {
      icon: 'MousePointer2',
      tag: 'Guide',
      title: 'Pan-India Presence',
      description: '10 service desks and delivery capabilities across 26 cities in India',
      pills: ['26 Cities', 'Pan-India Support'],
    },
    {
      icon: 'Webhook',
      tag: 'Resolve',
      title: 'Built to Scale',
      description:
        'A complete technology ecosystem covering infrastructure, security, cloud, AI, software, staffing, and support.',
      cta: { label: 'Talk to Vserv', to: '/contact' },
    },
  ],
}

/**
 * Screenshots 15-16.
 * NOTE: reference copy read "Nubien seamlessly integrates..." and the button
 * said "View About Reboot" — both template leftovers, rewritten below.
 */
export const integrations = {
  badge: 'Integrations',
  title: 'Seamless Integrations for',
  titleMuted: 'Maximum Efficiency.',
  description:
    'Vserv integrates with the tools and platforms your teams already run on, keeping workflows smooth and your environment consistent.',
  cta: { label: 'View All Integrations', to: '/integrations' },
  logos: [
    'slack', 'zoom', 'mailchimp', 'salesforce', 'jira',
    'microsoft-365', 'aws', 'azure', 'servicenow', 'google-workspace',
    'zoho', 'sap', 'freshworks',
  ],
}

/** Screenshot 21 — split banner above the team section. */
export const startJourney = {
  badge: 'Start Your IT Journey',
  title: "Let's Build a Better IT Environment",
  titleMuted: 'Secure. Scalable. Ready to Perform',
  description:
    "Tell us what you're looking to improve. Our experts will help you identify the right infrastructure, security, cloud, AI, software, or managed IT solution.",
  cta: { label: 'Get Started', to: '/contact' },
  rating: { stars: 5, label: '200+ Agencies Rated' },
  image: '/images/about/journey.jpg',
  video: '/videos/Start%20Your%20IT%20Journey.mp4',
}

/** Screenshot 28 */
export const finalCta = {
  badge: "Let's Build What's Next",
  title: 'Ready to Transform Your IT?',
  titleMuted: "Let's Build a Smarter Future Together.",
  description:
    "Whether you're modernizing your infrastructure, strengthening cybersecurity, moving to the cloud, implementing AI, or looking for reliable managed IT support, VSERV is ready to help turn your technology goals into measurable business outcomes.",
  cta: { label: 'Start Your IT Journey', to: '/contact' },
}
