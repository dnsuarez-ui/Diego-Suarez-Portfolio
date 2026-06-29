'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import Tag from '@/components/ui/Tag'
import FadeUp from '@/components/ui/FadeUp'
import Icon from '@/components/ui/Icon'
import { usePageTransition } from '@/components/providers/PageTransition'

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
  {
    number: '02',
    title: '[Case Study Title]',
    industry: '[Industry Type]',
    year: '[Year]',
    tags: ['Complex Systems', 'B2B SaaS', 'Prototyping'],
    href: '#',
    thumbnail: null,
  },
]

function ImagePlaceholderIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  )
}

export default function Work() {
  const [password, setPassword] = useState('')
  const { navigate } = usePageTransition()

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
                      {cs.thumbnail ? (
                        <Image
                          src={cs.thumbnail}
                          alt={cs.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 203px"
                          className="object-cover"
                        />
                      ) : (
                        <ImagePlaceholderIcon />
                      )}
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
              <div className="bg-surface border border-border-dark py-6 pl-2 pr-10">
                <div className="flex flex-wrap items-start gap-stack-md max-md:justify-center">
                  <div className="flex items-start gap-4 min-w-0 flex-[1_1_min(100%,320px)] max-md:flex-col">
                    <Icon name="lock" className="h-4 w-4 shrink-0 text-light-gray" />
                    <div className="flex flex-col gap-4 min-w-0">
                      <span className="font-sans font-normal text-caption uppercase text-light-gray">
                        Protected work
                      </span>
                      <h3 className="font-sans font-semibold text-headline text-off-white">
                        Some projects deserve a different conversation.
                      </h3>
                      <p className="font-sans font-normal text-body3 text-off-white max-w-md">
                        Recent projects are available to potential clients and hiring teams. Access
                        details are included in my resume, or simply get in touch.
                      </p>
                    </div>
                  </div>

                  <div className="w-[2px] self-stretch bg-border-dark max-md:hidden" />

                  <div className="flex flex-col items-center justify-center gap-3 min-w-0 flex-[0_1_min(100%,241px)] self-center">
                    <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-1 w-full max-w-[241px]">
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex-1 min-w-0 h-[clamp(36px,4vw,41px)] bg-surface border border-light-gray text-off-white font-sans font-normal text-body3 px-3 placeholder:text-light-gray focus:outline-none focus:border-accent transition-colors duration-200"
                        aria-label="NDA password"
                      />
                      <button
                        type="submit"
                        className="shrink-0 h-[clamp(36px,4vw,41px)] bg-accent text-pure-black font-sans font-normal text-body3 px-4 hover:opacity-90 transition-opacity duration-200"
                      >
                        Unlock
                      </button>
                    </form>
                    <p className="flex flex-wrap items-center justify-center gap-2 font-sans font-normal text-body3 text-off-white">
                      <span>Need access?</span>
                      <a
                        href="#contact"
                        className="border-b border-border-dark hover:border-accent transition-colors duration-200"
                      >
                        Contact me.
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
