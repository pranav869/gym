'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#features' },
  { label: 'Classes', href: '#classes' },
  { label: 'Trainers', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-lg shadow-black/40' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-2 group"
            >
              <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center glow-orange-sm">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                APEX<span className="text-orange-500">GYM</span>
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ y: -1 }}
                  className="text-zinc-400 hover:text-orange-400 text-sm font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.05 }}
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
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-16 left-0 right-0 z-40 glass border-t border-zinc-800/50 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-zinc-300 hover:text-orange-400 text-lg font-semibold py-2 border-b border-zinc-800/50 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#pricing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setMobileOpen(false)}
                className="mt-2 bg-orange-500 hover:bg-orange-600 text-white text-center font-bold py-3 rounded-lg transition-colors"
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
