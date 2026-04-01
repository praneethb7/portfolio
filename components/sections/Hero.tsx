'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { useEffect, useRef, useState, Suspense } from 'react'
import { Download, ArrowRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '@/components/common/Icons'
import { ROLES } from '@/lib/data'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false, loading: () => null })

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.3 } },
}

const charVariants: Variants = {
  hidden: { opacity: 0, y: -100, rotate: -12 },
  visible: {
    opacity: 1, y: 0, rotate: 0,
    transition: { type: 'spring', stiffness: 180, damping: 18 },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay } }),
}

const subWords = 'Full Stack Developer. Competitive Programmer. Building things that matter.'.split(' ')

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const canvasY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const [charIndex, setCharIndex] = useState(0)
  const [lineVisible, setLineVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLineVisible(true), 1400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const current = ROLES[roleIndex]
    if (typing) {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setDisplayed((d) => d + current[charIndex])
          setCharIndex((i) => i + 1)
        }, 52)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2200)
        return () => clearTimeout(t)
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed((d) => d.slice(0, -1))
          setCharIndex((i) => i - 1)
        }, 26)
        return () => clearTimeout(t)
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length)
        setTyping(true)
      }
    }
  }, [charIndex, typing, roleIndex])

  const socials = [
    { href: 'https://github.com/praneethb7', Icon: GithubIcon, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/praneeth-budati/', Icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://leetcode.com/u/praneethb7/', Icon: LeetCodeIcon, label: 'LeetCode' },
  ]

  return (
    <section ref={ref} id="home" className="relative min-h-[100dvh] flex items-center overflow-hidden">

      {/* Three.js canvas — parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: canvasY, opacity: canvasOpacity }}
      >
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </motion.div>

      {/* Grain */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Radial vignette */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 85% 65% at 50% 50%, transparent 0%, var(--surface) 72%)' }}
      />

      {/* Scroll-driven scale wrapper */}
      <motion.div
        className="relative z-10 w-full px-6 md:px-12 lg:px-24 pt-28 pb-20"
        style={{ scale: contentScale, opacity: mounted ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Eyebrow */}
          <motion.p
            className="text-xs uppercase tracking-[0.35em] mb-5 font-mono"
            style={{ color: 'var(--text-muted)' }}
            variants={fadeUp} initial="hidden" animate="visible" custom={0.05}
          >
            Hey, I&apos;m
          </motion.p>

          {/* Name — Lando Norris style: Praneeth solid, Budati outline */}
          <div className="mb-3" style={{ perspective: '1000px' }}>

            {/* Line 1: Praneeth — black weight, solid fill */}
            <div className="block overflow-visible">
              <motion.span
                className="inline-flex overflow-visible"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {'Praneeth'.split('').map((char, ci) => (
                  <motion.span
                    key={ci}
                    variants={charVariants}
                    className="inline-block font-heading font-black leading-none"
                    style={{
                      fontSize: 'clamp(3.2rem, 9.5vw, 8.5rem)',
                      color: 'var(--text-primary)',
                      transformOrigin: 'top center',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </div>

            {/* Line 2: Budati — light weight, outline (no fill) */}
            <div className="block overflow-visible">
              <motion.span
                className="inline-flex overflow-visible"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {'Budati'.split('').map((char, ci) => (
                  <motion.span
                    key={ci}
                    variants={charVariants}
                    className="inline-block font-heading leading-none"
                    style={{
                      fontSize: 'clamp(3rem, 9vw, 8rem)',
                      fontWeight: 300,
                      color: 'transparent',
                      WebkitTextStroke: '1.5px rgba(242,240,235,0.82)',
                      transformOrigin: 'top center',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </div>
          </div>

          {/* Underline that draws in after name */}
          <motion.div
            className="mb-6 h-px origin-left"
            style={{ background: 'linear-gradient(90deg, var(--accent), rgba(91,127,255,0.2))' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: lineVisible ? 1 : 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Typewriter role */}
          <motion.div
            className="flex items-center mb-5"
            variants={fadeUp} initial="hidden" animate="visible" custom={1.1}
          >
            <span
              className="font-heading font-semibold"
              style={{ fontSize: 'clamp(1.1rem, 2.6vw, 1.8rem)', color: 'var(--accent)' }}
            >
              {displayed}
              <span
                className="cursor-blink-glow inline-block w-0.5 h-[1.1em] align-middle ml-0.5"
                style={{ backgroundColor: 'var(--accent)', borderRadius: '1px' }}
              />
            </span>
          </motion.div>

          {/* Sub-line — word stagger */}
          <div className="flex flex-wrap gap-x-[0.35em] mb-10">
            {subWords.map((word, i) => (
              <motion.span
                key={i}
                className="text-base md:text-lg font-body"
                style={{ color: 'var(--text-secondary)' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.06, duration: 0.5 }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mb-12"
            variants={fadeUp} initial="hidden" animate="visible" custom={1.6}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="shimmer-btn group flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: 'var(--accent)',
                color: 'var(--surface)',
                boxShadow: '0 0 24px rgba(91,127,255,0.35)',
              }}
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </a>
            <a
              href="/praneeth_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm border border-white/15 hover:border-white/30 transition-all duration-200 hover:scale-[1.03]"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            className="flex items-center gap-4"
            variants={fadeUp} initial="hidden" animate="visible" custom={1.8}
          >
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:scale-110"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <div
          className="relative w-px h-12 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full"
            style={{ background: 'var(--accent)', height: '40%' }}
            animate={{ y: ['0%', '150%', '0%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="text-[10px] font-mono tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
          scroll
        </span>
      </motion.div>
    </section>
  )
}
