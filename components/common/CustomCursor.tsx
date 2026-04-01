'use client'

import { useEffect, useRef, useState } from 'react'

const TRAIL_LENGTH = 5

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])

  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const history = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 }))
  )

  const [isPointer, setIsPointer] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    setVisible(true)

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const interactive = el?.closest('a, button, [role="button"], input, textarea, label, [data-cursor="pointer"]')
      setIsPointer(!!interactive)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', () => setVisible(false))
    document.addEventListener('mouseenter', () => setVisible(true))

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    let rafId: number
    const loop = () => {
      // Lerp main ring
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12)

      // Shift history
      history.current = [
        { x: target.current.x, y: target.current.y },
        ...history.current.slice(0, TRAIL_LENGTH - 1),
      ]

      if (ringRef.current) {
        const size = isPointer ? 64 : 48
        ringRef.current.style.transform = `translate(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px)`
        ringRef.current.style.width = `${size}px`
        ringRef.current.style.height = `${size}px`
        ringRef.current.style.backgroundColor = isPointer ? 'rgba(79,142,247,0.15)' : 'transparent'
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x - 3}px, ${target.current.y - 3}px)`
      }

      trailRefs.current.forEach((el, i) => {
        if (!el) return
        const p = history.current[i + 1] || history.current[i]
        const opacity = ((TRAIL_LENGTH - i) / TRAIL_LENGTH) * 0.5
        const size = 6 - i
        el.style.transform = `translate(${p.x - size / 2}px, ${p.y - size / 2}px)`
        el.style.opacity = String(opacity)
        el.style.width = `${size}px`
        el.style.height = `${size}px`
      })

      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [isPointer])

  if (!visible) return null

  return (
    <>
      {/* Outer glow ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: '48px',
          height: '48px',
          border: '1.5px solid rgba(79,142,247,0.7)',
          boxShadow: '0 0 30px rgba(79,142,247,0.6), 0 0 60px rgba(79,142,247,0.2)',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
          willChange: 'transform',
        }}
      />
      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: '#4F8EF7',
          boxShadow: '0 0 8px #4F8EF7, 0 0 16px rgba(79,142,247,0.4)',
          willChange: 'transform',
        }}
      />
      {/* Trail particles */}
      {Array.from({ length: TRAIL_LENGTH - 1 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el }}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
          style={{
            width: '6px',
            height: '6px',
            backgroundColor: '#4F8EF7',
            willChange: 'transform',
            transition: 'opacity 0.1s',
          }}
        />
      ))}
    </>
  )
}
