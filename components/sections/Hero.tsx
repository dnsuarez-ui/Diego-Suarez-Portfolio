'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimate, useScroll, useTransform, stagger } from 'framer-motion'
import Image from 'next/image'
import ComplexWord from '@/components/ui/ComplexWord'

const metadata = [
  ['Based in Argentina', 'Working remotely'],
  ['15+ years designing for humans', 'From graphic design to product strategy'],
  ['Craft-obsessed', 'Curiosity-driven'],
]

const PARALLAX_MAX = 8 // px
const PARALLAX_LERP = 0.08

export default function Hero() {
  const [scope, animate] = useAnimate()
  const photoMoveRef = useRef<HTMLDivElement>(null)
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  const parallaxLerp = isTouch ? 0.05 : PARALLAX_LERP

  const { scrollY } = useScroll()
  const photoScrollY = useTransform(scrollY, (v) => v * (isTouch ? 0.06 : 0.25))

  // Entrance sequence — runs once on load
  useEffect(() => {
    animate('.line-1', { opacity: 1, y: 0 }, { delay: 0.3, duration: 0.6, ease: 'easeOut' })
    animate('.line-2', { opacity: 1, y: 0 }, { delay: 0.7, duration: 0.6, ease: 'easeOut' })
    animate('.line-3', { opacity: 1, y: 0 }, { delay: 1.1, duration: 0.6, ease: 'easeOut' })

    animate('.portrait-wrap', { opacity: 1, y: 0 }, { delay: 1.9, duration: 0.8, ease: 'easeOut' })
    animate(
      '.hero-metadata-item',
      { opacity: 1 },
      { delay: stagger(0.08, { startDelay: 2.3 }), duration: 0.5, ease: 'easeOut' }
    )
    animate('.scroll-ind', { opacity: 1 }, { delay: 2.7, duration: 0.4, ease: 'easeOut' })
    animate('.hero-topbar', { opacity: 1 }, { delay: 3.0, duration: 0.4, ease: 'easeOut' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Magnetic parallax — photo moves opposite the cursor within the hero bounds
  useEffect(() => {
    const hero = scope.current
    const img = photoMoveRef.current
    if (!hero || !img) return

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let inside = false
    let raf = 0

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
      target.x = nx * -PARALLAX_MAX
      target.y = ny * -PARALLAX_MAX
      inside = true
    }

    const onLeave = () => {
      inside = false
      target.x = 0
      target.y = 0
      current.x = 0
      current.y = 0
      img.style.transition = 'transform 0.6s ease-out'
      img.style.transform = 'translate(0px, 0px)'
    }

    const tick = () => {
      if (inside) {
        current.x += (target.x - current.x) * parallaxLerp
        current.y += (target.y - current.y) * parallaxLerp
        img.style.transition = 'none'
        img.style.transform = `translate(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [scope])

  return (
    <section ref={scope} className="bg-pure-black overflow-hidden">
      <div className="flex flex-col gap-stack-xl py-section-y max-w-[1512px] mx-auto">
        {/* Two-column layout: text keeps growing, photo stays near its original size — wraps to stacked when there's no room, no breakpoints */}
        <div className="flex flex-wrap items-center gap-stack-md">
          {/* Text column — grows to fill remaining space, like the original flex-1 */}
          <div className="flex flex-col gap-stack-lg min-w-0 pl-section-x flex-[1_1_min(100%,600px)]">
            {/* Top bar — wordmark, maps to "nav" in the entrance sequence */}
            <motion.div className="hero-topbar flex items-center gap-2" initial={{ opacity: 0 }}>
              <span className="font-sans font-bold text-body1 text-off-white">Diego Suarez</span>
              <span className="font-sans font-normal text-body1 text-border">/</span>
              <span className="font-sans font-normal text-body1 text-light-gray">Digital Product Design</span>
            </motion.div>

            {/* Tagline */}
            <div className="font-sans text-hero-tagline">
              <motion.div className="line-1" initial={{ opacity: 0, y: 12 }}>
                <span className="font-semibold text-off-white">I make</span>
              </motion.div>
              <motion.div className="line-2" initial={{ opacity: 0, y: 12 }}>
                <ComplexWord />{' '}
                <span className="font-semibold text-off-white">products</span>
              </motion.div>
              <motion.div className="line-3" initial={{ opacity: 0, y: 12 }}>
                <span className="font-semibold text-off-white">feel </span>
                <span className="font-bold text-off-white text-hero-tagline-lg">
                  obvious
                </span>
                <span className="font-bold text-off-white text-hero-tagline-lg">.</span>
              </motion.div>
            </div>

            {/* Metadata — each column hugs its own content (like Figma), wraps as a whole when it doesn't fit */}
            <div className="hero-metadata flex flex-wrap gap-stack-lg">
              {metadata.map((col, i) => (
                <div key={i} className="flex flex-col gap-2">
                  {col.map((line) => (
                    <span
                      key={line}
                      className="hero-metadata-item font-sans font-normal text-body2 text-light-gray opacity-0"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Portrait — stays near its original 523px size on desktop, full width + aspect ratio once it wraps to its own line */}
          <motion.div
            className="portrait-wrap min-w-0 flex-[0_1_min(100%,523px)]"
            initial={{ opacity: 0, y: 10 }}
            style={{ marginRight: 'calc(-1 * max(0px, (100vw - 1512px) / 2))' }}
          >
            <div className="relative w-full aspect-[523/549]">
              {/* Ambient light — static, behind the photo, bleeds beyond its edges */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: '120%',
                  height: '120%',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.28,
                  background: 'radial-gradient(ellipse at center, var(--color-accent) 0%, transparent 70%)',
                }}
              />

              {/* Photo container — stays fixed; only the image inside moves (parallax) */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                data-cursor="photo"
                style={{ y: photoScrollY }}
              >
                <div ref={photoMoveRef} className="absolute" style={{ top: '-10px', left: '-10px', right: '-10px', bottom: '-10px' }}>
                  <Image
                    src="/images/figma/hero-portrait-5b0ebc.png"
                    alt="Diego Suarez, Digital Product Designer"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Proof / scroll indicator — "Proof" stays static, only the arrow loops */}
        <motion.div className="scroll-ind flex flex-col items-center gap-1" initial={{ opacity: 0 }}>
          <span className="font-sans font-medium text-body2 text-light-gray">Proof</span>
          <motion.span
            className="font-sans font-normal text-body3 text-accent inline-block"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}
