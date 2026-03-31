'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '@/components/common/Icons'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

type ToastState = { show: boolean; message: string }

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' })
  const typed = useRef('')

  // Easter egg: "hire me" typed anywhere
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      typed.current += e.key.toLowerCase()
      if (typed.current.includes('hire me')) {
        typed.current = ''
        triggerEasterEgg()
      }
      if (typed.current.length > 20) {
        typed.current = typed.current.slice(-10)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const triggerEasterEgg = async () => {
    // Dynamic import to avoid SSR issues
    const confetti = (await import('canvas-confetti')).default
    confetti({
      particleCount: 180,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#4F8EF7', '#7c3aed', '#ffffff', '#60a5fa'],
    })
    setToast({ show: true, message: 'Great taste. 🎉 Let\'s talk → praneethbudati.work@gmail.com' })
    setTimeout(() => setToast({ show: false, message: '' }), 5000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:praneethbudati.work@gmail.com?subject=${subject}&body=${body}`
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
      id="contact"
      className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background grain */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
      {/* Accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #4F8EF7 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.p
          className="text-sm uppercase tracking-[0.3em] text-accent/60 font-mono mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
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
            <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white mb-5 leading-tight">
              Let&apos;s build<br />
              <span className="text-gradient">something.</span>
            </h2>
            <p className="text-white/50 text-base mb-10 leading-relaxed">
              Open to internships, collabs, and conversations about hard problems.
              If you have a cool idea, I want to hear it.
            </p>

            {/* Social icons */}
            <div className="flex flex-wrap gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white/60 text-sm font-medium hover:border-accent/40 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </a>
              ))}
            </div>

            {/* Easter egg hint */}
            <p className="text-xs text-white/15 mt-8 font-mono">
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
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm text-white/60">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-accent/50 focus:ring-accent/20 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-white/60">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-accent/50 focus:ring-accent/20 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm text-white/60">Message</Label>
                <Textarea
                  id="message"
                  placeholder="What are you working on?"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-accent/50 focus:ring-accent/20 rounded-lg resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="w-full font-semibold text-sm rounded-lg transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: '#4F8EF7',
                  color: '#080808',
                  boxShadow: '0 0 20px rgba(79,142,247,0.3)',
                }}
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-dark/40 border-t-dark rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send It
                    <Send className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000] px-6 py-3.5 rounded-xl text-sm font-medium shadow-2xl border border-accent/30"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          style={{ background: 'rgba(8,8,8,0.95)', color: '#fff', backdropFilter: 'blur(20px)' }}
        >
          {toast.message}
        </motion.div>
      )}
    </section>
  )
}
