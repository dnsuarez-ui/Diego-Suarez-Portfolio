'use client'

import type { ReactNode } from 'react'
import CaseStudyPageShell from '@/components/layouts/CaseStudyPageShell'
import CaseImage from '@/components/ui/CaseImage'
import Comment from '@/components/ui/Comment'
import Bold from '@/components/ui/Bold'
import FadeUp from '@/components/ui/FadeUp'
import MoreWork from '@/components/sections/MoreWork'
import type { LightboxComment } from '@/components/ui/Lightbox'
import { getCaseStudy } from '@/lib/caseStudies'

const { title, industry, year, roles, isProtected } = getCaseStudy('rental-modernization')

const overviewParagraphs: ReactNode[] = [
  <>
    I joined the <Bold>Product and Engineering teams</Bold> to redesign a fragmented customer
    journey for <Bold>one of the world&rsquo;s largest car rental companies</Bold>. Critical
    information was difficult to find, leaving customers without answers when they needed them
    most.
  </>,
  <>
    The result was <Bold>thousands of avoidable support calls every day</Bold>. Simple questions
    like &ldquo;Where&rsquo;s my reservation number?&rdquo; or &ldquo;Where do I catch the
    shuttle?&rdquo; overwhelmed the contact center because information was scattered across
    multiple touchpoints.
  </>,
  <>
    Instead of redesigning a screen,{' '}
    <Bold>I redesigned how information flows across the customer journey</Bold>. A mobile-first
    strategy combined simplified emails, SMS reminders, a unified reservation hub, and an AI
    assistant to deliver the right information at the right time through a{' '}
    <Bold>consistent brand experience</Bold>.
  </>,
  'All work shown is real project work. No portfolio recreations.',
]

const researchComment: LightboxComment = {
  lead: 'Research & Pain Points:',
  text: 'Identified the most frequent customer questions and mapped them as pain points. Those insights became the foundation for a clearer information architecture across every touchpoint.',
}

const wireframesComment: LightboxComment = {
  lead: 'Wireframes & Reservation Hub:',
  text: 'Mapped the end-to-end experience through wireframes, bringing emails, SMS, and web into a single Reservation Hub. The new structure also created space for upgrades while organizing reservation, payment, and driver information into clear, collapsible sections.',
}

const aiAssistantComment: LightboxComment = {
  lead: 'AI Assistant:',
  text: 'Replaced the traditional help center with an AI-powered assistant capable of answering questions in natural language, reducing friction before customers needed to contact support.',
}

export default function RentalModernizationCaseStudyPage() {
  return (
    <CaseStudyPageShell
      title={title}
      industry={industry}
      year={year}
      roles={roles}
      tools="Figma · Miro"
      overviewParagraphs={overviewParagraphs}
      isProtected={isProtected}
    >
      {(openLightbox) => (
        <div className="flex flex-col gap-8 pt-[34px] md:pt-0">
          <FadeUp delay={0.1}>
            <CaseImage
              src="/images/case-study/rental-modernization/rental-modernization-cover.webp"
              alt="Rental modernization case study cover"
              width={1930}
              height={1448}
              onOpen={openLightbox}
            />
          </FadeUp>

          <div className="flex flex-col gap-4">
            <FadeUp>
              <Comment lead={researchComment.lead}>{researchComment.text}</Comment>
            </FadeUp>
            <FadeUp delay={0.08}>
              <CaseImage
                src="/images/case-study/rental-modernization/rental-modernization-analysis.webp"
                alt="Research analysis mapping customer questions to pain points"
                width={1930}
                height={1296}
                comment={researchComment}
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
                src="/images/case-study/rental-modernization/rental-modernization-wireframes.webp"
                alt="Wireframes of the unified Reservation Hub combining emails, SMS, and web"
                width={1930}
                height={4325}
                comment={wireframesComment}
                onOpen={openLightbox}
              />
            </FadeUp>
          </div>

          <div className="flex flex-col gap-4">
            <FadeUp>
              <Comment lead={aiAssistantComment.lead}>{aiAssistantComment.text}</Comment>
            </FadeUp>
            <FadeUp delay={0.08}>
              <CaseImage
                src="/images/case-study/rental-modernization/rental-modernization-chat-bot.webp"
                alt="AI-powered chat assistant answering customer questions"
                width={1930}
                height={1387}
                comment={aiAssistantComment}
                onOpen={openLightbox}
              />
            </FadeUp>
          </div>

          <FadeUp>
            <MoreWork currentSlug="rental-modernization" />
          </FadeUp>
        </div>
      )}
    </CaseStudyPageShell>
  )
}
