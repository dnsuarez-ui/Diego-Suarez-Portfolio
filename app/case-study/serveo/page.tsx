'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import CaseStudyPageShell from '@/components/layouts/CaseStudyPageShell'
import CaseImage from '@/components/ui/CaseImage'
import Comment from '@/components/ui/Comment'

const roles = ['Product Strategy', 'Branding', 'UX/UI Design', 'Design System']

const overviewParagraphs: ReactNode[] = [
  "I joined Serveo to design the MVP of an AI-powered hospitality platform from the ground up, covering product strategy, branding, UX/UI, and the design system.",
  "The challenge wasn't simply to automate menu management, but to make a complex workflow feel obvious. Restaurants could publish digital menus in minutes while customers enjoyed a simpler, more predictable experience.",
  'The MVP was intentionally scoped to validate the core experience while laying the foundation for future ordering, content optimization, and business insights.',
  'All work shown is real project work. No portfolio recreations.',
]

export default function ServeoCaseStudyPage() {
  return (
    <CaseStudyPageShell
      title="Serveo"
      industry="Hospitality Technology · Food & Beverage · SaaS"
      year="2025"
      roles={roles}
      tools="Figma · FigJam · Claude · Claude Code"
      overviewParagraphs={overviewParagraphs}
      isProtected={false}
    >
      {(openLightbox) => (
        <div className="flex flex-col gap-8 pt-[34px] md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            <CaseImage
              src="/images/case-study/serveo/serveo-header.webp"
              alt="Serveo logo on a brand gradient background"
              width={1930}
              height={922}
              onOpen={openLightbox}
            />
          </motion.div>

          <div className="flex flex-col gap-4">
            <Comment lead="Branding:">
              Built a flexible identity designed to grow with the product. The brand was created
              alongside the platform so design and development could evolve together.
            </Comment>
            <CaseImage
              src="/images/case-study/serveo/serveo-brand-guidelines.webp"
              alt="Serveo brand guidelines covering logo usage, color palette, and typography"
              width={1930}
              height={919}
              onOpen={openLightbox}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Comment lead="Strategy & MVP:">
              Mapped the product vision, explored the business model, and prioritized the smallest
              set of features needed to validate the idea.
            </Comment>
            <CaseImage
              src="/images/case-study/serveo/serveo-roadmap.webp"
              alt="Serveo feature prioritization roadmap, SWOT analysis, and business model canvas"
              width={1930}
              height={488}
              onOpen={openLightbox}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Comment lead="Wireframes & Validation:">
              Quick wireframes helped validate flows, align stakeholders, and answer the biggest
              questions before moving into UI.
            </Comment>
            <CaseImage
              src="/images/case-study/serveo/serveo-flow.webp"
              alt="Serveo flow diagrams showing the first draft, MVP, and user journey flows"
              width={1930}
              height={425}
              onOpen={openLightbox}
            />
            <CaseImage
              src="/images/case-study/serveo/serveo-wireframes.webp"
              alt="Serveo wireframes"
              width={1930}
              height={605}
              onOpen={openLightbox}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Comment lead="Final Design:">
              Built with Tailwind and shadcn/ui in mind to ship the MVP fast. The design system kept
              development efficient without losing the product&apos;s identity.
            </Comment>
            <CaseImage
              src="/images/case-study/serveo/serveo-login.webp"
              alt="Serveo product login screen"
              width={1930}
              height={1207}
              onOpen={openLightbox}
            />
            <CaseImage
              src="/images/case-study/serveo/serveo-dashboard.webp"
              alt="Serveo dashboard showing published and draft menus"
              width={1930}
              height={1206}
              onOpen={openLightbox}
            />
            <CaseImage
              src="/images/case-study/serveo/serveo-preview.webp"
              alt="Mobile preview of a Serveo menu"
              width={1930}
              height={1206}
              onOpen={openLightbox}
            />
          </div>

          <CaseImage
            src="/images/case-study/serveo/serveo-footer.webp"
            alt="Serveo logo on a dark gradient background"
            width={1930}
            height={922}
            onOpen={openLightbox}
          />
        </div>
      )}
    </CaseStudyPageShell>
  )
}
