/** @type {import('tailwindcss').Config} */

// Design tokens below were sampled directly from the reference screenshots
// in /Ui images. Keep this file as the single source of truth for the theme.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        // Page + surfaces
        ink: {
          DEFAULT: '#000000', // page background
          950: '#050507',
          900: '#0A0A0F', // section panel
          850: '#0D0D12', // card background
          800: '#131319', // raised card / input
          700: '#1C1C24', // pill / chip
        },
        // Brand purple, sampled from CTA buttons + badge icons
        brand: {
          50: '#F1EDFF',
          100: '#E3DBFF',
          200: '#C7B7FF',
          300: '#A991FF',
          400: '#8E6DFF',
          500: '#7C4DFF', // primary button
          600: '#6D3FF0',
          700: '#5A31D1',
          800: '#42249B',
          900: '#2A1766',
          950: '#150B33',
        },
        // Text ramp
        muted: {
          DEFAULT: '#A0A0AB', // body copy
          strong: '#C9C9D1',
          soft: '#7A7A85', // second heading line / captions
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.14)',
          brand: 'rgba(124,77,255,0.45)',
        },
        success: '#22C55E',
        danger: '#EF4444',
      },
      fontFamily: {
        // NOTE: the Framer original uses a licensed grotesk (General Sans family).
        // Plus Jakarta Sans is the closest free substitute; swap here if you
        // license the original.
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid display sizes matching the screenshots
        'display-xl': ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 4.6vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.875rem, 3.4vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.5rem, 2.4vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        card: '1.25rem',
        panel: '1.75rem',
        pill: '999px',
      },
      boxShadow: {
        card: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 50px -20px rgba(0,0,0,0.9)',
        glow: '0 0 0 1px rgba(124,77,255,0.35), 0 12px 40px -12px rgba(124,77,255,0.55)',
        btn: '0 8px 24px -8px rgba(124,77,255,0.75)',
      },
      backgroundImage: {
        // Purple light-shaft used behind the Services / Process panels
        'panel-glow':
          'radial-gradient(120% 80% at 50% 0%, rgba(124,77,255,0.28) 0%, rgba(124,77,255,0.06) 40%, rgba(0,0,0,0) 70%)',
        // Client-arc panel: near-black with only a whisper of violet tucked
        // tight behind the apex card — corners read as true black, unlike
        // panel-glow's wider, more saturated beam used elsewhere.
        'arc-glow':
          'radial-gradient(55% 40% at 50% 6%, rgba(124,77,255,0.10) 0%, rgba(124,77,255,0.03) 45%, rgba(0,0,0,0) 70%)',
        // Faint dotted texture on cards
        'dot-grid':
          'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        // Top hairline that glows purple on cards
        'card-topline':
          'linear-gradient(90deg, rgba(124,77,255,0) 0%, rgba(124,77,255,0.9) 50%, rgba(124,77,255,0) 100%)',
      },
      backgroundSize: {
        'dot-grid': '18px 18px',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'marquee-slow': 'marquee 55s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
