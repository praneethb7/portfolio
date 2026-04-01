'use client'

import { useEffect, useState } from 'react'
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './Icons'
import { NAV_LINKS } from '@/lib/data'

export default function Footer() {
  const [timeParts, setTimeParts] = useState<{ hhmm: string; colon: string; ss: string; period: string } | null>(null)

  useEffect(() => {
    const update = () => {
      const formatted = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date())
      const match = formatted.match(/^(\d{2}):(\d{2}):(\d{2})\s*([aApP][mM])$/)
      if (match) {
        setTimeParts({
          hhmm: `${match[1]}`,
          colon: ':',
          ss: `${match[2]}`,
          period: ` ${match[4].toUpperCase()}`,
        })
      } else {
        setTimeParts({ hhmm: formatted, colon: '', ss: '', period: '' })
      }
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} className="py-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left */}
        <p className="text-sm text-center md:text-left" style={{ color: 'var(--text-muted)' }}>
          Praneeth Budati · Built with Next.js &amp; ☕ in Bengaluru
          {timeParts && (
            <span className="ml-3 font-mono" style={{ color: 'var(--accent)', opacity: 0.7 }}>
              {timeParts.hhmm}
              <span className="cursor-blink-glow">{timeParts.colon}</span>
              {timeParts.ss}
              {timeParts.period} IST
            </span>
          )}
        </p>

        {/* Center nav */}
        <nav className="flex items-center gap-5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-xs transition-colors duration-200 hover:text-accent"
              style={{ color: 'var(--text-muted)' }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: socials */}
        <div className="flex items-center gap-4">
          <a href="https://github.com/praneethb7" target="_blank" rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-accent" style={{ color: 'var(--text-muted)' }} aria-label="GitHub">
            <GithubIcon className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/praneeth-budati/" target="_blank" rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-accent" style={{ color: 'var(--text-muted)' }} aria-label="LinkedIn">
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a href="https://leetcode.com/u/praneethb7/" target="_blank" rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-accent" style={{ color: 'var(--text-muted)' }} aria-label="LeetCode">
            <LeetCodeIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="mt-6 text-center text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
        © {new Date().getFullYear()} Praneeth Budati. All rights reserved.
        <span className="ml-4 opacity-60">Press <kbd className="font-mono text-[10px] px-1 py-0.5 rounded border border-white/10">⌘K</kbd> to search</span>
      </div>
    </footer>
  )
}
