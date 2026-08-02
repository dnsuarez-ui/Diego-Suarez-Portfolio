'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
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
  '/images/case-study/rental-modernization/rental-modernization-analysis.webp': {
    lead: 'Research & Pain Points:',
    text: 'Identified the most frequent customer questions and mapped them as pain points. Those insights became the foundation for a clearer information architecture across every touchpoint.',
  },
  '/images/case-study/rental-modernization/rental-modernization-wireframes.webp': {
    lead: 'Wireframes & Reservation Hub:',
    text: 'Mapped the end-to-end experience through wireframes, bringing emails, SMS, and web into a single Reservation Hub. The new structure also created space for upgrades while organizing reservation, payment, and driver information into clear, collapsible sections.',
  },
  '/images/case-study/rental-modernization/rental-modernization-chat-bot.webp': {
    lead: 'AI Assistant:',
    text: 'Replaced the traditional help center with an AI-powered assistant capable of answering questions in natural language, reducing friction before customers needed to contact support.',
  },
}

// zoom is a multiplier of the fit-to-width scale, not an absolute image
// scale: 1 = fit-to-width (the minimum), 3 = 3x fit-to-width (the maximum).
const MAX_ZOOM = 3
const MIN_ZOOM = 1
const ZOOM_SPEED = 1.1

const getHDImageSrc = (src: string) => src.replace('.webp', '-hd.webp')

export default function Lightbox({ image, onClose }: LightboxProps) {
  const [zoom, setZoom] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [isHDLoaded, setIsHDLoaded] = useState(false)
  const [isDraggingSlider, setIsDraggingSlider] = useState(false)

  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const sliderTrackRef = useRef<HTMLDivElement>(null)
  const lastTouchDistanceRef = useRef(0)
  const initialZoomRef = useRef(1)
  const initialPanRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!image) {
      setIsHDLoaded(false)
      return
    }

    setIsHDLoaded(false)
    const hdImage = new window.Image()
    hdImage.src = getHDImageSrc(image.src)
    hdImage.onload = () => setIsHDLoaded(true)

    return () => {
      hdImage.onload = null
    }
  }, [image])

  useEffect(() => {
    if (image) {
      resetZoom()
    }
  }, [image?.src])

  useEffect(() => {
    if (!image) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resetZoom()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [image, onClose])

  const resetZoom = () => {
    setZoom(1)
    setPanX(0)
    setPanY(0)
  }

  // The wrapper is always rendered at exactly fit-to-width (see the `w-full`
  // class below), scaled from its top-center via transformOrigin. So its
  // un-transformed offsetWidth/offsetHeight (transforms don't affect these)
  // is the fit-to-width box — measuring it directly, rather than assuming it
  // matches the container, keeps this correct for every aspect ratio.
  const clampPan = (x: number, y: number, currentZoom: number): { x: number; y: number } => {
    if (!imageContainerRef.current || !imageWrapperRef.current) return { x, y }

    const containerWidth = imageContainerRef.current.offsetWidth
    const containerHeight = imageContainerRef.current.offsetHeight
    const scaledWidth = imageWrapperRef.current.offsetWidth * currentZoom
    const scaledHeight = imageWrapperRef.current.offsetHeight * currentZoom

    // Horizontal: scales from center, so it can overflow evenly on both sides.
    const maxPanX = Math.max(0, (scaledWidth - containerWidth) / 2)
    // Vertical: scales from the top edge, which never moves — the box can
    // only grow downward, so panning only ever reveals content below,
    // never above (that would break the top-anchor at rest).
    const maxPanYDown = Math.max(0, scaledHeight - containerHeight)

    return {
      x: Math.max(-maxPanX, Math.min(maxPanX, x)),
      y: Math.max(-maxPanYDown, Math.min(0, y)),
    }
  }

  // Whether the image currently overflows the board in either direction —
  // true even at the minimum (fit-to-width) zoom for a tall image, since
  // that's exactly the case that needs to be pannable to reach its bottom.
  const canPan = (): boolean => {
    if (!imageContainerRef.current || !imageWrapperRef.current) return false
    const containerWidth = imageContainerRef.current.offsetWidth
    const containerHeight = imageContainerRef.current.offsetHeight
    const scaledWidth = imageWrapperRef.current.offsetWidth * zoom
    const scaledHeight = imageWrapperRef.current.offsetHeight * zoom
    return scaledWidth > containerWidth + 1 || scaledHeight > containerHeight + 1
  }

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isMobile) return
    e.preventDefault()

    const direction = e.deltaY > 0 ? 1 / ZOOM_SPEED : ZOOM_SPEED
    setZoom((prev) => {
      const next = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev * direction))
      const clamped = clampPan(panX, panY, next)
      setPanX(clamped.x)
      setPanY(clamped.y)
      return next
    })
  }

  const setZoomFromRatio = (ratio: number) => {
    const clampedRatio = Math.max(0, Math.min(1, ratio))
    const newZoom = MIN_ZOOM + clampedRatio * (MAX_ZOOM - MIN_ZOOM)
    setZoom(newZoom)
    const clamped = clampPan(panX, panY, newZoom)
    setPanX(clamped.x)
    setPanY(clamped.y)
  }

  const updateZoomFromPointer = (clientX: number) => {
    if (!sliderTrackRef.current) return
    const rect = sliderTrackRef.current.getBoundingClientRect()
    const ratio = (clientX - rect.left) / rect.width
    setZoomFromRatio(ratio)
  }

  const handleSliderPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsDraggingSlider(true)
    updateZoomFromPointer(e.clientX)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handleSliderPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingSlider) return
    updateZoomFromPointer(e.clientX)
  }

  const handleSliderPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDraggingSlider(false)
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canPan()) return
    setIsDragging(true)
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const newPanX = e.clientX - dragStart.x
    const newPanY = e.clientY - dragStart.y
    const clamped = clampPan(newPanX, newPanY, zoom)
    setPanX(clamped.x)
    setPanY(clamped.y)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      )
      lastTouchDistanceRef.current = distance
      initialZoomRef.current = zoom
      initialPanRef.current = { x: panX, y: panY }
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      )

      if (lastTouchDistanceRef.current > 0) {
        const ratio = distance / lastTouchDistanceRef.current
        const newZoom = Math.max(
          MIN_ZOOM,
          Math.min(MAX_ZOOM, initialZoomRef.current * ratio)
        )
        setZoom(newZoom)
        const clamped = clampPan(panX, panY, newZoom)
        setPanX(clamped.x)
        setPanY(clamped.y)
      }
    } else if (e.touches.length === 1 && canPan()) {
      const touch = e.touches[0]
      const newPanX = initialPanRef.current.x + (touch.clientX - e.touches[0].clientX)
      const newPanY = initialPanRef.current.y + (touch.clientY - e.touches[0].clientY)
      const clamped = clampPan(newPanX, newPanY, zoom)
      setPanX(clamped.x)
      setPanY(clamped.y)
    }
  }

  const handleTouchEnd = () => {
    lastTouchDistanceRef.current = 0
  }

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
            className="flex max-w-[90vw] max-h-[90vh] flex-col gap-4 bg-cs-bg p-6"
          >
            <div className="flex items-start gap-4">
              <div className="min-w-0 flex-1">
                {comment && (
                  <div className="inline-flex max-w-full items-center gap-3 rounded-[24px_24px_24px_0px] border border-border-light bg-cs-bg p-4 shadow-md">
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
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 shrink-0 items-center justify-center text-pure-black"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            <div
              ref={imageContainerRef}
              data-clickable="true"
              className="relative flex items-start justify-center overflow-hidden bg-cs-bg max-h-[calc(90vh-200px)]"
              style={{ touchAction: 'none' }}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div
                ref={imageWrapperRef}
                className="w-full"
                style={{ transformOrigin: '50% 0%' }}
                animate={{
                  scale: zoom,
                  x: panX,
                  y: panY,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  mass: 1,
                }}
              >
                <Image
                  src={isHDLoaded ? getHDImageSrc(image.src) : image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="h-auto w-full select-none"
                  draggable={false}
                />
              </motion.div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div
                ref={sliderTrackRef}
                className="relative w-32 cursor-pointer py-3"
                style={{ touchAction: 'none' }}
                onPointerDown={handleSliderPointerDown}
                onPointerMove={handleSliderPointerMove}
                onPointerUp={handleSliderPointerUp}
                onPointerCancel={handleSliderPointerUp}
              >
                <div className="h-[2px] w-full bg-border-light" />
                <motion.div
                  className="pointer-events-none absolute top-1/2 h-2 w-2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-accent"
                  animate={{ left: `${((zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                />
              </div>
              <span className="w-10 text-right font-sans text-xs tabular-nums text-light-gray">
                {Math.round(zoom * 100)}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
