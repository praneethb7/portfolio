'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '@/components/common/Icons'

type ToastState = { show: boolean; message: string; isSuccess?: boolean }

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:praneethbudati.work@gmail.com?subject=${subject}&body=${body}`
    setToast({ show: true, message: 'Opening your mail client...', isSuccess: true })
    setTimeout(() => setToast({ show: false, message: '' }), 5000)
    setTimeout(() => {
      setSending(false)
      setForm({ name: '', email: '', message: '' })
    }, 1500)
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
        margin: '0 clamp(16px, 3vw, 48px)',
        marginBottom: 'clamp(16px, 3vw, 48px)',
        borderRadius: '24px',
        border: '1px solid var(--border-strong)',
        background: 'linear-gradient(135deg, var(--surface-2) 0%, var(--surface) 100%)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Decorative corner SVG */}
      <div style={{ position: 'absolute', top: -1, right: -1, width: 200, height: 200, pointerEvents: 'none', zIndex: 0 }}>
        <svg viewBox="0 0 200 200" fill="none">
          <path d="M200 0 A200 200 0 0 0 0 200" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          <path d="M200 0 A140 140 0 0 0 60 200" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
          <path d="M200 0 A80 80 0 0 0 120 200" stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>
        </svg>
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Section number watermark */}
      <div aria-hidden className="section-number-bg" style={{ opacity: 0.5 }}>06</div>

      {/* Accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(91,127,255,0.04) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <motion.div style={{ scale, opacity }}>
        <div className="relative z-10 py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
          <motion.p
            className="text-sm uppercase tracking-[0.3em] font-mono mb-4"
            style={{ color: 'var(--accent)', opacity: 0.6 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
          >
            06 / Contact
          </motion.p>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2
                className="font-heading font-black mb-5 leading-tight"
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                  color: 'var(--text-primary)',
                }}
              >
                Let&apos;s build<br />
                <span className="text-gradient">something.</span>
              </h2>
              <p className="text-base mb-10 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
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
                    className="relative group/social flex items-center justify-center w-11 h-11 rounded-lg border border-white/10 bg-white/5 transition-all duration-200"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(91,127,255,0.4)'
                      e.currentTarget.style.color = 'var(--accent)'
                      e.currentTarget.style.background = 'rgba(91,127,255,0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                      e.currentTarget.style.color = 'var(--text-muted)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] font-mono border border-white/10 whitespace-nowrap opacity-0 group-hover/social:opacity-100 transition-opacity duration-150 pointer-events-none"
                      style={{ background: 'rgba(0,0,0,0.9)', color: 'rgba(255,255,255,0.7)' }}>
                      {label}
                    </span>
                  </a>
                ))}
              </div>

              {/* Easter egg hint */}
              <p className="text-xs font-mono mt-8" style={{ color: 'rgba(255,255,255,0.12)' }}>
                psst — try typing &quot;hire me&quot; anywhere on the page...
              </p>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <form onSubmit={handleSubmit} className="glass p-7 space-y-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
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
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(91,127,255,0.5)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
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
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(91,127,255,0.5)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
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
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(91,127,255,0.5)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:pointer-events-none"
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--surface)',
                    boxShadow: '0 0 20px rgba(91,127,255,0.3)',
                  }}
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-dark/40 border-t-dark rounded-full animate-spin" />
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
