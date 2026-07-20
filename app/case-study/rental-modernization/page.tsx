'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import CaseStudyLayout from '@/components/layouts/CaseStudyLayout'
import { useExitFade, usePageTransition } from '@/components/providers/PageTransition'
import Lightbox, { type LightboxImage } from '@/components/ui/Lightbox'
import Icon from '@/components/ui/Icon'

const EXIT_TRANSITION = { duration: 0.8, times: [0, 0.625, 1], ease: ['easeIn', 'linear'] }
const ENTER_TRANSITION = { duration: 0.4, ease: 'easeOut' }

const roles = ['UX Design', 'Information Architecture']

function Bold({ children }: { children: ReactNode }) {
  return <span className="font-semibold">{children}</span>
}

function CopyIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="0" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CaseImage({
  src,
  alt,
  width,
  height,
  onOpen,
}: {
  src: string
  alt: string
  width: number
  height: number
  onOpen: (image: LightboxImage) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen({ src, alt, width, height })}
      className="block w-full p-0 text-left"
    >
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
    </button>
  )
}

function Comment({ lead, children }: { lead?: string; children: ReactNode }) {
  return (
    <div className="flex justify-center px-6">
      <div className="inline-flex max-w-full items-center gap-3 rounded-[24px_24px_24px_0px] border border-border-light bg-cs-bg p-4 shadow-md">
        <Image
          src="/images/profile-picture.webp"
          alt="Diego Suarez"
          width={96}
          height={96}
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
        <p className="font-sans text-body3 text-pure-black">
          {lead && <span className="font-semibold">{lead} </span>}
          {children}
        </p>
      </div>
    </div>
  )
}

export default function RentalModernizationCaseStudyPage() {
  const [copied, setCopied] = useState(false)
  const [entered, setEntered] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null)
  const isExiting = useExitFade()
  const { navigate } = usePageTransition()

  useEffect(() => {
    setEntered(true)
  }, [])

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText('dnsuarez@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? [1, 0, 0] : entered ? 1 : 0 }}
      transition={isExiting ? EXIT_TRANSITION : ENTER_TRANSITION}
      className={`md:h-screen md:overflow-hidden transition-colors duration-[400ms] ease-out ${
        entered ? 'bg-cs-bg' : 'bg-pure-black'
      }`}
    >
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center bg-cs-bg px-6 py-4 md:h-20 md:py-0">
        <Link href="/" onClick={handleBackClick} className="flex items-center gap-2 font-sans text-body1">
          <Icon name="arrow-left" className="h-[1em] w-[1em] text-pure-black" />
          <span className="font-bold text-pure-black">Diego Suarez</span>
          <span className="text-border-dark">/</span>
          <span className="text-light-gray">Digital Product Design</span>
        </Link>
      </header>

      <CaseStudyLayout
        sidebar={
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col gap-8 pt-[34px] md:pt-0"
          >
            <div className="flex flex-col gap-4">
              <h1 className="font-sans font-bold text-section-title tracking-[-0.02em] text-pure-black">
                A money-leaking problem
              </h1>

              <div className="flex flex-wrap items-center gap-2 font-sans text-body3 text-pure-black">
                <span>Travel · Car Rental · B2C</span>
                <span className="h-1 w-1 shrink-0 bg-pure-black" />
                <span>2025</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 font-sans text-body3 text-pure-black">
                <span className="font-bold">Role:</span>
                <div className="flex flex-wrap gap-4">
                  {roles.map((role) => (
                    <span
                      key={role}
                      className="border border-pure-black px-2 py-1 font-sans text-caption uppercase text-pure-black"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-sans font-bold text-headline text-pure-black">Overview</h2>
              <div className="flex flex-col gap-4">
                <p className="font-sans text-body3 text-pure-black">
                  I joined the <Bold>Product and Engineering teams</Bold> to redesign a fragmented
                  customer journey for <Bold>one of the world&rsquo;s largest car rental companies</Bold>.
                  Critical information was difficult to find, leaving customers without answers when
                  they needed them most.
                </p>
                <p className="font-sans text-body3 text-pure-black">
                  The result was <Bold>thousands of avoidable support calls every day</Bold>. Simple
                  questions like &ldquo;Where&rsquo;s my reservation number?&rdquo; or &ldquo;Where do
                  I catch the shuttle?&rdquo; overwhelmed the contact center because information was
                  scattered across multiple touchpoints.
                </p>
                <p className="font-sans text-body3 text-pure-black">
                  Instead of redesigning a screen,{' '}
                  <Bold>I redesigned how information flows across the customer journey</Bold>. A
                  mobile-first strategy combined simplified emails, SMS reminders, a unified
                  reservation hub, and an AI assistant to deliver the right information at the right
                  time through a <Bold>consistent brand experience</Bold>.
                </p>
                <p className="font-sans text-body3 text-pure-black">
                  All work shown is real project work. No portfolio recreations.
                </p>
              </div>
              <p className="font-sans text-body3 text-pure-black">
                <span className="font-bold">Tools: </span>
                Figma · Miro
              </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
              <div className="flex items-center gap-1">
                <a
                  href="mailto:dnsuarez@gmail.com"
                  className="group relative inline-block font-sans font-semibold text-body2 text-pure-black pb-1"
                >
                  dnsuarez@gmail.com
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent group-hover:w-full group-hover:transition-[width] group-hover:duration-300 group-hover:ease-out" />
                </a>

                <div className="group/copy relative">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="flex h-6 w-6 items-center justify-center text-light-gray transition-colors duration-200 hover:text-pure-black"
                  >
                    <CopyIcon />
                  </button>
                  <span
                    role="tooltip"
                    className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap border border-border-light bg-cs-bg px-2 py-1 font-sans text-caption uppercase transition-opacity duration-200 ${
                      copied ? 'opacity-100 text-accent' : 'opacity-0 group-hover/copy:opacity-100 text-light-gray'
                    }`}
                  >
                    {copied ? 'Copied!' : 'Copy email'}
                  </span>
                </div>
              </div>

              <a
                href="https://www.linkedin.com/in/dnsuarez/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-sans font-semibold text-body2 text-pure-black"
              >
                <span className="relative inline-block pb-1">
                  Linkedin
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent group-hover:w-full group-hover:transition-[width] group-hover:duration-300 group-hover:ease-out" />
                </span>
                <span>
                  <Icon name="arrow-up-right" className="h-[1em] w-[1em]" />
                </span>
              </a>
            </div>
          </motion.div>
        }
      >
        <div className="flex flex-col gap-8 pt-[34px] md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            <CaseImage
              src="/images/case-study/rental-modernization/rental-modernization-cover.webp"
              alt="Rental modernization case study cover"
              width={1930}
              height={1448}
              onOpen={setLightboxImage}
            />
          </motion.div>

          <div className="flex flex-col gap-4">
            <Comment lead="Research & Pain Points:">
              Identified the most frequent customer questions and mapped them as pain points. Those
              insights became the foundation for a clearer information architecture across every
              touchpoint.
            </Comment>
            <CaseImage
              src="/images/case-study/rental-modernization/rental-modernization-analysis.webp"
              alt="Research analysis mapping customer questions to pain points"
              width={1930}
              height={1296}
              onOpen={setLightboxImage}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Comment lead="Wireframes & Reservation Hub:">
              Mapped the end-to-end experience through wireframes, bringing emails, SMS, and web into
              a single Reservation Hub. The new structure also created space for upgrades while
              organizing reservation, payment, and driver information into clear, collapsible
              sections.
            </Comment>
            <CaseImage
              src="/images/case-study/rental-modernization/rental-modernization-wireframes.webp"
              alt="Wireframes of the unified Reservation Hub combining emails, SMS, and web"
              width={1930}
              height={4325}
              onOpen={setLightboxImage}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Comment lead="AI Assistant:">
              Replaced the traditional help center with an AI-powered assistant capable of answering
              questions in natural language, reducing friction before customers needed to contact
              support.
            </Comment>
            <CaseImage
              src="/images/case-study/rental-modernization/rental-modernization-chat-bot.webp"
              alt="AI-powered chat assistant answering customer questions"
              width={1930}
              height={1387}
              onOpen={setLightboxImage}
            />
          </div>
        </div>
      </CaseStudyLayout>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </motion.div>
  )
}
