'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ACHIEVEMENTS, ACHIEVEMENT_PILLS } from '@/lib/data'
import CountUp from '@/components/common/CountUp'
import type { Achievement } from '@/lib/data'

function LeetCodeCard({ item, index }: { item: Achievement; index: number }) {
  return (
    <motion.div
      className="p-6 flex flex-col text-left rounded-xl"
      style={{
        background: '#1a1a1a',
        border: '1px solid rgba(255,161,22,0.45)',
        boxShadow: '0 0 24px rgba(255,161,22,0.12), 0 0 60px rgba(255,161,22,0.05)',
        willChange: 'transform',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, boxShadow: '0 0 36px rgba(255,161,22,0.28)' }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        {/* LeetCode chain-link logo */}
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#FFA116">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
        </svg>
        {/* Knight badge */}
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded"
          style={{ background: 'rgba(255,161,22,0.15)', color: '#FFA116', border: '1px solid rgba(255,161,22,0.35)' }}
        >
          ♞ Knight
        </span>
      </div>

      {/* Rating number */}
      <div className="font-heading font-black text-4xl md:text-5xl mb-1" style={{ color: '#FFA116' }}>
        <CountUp end={item.value} duration={2.5} />
      </div>
      <div className="text-xs font-mono mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
        Max Rating
      </div>

      {/* Top 4% badge */}
      <div className="flex items-center gap-1.5 mt-auto">
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#2cbb5d' }} />
        <span className="text-xs font-mono" style={{ color: '#2cbb5d' }}>Top 4% Globally</span>
      </div>
    </motion.div>
  )
}

function GoogleBigCodeCard({ item, index }: { item: Achievement; index: number }) {
  return (
    <motion.div
      className="p-6 flex flex-col text-left rounded-xl overflow-hidden"
      style={{
        background: '#0f111a',
        border: '1px solid rgba(66,133,244,0.35)',
        boxShadow: '0 0 24px rgba(66,133,244,0.1)',
        willChange: 'transform',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, boxShadow: '0 0 36px rgba(66,133,244,0.2)' }}
    >
      {/* Google 4-color bar */}
      <div className="flex h-[3px] mb-4 rounded-full overflow-hidden">
        <div style={{ flex: 1, background: '#4285F4' }} />
        <div style={{ flex: 1, background: '#EA4335' }} />
        <div style={{ flex: 1, background: '#FBBC05' }} />
        <div style={{ flex: 1, background: '#34A853' }} />
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        {/* Google G logo */}
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        {/* Badge */}
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded"
          style={{ background: 'rgba(66,133,244,0.15)', color: '#4285F4', border: '1px solid rgba(66,133,244,0.35)' }}
        >
          Big Code
        </span>
      </div>

      {/* Count */}
      <div className="font-heading font-black text-4xl md:text-5xl mb-1" style={{ color: '#4285F4' }}>
        <CountUp end={item.value} duration={2.5} />
      </div>
      <div className="text-xs font-mono mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
        Top Nationally
      </div>

      <div className="text-[10px] font-mono mt-auto" style={{ color: 'rgba(66,133,244,0.6)' }}>
        Google&apos;s The Big Code · 2026
      </div>
    </motion.div>
  )
}

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.94, 1, 1, 1.06])
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0])

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="py-28 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{ background: '#0e0d09', position: 'relative', zIndex: 1 }}
    >
      {/* Section number watermark */}
      <div aria-hidden className="section-number-bg">05</div>

      <motion.div style={{ scale, opacity }}>
        <motion.p
          className="text-sm uppercase tracking-[0.3em] font-mono mb-4 relative z-10"
          style={{ color: 'var(--accent)', opacity: 0.6 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          05 / Achievements
        </motion.p>

        <motion.h2
          className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-16 relative z-10"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          By The Numbers
        </motion.h2>

        {/* Stat cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 mb-14 relative z-10">
          {ACHIEVEMENTS.map((item, i) => {
            if (item.id === 'leetcode') {
              return <LeetCodeCard key={item.id} item={item} index={i} />
            }
            if (item.id === 'bigcode') {
              return <GoogleBigCodeCard key={item.id} item={item} index={i} />
            }
            // Rank card — static #3; Mentored card — CountUp
            const isRank = item.id === 'rank'
            return (
              <motion.div
                key={item.id}
                className="glass p-6 flex flex-col items-center text-center rounded-xl"
                style={{ ['--card-accent' as string]: item.accentColor, willChange: 'transform' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                whileHover={{ borderColor: `${item.accentColor}40`, scale: 1.02 }}
              >
                <div
                  className="font-heading font-black text-4xl md:text-5xl mb-2"
                  style={{ color: item.accentColor }}
                >
                  {isRank ? (
                    <span>{item.prefix}<span>3</span>{item.suffix}</span>
                  ) : (
                    <CountUp end={item.value} duration={2.5} suffix={item.suffix} prefix={item.prefix} />
                  )}
                </div>
                <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)', opacity: 0.8 }}>
                  {item.label}
                </div>
                <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{item.description}</div>
                <div className="text-[10px] font-mono leading-snug" style={{ color: `${item.accentColor}99` }}>
                  {item.subtext}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Achievement pills */}
        <motion.div
          className="max-w-5xl mx-auto flex flex-wrap gap-3 justify-center relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
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
              viewport={{ once: true, amount: 0.1 }}
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
