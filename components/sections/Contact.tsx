'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '@/components/common/Icons'

type ToastState = { show: boolean; message: string; isSuccess?: boolean }

// Perforation dots column
function Perforations({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      style={{
        position: 'absolute',
        [side]: 0,
        top: '80px',
        bottom: '80px',
        width: '28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: '#0d0a14',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
          }}
        />
      ))}
    </div>
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' })
  const typed = useRef('')

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.94, 1, 1, 1.06])
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0])

  // Easter egg: "hire me" typed anywhere
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      typed.current += e.key.toLowerCase()
      if (typed.current.includes('hire me')) {
        typed.current = ''
        void (async () => {
          const confetti = (await import('canvas-confetti')).default
          confetti({
            particleCount: 180,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#5B7FFF', '#7c3aed', '#ffffff', '#a78bfa'],
          })
          setToast({ show: true, message: 'Great taste. 🎉 Let\'s talk → praneethbudati.work@gmail.com' })
          setTimeout(() => setToast({ show: false, message: '' }), 5000)
        })()
      }
      if (typed.current.length > 20) typed.current = typed.current.slice(-10)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setToast({ show: true, message: 'Message sent! I\'ll get back to you soon.', isSuccess: true })
      setForm({ name: '', email: '', message: '' })
    } catch {
      setToast({ show: true, message: 'Something went wrong. Try emailing directly.', isSuccess: false })
    } finally {
      setSending(false)
      setTimeout(() => setToast({ show: false, message: '' }), 5000)
    }
  }

  const socials = [
    { href: 'https://github.com/praneethb7', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/praneeth-budati/', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://leetcode.com/u/praneethb7/', icon: LeetCodeIcon, label: 'LeetCode' },
    { href: 'mailto:praneethbudati.work@gmail.com', icon: Mail, label: 'Email' },
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        background: '#f5f0e8',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Top wavy edge — Projects color (#0d0a14) bites into cream */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, lineHeight: 0, zIndex: 3, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: '100%', height: '80px', display: 'block' }}>
          <path d="M0,0 L1440,0 L1440,30 C1200,72 960,8 720,40 C480,72 240,8 0,30 Z" fill="#0d0a14" />
        </svg>
      </div>

      {/* Bottom wavy edge — footer/surface color bites up */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 3, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: '100%', height: '80px', display: 'block' }}>
          <path d="M0,80 L1440,80 L1440,50 C1200,8 960,72 720,40 C480,8 240,72 0,50 Z" fill="#0D0D0F" />
        </svg>
      </div>

      {/* Perforation dots */}
      <Perforations side="left" />
      <Perforations side="right" />

      {/* Section number watermark — muted on light bg */}
      <div
        aria-hidden
        className="section-number-bg"
        style={{ color: 'rgba(0,0,0,0.04)', opacity: 1 }}
      >
        06
      </div>

      <motion.div style={{ scale, opacity }}>
        <div
          className="relative z-10 py-24 px-12 md:px-16 lg:px-28 max-w-6xl mx-auto"
          style={{ paddingTop: 'calc(80px + 3rem)', paddingBottom: 'calc(80px + 3rem)' }}
        >
          <motion.p
            className="text-sm uppercase tracking-[0.3em] font-mono mb-4"
            style={{ color: '#5B7FFF', opacity: 0.8 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            06 / Contact
          </motion.p>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7 }}
            >
              <h2
                className="font-heading font-black mb-5 leading-tight"
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                  color: '#1a1a1a',
                }}
              >
                Let&apos;s build<br />
                <span style={{ color: '#5B7FFF' }}>something.</span>
              </h2>
              <p className="text-base mb-10 leading-relaxed" style={{ color: '#555' }}>
                Open to internships, collabs, and conversations about hard problems.
                If you have a cool idea, I want to hear it.
              </p>

              {/* Social icons */}
              <div className="flex gap-3">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="relative group/social flex items-center justify-center w-11 h-11 rounded-lg transition-all duration-200"
                    style={{
                      color: '#555',
                      background: 'rgba(0,0,0,0.06)',
                      border: '1px solid rgba(0,0,0,0.12)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(91,127,255,0.6)'
                      e.currentTarget.style.color = '#5B7FFF'
                      e.currentTarget.style.background = 'rgba(91,127,255,0.08)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'
                      e.currentTarget.style.color = '#555'
                      e.currentTarget.style.background = 'rgba(0,0,0,0.06)'
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span
                      className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap opacity-0 group-hover/social:opacity-100 transition-opacity duration-150 pointer-events-none"
                      style={{ background: '#1a1a1a', color: '#f5f0e8', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      {label}
                    </span>
                  </a>
                ))}
              </div>

              {/* Easter egg hint */}
              <p className="text-xs font-mono mt-8" style={{ color: 'rgba(0,0,0,0.2)' }}>
                psst — try typing &quot;hire me&quot; anywhere on the page...
              </p>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <form
                onSubmit={handleSubmit}
                className="p-7 space-y-5 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.55)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                }}
              >
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider" style={{ color: '#777' }}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
                    style={{
                      background: 'rgba(255,255,255,0.8)',
                      border: '1px solid rgba(0,0,0,0.15)',
                      color: '#1a1a1a',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(91,127,255,0.6)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.15)')}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider" style={{ color: '#777' }}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
                    style={{
                      background: 'rgba(255,255,255,0.8)',
                      border: '1px solid rgba(0,0,0,0.15)',
                      color: '#1a1a1a',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(91,127,255,0.6)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.15)')}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider" style={{ color: '#777' }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="What are you working on?"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors resize-none"
                    style={{
                      background: 'rgba(255,255,255,0.8)',
                      border: '1px solid rgba(0,0,0,0.15)',
                      color: '#1a1a1a',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(91,127,255,0.6)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.15)')}
                  />
                </div>

                {/* Neon submit button */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:pointer-events-none"
                  style={{
                    background: '#1a1a1a',
                    color: '#f5f0e8',
                    border: '1px solid rgba(91,127,255,0.5)',
                    boxShadow: '0 0 20px rgba(91,127,255,0.35), 0 0 60px rgba(91,127,255,0.1)',
                  }}
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send It
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000] px-6 py-3.5 rounded-xl text-sm font-medium shadow-2xl"
            style={{
              background: 'rgba(8,8,8,0.95)',
              color: 'var(--text-primary)',
              backdropFilter: 'blur(20px)',
              border: toast.isSuccess ? '1px solid rgba(91,127,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
            }}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
