'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ScanLine() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })

  return (
    <div
      ref={ref}
      className="absolute inset-x-0 top-0 h-px overflow-hidden pointer-events-none z-20"
    >
      {inView && (
        <motion.div
          className="absolute inset-y-0 left-0 right-0 h-px"
          style={{ background: 'var(--accent)', opacity: 0.4, transformOrigin: 'left center' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
      )}
    </div>
  )
}
