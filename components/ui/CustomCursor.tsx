'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type CursorState = 'default' | 'photo' | 'interactive'

const SIZE: Record<CursorState, number> = { default: 8, photo: 20, interactive: 4 }
const BACKGROUND: Record<CursorState, string> = { default: 'transparent', photo: 'var(--color-accent)', interactive: 'var(--color-off-white)' }
const BORDER: Record<CursorState, string> = { default: '1px solid var(--color-off-white)', photo: 'none', interactive: 'none' }
const TRANSITION: Record<CursorState, string> = { default: '0.15s ease', photo: '0.2s ease', interactive: '0.15s ease' }

const LERP = 0.12
const CLICK_SIZE = 6
const CLICK_DURATION = 80

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })
  const [state, setState] = useState<CursorState>('default')
  const [clicking, setClicking] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useLayoutEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (isTouch) return
    let raf = 0

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      const el = e.target as HTMLElement
      if (el.closest('[data-cursor="photo"]')) {
        setState('photo')
      } else if (el.closest('a, button, [role="button"]')) {
        setState('interactive')
      } else {
        setState('default')
      }
    }

    const onDown = () => {
      setClicking(true)
      window.setTimeout(() => setClicking(false), CLICK_DURATION)
    }

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * LERP
      current.current.y += (target.current.y - current.current.y) * LERP
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      cancelAnimationFrame(raf)
    }
  }, [isTouch])

  if (isTouch) return null

  const size = clicking ? CLICK_SIZE : SIZE[state]

  return (
    <div
      ref={dotRef}
      id="custom-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        background: BACKGROUND[state],
        border: BORDER[state],
        mixBlendMode: state === 'default' ? 'difference' : 'normal',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-100px, -100px)',
        transition: `width ${TRANSITION[state]}, height ${TRANSITION[state]}, background-color ${TRANSITION[state]}, border-color ${TRANSITION[state]}`,
      }}
    />
  )
}
