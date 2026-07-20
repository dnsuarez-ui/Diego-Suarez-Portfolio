'use client'

import Image from 'next/image'
import Link from 'next/link'
import Tag from '@/components/ui/Tag'
import Icon from '@/components/ui/Icon'
import { useCaseStudyNavigation } from '@/components/providers/PageTransition'

interface CaseStudyCardProps {
  number: string
  title: string
  subtitle: string
  thumbnail: string
  href: string
  tags: string[]
}

export default function CaseStudyCard({
  number,
  title,
  subtitle,
  thumbnail,
  href,
  tags,
}: CaseStudyCardProps) {
  const navigateToCaseStudy = useCaseStudyNavigation()

  return (
    <Link
      href={href}
      onClick={(e) => navigateToCaseStudy(e, href)}
      data-clickable="true"
      className="group flex flex-wrap items-start gap-4 py-6 px-2 cursor-pointer hover:bg-surface transition-colors duration-200 max-md:flex-col"
    >
      <span className="flex w-4 shrink-0 items-center justify-center font-sans font-medium text-caption uppercase text-light-gray">
        {number}
      </span>

      <div className="flex flex-wrap items-center gap-stack-md flex-1 min-w-0">
        <div className="relative aspect-video flex-[0_1_min(100%,203px)] max-md:flex-[1_1_100%] overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 203px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center gap-4 min-w-0 flex-[1_1_min(100%,200px)]">
          <h3 className="font-sans font-bold text-body1 text-off-white">{title}</h3>
          <span className="font-sans font-normal text-body2 text-light-gray">{subtitle}</span>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 ml-auto max-md:justify-start max-md:ml-0">
          {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </div>

      <span className="flex items-center justify-center w-8 h-8 shrink-0 font-sans text-headline text-off-white group-hover:text-accent transition-colors duration-200 max-md:hidden">
        <Icon name="arrow-up-right" className="h-[1em] w-[1em]" />
      </span>
    </Link>
  )
}
