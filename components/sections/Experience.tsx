'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EXPERIENCE } from '@/lib/data'
import { Briefcase, GraduationCap, Mic } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ICONS = [GraduationCap, Briefcase, Mic]

function TimelineEntry({
  entry,
  index,
}: {
  entry: typeof EXPERIENCE[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const isLeft = index % 2 === 0
  const Icon = ICONS[index] || Briefcase

  return (
    <div
      ref={ref}
      className={`relative flex md:grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 mb-12 items-start ${
        isLeft ? '' : 'md:[&>*:first-child]:order-3 md:[&>*:last-child]:order-1'
      }`}
    >
      {/* Card side */}
      <motion.div
        className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="glass p-6 inline-block w-full hover:border-accent/30 transition-colors duration-300">
          <div className={`flex items-center gap-2 mb-1 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
            <span className="text-xs font-mono text-accent/60 tracking-wider">{entry.date}</span>
          </div>
          <h3 className="font-heading font-bold text-lg text-white mb-0.5">{entry.role}</h3>
          <p className="text-accent text-sm font-medium mb-3">{entry.org}</p>
          <ul className={`space-y-1.5 text-sm text-white/60 ${isLeft ? 'md:text-right' : 'md:text-left'} text-left`}>
            {entry.points.map((pt, i) => (
              <li key={i} className={`flex items-start gap-2 ${isLeft ? 'md:flex-row-reverse md:text-right' : ''} text-left`}>
                <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mt-1.5 shrink-0" />
                <span className="text-left">{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Center dot */}
      <div className="hidden md:flex flex-col items-center pt-6">
        <motion.div
          className="w-10 h-10 rounded-lg bg-dark border-2 border-accent flex items-center justify-center z-10 shrink-0"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ boxShadow: '0 0 20px rgba(79,142,247,0.4)' }}
        >
          <Icon className="w-4 h-4 text-accent" />
        </motion.div>
      </div>

      {/* Empty column (for alternating) */}
      <div className="hidden md:block" />
    </div>
  )
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
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
    },
    { scope: containerRef }
  )

  return (
    <section id="experience" className="py-24 px-6 md:px-12 lg:px-24">
      <motion.p
        className="text-sm uppercase tracking-[0.3em] text-accent/60 font-mono mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        02 / Experience
      </motion.p>

      <motion.h2
        className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Where I&apos;ve Shown Up
      </motion.h2>

      <div ref={containerRef} className="max-w-5xl mx-auto relative">
        {/* Vertical center line (desktop) */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-white/10"
          aria-hidden
        />
        <div
          ref={lineRef}
          className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px origin-top"
          style={{ background: 'linear-gradient(to bottom, #4F8EF7, rgba(79,142,247,0.2))' }}
          aria-hidden
        />

        {EXPERIENCE.map((entry, index) => (
          <TimelineEntry key={index} entry={entry} index={index} />
        ))}
      </div>
    </section>
  )
}
