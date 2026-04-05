'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ArrowRight, ChevronDown, ShieldCheck, Star, Users, Award } from 'lucide-react'
import dynamic from 'next/dynamic'

/* Three.js canvas – disabled on SSR (WebGL is browser-only) */
const GymScene = dynamic(() => import('./three/GymScene'), { ssr: false })

const WHATSAPP_NUMBER = '15105551234'
const WHATSAPP_MESSAGE = encodeURIComponent('Hi, I want a free trial at APEX GYM! 💪')
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`
const CALL_NUMBER = 'tel:+15105551234'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

const trustBadges = [
  { icon: Users, label: '500+ Members' },
  { icon: Star, label: '4.8★ Rated Gym' },
  { icon: Award, label: 'Certified Trainers' },
]

export default function Hero() {
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  /* mouse position shared with the 3D scene */
  const mouse = useRef<[number, number]>([0, 0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.trim().length >= 8) setSubmitted(true)
  }

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e
    mouse.current = [
      (clientX / window.innerWidth  - 0.5) * 2,
      (clientY / window.innerHeight - 0.5) * 2,
    ]
  }

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden pb-20 sm:pb-0"
        onMouseMove={onMouseMove}
      >
        {/* ── Dark gradient + subtle grid background ── */}
        <div className="absolute inset-0 z-0 bg-zinc-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(249,115,22,0.08)_0%,transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(59,130,246,0.06)_0%,transparent_60%)]" />
          {/* subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: 'radial-gradient(circle, #f9731622 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* ── 3D Canvas (right side) – absolute fill on mobile, right half on desktop ── */}
        <div className="absolute inset-0 sm:left-1/2 z-0 opacity-90 pointer-events-none sm:pointer-events-auto">
          <GymScene mouse={mouse} />
        </div>

        {/* ── Glow orbs ── */}
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-blue-600/[0.07] rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1.4s' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* text content lives in the LEFT half on md+ */}
        <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl text-left sm:text-center md:text-left">

          {/* Urgency pill */}
          <motion.div
            variants={fadeUp}
            custom={0.05}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-bold px-4 py-2 rounded-full mb-7"
          >
            <span className="text-base">🔥</span>
            Only 20 Free Trials Left This Week
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            custom={0.15}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight mb-4"
          >
            Transform Your Body
            <br />
            <span className="text-gradient">in 90 Days</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            custom={0.25}
            initial="hidden"
            animate="visible"
            className="text-zinc-400 text-base sm:text-lg mb-3 max-w-xl mx-auto leading-relaxed"
          >
            Join 500+ members getting fit daily. Expert coaches, modern equipment, real results.
          </motion.p>

          {/* Trust line */}
          <motion.p
            variants={fadeUp}
            custom={0.32}
            initial="hidden"
            animate="visible"
            className="text-zinc-500 text-sm mb-8"
          >
            No joining fee &nbsp;•&nbsp; Limited slots &nbsp;•&nbsp; Free trial available
          </motion.p>

          {/* Lead capture — phone only */}
          <motion.div
            variants={fadeUp}
            custom={0.42}
            initial="hidden"
            animate="visible"
            className="mb-5"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-3 bg-orange-500/10 border border-orange-500/40 rounded-2xl px-6 py-5"
                >
                  <span className="text-2xl">🎉</span>
                  <div className="text-left">
                    <p className="text-orange-300 font-bold">Free trial confirmed!</p>
                    <p className="text-zinc-500 text-sm">Our trainer will WhatsApp you in 10 minutes.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                >
                  <div className="flex-1 relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-zinc-700/60 hover:border-orange-500/40 focus:border-orange-500 text-white placeholder-zinc-500 rounded-xl pl-11 pr-4 py-4 text-sm outline-none transition-colors duration-200 backdrop-blur-sm"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(249,115,22,0.45)' }}
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-black text-sm px-7 py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-orange-500/25"
                  >
                    Get Free Trial
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Micro trust */}
            <div className="flex items-center justify-center gap-2 mt-3 text-zinc-600 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              No commitment · Cancel anytime · 100% free trial
            </div>
          </motion.div>

          {/* Secondary action — small & subtle */}
          <motion.div
            variants={fadeUp}
            custom={0.52}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-4 mb-12"
          >
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </motion.a>
            <span className="text-zinc-700">·</span>
            <motion.a
              href="#classes"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="text-zinc-500 hover:text-zinc-300 text-sm font-semibold transition-colors"
            >
              View Schedule ↓
            </motion.a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            custom={0.6}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-sm text-zinc-300 text-xs font-semibold px-3.5 py-2 rounded-full"
              >
                <Icon className="w-3.5 h-3.5 text-orange-400" />
                {label}
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            custom={0.7}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-6 max-w-sm mx-auto"
          >
            {[
              { value: '500+', label: 'Members' },
              { value: '4.8★', label: 'Google Rating' },
              { value: '90 Days', label: 'Avg. Results' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-gradient">{s.value}</div>
                <div className="text-zinc-600 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        </div>{/* close max-w-7xl */}

        {/* Scroll hint – absolute so it escapes the flow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-10 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-zinc-700 hidden sm:flex"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── MOBILE STICKY BOTTOM BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
        <div className="bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/80 px-4 py-3 flex gap-3">
          <motion.a
            href={CALL_NUMBER}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm py-3.5 rounded-xl border border-zinc-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </motion.a>
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm py-3.5 rounded-xl shadow-lg shadow-orange-500/30 transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Get Free Trial
          </motion.a>
        </div>
      </div>
    </>
  )
}
