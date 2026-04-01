'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense } from 'react'

function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const count = 1200
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04
      ref.current.rotation.x += delta * 0.015
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#5B7FFF"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  )
}

function FloatingRing() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
      ref.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.8, 0.008, 16, 120]} />
      <meshBasicMaterial color="#5B7FFF" transparent opacity={0.25} />
    </mesh>
  )
}

function FloatingRing2() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.25) * 0.5
      ref.current.rotation.z = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.4, 0.005, 16, 120]} />
      <meshBasicMaterial color="#7aaff8" transparent opacity={0.15} />
    </mesh>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      dpr={[1, 1.2]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <ParticleField />
        <FloatingRing />
        <FloatingRing2 />
      </Suspense>
    </Canvas>
  )
}
