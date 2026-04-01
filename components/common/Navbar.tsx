'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Flashlight } from 'lucide-react'
import { NAV_LINKS } from '@/lib/data'
import { useTorch } from './TorchMode'

// Per-character bounce-up animation triggered by parent hover
function SplitLetterHover({
  text,
  className,
  style,
}: {
  text: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.span
      className={className}
      style={{ display: 'inline-flex', ...style }}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={{
            rest: { y: 0 },
            hover: {
              y: -4,
              transition: { delay: i * 0.03, duration: 0.18, ease: 'easeOut' },
            },
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [navHovered, setNavHovered] = useState(false)
  const [logoDark, setLogoDark] = useState(false)
  const lastScrollY = useRef(0)
  const { torchActive, toggleTorch } = useTorch()

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 80)
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY

      // Detect light contact section under logo
      const contactEl = document.getElementById('contact')
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect()
        setLogoDark(rect.top < 120 && rect.bottom > 0)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mouse proximity to top for navbar reveal
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setNavHovered(e.clientY < 80)
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  // Scroll spy
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

  const logoColor = logoDark ? '#1a1a1a' : 'var(--text-primary)'
  const navVisible = navHovered || scrolled || mobileOpen

  return (
    <>
      {/* ── Fixed top-left branding — always visible, never hides ── */}
      <div
        className="fixed top-0 left-0 z-[1001] p-6 pointer-events-none select-none"
      >
        <div
          style={{
            fontFamily: 'var(--font-didact, "Didact Gothic", serif)',
            fontSize: '1.05rem',
            fontWeight: 400,
            color: logoColor,
            transition: 'color 0.4s ease',
            lineHeight: 1.25,
            letterSpacing: '0.01em',
          }}
        >
          Praneeth
        </div>
        <div
          style={{
            fontFamily: 'var(--font-bricolage)',
            fontSize: '1.25rem',
            fontWeight: 900,
            color: logoColor,
            transition: 'color 0.4s ease',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          Budati
        </div>
      </div>

      {/* ── Navbar ── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-[1000]"
        animate={{
          y: hidden ? -100 : 0,
          opacity: navVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div
          className="mx-auto px-6 md:px-12 lg:px-24 py-4 flex items-center justify-end"
          style={{
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            backgroundColor: 'transparent',
            borderBottom: 'none',
          }}
        >
          {/* Desktop nav links */}
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
                    color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: 'var(--accent)',
                        boxShadow: '0 0 6px var(--accent)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <SplitLetterHover text={link.label} />
                </button>
              )
            })}
          </nav>

          {/* Torch + hamburger */}
          <div className="flex items-center gap-3 ml-8">
            <button
              onClick={toggleTorch}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-200 focus:outline-none"
              style={
                torchActive
                  ? {
                      borderColor: 'rgba(91,127,255,0.6)',
                      boxShadow: '0 0 12px rgba(91,127,255,0.3)',
                    }
                  : {}
              }
              aria-label="Toggle torch mode"
            >
              <Flashlight
                className="w-3.5 h-3.5"
                style={{ color: torchActive ? 'var(--accent)' : 'rgba(255,255,255,0.4)' }}
              />
            </button>
            <button
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 bg-white/5"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-3.5 h-3.5" />
              ) : (
                <Menu className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence initial={false}>
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
    </>
  )
}
