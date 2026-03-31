'use client'

import { motion } from 'framer-motion'
import { ACHIEVEMENTS, ACHIEVEMENT_PILLS } from '@/lib/data'
import CountUp from '@/components/common/CountUp'

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 md:px-12 lg:px-24">
      <motion.p
        className="text-sm uppercase tracking-[0.3em] text-accent/60 font-mono mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        05 / Achievements
      </motion.p>

      <motion.h2
        className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        By The Numbers
      </motion.h2>

      {/* Stat cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
        {ACHIEVEMENTS.map((item, i) => (
          <motion.div
            key={item.label}
            className="glass p-6 flex flex-col items-center text-center hover:border-accent/30 transition-colors duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
          >
            <div
              className="font-heading font-black text-4xl md:text-5xl mb-2 group-hover:text-accent transition-colors"
              style={{ color: '#4F8EF7' }}
            >
              <CountUp
                end={item.value}
                duration={2.5}
                suffix={item.suffix}
                prefix={item.prefix}
              />
            </div>
            <div className="text-sm font-semibold text-white/80 mb-1">{item.label}</div>
            <div className="text-xs text-white/40">{item.description}</div>
          </motion.div>
        ))}
      </div>

      {/* Achievement pills */}
      <motion.div
        className="max-w-5xl mx-auto flex flex-wrap gap-3 justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {ACHIEVEMENT_PILLS.map((pill, i) => (
          <motion.span
            key={pill}
            className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium border border-white/10 bg-white/5 text-white/75 hover:border-accent/30 hover:text-white transition-all duration-200"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 12px rgba(79,142,247,0.2)' }}
          >
            {pill}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}
