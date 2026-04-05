'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    /* hide native cursor site-wide */
    document.documentElement.style.cursor = 'none'

    const dot  = dotRef.current!
    const ring = ringRef.current!

    const onMove = (e: MouseEvent) => {
      /* dot follows instantly */
      gsap.set(dot, { x: e.clientX, y: e.clientY })
      /* ring follows with slight lag */
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.12,
        ease: 'power2.out',
      })
    }

    const onEnter = () => {
      gsap.to(ring, { scale: 2, opacity: 0.6, duration: 0.25 })
      gsap.to(dot,  { scale: 0, duration: 0.2 })
    }

    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.25 })
      gsap.to(dot,  { scale: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMove)

    /* enlarge on interactive elements */
    const interactives = document.querySelectorAll('a, button, [role="button"]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.style.cursor = ''
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {/* inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ transform: 'translate(-50%,-50%)' }}
      >
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>

      {/* outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{ transform: 'translate(-50%,-50%)' }}
      >
        <div className="w-8 h-8 rounded-full border border-orange-400 opacity-80" />
      </div>
    </>
  )
}
