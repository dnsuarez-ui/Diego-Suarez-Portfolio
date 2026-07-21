'use client'

import { useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { hasValidAccess } from '@/lib/protectedWorkAccess'

/**
 * Client-side access gate for protected case studies. Public case studies
 * (isProtected: false) render immediately. Protected ones stay unrendered
 * until hasValidAccess() confirms a live "protectedWorkAccess" session grant;
 * otherwise the visitor is redirected to '/' before any content mounts.
 */
export function useProtectedCaseStudyGuard(isProtected: boolean): boolean {
  const router = useRouter()
  const [allowed, setAllowed] = useState(!isProtected)

  useLayoutEffect(() => {
    if (!isProtected) return
    if (hasValidAccess()) {
      setAllowed(true)
    } else {
      router.replace('/')
    }
  }, [isProtected, router])

  return allowed
}
