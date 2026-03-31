'use client'

import { useEffect, useState } from 'react'
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './Icons'
import { NAV_LINKS } from '@/lib/data'

export default function Footer() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date())
      )
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
    <footer className="border-t border-white/5 py-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left */}
        <p className="text-sm text-white/40 text-center md:text-left">
          Praneeth Budati · Built with Next.js &amp; ☕ in Bengaluru
          {time && (
            <span className="ml-3 font-mono text-accent/70">{time} IST</span>
          )}
        </p>

        {/* Center nav */}
        <nav className="flex items-center gap-5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-xs text-white/40 hover:text-accent transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: socials */}
        <div className="flex items-center gap-4">
          <a href="https://github.com/praneethb7" target="_blank" rel="noopener noreferrer"
            className="text-white/40 hover:text-accent transition-colors duration-200" aria-label="GitHub">
            <GithubIcon className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/praneeth-budati/" target="_blank" rel="noopener noreferrer"
            className="text-white/40 hover:text-accent transition-colors duration-200" aria-label="LinkedIn">
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a href="https://leetcode.com/u/praneethb7/" target="_blank" rel="noopener noreferrer"
            className="text-white/40 hover:text-accent transition-colors duration-200" aria-label="LeetCode">
            <LeetCodeIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      <p className="text-center text-xs text-white/20 mt-6">
        © 2025 Praneeth Budati. All rights reserved.
      </p>
    </footer>
  )
}
