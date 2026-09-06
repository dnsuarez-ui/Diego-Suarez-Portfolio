'use client'

import { useEffect, useState } from 'react'
import CaseStudyCard from '@/components/ui/CaseStudyCard'
import ProtectedWork from '@/components/ProtectedWork'
import { useMoreWorkNavigation } from '@/components/providers/PageTransition'
import { hasValidAccess } from '@/lib/protectedWorkAccess'
import { caseStudies as allCaseStudies } from '@/lib/caseStudies'

interface MoreWorkProps {
  currentSlug: string
}

export default function MoreWork({ currentSlug }: MoreWorkProps) {
  const navigateToCaseStudy = useMoreWorkNavigation()
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    if (hasValidAccess()) {
      setUnlocked(true)
    }
  }, [])

  const otherCaseStudies = allCaseStudies.filter((cs) => cs.slug !== currentSlug)

  return (
    <div className="flex flex-col gap-4 bg-pure-black p-4 md:p-6">
      <h2 className="font-sans font-bold text-headline text-off-white">More work.</h2>

      {unlocked ? (
        <div className="flex flex-col gap-4">
          {otherCaseStudies.map((cs) => (
            <CaseStudyCard
              key={cs.slug}
              number={cs.number}
              title={cs.title}
              subtitle={`${cs.industry} · ${cs.year}`}
              thumbnail={cs.thumbnail}
              href={`/case-study/${cs.slug}`}
              tags={cs.roles}
              onNavigate={navigateToCaseStudy}
            />
          ))}
        </div>
      ) : (
        <ProtectedWork
          unlocked={unlocked}
          onUnlock={() => setUnlocked(true)}
          onLock={() => setUnlocked(false)}
        />
      )}
    </div>
  )
}
