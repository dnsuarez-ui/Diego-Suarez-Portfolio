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

export default function Home() {
  const isExiting = useExitFade()

  useEffect(() => {
    const saved = sessionStorage.getItem('homeScrollPosition')
    if (saved !== null) {
      window.scrollTo({ top: Number(saved), behavior: 'smooth' })
      sessionStorage.removeItem('homeScrollPosition')
    }
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
