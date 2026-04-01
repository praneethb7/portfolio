'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EXPERIENCE } from '@/lib/data'
import { Briefcase, GraduationCap, Award, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ICONS = [GraduationCap, Briefcase, Award, Users]

function TimelineEntry({ entry, index }: { entry: typeof EXPERIENCE[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const isLeft = index % 2 === 0
  const Icon = ICONS[index % ICONS.length]

  return (
    <div
      ref={ref}
      className={`relative flex md:grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 mb-14 items-start ${
        isLeft ? '' : 'md:[&>*:first-child]:order-3 md:[&>*:last-child]:order-1'
      }`}
    >
      <motion.div
        className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}
        initial={{ opacity: 0, x: isLeft ? -60 : 60, rotateY: isLeft ? 8 : -8 }}
        animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        style={{ perspective: '800px', willChange: 'transform' }}
      >
        <div
          className="glass p-6 inline-block w-full transition-all duration-300"
          style={{
            border: inView ? '1px solid rgba(91,127,255,0.2)' : '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <span
            className="text-xs font-mono tracking-wider block mb-1"
            style={{ color: 'var(--accent)', opacity: 0.55 }}
          >
            {entry.date}
          </span>
          <h3
            className="font-heading font-bold text-lg mb-0.5"
            style={{ color: 'var(--text-primary)' }}
          >
            {entry.role}
          </h3>
          <p className="text-sm font-medium mb-3" style={{ color: 'var(--accent)' }}>
            {entry.org}
          </p>
          <ul className="space-y-2 text-sm text-left">
            {entry.points.map((pt, i) => (
              <li
                key={i}
                className={`flex items-start gap-2 ${isLeft ? 'md:flex-row-reverse md:text-right' : ''} text-left`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                  style={{ background: 'var(--accent)', opacity: 0.5 }}
                />
                <span className="text-left" style={{ color: 'var(--text-secondary)' }}>
                  {pt}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Center dot */}
      <div className="hidden md:flex flex-col items-center pt-5">
        <motion.div
          className="relative w-10 h-10 rounded-xl flex items-center justify-center z-10 shrink-0"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={{
            background: '#0a0d14',
            border: '2px solid var(--accent)',
            boxShadow: inView
              ? '0 0 20px rgba(91,127,255,0.8), 0 0 40px rgba(91,127,255,0.3)'
              : 'none',
          }}
        >
          {inView && (
            <span className="absolute inset-[-6px] rounded-xl border border-accent/40 animate-ping opacity-60" />
          )}
          <Icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
        </motion.div>
      </div>

      <div className="hidden md:block" />
    </div>
  )
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.94, 1, 1, 1.06])
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0])

  useGSAP(() => {
    if (!lineRef.current) return
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          scrub: 1,
        },
      }
    )
  }, { scope: containerRef })

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-28 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{ background: '#0a0d14', position: 'relative', zIndex: 1 }}
    >
      {/* Section number watermark */}
      <div aria-hidden className="section-number-bg">02</div>

      <motion.div style={{ scale, opacity }}>
        <motion.p
          className="text-sm uppercase tracking-[0.3em] font-mono mb-4 relative z-10"
          style={{ color: 'var(--accent)', opacity: 0.6 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          02 / Experience
        </motion.p>

        <motion.h2
          className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-16 relative z-10"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Where I&apos;ve Shown Up
        </motion.h2>

        <div ref={containerRef} className="max-w-5xl mx-auto relative z-10">
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px origin-top"
            style={{
              background: 'linear-gradient(to bottom, var(--accent), rgba(91,127,255,0.15))',
            }}
          />
          {EXPERIENCE.map((entry, index) => (
            <TimelineEntry key={index} entry={entry} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
