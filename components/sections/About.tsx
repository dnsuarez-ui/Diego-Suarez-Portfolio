'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import FadeUp from '@/components/ui/FadeUp'

const jobs = [
  {
    period: '2019 — Present',
    company: 'Making Sense',
    role: 'Graphic & Web Designer → Product Designer',
    desc: 'From marketing, websites and visual communication to enterprise products, design systems and AI experiences.',
  },
  {
    period: '2009 — 2019',
    company: 'Mug, Visual Communication',
    role: 'Co-founder & Digital Designer',
    desc: 'Building brands, websites and long-term client relationships.',
  },
  {
    period: '2017 — 2019',
    company: 'Perfil View',
    role: 'Project & Brand Experience Coordinator',
    desc: 'Turning ideas into real-world experiences.',
  },
  {
    period: '2008 — 2016',
    company: 'FM Metro / FM Rock & Pop',
    role: 'Producer / Designer',
    desc: 'Creating experiences across radio, live events and digital media.',
  },
]

const bodyParagraphs = [
  "I started in graphic design and web long before product design became mainstream.",
  'That broader background taught me that craft matters, systems matter and clarity is something you build.',
  "Great products aren't just functional, they feel obvious.",
]

const logos = [
  { src: '/images/figma/logo-coca-cola.svg', alt: 'Coca-Cola', w: 78, h: 24 },
  { src: '/images/figma/logo-2.svg', alt: 'Red Bull', w: 100, h: 16 },
  { src: '/images/figma/logo-3.svg', alt: 'Client logo', w: 41, h: 22 },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef })
  const sidebarY = useTransform(scrollYProgress, [0, 1], [0, -24])

  return (
    <section id="about" ref={sectionRef}>
      <div className="max-w-[1440px] mx-auto px-section-x py-section-y">
        <FadeUp>
          <SectionLabel className="mb-12">From graphic design to product strategy</SectionLabel>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h2 className="font-sans font-bold text-section-title text-off-white mb-8">
            Every step shaped the next.
          </h2>
        </FadeUp>

        <div className="flex flex-wrap items-stretch gap-stack-md">
          {/* Timeline — grows to fill remaining space, like the original flex-1 */}
          <FadeUp delay={0.1} className="min-w-0 flex-[1_1_min(100%,480px)]">
            <div className="flex flex-col">
              {jobs.map((job) => (
                <div key={job.company}>
                  <div className="h-px bg-border" />
                  <div className="flex flex-col gap-2 py-6">
                    <span className="font-sans font-normal text-body3 text-off-white">
                      {job.period}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-sans font-semibold text-body2 text-off-white">
                        {job.company}
                      </span>
                      <span className="w-[2px] h-[2px] rounded-none bg-border max-md:hidden" />
                      <span className="font-sans font-normal text-body2 text-off-white max-w-md">
                        {job.role}
                      </span>
                    </div>
                    <p className="font-sans font-normal text-body3 text-off-white">{job.desc}</p>
                  </div>
                </div>
              ))}
              <div className="h-px bg-border" />
            </div>
          </FadeUp>

          {/* Sidebar — stays near its original 428px size on desktop, matching Figma */}
          <FadeUp delay={0.15} className="min-w-0 flex-[0_1_min(100%,428px)]">
            <motion.div
              style={{ y: sidebarY }}
              className="flex flex-col justify-between gap-8 border border-border bg-surface p-8"
            >
              <div className="flex flex-col gap-4">
                <h3 className="font-sans font-semibold text-headline text-off-white">
                  15+ years designing for humans.
                </h3>
                <div className="flex flex-col gap-4">
                  {bodyParagraphs.map((p) => (
                    <p key={p} className="font-sans font-normal text-body2 text-off-white">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="h-px bg-border" />
                <div className="flex flex-col gap-6">
                  <span className="font-sans font-normal text-body3 text-off-white">
                    Also worked with:
                  </span>
                  <div className="flex flex-wrap items-center justify-between gap-6">
                    {logos.map((logo) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={logo.src} src={logo.src} alt={logo.alt} width={logo.w} height={logo.h} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
