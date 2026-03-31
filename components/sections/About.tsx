'use client'

import { motion, type Variants } from 'framer-motion'
import { ABOUT_BIO, CURRENTLY, TECH_MARQUEE } from '@/lib/data'
import Marquee from '@/components/common/Marquee'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-24 relative">
      {/* Section label */}
      <motion.p
        className="text-sm uppercase tracking-[0.3em] text-accent/60 font-mono mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        01 / About
      </motion.p>

      <motion.h2
        className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Who I Am
      </motion.h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left: Avatar */}
        <motion.div
          className="flex justify-center md:justify-start"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Outer geometric frame */}
            <div
              className="absolute -inset-4 rounded-2xl opacity-30"
              style={{
                background: 'linear-gradient(135deg, #4F8EF7 0%, transparent 60%)',
                clipPath: 'polygon(0 10%, 10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%)',
              }}
            />
            {/* Animated border */}
            <div
              className="absolute -inset-1 rounded-xl opacity-50"
              style={{
                background: 'linear-gradient(135deg, #4F8EF7, #7c3aed, #4F8EF7)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 4s ease infinite',
                clipPath: 'polygon(0 8%, 8% 0, 92% 0, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0 92%)',
              }}
            />
            {/* Avatar container */}
            <div
              className="relative w-64 h-72 md:w-72 md:h-80 bg-gradient-to-br from-blue-950 to-indigo-950 flex items-center justify-center overflow-hidden"
              style={{
                clipPath: 'polygon(0 8%, 8% 0, 92% 0, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0 92%)',
                border: '1px solid rgba(79,142,247,0.3)',
              }}
            >
              {/* Abstract avatar placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Glow */}
                  <div
                    className="absolute inset-0 rounded-full blur-3xl opacity-40"
                    style={{ background: '#4F8EF7', width: '120px', height: '120px' }}
                  />
                  {/* Initials */}
                  <span
                    className="relative font-heading font-black text-6xl text-accent"
                    style={{ textShadow: '0 0 40px rgba(79,142,247,0.6)' }}
                  >
                    PB
                  </span>
                </div>
              </div>
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'linear-gradient(rgba(79,142,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.3) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Right: Bio */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="space-y-4 mb-8" variants={staggerContainer}>
            {ABOUT_BIO.map((para, i) => (
              <motion.p
                key={i}
                className="text-white/70 leading-relaxed text-base md:text-lg"
                variants={fadeUp}
              >
                {para}
              </motion.p>
            ))}
          </motion.div>

          {/* Currently callout */}
          <motion.div
            className="glass p-5 mt-6"
            variants={fadeUp}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-accent/60 font-mono mb-4">
              Currently
            </p>
            <ul className="space-y-2.5">
              {CURRENTLY.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/75">
                  <span className="text-base leading-5 shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Tech Marquee */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-white/30 font-mono text-center mb-6">
          Technologies I work with
        </p>
        <Marquee items={TECH_MARQUEE} speed={25} />
      </motion.div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}
