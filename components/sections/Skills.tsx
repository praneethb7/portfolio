'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { SKILLS } from '@/lib/data'
import ScanLine from '@/components/common/ScanLine'

const MARQUEE_SPEEDS = [35, 25, 40, 30]

function SkillPill({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="skill-tooltip-wrapper relative group/pill shrink-0 mx-2">
      <motion.div
        className="px-4 py-2 rounded-lg text-sm font-medium border border-white/10 bg-white/5 cursor-default whitespace-nowrap"
        style={{ color: 'var(--text-secondary)', willChange: 'transform' }}
        whileHover={{
          scale: 1.08,
          color: 'var(--accent)',
          backgroundColor: 'rgba(91,127,255,0.15)',
          borderColor: 'rgba(91,127,255,0.4)',
          transition: { duration: 0.15 },
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full inline-block mr-2 mb-0.5" style={{ background: 'var(--accent)', opacity: 0.5 }} />
        {name}
      </motion.div>
      {/* Tooltip */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-md text-xs font-mono border border-white/10 whitespace-nowrap pointer-events-none opacity-0 group-hover/pill:opacity-100 transition-opacity duration-200 z-50"
        style={{
          background: 'rgba(8,8,8,0.95)',
          backdropFilter: 'blur(12px)',
          color: 'var(--text-secondary)',
        }}
      >
        {desc}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
          style={{ borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '4px solid rgba(255,255,255,0.1)' }}
        />
      </div>
    </div>
  )
}

function SkillRow({ category, rowIndex }: { category: typeof SKILLS[0]; rowIndex: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const isReverse = rowIndex % 2 === 1
  const speed = MARQUEE_SPEEDS[rowIndex] ?? 30

  const tripled = [...category.skills, ...category.skills, ...category.skills]

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-6 mb-6"
      initial={{ opacity: 0, x: isReverse ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: rowIndex * 0.1, ease: 'easeOut' }}
    >
      {/* Category label */}
      <div className="shrink-0 w-28 text-right pr-4" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
        <span className="text-xs font-mono uppercase tracking-[0.15em]" style={{ color: 'var(--accent)', opacity: 0.5 }}>
          {category.label}
        </span>
      </div>

      {/* Marquee track */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--surface), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--surface), transparent)' }} />

        <div
          className="flex items-center"
          style={{
            animation: `${isReverse ? 'marqueeRight' : 'marqueeLeft'} ${speed}s linear infinite`,
            willChange: 'transform',
          }}
        >
          {tripled.map((skill, i) => (
            <SkillPill key={`${skill.name}-${i}`} name={skill.name} desc={skill.desc} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.94, 1, 1, 1.06])
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} id="skills" className="py-28 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <ScanLine />

      {/* Section number watermark */}
      <div aria-hidden className="section-number-bg">04</div>

      <motion.div style={{ scale, opacity }}>
        <motion.p
          className="text-sm uppercase tracking-[0.3em] font-mono mb-4 relative z-10"
          style={{ color: 'var(--accent)', opacity: 0.6 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
        >
          04 / Skills
        </motion.p>

        <motion.h2
          className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-16 relative z-10"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          My Toolbox
        </motion.h2>

        <div className="max-w-6xl mx-auto relative z-10">
          {SKILLS.map((category, i) => (
            <SkillRow key={category.label} category={category} rowIndex={i} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
