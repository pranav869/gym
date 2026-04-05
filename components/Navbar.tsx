'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Zap, Menu, X } from 'lucide-react'

const links = [
  { label: 'About',    href: '#features'     },
  { label: 'Classes',  href: '#classes'      },
  { label: 'Trainers', href: '#testimonials' },
  { label: 'Pricing',  href: '#pricing'      },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  /* Scroll progress drives glassmorphism intensity */
  const { scrollYProgress } = useScroll()
  const bgOpacity   = useTransform(scrollYProgress, [0, 0.06], [0,   1])
  const borderAlpha = useTransform(scrollYProgress, [0, 0.06], [0,   0.15])
  const shadowAlpha = useTransform(scrollYProgress, [0, 0.06], [0,   0.5])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ willChange: 'transform' }}
      >
        {/* Glass panel – opacity driven by scroll */}
        <motion.div
          className="absolute inset-0 backdrop-blur-xl"
          style={{
            backgroundColor: useTransform(bgOpacity,    (v) => `rgba(9,9,11,${v * 0.82})`),
            borderBottom:     useTransform(borderAlpha,  (v) => `1px solid rgba(249,115,22,${v})`),
            boxShadow:        useTransform(shadowAlpha,  (v) => `0 4px 32px rgba(0,0,0,${v})`),
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center glow-orange-sm">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                APEX<span className="text-orange-500">GYM</span>
              </span>
            </motion.a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ y: -1 }}
                  className="text-zinc-400 hover:text-orange-400 text-sm font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-300 group-hover:w-full transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.7)]" />
                </motion.a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <motion.a
                href="#pricing"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 24px rgba(249,115,22,0.5), 0 0 48px rgba(249,115,22,0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                className="pulse-ring bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors duration-200"
              >
                Get Free Pass
              </motion.a>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-zinc-300 hover:text-orange-400 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 z-40 backdrop-blur-2xl bg-zinc-950/90 border-t border-zinc-800/50 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-zinc-300 hover:text-orange-400 text-lg font-semibold py-2 border-b border-zinc-800/40 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#pricing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                onClick={() => setMobileOpen(false)}
                className="mt-2 bg-orange-500 hover:bg-orange-600 text-white text-center font-bold py-3 rounded-lg transition-colors shadow-lg shadow-orange-500/25"
              >
                Get Free Pass
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
