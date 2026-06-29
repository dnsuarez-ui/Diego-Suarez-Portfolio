'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'
import Icon from '@/components/ui/Icon'

export interface LightboxImage {
  src: string
  alt: string
  width: number
  height: number
}

interface LightboxProps {
  image: LightboxImage | null
  onClose: () => void
}

interface LightboxComment {
  lead: string
  text: string
}

const OVERLAY_BG = 'color-mix(in srgb, var(--color-pure-black) 95%, transparent)'

const COMMENTS: Record<string, LightboxComment> = {
  '/images/case-study/serveo/serveo-brand-guidelines.webp': {
    lead: 'Branding:',
    text: 'Built a flexible identity designed to grow with the product. The brand was created alongside the platform so design and development could evolve together.',
  },
  '/images/case-study/serveo/serveo-roadmap.webp': {
    lead: 'Strategy & MVP:',
    text: 'Mapped the product vision, explored the business model, and prioritized the smallest set of features needed to validate the idea.',
  },
  '/images/case-study/serveo/serveo-flow.webp': {
    lead: 'Wireframes & Validation:',
    text: 'Used low-fidelity wireframes to explore workflows, validate assumptions, and align stakeholders around the product vision before investing in visual design and development.',
  },
  '/images/case-study/serveo/serveo-wireframes.webp': {
    lead: 'Wireframes & Validation:',
    text: 'Used low-fidelity wireframes to explore workflows, validate assumptions, and align stakeholders around the product vision before investing in visual design and development.',
  },
  '/images/case-study/serveo/serveo-login.webp': {
    lead: 'Final Product Design:',
    text: 'Designed the platform around Tailwind and shadcn/ui to accelerate MVP delivery without sacrificing usability or brand identity.',
  },
  '/images/case-study/serveo/serveo-dashboard.webp': {
    lead: 'Final Product Design:',
    text: 'Designed the platform around Tailwind and shadcn/ui to accelerate MVP delivery without sacrificing usability or brand identity.',
  },
  '/images/case-study/serveo/serveo-preview.webp': {
    lead: 'Final Product Design:',
    text: 'Designed the platform around Tailwind and shadcn/ui to accelerate MVP delivery without sacrificing usability or brand identity.',
  },
}

export default function Lightbox({ image, onClose }: LightboxProps) {
  useEffect(() => {
    if (!image) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [image, onClose])

  const comment = image ? COMMENTS[image.src] : undefined

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ backgroundColor: OVERLAY_BG }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } }}
            exit={{ opacity: 0, scale: 1, transition: { duration: 0.2, ease: 'easeIn' } }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-w-[90vw] flex-col gap-2 bg-cs-bg p-6"
          >
            <div className="flex w-full justify-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center text-pure-black"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            {comment && (
              <div className="flex justify-center">
                <div className="mx-8 inline-flex max-w-full items-center gap-3 rounded-[24px_24px_24px_0px] border border-border-light bg-cs-bg p-4 shadow-md">
                  <Image
                    src="/images/profile-picture.webp"
                    alt="Diego Suarez"
                    width={96}
                    height={96}
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                  />
                  <p className="font-sans text-body3 text-pure-black">
                    <span className="font-semibold">{comment.lead} </span>
                    {comment.text}
                  </p>
                </div>
              </div>
            )}

            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
