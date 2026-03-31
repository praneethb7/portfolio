'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'
import { GithubIcon } from '@/components/common/Icons'
import { PROJECTS, type Project } from '@/lib/data'

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -8, y: dx * 8 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-xl overflow-hidden cursor-pointer ${featured ? 'md:col-span-2' : ''}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'translateY(-4px)' : ''}`,
        transition: 'transform 0.1s ease-out, box-shadow 0.2s ease',
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(79,142,247,0.1)'
          : '0 4px 20px rgba(0,0,0,0.3)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`} />
      <div className="absolute inset-0 bg-black/40" />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className={`relative z-10 p-6 ${featured ? 'md:p-8' : ''}`}>
        {/* Featured badge */}
        {project.featured && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-accent/20 border border-accent/30 text-accent mb-4">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}

        {/* Title */}
        <h3 className={`font-heading font-black text-white mb-3 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {project.name}
        </h3>

        {/* Description */}
        <p className={`text-white/65 leading-relaxed mb-5 ${featured ? 'text-base max-w-2xl' : 'text-sm'}`}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/10 border border-white/10 text-white/70"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium bg-white/10 border border-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-200"
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
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium bg-accent text-dark hover:bg-blue-400 transition-all duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24">
      <motion.p
        className="text-sm uppercase tracking-[0.3em] text-accent/60 font-mono mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        03 / Projects
      </motion.p>

      <motion.h2
        className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Things I&apos;ve Built
      </motion.h2>

      <motion.p
        className="text-white/40 mb-16 text-base max-w-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        From AI-powered platforms to mobile apps — projects that ship.
      </motion.p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} featured={project.featured} />
        ))}
      </div>
    </section>
  )
}
