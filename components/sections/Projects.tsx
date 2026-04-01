'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Star, Zap } from 'lucide-react'
import { GithubIcon } from '@/components/common/Icons'
import { PROJECTS, type Project } from '@/lib/data'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -7, y: dx * 7 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
    if (borderRef.current) borderRef.current.style.animation = 'none'
  }

  const handleMouseEnter = () => {
    setHovered(true)
    if (borderRef.current) {
      borderRef.current.style.animation = 'border-travel 2s ease infinite'
    }
  }

  return (
    <motion.div
      className="relative w-full"
      style={{ willChange: 'transform' }}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      {/* Traveling border wrapper */}
      <div
        ref={borderRef}
        style={{
          background: hovered
            ? 'linear-gradient(90deg, var(--accent), var(--accent-warm), var(--accent), var(--accent-warm))'
            : 'transparent',
          backgroundSize: '300% 300%',
          padding: hovered ? '1px' : '0',
          borderRadius: '16px',
          height: '100%',
          transition: 'padding 0.2s',
        }}
      >
        <div
          ref={cardRef}
          className="relative rounded-[15px] overflow-hidden cursor-pointer h-full"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'translateY(-4px)' : ''}`,
            transition: 'transform 0.1s ease-out',
            border: hovered ? 'none' : '1px solid rgba(255,255,255,0.07)',
            background: '#0f0f12',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          <div
            className="absolute inset-[-1px] rounded-[15px] z-0 pointer-events-none"
            style={{
              background: hovered
                ? 'conic-gradient(from var(--border-angle, 0deg), transparent 20%, var(--accent) 40%, #7c3aed 50%, var(--accent) 60%, transparent 80%)'
                : 'transparent',
              animation: hovered ? 'rotateBorder 2.5s linear infinite' : 'none',
              opacity: hovered ? 0.6 : 0,
            }}
          />

          <div
            className="relative z-10 rounded-[14px] overflow-hidden"
            style={{ background: '#0f0f12', margin: hovered ? '1px' : '0' }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
            <div className="absolute inset-0 bg-black/80" />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative z-10 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                {project.badge ? (
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold border"
                    style={{
                      background: 'rgba(91,127,255,0.12)',
                      borderColor: 'rgba(91,127,255,0.35)',
                      color: 'var(--accent)',
                    }}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    {project.badge}
                  </div>
                ) : (
                  <div />
                )}
                {project.featured && (
                  <Zap className="w-4 h-4 opacity-40" style={{ color: 'var(--accent)' }} />
                )}
              </div>

              <h3
                className="font-heading font-black text-xl mb-3 transition-colors duration-300"
                style={{ color: hovered ? 'var(--accent)' : 'var(--text-primary)' }}
              >
                {project.name}
              </h3>

              <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-medium border"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.65)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/20"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.75)',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{ background: 'var(--accent)', color: 'var(--surface)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.94, 1, 1, 1.06])
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-28 relative overflow-hidden"
      style={{ background: '#0d0a14', position: 'relative', zIndex: 1 }}
    >
      {/* Section number watermark */}
      <div aria-hidden className="section-number-bg">03</div>

      <motion.div style={{ scale, opacity }}>
        <div className="px-6 md:px-12 lg:px-24">
          <motion.p
            className="text-sm uppercase tracking-[0.3em] font-mono mb-4 relative z-10"
            style={{ color: 'var(--accent)', opacity: 0.6 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            03 / Projects
          </motion.p>

          <motion.h2
            className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-4 relative z-10"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Things I&apos;ve Built
          </motion.h2>

          <motion.p
            className="mb-10 text-base max-w-xl relative z-10"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.2 }}
          >
            From AI-powered platforms to mobile apps — projects that ship.
          </motion.p>
        </div>

        {/* Vertical stacked, alternating alignment */}
        <div className="relative z-10 flex flex-col gap-6 px-6 md:px-12 lg:px-24">
          {PROJECTS.map((project, i) => {
            const isRight = i % 2 === 1
            return (
              <motion.div
                key={project.name}
                className="flex"
                style={{ justifyContent: isRight ? 'flex-end' : 'flex-start' }}
                initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ width: '80%' }}>
                  <ProjectCard project={project} index={i} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
