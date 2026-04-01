'use client'

import { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    const mouse = { x: -9999, y: -9999 }
    const DOT_COUNT = 80
    const dots: Dot[] = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    const initDots = () => {
      dots.length = 0
      for (let i = 0; i < DOT_COUNT; i++) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        })
      }
    }

    resize()
    initDots()

    const ro = new ResizeObserver(() => resize())
    ro.observe(document.documentElement)

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    let raf: number
    const REPEL_RADIUS = 150
    const CONNECT_DIST = 120

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const dot of dots) {
        dot.x += dot.vx
        dot.y += dot.vy

        if (dot.x < 0 || dot.x > width) dot.vx *= -1
        if (dot.y < 0 || dot.y > height) dot.vy *= -1

        const dx = dot.x - mouse.x
        const dy = dot.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS
          dot.x += (dx / dist) * force * 3
          dot.y += (dy / dist) * force * 3
        }

        const opacity = dist < REPEL_RADIUS ? 0.25 + (1 - dist / REPEL_RADIUS) * 0.45 : 0.25

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(91,127,255,${opacity})`
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const ddx = dots[i].x - dots[j].x
          const ddy = dots[i].y - dots[j].y
          const dist = Math.sqrt(ddx * ddx + ddy * ddy)
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.06
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(91,127,255,${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  )
}
