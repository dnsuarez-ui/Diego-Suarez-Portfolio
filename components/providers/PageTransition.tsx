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

type ExitHandler = () => void

interface PageTransitionContextValue {
  navigate: (href: string) => void
  registerExitHandler: (handler: ExitHandler | null) => void
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const exitHandlerRef = useRef<ExitHandler | null>(null)

  const registerExitHandler = useCallback((handler: ExitHandler | null) => {
    exitHandlerRef.current = handler
  }, [])

  const navigate = useCallback(
    (href: string) => {
      exitHandlerRef.current?.()
      setTimeout(() => router.push(href, { scroll: false }), EXIT_DURATION_MS)
    },
    [router]
  )

  return (
    <PageTransitionContext.Provider value={{ navigate, registerExitHandler }}>
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
