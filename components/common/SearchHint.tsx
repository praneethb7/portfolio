'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

export default function SearchHint() {
  const [hidden, setHidden] = useState(false)
  const [isMac, setIsMac] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    setIsMac(!/Win|Linux/.test(navigator.userAgent))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastScrollY.current && currentY > 60) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
    )
  }

  return (
    <motion.button
      onClick={openPalette}
      aria-label="Open search"
      className="fixed z-[1002] focus:outline-none group"
      style={{ top: '20px', right: '24px' }}
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.28, ease: 'easeInOut' }}
    >
      <div
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg transition-all duration-200"
        style={{
          background: 'rgba(91,127,255,0.12)',
          border: '1px solid rgba(91,127,255,0.4)',
          boxShadow: '0 0 16px rgba(91,127,255,0.2)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.background = 'rgba(91,127,255,0.22)'
          el.style.borderColor = 'rgba(91,127,255,0.7)'
          el.style.boxShadow = '0 0 24px rgba(91,127,255,0.35)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.background = 'rgba(91,127,255,0.12)'
          el.style.borderColor = 'rgba(91,127,255,0.4)'
          el.style.boxShadow = '0 0 16px rgba(91,127,255,0.2)'
        }}
      >
        <Search className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent)' }} />
        <span
          className="text-xs font-medium hidden sm:inline"
          style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.02em' }}
        >
          Search
        </span>
        <kbd
          className="text-[11px] font-mono px-1.5 py-0.5 rounded"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'var(--accent)',
            lineHeight: 1.4,
          }}
        >
          {isMac ? '⌘K' : 'Ctrl K'}
        </kbd>
      </div>
    </motion.button>
  )
}
