'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import Tag from '@/components/ui/Tag'
import FadeUp from '@/components/ui/FadeUp'
import Icon from '@/components/ui/Icon'
import CaseStudyCard from '@/components/ui/CaseStudyCard'
import ProtectedWork from '@/components/ProtectedWork'
import { usePageTransition } from '@/components/providers/PageTransition'
import { hasValidAccess } from '@/lib/protectedWorkAccess'

const rentalModernizationCard = {
  number: '02',
  title: 'A money-leaking problem',
  subtitle: 'Travel · Car Rental · B2C · 2025',
  thumbnail: '/images/case-study/rental-modernization/rental-modernization-thumb.webp',
  href: '/case-study/rental-modernization',
  tags: ['UX/UI Design', 'Information Architecture', 'Communication Strategy'],
}

const caseStudies = [
  {
    number: '01',
    title: 'Serveo',
    industry: 'Hospitality Technology · Food & Beverage · SaaS',
    year: '2025',
    tags: ['Product Strategy', 'Branding', 'UX/UI Design'],
    href: '/case-study/serveo',
    thumbnail: '/images/case-study/serveo/serveo-thumb.webp',
  },
]

export default function Work() {
  const { navigate } = usePageTransition()
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    if (hasValidAccess()) {
      setUnlocked(true)
    }
  }, [])

  return (
    <section id="work">
      <div className="max-w-[1440px] mx-auto px-section-x py-section-y">
        <FadeUp>
          <SectionLabel className="mb-12">Craft-obsessed / Curiosity-driven</SectionLabel>
        </FadeUp>

        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <FadeUp>
              <h2 className="font-sans font-bold text-section-title text-off-white">
                Crafted, tested, improved.
              </h2>
            </FadeUp>
            <FadeUp delay={0.05}>
              <p className="font-sans font-normal text-body2 text-off-white max-w-2xl">
                Products used by real people. Crafted through systems thinking, collaboration and
                iteration.
              </p>
            </FadeUp>
          </div>

          <div className="flex flex-col gap-8">
            {caseStudies.map((cs, i) => {
              const rowClassName =
                'group flex flex-wrap items-start gap-4 py-6 px-2 cursor-pointer hover:bg-surface transition-colors duration-200 max-md:flex-col'

              const rowContent = (
                <>
                  <span className="flex w-4 shrink-0 items-center justify-center font-sans font-medium text-caption uppercase text-light-gray">
                    {cs.number}
                  </span>

                  <div className="flex flex-wrap items-center gap-stack-md flex-1 min-w-0">
                    <div className="relative aspect-video bg-surface border border-border-dark flex-[0_1_min(100%,203px)] max-md:flex-[1_1_100%] flex items-center justify-center text-light-gray overflow-hidden">
                      <Image
                        src={cs.thumbnail}
                        alt={cs.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 203px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-center gap-4 min-w-0 flex-[1_1_min(100%,200px)]">
                      <h3 className="font-sans font-bold text-body1 text-off-white">
                        {cs.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-normal text-body2 text-light-gray">
                          {cs.industry}
                        </span>
                        <span className="w-1 h-1 rounded-none bg-light-gray" />
                        <span className="font-sans font-normal text-body2 text-light-gray">
                          {cs.year}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-3 ml-auto max-md:justify-start max-md:ml-0">
                      {cs.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                    </div>
                  </div>

                  <span className="flex items-center justify-center w-8 h-8 shrink-0 font-sans text-headline text-off-white group-hover:text-accent transition-colors duration-200 max-md:hidden">
                    <Icon name="arrow-up-right" className="h-[1em] w-[1em]" />
                  </span>
                </>
              )

              return (
                <FadeUp key={cs.number} delay={0.1 + i * 0.08}>
                  {cs.href !== '#' ? (
                    <Link
                      href={cs.href}
                      onClick={(e) => {
                        e.preventDefault()
                        sessionStorage.setItem('homeScrollPosition', String(window.scrollY))
                        navigate(cs.href)
                      }}
                      data-clickable="true"
                      className={rowClassName}
                    >
                      {rowContent}
                    </Link>
                  ) : (
                    <div data-clickable="true" className={rowClassName}>
                      {rowContent}
                    </div>
                  )}
                </FadeUp>
              )
            })}

            {/* NDA block */}
            <FadeUp delay={0.2}>
              <ProtectedWork
                unlocked={unlocked}
                onUnlock={() => setUnlocked(true)}
                onLock={() => setUnlocked(false)}
              />
            </FadeUp>

            <AnimatePresence initial={false}>
              {unlocked && (
                <motion.div
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
                  >
                    <CaseStudyCard {...rentalModernizationCard} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
