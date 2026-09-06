'use client'

import { useEffect, useLayoutEffect, useState, type MouseEvent, type ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import CaseStudyLayout from '@/components/layouts/CaseStudyLayout'
import {
  useExitFade,
  usePageTransition,
  EXIT_TRANSITION,
  ENTER_TRANSITION,
  CASE_STUDY_EXIT_TRANSITION,
} from '@/components/providers/PageTransition'
import Lightbox, { type LightboxImage } from '@/components/ui/Lightbox'
import Icon from '@/components/ui/Icon'
import { useProtectedCaseStudyGuard } from '@/lib/useProtectedCaseStudyGuard'

const CONTACT_EMAIL = 'dnsuarez@gmail.com'

export interface CaseStudyPageShellProps {
  title: string
  industry: string
  year: string
  roles: string[]
  overviewParagraphs: ReactNode[]
  tools: string
  /** Whether this case study requires a valid protectedWorkAccess grant to view. */
  isProtected: boolean
  children: (openLightbox: (image: LightboxImage) => void) => ReactNode
}

export default function CaseStudyPageShell({
  title,
  industry,
  year,
  roles,
  overviewParagraphs,
  tools,
  isProtected,
  children,
}: CaseStudyPageShellProps) {
  const [copied, setCopied] = useState(false)
  const [entered, setEntered] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null)
  const isExiting = useExitFade()
  const { navigate, exitVariant } = usePageTransition()
  const allowed = useProtectedCaseStudyGuard(isProtected)

  useLayoutEffect(() => {
    // { scroll: false } on router.push means the incoming page inherits the
    // previous page's scroll position — reset it here so every case study
    // (current and future, via this shared shell) always opens at the top.
    // Must be the *actual content's* commit, not just this component's first
    // mount: protected case studies render null until `allowed` flips true,
    // so this depends on `allowed` rather than running once with `[]`.
    // behavior must be 'instant', not 'auto' — 'auto' defers to the CSS
    // `scroll-behavior: smooth` on <html> (globals.css) and animates the
    // correction instead of jumping, which is the bug this effect exists to
    // prevent. Only 'instant' bypasses that CSS property.
    if (!allowed) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [allowed])

  useEffect(() => {
    setEntered(true)
  }, [])

  if (!allowed) {
    return null
  }

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(CONTACT_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  const handleBackClick = (e: MouseEvent) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? [1, 0, 0] : entered ? 1 : 0 }}
      transition={
        isExiting
          ? exitVariant === 'case-study'
            ? CASE_STUDY_EXIT_TRANSITION
            : EXIT_TRANSITION
          : ENTER_TRANSITION
      }
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
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 font-sans text-body3 text-pure-black">
                <span>{industry}</span>
                <span className="h-1 w-1 shrink-0 bg-pure-black" />
                <span>{year}</span>
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
                {overviewParagraphs.map((paragraph, index) => (
                  <p key={index} className="font-sans text-body3 text-pure-black">
                    {paragraph}
                  </p>
                ))}
              </div>
              <p className="font-sans text-body3 text-pure-black">
                <span className="font-bold">Tools: </span>
                {tools}
              </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
              <div className="flex items-center gap-1">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group relative inline-block font-sans font-semibold text-body2 text-pure-black pb-1"
                >
                  {CONTACT_EMAIL}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent-orange group-hover:w-full group-hover:transition-[width] group-hover:duration-300 group-hover:ease-out" />
                </a>

                <div className="group/copy relative">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="flex h-6 w-6 items-center justify-center text-light-gray transition-colors duration-200 hover:text-pure-black"
                  >
                    <Icon name="copy" className="h-3.5 w-3.5" />
                  </button>
                  <span
                    role="tooltip"
                    className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap border border-border-light bg-cs-bg px-2 py-1 font-sans text-caption uppercase transition-opacity duration-200 ${
                      copied ? 'opacity-100 text-accent-orange' : 'opacity-0 group-hover/copy:opacity-100 text-light-gray'
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
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent-orange group-hover:w-full group-hover:transition-[width] group-hover:duration-300 group-hover:ease-out" />
                </span>
                <span>
                  <Icon name="arrow-up-right" className="h-[1em] w-[1em]" />
                </span>
              </a>
            </div>
          </motion.div>
        }
      >
        {children(setLightboxImage)}
      </CaseStudyLayout>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </motion.div>
  )
}
