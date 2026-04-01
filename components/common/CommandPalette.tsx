'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'

const ITEMS = [
  { label: 'About', section: '#about', type: 'Section' },
  { label: 'Experience', section: '#experience', type: 'Section' },
  { label: 'Projects', section: '#projects', type: 'Section' },
  { label: 'Skills', section: '#skills', type: 'Section' },
  { label: 'Achievements', section: '#achievements', type: 'Section' },
  { label: 'Contact', section: '#contact', type: 'Section' },
  { label: 'gigUp — Worker discovery platform', section: '#projects', type: 'Project' },
  { label: 'Google Calendar Agent', section: '#projects', type: 'Project' },
  { label: 'AceNSET — EdTech Platform', section: '#projects', type: 'Project' },
  { label: 'Little Kars — Auto-detect driving', section: '#projects', type: 'Project' },
  { label: 'Download CV', section: '', action: 'cv', type: 'Action' },
] as const

type Item = (typeof ITEMS)[number]

function highlightMatch(text: string, query: string) {
  if (!query) return <span>{text}</span>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <span className="text-white/50">{text}</span>
  return (
    <>
      <span className="text-white/70">{text.slice(0, idx)}</span>
      <span style={{ color: 'var(--accent)' }} className="font-semibold">
        {text.slice(idx, idx + query.length)}
      </span>
      <span className="text-white/70">{text.slice(idx + query.length)}</span>
    </>
  )
}

const TYPE_COLORS: Record<string, string> = {
  Section: 'rgba(91,127,255,0.2)',
  Project: 'rgba(124,58,237,0.2)',
  Action: 'rgba(201,168,76,0.2)',
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (selected >= filtered.length) setSelected(0)
  }, [filtered.length, selected])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
        setQuery('')
        setSelected(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      if (filtered[selected]) execute(filtered[selected])
    }
  }

  const execute = (item: Item) => {
    if ('action' in item && item.action === 'cv') {
      window.open('/praneeth_resume.pdf', '_blank')
    } else if (item.section) {
      document.querySelector(item.section)?.scrollIntoView({ behavior: 'smooth' })
    }
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[99998] flex items-start justify-center px-4"
          style={{
            paddingTop: '15vh',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            background: 'rgba(0,0,0,0.7)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="w-full max-w-xl"
            initial={{ scale: 0.96, y: -8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -8 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--surface-2, #141417)',
              border: '1px solid var(--border-strong, rgba(255,255,255,0.12))',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            {/* Input row */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelected(0)
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search sections, projects, skills..."
                className="flex-1 bg-transparent outline-none text-[18px]"
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-inter)',
                }}
              />
              <kbd
                className="text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0"
                style={{
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'var(--text-muted)',
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="py-2 max-h-72 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-sm text-center py-8" style={{ color: 'var(--text-muted)' }}>
                  No results
                </p>
              ) : (
                filtered.map((item, i) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center justify-between px-5 py-2.5 transition-colors duration-100 text-left"
                    style={{
                      background:
                        i === selected ? 'rgba(91,127,255,0.1)' : 'transparent',
                    }}
                    onMouseEnter={() => setSelected(i)}
                    onClick={() => execute(item)}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-mono font-bold shrink-0"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {item.type[0]}
                      </span>
                      <span className="text-sm">{highlightMatch(item.label, query)}</span>
                    </div>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded shrink-0"
                      style={{
                        background: TYPE_COLORS[item.type] || 'rgba(255,255,255,0.05)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {item.type}
                    </span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
