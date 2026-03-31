'use client'

interface MarqueeProps {
  items: string[]
  speed?: number
}

export default function Marquee({ items, speed = 30 }: MarqueeProps) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden py-4 select-none">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #080808, transparent)' }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #080808, transparent)' }} />

      <div
        className="marquee-track flex gap-6 whitespace-nowrap w-max"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-white/10 bg-white/5 text-white/70 hover:text-accent hover:border-accent/30 transition-colors duration-200"
          >
            <span className="w-2 h-2 rounded-full bg-accent/60 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
