'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'

interface TorchContextType {
  torchActive: boolean
  toggleTorch: () => void
}

const TorchContext = createContext<TorchContextType>({
  torchActive: false,
  toggleTorch: () => {},
})

export function useTorch() {
  return useContext(TorchContext)
}

export function TorchProvider({ children }: { children: React.ReactNode }) {
  const [torchActive, setTorchActive] = useState(false)

  const toggleTorch = () => setTorchActive((v) => !v)

  return (
    <TorchContext.Provider value={{ torchActive, toggleTorch }}>
      {children}
      {torchActive && <TorchOverlay />}
    </TorchContext.Provider>
  )
}

function TorchOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const update = () => {
      if (overlayRef.current) {
        const { x, y } = mouse.current
        overlayRef.current.style.background =
          `radial-gradient(circle 300px at ${x}px ${y}px, transparent 0%, rgba(0,0,0,0.97) 100%)`
      }
      raf.current = requestAnimationFrame(update)
    }
    raf.current = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      className="torch-overlay"
      style={{ background: 'rgba(0,0,0,0.97)' }}
    />
  )
}
