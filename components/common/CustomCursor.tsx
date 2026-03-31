'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show on devices with fine pointer (mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return

    setVisible(true)

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }

      // Check if hovering interactive element
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const interactive = el?.closest('a, button, [role="button"], input, textarea, label, [data-cursor="pointer"]')
      setIsPointer(!!interactive)
    }

    const onEnter = () => setVisible(true)
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)

    let rafId: number

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const loop = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12)

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 16}px, ${pos.current.y - 16}px)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x - 3}px, ${target.current.y - 3}px)`
      }

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Outer glow circle */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300"
        style={{
          width: isPointer ? '48px' : '32px',
          height: isPointer ? '48px' : '32px',
          borderRadius: '50%',
          border: '1.5px solid rgba(79, 142, 247, 0.6)',
          boxShadow: '0 0 15px rgba(79, 142, 247, 0.3)',
          transition: 'width 0.2s ease, height 0.2s ease',
          willChange: 'transform',
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#4F8EF7',
          boxShadow: '0 0 8px #4F8EF7',
          willChange: 'transform',
        }}
      />
    </>
  )
}
