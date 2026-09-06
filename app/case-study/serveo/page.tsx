'use client'

import type { ReactNode } from 'react'
import CaseStudyPageShell from '@/components/layouts/CaseStudyPageShell'
import CaseImage from '@/components/ui/CaseImage'
import Comment from '@/components/ui/Comment'
import FadeUp from '@/components/ui/FadeUp'
import MoreWork from '@/components/sections/MoreWork'
import type { LightboxComment } from '@/components/ui/Lightbox'
import { getCaseStudy } from '@/lib/caseStudies'

const { title, industry, year, roles, isProtected } = getCaseStudy('serveo')

const overviewParagraphs: ReactNode[] = [
  "I joined Serveo to design the MVP of an AI-powered hospitality platform from the ground up, covering product strategy, branding, UX/UI, and the design system.",
  "The challenge wasn't simply to automate menu management, but to make a complex workflow feel obvious. Restaurants could publish digital menus in minutes while customers enjoyed a simpler, more predictable experience.",
  'The MVP was intentionally scoped to validate the core experience while laying the foundation for future ordering, content optimization, and business insights.',
  'All work shown is real project work. No portfolio recreations.',
]

const brandingComment: LightboxComment = {
  lead: 'Branding:',
  text: 'Built a flexible identity designed to grow with the product. The brand was created alongside the platform so design and development could evolve together.',
}

const strategyComment: LightboxComment = {
  lead: 'Strategy & MVP:',
  text: 'Mapped the product vision, explored the business model, and prioritized the smallest set of features needed to validate the idea.',
}

const wireframesComment: LightboxComment = {
  lead: 'Wireframes & Validation:',
  text: 'Quick wireframes helped validate flows, align stakeholders, and answer the biggest questions before moving into UI.',
}

const finalDesignComment: LightboxComment = {
  lead: 'Final Design:',
  text: "Built with Tailwind and shadcn/ui in mind to ship the MVP fast. The design system kept development efficient without losing the product's identity.",
}

export default function ServeoCaseStudyPage() {
  return (
    <CaseStudyPageShell
      title={title}
      industry={industry}
      year={year}
      roles={roles}
      tools="Figma · FigJam · Claude · Claude Code"
      overviewParagraphs={overviewParagraphs}
      isProtected={isProtected}
    >
      {(openLightbox) => (
        <div className="flex flex-col gap-8 pt-[34px] md:pt-0">
          <FadeUp delay={0.1}>
            <CaseImage
              src="/images/case-study/serveo/serveo-header.webp"
              alt="Serveo logo on a brand gradient background"
              width={1930}
              height={921}
              onOpen={openLightbox}
            />
          </FadeUp>

          <div className="flex flex-col gap-4">
            <FadeUp>
              <Comment lead={brandingComment.lead}>{brandingComment.text}</Comment>
            </FadeUp>
            <FadeUp delay={0.08}>
              <CaseImage
                src="/images/case-study/serveo/serveo-brand-guidelines.webp"
                alt="Serveo brand guidelines covering logo usage, color palette, and typography"
                width={1930}
                height={922}
                comment={brandingComment}
                onOpen={openLightbox}
              />
            </FadeUp>
          </div>

          <div className="flex flex-col gap-4">
            <FadeUp>
              <Comment lead={strategyComment.lead}>{strategyComment.text}</Comment>
            </FadeUp>
            <FadeUp delay={0.08}>
              <CaseImage
                src="/images/case-study/serveo/serveo-roadmap.webp"
                alt="Serveo feature prioritization roadmap, SWOT analysis, and business model canvas"
                width={1930}
                height={511}
                comment={strategyComment}
                onOpen={openLightbox}
              />
            </FadeUp>
          </div>

          <div className="flex flex-col gap-4">
            <FadeUp>
              <Comment lead={wireframesComment.lead}>{wireframesComment.text}</Comment>
            </FadeUp>
            <FadeUp delay={0.08}>
              <CaseImage
                src="/images/case-study/serveo/serveo-flow.webp"
                alt="Serveo flow diagrams showing the first draft, MVP, and user journey flows"
                width={1930}
                height={437}
                comment={wireframesComment}
                onOpen={openLightbox}
              />
            </FadeUp>
            <FadeUp delay={0.16}>
              <CaseImage
                src="/images/case-study/serveo/serveo-wireframes.webp"
                alt="Serveo wireframes"
                width={1930}
                height={605}
                comment={wireframesComment}
                onOpen={openLightbox}
              />
            </FadeUp>
          </div>

          <div className="flex flex-col gap-4">
            <FadeUp>
              <Comment lead={finalDesignComment.lead}>{finalDesignComment.text}</Comment>
            </FadeUp>
            <FadeUp delay={0.08}>
              <CaseImage
                src="/images/case-study/serveo/serveo-login.webp"
                alt="Serveo product login screen"
                width={1930}
                height={1206}
                comment={finalDesignComment}
                onOpen={openLightbox}
              />
            </FadeUp>
            <FadeUp delay={0.16}>
              <CaseImage
                src="/images/case-study/serveo/serveo-dashboard.webp"
                alt="Serveo dashboard showing published and draft menus"
                width={1930}
                height={1206}
                comment={finalDesignComment}
                onOpen={openLightbox}
              />
            </FadeUp>
            <FadeUp delay={0.24}>
              <CaseImage
                src="/images/case-study/serveo/serveo-preview.webp"
                alt="Mobile preview of a Serveo menu"
                width={1930}
                height={1206}
                comment={finalDesignComment}
                onOpen={openLightbox}
              />
            </FadeUp>
          </div>

          <FadeUp>
            <CaseImage
              src="/images/case-study/serveo/serveo-footer.webp"
              alt="Serveo logo on a dark gradient background"
              width={1930}
              height={921}
              onOpen={openLightbox}
            />
          </FadeUp>

          <FadeUp>
            <MoreWork currentSlug="serveo" />
          </FadeUp>
        </div>
      )}
    </CaseStudyPageShell>
  )
}
