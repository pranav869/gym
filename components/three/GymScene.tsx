'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useRef, useMemo, useEffect, Suspense } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* ── GSAP plugin registration (client-only) ── */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/* ──────────────────────────────────────────
   Core rotating mesh: torus knot + 3 rings
────────────────────────────────────────── */
function CoreMesh({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const groupRef = useRef<THREE.Group>(null)
  const knotRef  = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!groupRef.current || !knotRef.current) return

    /* auto-rotate the knot */
    knotRef.current.rotation.x += delta * 0.22
    knotRef.current.rotation.y += delta * 0.32

    /* mouse parallax – smooth lerp */
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current[0] * 0.55,
      0.04,
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.current[1] * 0.28,
      0.04,
    )

    /* orbit rings */
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.55
    if (ring2Ref.current) ring2Ref.current.rotation.z -= delta * 0.75
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.35
      ring3Ref.current.rotation.z += delta * 0.25
    }
  })

  return (
    <group ref={groupRef}>
      {/* ── Torus knot – main hero object ── */}
      <Float speed={1.8} rotationIntensity={0.12} floatIntensity={0.45}>
        <mesh ref={knotRef} castShadow>
          <torusKnotGeometry args={[1, 0.37, 180, 20, 2, 3]} />
          <meshStandardMaterial
            color="#f97316"
            emissive="#c2410c"
            emissiveIntensity={0.55}
            roughness={0.06}
            metalness={0.95}
          />
        </mesh>
      </Float>

      {/* ── Outer orbit ring (orange) ── */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.5, 0.032, 8, 128]} />
        <meshStandardMaterial
          color="#fb923c"
          emissive="#ea580c"
          emissiveIntensity={0.85}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* ── Mid ring (amber) ── */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[1.9, 0.020, 8, 128]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#d97706"
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* ── Diagonal ring (blue accent) ── */}
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 3]}>
        <torusGeometry args={[3.0, 0.015, 8, 128]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#1d4ed8"
          emissiveIntensity={0.5}
          roughness={0.25}
          metalness={0.75}
        />
      </mesh>
    </group>
  )
}

/* ──────────────────────────────────────────
   Particle field – slow-drifting star cloud
────────────────────────────────────────── */
function ParticleField() {
  const count = 700

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return arr
  }, [])

  const ref = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.014
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.08
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#f97316"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  )
}

/* ──────────────────────────────────────────
   Scroll-driven camera pull-back
────────────────────────────────────────── */
function ScrollCamera() {
  const { camera } = useThree()

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      },
    })
    tl.to(camera.position, { z: 10, y: 1.5, ease: 'none' })

    return () => { tl.kill() }
  }, [camera])

  return null
}

/* ──────────────────────────────────────────
   Exported Canvas component
────────────────────────────────────────── */
export default function GymScene({
  mouse,
}: {
  mouse: React.MutableRefObject<[number, number]>
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 60 }}
      dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 4]}   intensity={3}   color="#f97316" />
        <pointLight position={[-5, -4, -4]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[0, 6, -3]}  intensity={2}   color="#fb923c" />
        <spotLight
          position={[0, 8, 2]}
          intensity={1.2}
          color="#ffffff"
          angle={0.4}
          penumbra={0.9}
        />
        <CoreMesh mouse={mouse} />
        <ParticleField />
        <ScrollCamera />
      </Suspense>
    </Canvas>
  )
}
