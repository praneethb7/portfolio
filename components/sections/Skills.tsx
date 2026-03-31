'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SKILLS } from '@/lib/data'
import { cn } from '@/lib/utils'

const pillVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, delay: i * 0.04 },
  }),
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(SKILLS[0].label)

  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-24">
      <motion.p
        className="text-sm uppercase tracking-[0.3em] text-accent/60 font-mono mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        04 / Skills
      </motion.p>

      <motion.h2
        className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        My Toolbox
      </motion.h2>

      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Tabs
          defaultValue={SKILLS[0].label}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Tab List */}
          <TabsList className="flex flex-wrap gap-2 h-auto bg-transparent p-0 mb-10">
            {SKILLS.map((cat) => (
              <TabsTrigger
                key={cat.label}
                value={cat.label}
                className={cn(
                  'px-5 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200',
                  activeTab === cat.label
                    ? 'bg-[#4F8EF7] text-[#080808] border-[#4F8EF7] shadow-[0_0_20px_rgba(79,142,247,0.3)]'
                    : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/80'
                )}
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Panels */}
          {SKILLS.map((cat) => (
            <TabsContent key={cat.label} value={cat.label} className="mt-0">
              <AnimatePresence mode="wait">
                {activeTab === cat.label && (
                  <motion.div
                    key={cat.label}
                    className="flex flex-wrap gap-3"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {cat.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        custom={i}
                        variants={pillVariants}
                        whileHover={{
                          scale: 1.06,
                          boxShadow: '0 0 16px rgba(79,142,247,0.35)',
                          borderColor: 'rgba(79,142,247,0.5)',
                          color: '#4F8EF7',
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-white/10 bg-white/5 text-white/70 cursor-default transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </section>
  )
}
