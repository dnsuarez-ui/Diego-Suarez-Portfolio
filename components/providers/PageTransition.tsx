'use client'

import { useRouter } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react'

const EXIT_DURATION_MS = 800 // 0.5s fade-to-black + 0.3s hold

export const EXIT_TRANSITION = { duration: 0.8, times: [0, 0.625, 1], ease: ['easeIn', 'linear'] }
export const ENTER_TRANSITION = { duration: 0.4, ease: 'easeOut' }

// Case study → case study (via "More work."): fades to white instead of black,
// since both source and destination are cs-bg pages — a black hold here would
// be a jarring flash between two off-white screens.
const CASE_STUDY_EXIT_DURATION_MS = 700 // 0.5s fade-to-white + 0.2s hold
export const CASE_STUDY_EXIT_TRANSITION = {
  duration: 0.7,
  times: [0, 5 / 7, 1],
  ease: ['easeIn', 'linear'],
}

export type TransitionVariant = 'default' | 'case-study'

type ExitHandler = () => void

interface PageTransitionContextValue {
  navigate: (href: string, variant?: TransitionVariant) => void
  registerExitHandler: (handler: ExitHandler | null) => void
  exitVariant: TransitionVariant
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const exitHandlerRef = useRef<ExitHandler | null>(null)
  const [exitVariant, setExitVariant] = useState<TransitionVariant>('default')

  const registerExitHandler = useCallback((handler: ExitHandler | null) => {
    exitHandlerRef.current = handler
  }, [])

  const navigate = useCallback(
    (href: string, variant: TransitionVariant = 'default') => {
      setExitVariant(variant)
      exitHandlerRef.current?.()

      if (variant === 'case-study') {
        // The body's default background is pure-black (globals.css) — it's
        // what shows through once the outgoing page's opacity hits 0. Swap it
        // to off-white for the duration of this transition only, then revert.
        document.body.style.backgroundColor = 'var(--color-off-white)'
        setTimeout(
          () => {
            document.body.style.backgroundColor = ''
          },
          CASE_STUDY_EXIT_DURATION_MS + ENTER_TRANSITION.duration * 1000
        )
        setTimeout(() => router.push(href, { scroll: false }), CASE_STUDY_EXIT_DURATION_MS)
      } else {
        setTimeout(() => router.push(href, { scroll: false }), EXIT_DURATION_MS)
      }
    },
    [router]
  )

  return (
    <PageTransitionContext.Provider value={{ navigate, registerExitHandler, exitVariant }}>
      {children}
    </PageTransitionContext.Provider>
  )
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext)
  if (!ctx) throw new Error('usePageTransition must be used within PageTransition')
  return ctx
}

export function useExitFade() {
  const [isExiting, setIsExiting] = useState(false)
  const { registerExitHandler } = usePageTransition()

  useEffect(() => {
    registerExitHandler(() => setIsExiting(true))
    return () => registerExitHandler(null)
  }, [registerExitHandler])

  return isExiting
}

export function useCaseStudyNavigation(): (e: MouseEvent<HTMLAnchorElement>, href: string) => void {
  const { navigate } = usePageTransition()

  return useCallback(
    (e: MouseEvent<HTMLAnchorElement>, href: string): void => {
      e.preventDefault()
      sessionStorage.setItem('homeScrollPosition', String(window.scrollY))
      navigate(href)
    },
    [navigate]
  )
}

// Case study → case study (via "More work."). Deliberately does not touch
// `homeScrollPosition` — that key belongs only to the home → case study path
// (see useCaseStudyNavigation above); overwriting it here would corrupt the
// scroll position home restores to later.
export function useMoreWorkNavigation(): (e: MouseEvent<HTMLAnchorElement>, href: string) => void {
  const { navigate } = usePageTransition()

  return useCallback(
    (e: MouseEvent<HTMLAnchorElement>, href: string): void => {
      e.preventDefault()
      navigate(href, 'case-study')
    },
    [navigate]
  )
}
