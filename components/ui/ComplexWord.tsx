'use client'

import { useState, useRef, useCallback } from 'react'

const ORIGINAL = 'complex'

// [position in word, replacement character]
const POSSIBLE_SUBS: Array<[number, string]> = [
  [1, '0'],   // o → 0  → c0mplex
  [4, '|'],   // l → |  → comp|ex
  [4, '!'],   // l → !  → comp!ex
  [5, '3'],   // e → 3  → compl3x
  [5, ''],    // e → '' → complx (shorter)
  [6, '×'],   // x → ×  → comple×
]

function applySubstitution(pos: number, char: string): string {
  return ORIGINAL.slice(0, pos) + char + ORIGINAL.slice(pos + 1)
}

export default function ComplexWord() {
  const [word, setWord] = useState(ORIGINAL)
  const cooldown = useRef(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const handleMouseEnter = useCallback(() => {
    if (cooldown.current) return
    cooldown.current = true

    timers.current.forEach(clearTimeout)
    timers.current = []

    // Pick 2–3 unique substitutions, randomly ordered
    const picks = [...POSSIBLE_SUBS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 2 + Math.floor(Math.random() * 2))

    let elapsed = 0
    picks.forEach(([pos, char]) => {
      const t1 = setTimeout(() => setWord(applySubstitution(pos, char)), elapsed)
      elapsed += 40 + Math.floor(Math.random() * 21)  // 40–60ms visible
      const t2 = setTimeout(() => setWord(ORIGINAL), elapsed)
      elapsed += 40 + Math.floor(Math.random() * 21)  // 40–60ms pause between
      timers.current.push(t1, t2)
    })

    // Belt-and-suspenders: guarantee final restore
    const tFinal = setTimeout(() => setWord(ORIGINAL), elapsed + 20)
    timers.current.push(tFinal)

    // Cooldown resets after 2000ms from trigger
    const tReset = setTimeout(() => { cooldown.current = false }, 2000)
    timers.current.push(tReset)
  }, [])

  return (
    <span
      className="font-semibold cursor-default select-none"
      onMouseEnter={handleMouseEnter}
      aria-label="complex"
    >
      {word}
    </span>
  )
}
