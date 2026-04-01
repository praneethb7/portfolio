'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ACHIEVEMENTS, ACHIEVEMENT_PILLS } from '@/lib/data'
import CountUp from '@/components/common/CountUp'
import ScanLine from '@/components/common/ScanLine'

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.94, 1, 1, 1.06])
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} id="achievements" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <ScanLine />

      {/* Section number watermark */}
      <div aria-hidden className="section-number-bg">05</div>

      <motion.div style={{ scale, opacity }}>
        <motion.p
          className="text-sm uppercase tracking-[0.3em] font-mono mb-4 relative z-10"
          style={{ color: 'var(--accent)', opacity: 0.6 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
        >
          05 / Achievements
        </motion.p>

        <motion.h2
          className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-16 relative z-10"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          By The Numbers
        </motion.h2>

        {/* Stat cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 mb-14 relative z-10">
          {ACHIEVEMENTS.map((item, i) => (
            <motion.div
              key={item.label}
              className="glass p-6 flex flex-col items-center text-center transition-all duration-300 group"
              style={{ ['--card-accent' as string]: item.accentColor }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              whileHover={{ borderColor: `${item.accentColor}40`, scale: 1.02 }}
            >
              <div
                className="font-heading font-black text-4xl md:text-5xl mb-2"
                style={{ color: item.accentColor }}
              >
                <CountUp
                  end={item.value}
                  duration={2.5}
                  suffix={item.suffix}
                  prefix={item.prefix}
                />
              </div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)', opacity: 0.8 }}>
                {item.label}
              </div>
              <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{item.description}</div>
              <div
                className="text-[10px] font-mono leading-snug"
                style={{ color: `${item.accentColor}99` }}
              >
                {item.subtext}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement pills */}
        <motion.div
          className="max-w-5xl mx-auto flex flex-wrap gap-3 justify-center relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {ACHIEVEMENT_PILLS.map((pill, i) => (
            <motion.span
              key={pill}
              className="inline-flex items-center px-4 py-2 rounded-md text-xs font-mono font-semibold select-none"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 2px 0 rgba(255,255,255,0.08), 0 1px 4px rgba(0,0,0,0.6)',
                color: 'var(--text-secondary)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 12px rgba(91,127,255,0.25), 0 2px 0 rgba(255,255,255,0.08)',
                borderColor: 'rgba(91,127,255,0.4)',
                color: 'var(--accent)',
              }}
            >
              {pill}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
