import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pure-black': 'var(--color-pure-black)',
        'off-white': 'var(--color-off-white)',
        'light-gray': 'var(--color-light-gray)',
        accent: 'var(--color-accent)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        sans: ['var(--font-instrument-sans)', 'sans-serif'],
      },
      fontSize: {
        // Title/H1 — 96/96
        'hero-tagline-lg': ['clamp(44px, 6.8vw, 96px)', { lineHeight: '1.0' }],
        // Title/H2 — 88/108
        'hero-tagline': ['clamp(40px, 6.2vw, 88px)', { lineHeight: '1.227' }],
        // Title/H3 — section titles
        'section-title': ['clamp(32px, 4vw, 56px)', { lineHeight: '1.222' }],
        // Title/Headline — 24/28
        headline: ['clamp(18px, 1.6vw, 24px)', { letterSpacing: '-0.02em', lineHeight: '1.167' }],
        // Paragraph/Body1 — body copy
        body1: ['clamp(15px, 1.2vw, 17px)', { letterSpacing: '-0.02em', lineHeight: '1.75' }],
        // Paragraph/Body2 — metadata, fixed 13px
        body2: ['13px', { letterSpacing: '0.08em', lineHeight: '1.5' }],
        // Paragraph/Body3 — 14/20, letter-spacing now 0.04em (was -0.02em)
        body3: ['clamp(13px, 0.93vw, 14px)', { letterSpacing: '0.04em', lineHeight: '1.429' }],
        // Paragraph/Caption — labels and tags, fixed 11px
        caption: ['11px', { letterSpacing: '0.12em', lineHeight: '1.273' }],
        // Contact headline
        'contact-headline': ['clamp(48px, 8vw, 96px)', { lineHeight: '1.0' }],
      },
      spacing: {
        'section-x': 'clamp(24px, 6.5vw, 96px)',
        'section-y': 'clamp(56px, 5.5vw, 80px)',
        'stack-xl': 'clamp(40px, 4.8vw, 72px)',
        'stack-lg': 'clamp(32px, 4vw, 58px)',
        'stack-md': 'clamp(24px, 4vw, 40px)',
      },
    },
  },
  plugins: [],
}

export default config
