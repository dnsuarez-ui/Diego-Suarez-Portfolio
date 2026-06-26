'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type CursorState = 'default' | 'photo' | 'interactive'

// interactive (a, button, [role="button"]): filled accent dot, no border
// photo (hero photo — non-clickable): ring, transparent fill
// default: ring, transparent fill — base state
const SIZE_CLASSES: Record<CursorState, string> = {
  default: 'w-2 h-2',
  interactive: 'w-3 h-3',
  photo: 'w-3 h-3',
}
const STYLE_CLASSES: Record<CursorState, string> = {
  default: 'bg-transparent border border-off-white mix-blend-difference',
  interactive: 'bg-accent border-0 mix-blend-normal',
  photo: 'bg-transparent border border-off-white mix-blend-normal',
}
const CLICK_SIZE_CLASSES = 'w-1.5 h-1.5'

const LERP = 0.18
const CLICK_DURATION = 80

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })
  const [state, setState] = useState<CursorState>('default')
  const [clicking, setClicking] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [visible, setVisible] = useState(true)

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
      } else if (el.closest('a, button, [role="button"], [data-clickable="true"]')) {
        setState('interactive')
      } else {
        setState('default')
      }
    }

    const onDown = () => {
      setClicking(true)
      window.setTimeout(() => setClicking(false), CLICK_DURATION)
    }

    const onWindowMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) setVisible(false)
    }
    const onWindowMouseOver = () => setVisible(true)

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
    window.addEventListener('mouseout', onWindowMouseOut)
    window.addEventListener('mouseover', onWindowMouseOver)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseout', onWindowMouseOut)
      window.removeEventListener('mouseover', onWindowMouseOver)
      cancelAnimationFrame(raf)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <div
      ref={dotRef}
      id="custom-cursor"
      className={[
        'fixed top-0 left-0 z-[9999] rounded-full pointer-events-none',
        'transition-[width,height,background-color,border-width,border-color] duration-150 ease-[ease]',
        clicking ? CLICK_SIZE_CLASSES : SIZE_CLASSES[state],
        STYLE_CLASSES[state],
        visible ? 'opacity-100' : 'opacity-0',
      ].join(' ')}
      style={{ transform: 'translate(-100px, -100px)' }}
    />
  )
}
