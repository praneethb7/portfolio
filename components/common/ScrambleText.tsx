'use client'

import { useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

interface ScrambleTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  as?: keyof React.JSX.IntrinsicElements
}

export default function ScrambleText({ text, className, style, as: Tag = 'span' }: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null)
  const interval = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    const el = ref.current
    if (!el) return
    const letters = text.split('')
    let iteration = 0

    if (interval.current) clearInterval(interval.current)

    interval.current = setInterval(() => {
      if (!ref.current) return
      ref.current.innerText = letters
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < Math.floor(iteration)) return letters[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      iteration += 0.5
      if (iteration >= letters.length + 1) {
        clearInterval(interval.current!)
        if (ref.current) ref.current.innerText = text
      }
    }, 40)
  }

  const handleMouseLeave = () => {
    if (interval.current) clearInterval(interval.current)
    if (ref.current) ref.current.innerText = text
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = Tag as any

  return (
    <Component
      ref={ref}
      className={className}
      style={{ display: 'inline-block', ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </Component>
  )
}
