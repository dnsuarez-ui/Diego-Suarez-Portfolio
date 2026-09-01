export interface CaseStudySummary {
  slug: string
  number: string
  title: string
  industry: string
  year: string
  roles: string[]
  thumbnail: string
  isProtected: boolean
}

// Single source of truth for title/industry/year/roles/thumbnail — consumed by
// both the home page cards (Work.tsx) and each case study's own page, so the
// two can never drift out of sync the way they did before.
export const caseStudies: CaseStudySummary[] = [
  {
    slug: 'serveo',
    number: '01',
    title: 'Serveo',
    industry: 'Hospitality Technology · Food & Beverage · SaaS',
    year: '2025',
    roles: ['Product Strategy', 'Branding', 'UX/UI Design', 'Design System'],
    thumbnail: '/images/case-study/serveo/serveo-thumb.webp',
    isProtected: false,
  },
  {
    slug: 'rental-modernization',
    number: '02',
    title: 'A money-leaking problem',
    industry: 'Travel · Car Rental · B2C',
    year: '2025',
    roles: ['UX Design', 'Information Architecture'],
    thumbnail: '/images/case-study/rental-modernization/rental-modernization-thumb.webp',
    isProtected: true,
  },
  {
    slug: 'rental-modernization-2',
    number: '03',
    title: 'Making every step easier',
    industry: 'Travel · Car Rental · B2C',
    year: '2025',
    roles: ['UX/UI Design', 'Digital Modernization', 'Product Strategy'],
    thumbnail: '/images/case-study/rental-modernization-2/rental-modernization-2-thumb.webp',
    isProtected: true,
  },
]

export function getCaseStudy(slug: string): CaseStudySummary {
  const entry = caseStudies.find((cs) => cs.slug === slug)
  if (!entry) {
    throw new Error(`Unknown case study slug: ${slug}`)
  }
  return entry
}
