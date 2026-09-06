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

const { title, industry, year, roles, isProtected } = getCaseStudy('rental-modernization-2')

const overviewParagraphs: ReactNode[] = [
  <>
    I joined to <Bold>improve the booking experience</Bold> and{' '}
    <Bold>increase conversion</Bold> across the platform. I dug into user feedback, mapped the
    existing flows, and worked closely with different teams to understand what was really
    happening behind the numbers, where the experience felt{' '}
    <Bold>heavy, outdated, and inconsistent</Bold> between mobile and desktop.
  </>,
  <>
    I shipped many improvements throughout the project. These are three of the most impactful:
    making <Bold>filters actually usable</Bold>, adding a <Bold>stepper</Bold> that gives clarity
    to the buying flow, and building a <Bold>consistent visual system</Bold> for promotions.
  </>,
]

const filterExperienceComment: LightboxComment = {
  text: 'The filter experience was completely different on desktop and mobile, inconsistent layout, inconsistent behavior. First step was unifying both platforms into a single coherent system. The existing design also gave users no visibility into what was actively selected, so I redesigned the interaction to make filter state always clear.',
}

const filterInterdependencyComment: LightboxComment = {
  text: 'One of the main challenges was filter interdependency, understanding which options should disable when others are selected. For example, selecting a sports car should automatically disable ‘Luggage 9+’ since it’s physically impossible. This required rethinking the entire filter logic from scratch.',
}

const stepperFrictionComment: LightboxComment = {
  text: 'The desktop app had no clear stepper in the booking flow. Users couldn’t go back or edit previous steps without restarting the entire process. I took on reducing that friction by designing a modern stepper that gives users full control over their progress.',
}

const stepperDetailComment: LightboxComment = {
  text: 'I mapped every step in the flow and designed a stepper that shows what was selected in each previous stage, with the ability to go back and edit without losing progress. It also displays a live price breakdown that updates as extras, promotions, and payment methods are added, so users always know where they are, what they did, and what comes next.',
}

const promotionsComment: LightboxComment = {
  text: 'The promotions page had high traffic but low conversion, cluttered with text, inconsistent banners, and no visual hierarchy to guide the user’s eye. I standardized formats by promotion type, built reusable templates so marketing could operate independently, and restructured the content to prioritize the information that drives action. Less noise, stronger calls to action, and a scannable layout that actually converts.',
}

export default function RentalModernization2CaseStudyPage() {
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
          <div className="flex flex-col gap-8">
            <FadeUp>
              <h2 className="font-sans font-bold text-headline text-pure-black">
                Filters that actually work
              </h2>
            </FadeUp>
            <div className="flex flex-col gap-4">
              <FadeUp delay={0.08}>
                <Comment>{filterExperienceComment.text}</Comment>
              </FadeUp>
              <FadeUp delay={0.16}>
                <CaseImage
                  src="/images/case-study/rental-modernization-2/rental-modernization-2-filter-header.webp"
                  alt="Unified filter header design bringing desktop and mobile into a single system"
                  width={1930}
                  height={725}
                  comment={filterExperienceComment}
                  onOpen={openLightbox}
                />
              </FadeUp>
            </div>
            <div className="flex flex-col gap-4">
              <FadeUp delay={0.24}>
                <Comment>{filterInterdependencyComment.text}</Comment>
              </FadeUp>
              <FadeUp delay={0.32}>
                <CaseImage
                  src="/images/case-study/rental-modernization-2/rental-modernization-2-filter.webp"
                  alt="Filter interdependency logic showing options that disable one another"
                  width={1930}
                  height={1413}
                  comment={filterInterdependencyComment}
                  onOpen={openLightbox}
                />
              </FadeUp>
            </div>
          </div>

          <div className="h-px w-full bg-border-light" />

          <div className="flex flex-col gap-8">
            <FadeUp>
              <h2 className="font-sans font-bold text-headline text-pure-black">
                A clear path to checkout.
              </h2>
            </FadeUp>
            <div className="flex flex-col gap-4">
              <FadeUp delay={0.08}>
                <Comment>{stepperFrictionComment.text}</Comment>
              </FadeUp>
              <FadeUp delay={0.16}>
                <CaseImage
                  src="/images/case-study/rental-modernization-2/rental-modernization-2-steps-header.webp"
                  alt="Booking flow stepper header giving users control over their progress"
                  width={1930}
                  height={800}
                  comment={stepperFrictionComment}
                  onOpen={openLightbox}
                />
              </FadeUp>
            </div>
            <div className="flex flex-col gap-4">
              <FadeUp delay={0.24}>
                <Comment>{stepperDetailComment.text}</Comment>
              </FadeUp>
              <FadeUp delay={0.32}>
                <CaseImage
                  src="/images/case-study/rental-modernization-2/rental-modernization-2-steps.webp"
                  alt="Stepper detail showing editable steps and a live price breakdown"
                  width={1930}
                  height={1363}
                  comment={stepperDetailComment}
                  onOpen={openLightbox}
                />
              </FadeUp>
            </div>
          </div>

          <div className="h-px w-full bg-border-light" />

          <div className="flex flex-col gap-8">
            <FadeUp>
              <h2 className="font-sans font-bold text-headline text-pure-black">
                Promotions that sell. Before → After
              </h2>
            </FadeUp>
            <div className="flex flex-col gap-4">
              <FadeUp delay={0.08}>
                <Comment>{promotionsComment.text}</Comment>
              </FadeUp>
              <FadeUp delay={0.16}>
                <CaseImage
                  src="/images/case-study/rental-modernization-2/rental-modernization-2-deals.webp"
                  alt="Before and after comparison of the redesigned promotions page"
                  width={1930}
                  height={2555}
                  comment={promotionsComment}
                  onOpen={openLightbox}
                />
              </FadeUp>
            </div>
          </div>

          <FadeUp>
            <MoreWork currentSlug="rental-modernization-2" />
          </FadeUp>
        </div>
      )}
    </CaseStudyPageShell>
  )
}
