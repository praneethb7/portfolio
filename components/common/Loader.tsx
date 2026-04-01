'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [visible, setVisible] = useState(false)
  const [splitting, setSplitting] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const shown = sessionStorage.getItem('loader_shown')
    if (shown) return

    sessionStorage.setItem('loader_shown', '1')
    document.body.style.overflow = 'hidden'
    setVisible(true)

    const splitTimer = setTimeout(() => setSplitting(true), 2000)
    const doneTimer = setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ''
    }, 2750)

    return () => {
      clearTimeout(splitTimer)
      clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (!visible) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] pointer-events-none">
        {/* Top curtain */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/2 flex items-end justify-center pb-3"
          style={{ background: '#000' }}
          animate={splitting ? { y: '-100%' } : { y: 0 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="text-center select-none"
            animate={splitting ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <p
              className="font-heading font-black text-white leading-none"
              style={{ fontSize: 'clamp(56px, 8vw, 80px)', letterSpacing: '-0.02em' }}
            >
              PB
            </p>
            {/* Progress bar */}
            <div
              className="mt-4 h-[2px] rounded-full overflow-hidden mx-auto"
              style={{ width: '72px', background: 'rgba(255,255,255,0.12)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'var(--accent, #5B7FFF)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom curtain */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2"
          style={{ background: '#000' }}
          animate={splitting ? { y: '100%' } : { y: 0 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </AnimatePresence>
  )
}
