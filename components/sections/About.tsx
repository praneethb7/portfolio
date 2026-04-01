'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ABOUT_BIO, CURRENTLY, TECH_MARQUEE } from '@/lib/data'
import Marquee from '@/components/common/Marquee'
import ScanLine from '@/components/common/ScanLine'

function ClipRevealText({ children, delay = 0, className = '' }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
        transition={{ duration: 0.9, delay, ease: [0.77, 0, 0.175, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.94, 1, 1, 1.06])
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} id="about" className="py-28 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <ScanLine />

      {/* Section number watermark */}
      <div aria-hidden className="section-number-bg">01</div>

      <motion.div ref={contentRef} style={{ scale, opacity }}>
        <motion.p
          className="text-sm uppercase tracking-[0.3em] font-mono mb-4 relative z-10"
          style={{ color: 'var(--accent)' }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 0.6 }} viewport={{ once: true }}
        >
          01 / About
        </motion.p>

        <ClipRevealText delay={0.1}>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-16 relative z-10"
            style={{ color: 'var(--text-primary)' }}>
            Who I Am
          </h2>
        </ClipRevealText>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start relative z-10">
          {/* Left: Avatar */}
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-2xl opacity-25"
                style={{
                  background: 'linear-gradient(135deg, var(--accent) 0%, transparent 60%)',
                  clipPath: 'polygon(0 10%,10% 0,90% 0,100% 10%,100% 90%,90% 100%,10% 100%,0 90%)',
                }}
              />
              <div
                className="absolute -inset-1 rounded-xl opacity-50"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), #7c3aed, var(--accent))',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 4s ease infinite',
                  clipPath: 'polygon(0 8%,8% 0,92% 0,100% 8%,100% 92%,92% 100%,8% 100%,0 92%)',
                }}
              />
              <div
                className="relative w-64 h-72 md:w-72 md:h-80 flex items-center justify-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #0f1228, #1a1240)',
                  clipPath: 'polygon(0 8%,8% 0,92% 0,100% 8%,100% 92%,92% 100%,8% 100%,0 92%)',
                  border: '1px solid rgba(91,127,255,0.3)',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-full blur-3xl opacity-40"
                      style={{ background: 'var(--accent)', width: '120px', height: '120px' }}
                    />
                    <span className="relative font-heading font-black text-6xl"
                      style={{ color: 'var(--accent)', textShadow: '0 0 40px rgba(91,127,255,0.6)' }}>
                      PB
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(rgba(91,127,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(91,127,255,0.3) 1px,transparent 1px)',
                  backgroundSize: '30px 30px',
                }} />
              </div>
            </div>
          </motion.div>

          {/* Right: Bio + Currently */}
          <div>
            <div className="space-y-5 mb-8">
              {ABOUT_BIO.map((para, i) => (
                <ClipRevealText key={i} delay={0.1 + i * 0.15}>
                  <p className="leading-relaxed text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
                    {para}
                  </p>
                </ClipRevealText>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 rounded-xl p-5"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-xs uppercase tracking-[0.2em] font-mono mb-4" style={{ color: 'var(--accent)', opacity: 0.55 }}>
                Currently
              </p>
              <ul className="space-y-3">
                {CURRENTLY.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-0"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                  >
                    <motion.div
                      className="w-px mr-3 shrink-0 self-stretch"
                      style={{ transformOrigin: 'top', background: 'var(--accent)', minHeight: '100%' }}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.45 + i * 0.08, duration: 0.4 }}
                    />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Tech Marquee */}
        <motion.div
          className="mt-20 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] font-mono text-center mb-6" style={{ color: 'var(--text-muted)' }}>
            Technologies I work with
          </p>
          <Marquee items={TECH_MARQUEE} speed={25} />
        </motion.div>
      </motion.div>
    </section>
  )
}
