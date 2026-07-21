'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Hero from '@/components/sections/Hero'
import Work from '@/components/sections/Work'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import { useExitFade } from '@/components/providers/PageTransition'

const EXIT_TRANSITION = { duration: 0.8, times: [0, 0.625, 1], ease: ['easeIn', 'linear'] }
const ENTER_TRANSITION = { duration: 0.4, ease: 'easeOut' }

// Number of consecutive animation frames the document height must stay
// unchanged before we treat layout as settled. This reacts to the actual
// measured DOM (e.g. the protected-work unlock reveal), so it holds
// regardless of how long any given layout shift takes to finish.
const REQUIRED_STABLE_FRAMES = 3

export default function Home() {
  const isExiting = useExitFade()

  useEffect(() => {
    const saved = sessionStorage.getItem('homeScrollPosition')
    if (saved === null) return

    const target = Number(saved)

    let frameId: number
    let lastHeight = -1
    let stableFrames = 0

    const waitForLayoutToSettle = () => {
      const currentHeight = document.documentElement.scrollHeight
      if (currentHeight === lastHeight) {
        stableFrames += 1
      } else {
        stableFrames = 0
        lastHeight = currentHeight
      }

      if (stableFrames >= REQUIRED_STABLE_FRAMES) {
        window.scrollTo({ top: target, behavior: 'smooth' })
        // Only consumed once the restore actually commits, so a cancelled
        // pass (e.g. React StrictMode's dev-only double-invoke, which
        // cancels the first pass's rAF before it ever fires) leaves the
        // saved value intact for the pass that actually completes.
        sessionStorage.removeItem('homeScrollPosition')
        return
      }

      frameId = requestAnimationFrame(waitForLayoutToSettle)
    }

    frameId = requestAnimationFrame(waitForLayoutToSettle)

    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? [1, 0, 0] : 1 }}
      transition={isExiting ? EXIT_TRANSITION : ENTER_TRANSITION}
    >
      <Hero />
      <Work />
      <About />
      <Contact />
    </motion.main>
  )
}
