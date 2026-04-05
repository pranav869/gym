'use client'

import { useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  Phone,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  Star,
  Users,
  Award,
} from 'lucide-react'

/* ── Constants ── */
const WHATSAPP_NUMBER  = '15105551234'
const WHATSAPP_MESSAGE = encodeURIComponent('Hi, I want a free trial at APEX GYM! 💪')
const WHATSAPP_URL     = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`
const CALL_NUMBER      = 'tel:+15105551234'
const GYM_BG           = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=85'

/* ── Framer Motion variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const trustBadges = [
  { icon: Users,  label: '500+ Members'       },
  { icon: Star,   label: '4.8★ Rated Gym'     },
  { icon: Award,  label: 'Certified Trainers' },
]

/* ── WhatsApp SVG path (inline, avoids extra dep) ── */
const WA_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z'

function WaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d={WA_PATH} />
    </svg>
  )
}

/* ════════════════════════════════════════════════════
   HERO COMPONENT
════════════════════════════════════════════════════ */
export default function Hero() {
  const [phone,     setPhone]     = useState('')
  const [submitted, setSubmitted] = useState(false)

  /* Scroll target */
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  /* ── Layer 1 – Background: zoom forward + slow parallax ── */
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.28])
  const bgY     = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])

  /* ── Layer 2 – Mid glow: medium drift ── */
  const midY = useTransform(scrollYProgress, [0, 1], ['0px', '-80px'])

  /* ── Layer 3 – Foreground text: faster rise + fade out ── */
  const fgY      = useTransform(scrollYProgress, [0, 0.7], ['0px', '-120px'])
  const fgOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.trim().length >= 8) setSubmitted(true)
  }

  return (
    <>
      {/* ══════════════════════════════════════════════
          SECTION – full-viewport hero
      ══════════════════════════════════════════════ */}
      <section
        ref={containerRef}
        id="hero"
        className="relative min-h-screen overflow-hidden pb-20 sm:pb-0"
      >
        {/* ── LAYER 1 · Background image – scales up on scroll ── */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: bgScale, y: bgY, transformOrigin: 'center top', willChange: 'transform' }}
        >
          <img
            src={GYM_BG}
            alt=""
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
          {/* Radial vignette – blurs / darkens edges for depth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%)',
            }}
          />
        </motion.div>

        {/* ── Colour overlays – gradient + side fade ── */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-zinc-950/65 via-zinc-950/45 to-zinc-950" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-zinc-950/60 via-transparent to-zinc-950/40" />
        {/* Bottom edge glow hint */}
        <div className="absolute bottom-0 left-0 right-0 h-40 z-[1] bg-gradient-to-t from-zinc-950 to-transparent" />

        {/* ── LAYER 2 · Ambient glow orbs – medium drift ── */}
        <motion.div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ y: midY, willChange: 'transform' }}
        >
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/[0.07] rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-orange-400/[0.08] rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-600/[0.06] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.6s' }} />
          {/* dot grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(249,115,22,0.5) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />
        </motion.div>

        {/* ── LAYER 3 · Foreground text – faster rise + fade ── */}
        <motion.div
          className="relative z-10 flex items-center min-h-screen"
          style={{ y: fgY, opacity: fgOpacity, willChange: 'transform, opacity' }}
        >
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center pt-28 pb-24">

            {/* Urgency pill */}
            <motion.div
              variants={fadeUp} custom={0.05} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-bold px-4 py-2 rounded-full mb-8"
            >
              <span className="text-base">🔥</span>
              Only 20 Free Trials Left This Week
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp} custom={0.15} initial="hidden" animate="visible"
              className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.92] tracking-tight mb-5"
            >
              Transform Your Body
              <br />
              <span className="text-gradient">in 90 Days</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUp} custom={0.25} initial="hidden" animate="visible"
              className="text-zinc-300/80 text-base sm:text-xl mb-3 max-w-xl mx-auto leading-relaxed"
            >
              Join 500+ members getting fit daily. Expert coaches, modern equipment, real results.
            </motion.p>

            {/* Trust line */}
            <motion.p
              variants={fadeUp} custom={0.32} initial="hidden" animate="visible"
              className="text-zinc-500 text-sm mb-10"
            >
              No joining fee &nbsp;•&nbsp; Limited slots &nbsp;•&nbsp; Free trial available
            </motion.p>

            {/* ── Lead capture form ── */}
            <motion.div
              variants={fadeUp} custom={0.42} initial="hidden" animate="visible"
              className="mb-6"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-3 bg-orange-500/10 border border-orange-500/40 rounded-2xl px-6 py-5 max-w-lg mx-auto backdrop-blur-sm"
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
                        className="w-full bg-white/[0.06] border border-zinc-700/60 hover:border-orange-500/40 focus:border-orange-500 text-white placeholder-zinc-500 rounded-xl pl-11 pr-4 py-4 text-sm outline-none transition-colors duration-200 backdrop-blur-md"
                      />
                    </div>
                    <motion.button
                      whileHover={{
                        scale: 1.04,
                        boxShadow: '0 0 36px rgba(249,115,22,0.6), 0 0 72px rgba(249,115,22,0.22)',
                      }}
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white font-black text-sm px-7 py-4 rounded-xl flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-orange-500/30 transition-colors duration-200"
                    >
                      Get Free Trial
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Micro-trust */}
              <div className="flex items-center justify-center gap-2 mt-3 text-zinc-600 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                No commitment · Cancel anytime · 100% free trial
              </div>
            </motion.div>

            {/* Secondary links */}
            <motion.div
              variants={fadeUp} custom={0.52} initial="hidden" animate="visible"
              className="flex items-center justify-center gap-4 mb-14"
            >
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors"
              >
                <WaIcon className="w-4 h-4" />
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
              variants={fadeUp} custom={0.6} initial="hidden" animate="visible"
              className="flex flex-wrap items-center justify-center gap-3 mb-16"
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 bg-zinc-900/60 backdrop-blur-md border border-zinc-800/70 text-zinc-300 text-xs font-semibold px-3.5 py-2 rounded-full"
                >
                  <Icon className="w-3.5 h-3.5 text-orange-400" />
                  {label}
                </div>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp} custom={0.7} initial="hidden" animate="visible"
              className="grid grid-cols-3 gap-6 max-w-sm mx-auto"
            >
              {[
                { value: '500+',    label: 'Members'       },
                { value: '4.8★',   label: 'Google Rating' },
                { value: '90 Days', label: 'Avg. Results'  },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-gradient">{s.value}</div>
                  <div className="text-zinc-600 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-1.5 text-zinc-600 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
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
            <WaIcon className="w-4 h-4" />
            Get Free Trial
          </motion.a>
        </div>
      </div>
    </>
  )
}
