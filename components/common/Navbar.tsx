'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Flashlight } from 'lucide-react'
import { NAV_LINKS } from '@/lib/data'
import { useTorch } from './TorchMode'
import ScrambleText from './ScrambleText'

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)
  const { torchActive, toggleTorch } = useTorch()

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[1000]"
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div
        className="mx-auto px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(13,13,15,0.88)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#home')}
          className="focus:outline-none select-none"
          style={{ letterSpacing: '-0.02em' }}
        >
          <span
            className="font-heading text-[18px]"
            style={{ fontWeight: 700, color: 'var(--text-primary)' }}
          >
            Praneeth
          </span>
          <ScrambleText
            text=" Budati"
            className="font-heading text-[18px]"
            style={{ fontWeight: 400, color: 'var(--text-secondary)' }}
          />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="relative focus:outline-none"
                style={{
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
              >
                {/* Active dot above */}
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <ScrambleText text={link.label} />
              </button>
            )
          })}
        </nav>

        {/* Right: torch + hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTorch}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-200 hover:border-accent/50 focus:outline-none"
            style={
              torchActive
                ? { borderColor: 'rgba(91,127,255,0.6)', boxShadow: '0 0 12px rgba(91,127,255,0.3)' }
                : {}
            }
            aria-label="Toggle torch mode"
            title="Torch mode"
          >
            <Flashlight
              className="w-4 h-4 transition-colors"
              style={{ color: torchActive ? 'var(--accent)' : 'rgba(255,255,255,0.5)' }}
            />
          </button>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden flex flex-col gap-1 px-6 py-6"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(13,13,15,0.97)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-3 px-4 rounded-lg text-base font-medium transition-all hover:bg-white/5"
                style={{
                  color:
                    activeSection === link.href.replace('#', '')
                      ? 'var(--accent)'
                      : 'rgba(255,255,255,0.8)',
                  letterSpacing: '0.06em',
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
