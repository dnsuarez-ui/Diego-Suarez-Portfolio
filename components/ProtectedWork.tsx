'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { grantAccess, clearAccess } from '@/lib/protectedWorkAccess'

interface ProtectedWorkProps {
  unlocked: boolean
  onUnlock: () => void
  onLock: () => void
}

export default function ProtectedWork({ unlocked, onUnlock, onLock }: ProtectedWorkProps) {
  const [passwordInput, setPasswordInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLockedOut, setIsLockedOut] = useState(false)
  const [shake, setShake] = useState(false)

  function triggerShake() {
    setShake(true)
    setTimeout(() => setShake(false), 300)
  }

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault()
    if (isLockedOut || isLoading) return

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const res = await fetch('/api/auth/validate-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      })
      const data = await res.json()

      if (data.success) {
        grantAccess(data.token)
        setPasswordInput('')
        onUnlock()
      } else {
        setErrorMessage(data.error)
        if (data.attemptsLeft === 0) {
          setIsLockedOut(true)
        }
        triggerShake()
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.')
      triggerShake()
    } finally {
      setIsLoading(false)
    }
  }

  function handleLock() {
    clearAccess()
    setPasswordInput('')
    setErrorMessage(null)
    onLock()
  }

  return (
    <div className="bg-surface border border-border-dark py-6 pl-2 pr-10">
      <AnimatePresence mode="wait" initial={false}>
        {unlocked ? (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="flex flex-wrap items-start gap-stack-md max-md:justify-center">
              <div className="flex items-start gap-4 min-w-0 flex-[1_1_min(100%,320px)] max-md:flex-col">
                <span
                  className="material-symbols-sharp text-[16px] shrink-0 text-light-gray mt-1"
                  aria-hidden="true"
                >
                  lock_open_right
                </span>
                <div className="flex flex-col gap-4 min-w-0">
                  <span className="font-sans font-normal text-caption uppercase text-light-gray">
                    Access granted
                  </span>
                  <h3 className="font-sans font-semibold text-headline text-off-white">
                    You&apos;re in. Browse the work.
                  </h3>
                  <p className="font-sans font-normal text-body3 text-off-white max-w-md">
                    Additional projects below. Same standard, different stories.
                  </p>
                </div>
              </div>

              <div className="w-[2px] self-stretch bg-border-dark max-md:hidden" />

              <div className="flex flex-col items-center justify-center gap-3 min-w-0 flex-[0_1_min(100%,241px)] self-center">
                <button
                  type="button"
                  onClick={handleLock}
                  data-clickable="true"
                  className="shrink-0 h-[clamp(36px,4vw,41px)] w-full max-w-[241px] bg-accent-orange text-pure-black font-sans font-normal text-body3 px-4 hover:opacity-90 transition-opacity duration-200"
                >
                  Lock Access
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="flex flex-wrap items-start gap-stack-md max-md:justify-center">
              <div className="flex items-start gap-4 min-w-0 flex-[1_1_min(100%,320px)] max-md:flex-col">
                <span
                  className="material-symbols-sharp text-[16px] shrink-0 text-light-gray mt-1"
                  aria-hidden="true"
                >
                  lock
                </span>
                <div className="flex flex-col gap-4 min-w-0">
                  <span className="font-sans font-normal text-caption uppercase text-light-gray">
                    Protected work
                  </span>
                  <h3 className="font-sans font-semibold text-headline text-off-white">
                    Some projects deserve a different conversation.
                  </h3>
                  <p className="font-sans font-normal text-body3 text-off-white max-w-md">
                    Recent projects are available to potential clients and hiring teams. Access
                    details are included in my resume, or simply get in touch.
                  </p>
                </div>
              </div>

              <div className="w-[2px] self-stretch bg-border-dark max-md:hidden" />

              <div className="flex flex-col items-center justify-center gap-3 min-w-0 flex-[0_1_min(100%,241px)] self-center">
                <form onSubmit={handleUnlock} className="flex items-center gap-1 w-full max-w-[241px]">
                  <motion.input
                    type="password"
                    placeholder="Password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    disabled={isLockedOut || isLoading}
                    aria-label="NDA password"
                    aria-invalid={Boolean(errorMessage)}
                    animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-1 min-w-0 h-[clamp(36px,4vw,41px)] bg-surface border text-off-white font-sans font-normal text-body3 px-3 placeholder:text-light-gray focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      errorMessage ? 'border-error' : 'border-light-gray focus:border-accent-orange'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={isLockedOut || isLoading}
                    data-clickable="true"
                    className="shrink-0 h-[clamp(36px,4vw,41px)] bg-accent-orange text-pure-black font-sans font-normal text-body3 px-4 hover:opacity-90 transition-opacity duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Unlock
                  </button>
                </form>

                {errorMessage && (
                  <p className="font-sans font-normal text-body3 text-error w-full max-w-[241px] text-left">
                    {errorMessage}
                  </p>
                )}

                <p className="flex flex-wrap items-center justify-center gap-2 font-sans font-normal text-body3 text-off-white">
                  <span>Need access?</span>
                  <a
                    href="#contact"
                    className="border-b border-border-dark hover:border-accent-orange transition-colors duration-200"
                  >
                    Contact me.
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
