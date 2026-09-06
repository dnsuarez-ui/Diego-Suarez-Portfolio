'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import FadeUp from '@/components/ui/FadeUp'
import CaseStudyCard from '@/components/ui/CaseStudyCard'
import ProtectedWork from '@/components/ProtectedWork'
import { hasValidAccess } from '@/lib/protectedWorkAccess'
import { caseStudies as allCaseStudies } from '@/lib/caseStudies'

const publicCaseStudies = allCaseStudies.filter((cs) => !cs.isProtected)
const protectedCaseStudies = allCaseStudies.filter((cs) => cs.isProtected)

export default function Work() {
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
            {publicCaseStudies.map((cs, i) => (
              <FadeUp key={cs.slug} delay={0.1 + i * 0.08}>
                <CaseStudyCard
                  number={cs.number}
                  title={cs.title}
                  subtitle={`${cs.industry} · ${cs.year}`}
                  thumbnail={cs.thumbnail}
                  href={`/case-study/${cs.slug}`}
                  tags={cs.roles}
                />
              </FadeUp>
            ))}

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
                  className="overflow-hidden flex flex-col gap-8"
                >
                  {protectedCaseStudies.map((cs, i) => (
                    <motion.div
                      key={cs.slug}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 + i * 0.08 }}
                    >
                      <CaseStudyCard
                        number={cs.number}
                        title={cs.title}
                        subtitle={`${cs.industry} · ${cs.year}`}
                        thumbnail={cs.thumbnail}
                        href={`/case-study/${cs.slug}`}
                        tags={cs.roles}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
