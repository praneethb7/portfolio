'use client'

import dynamic from 'next/dynamic'
import { motion, type Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ChevronDown, Download, ArrowRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '@/components/common/Icons'
import { ROLES } from '@/lib/data'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => null,
})

const nameChars = 'Praneeth Budati'.split('')

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.3 },
  },
}

const charVariants: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -30 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const current = ROLES[roleIndex]

    if (typing) {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setDisplayed((d) => d + current[charIndex])
          setCharIndex((i) => i + 1)
        }, 55)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2000)
        return () => clearTimeout(t)
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed((d) => d.slice(0, -1))
          setCharIndex((i) => i - 1)
        }, 28)
        return () => clearTimeout(t)
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length)
        setTyping(true)
      }
    }
  }, [charIndex, typing, roleIndex])

  const socials = [
    { href: 'https://github.com/praneethb7', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/praneeth-budati/', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://leetcode.com/u/praneethb7/', icon: LeetCodeIcon, label: 'LeetCode' },
  ]

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Three.js background */}
      <HeroCanvas />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, #080808 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow */}
          <motion.p
            className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4 font-mono"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            Hey, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.div
            className="flex flex-wrap mb-6 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ perspective: '800px' }}
          >
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                variants={charVariants}
                className="font-heading font-black leading-none"
                style={{
                  fontSize: 'clamp(3rem, 9vw, 8rem)',
                  color: '#ffffff',
                  display: 'inline-block',
                  whiteSpace: char === ' ' ? 'pre' : 'normal',
                  marginRight: char === ' ' ? '0.25em' : '0',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>

          {/* Typewriter role */}
          <motion.div
            className="flex items-center gap-2 mb-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.0}
          >
            <span
              className="font-heading font-semibold"
              style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)', color: '#4F8EF7' }}
            >
              {displayed}
              <span className="cursor-blink text-white/60 ml-0.5">|</span>
            </span>
          </motion.div>

          {/* Sub line */}
          <motion.p
            className="text-white/50 text-base md:text-lg mb-10 font-body"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.2}
          >
            Sophomore · Builder · Knight on LeetCode
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mb-12"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.4}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: '#4F8EF7',
                color: '#080808',
                boxShadow: '0 0 20px rgba(79,142,247,0.3)',
              }}
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/praneeth_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-white/20 text-white/80 hover:border-accent/50 hover:text-accent hover:bg-accent/5 transition-all duration-200 hover:scale-[1.03]"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            className="flex items-center gap-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.6}
          >
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="group relative flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/5 text-white/60 hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/30"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  )
}
