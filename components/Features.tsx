'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useCallback } from 'react'
import {
  Clock,
  Dumbbell,
  Flame,
  Users,
  Droplets,
  ShieldCheck,
  Wifi,
  Heart,
} from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: '24/7 Access',
    desc: 'Train on your schedule. Our facility never closes — because your goals don\'t sleep.',
    color: 'from-orange-500/20 to-orange-600/5',
    border: 'border-orange-500/20',
  },
  {
    icon: Dumbbell,
    title: 'Olympic Equipment',
    desc: 'Over 500 pieces of professional-grade equipment from top global brands.',
    color: 'from-orange-500/20 to-orange-600/5',
    border: 'border-orange-500/20',
  },
  {
    icon: Droplets,
    title: 'Sauna & Recovery',
    desc: 'Premium sauna, ice baths, and recovery zones to maximize performance.',
    color: 'from-orange-500/20 to-orange-600/5',
    border: 'border-orange-500/20',
  },
  {
    icon: Users,
    title: 'Elite Trainers',
    desc: 'Certified coaches with proven track records in sports, bodybuilding & wellness.',
    color: 'from-orange-500/20 to-orange-600/5',
    border: 'border-orange-500/20',
  },
  {
    icon: Flame,
    title: 'Group Classes',
    desc: '200+ weekly classes spanning HIIT, yoga, CrossFit, cycling, and more.',
    color: 'from-orange-500/20 to-orange-600/5',
    border: 'border-orange-500/20',
  },
  {
    icon: Heart,
    title: 'Nutrition Coaching',
    desc: 'Personalized meal plans and nutrition guidance to complement your training.',
    color: 'from-orange-500/20 to-orange-600/5',
    border: 'border-orange-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Safe Environment',
    desc: 'Clean, secure, and welcoming space with 24/7 CCTV and on-site staff.',
    color: 'from-orange-500/20 to-orange-600/5',
    border: 'border-orange-500/20',
  },
  {
    icon: Wifi,
    title: 'Smart Tech',
    desc: 'Track workouts via our app, access on-demand sessions & performance analytics.',
    color: 'from-orange-500/20 to-orange-600/5',
    border: 'border-orange-500/20',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

/* ── 3-D tilt card – reacts to mouse position ── */
function TiltCard({
  feature,
  delay,
}: {
  feature: typeof features[0]
  delay: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = feature.icon

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = (e.clientX - left) / width  - 0.5   // -0.5 … 0.5
    const y = (e.clientY - top)  / height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale3d(1.03,1.03,1.03)`
    card.style.boxShadow = `${-x * 12}px ${-y * 10}px 30px rgba(249,115,22,0.15)`
  }, [])

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
    card.style.boxShadow = ''
  }, [])

  return (
    <motion.div
      variants={cardVariants}
      custom={delay}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ transition: 'transform 0.15s ease, box-shadow 0.15s ease', willChange: 'transform' }}
        className={`card-glass rounded-2xl p-6 cursor-default group h-full ${feature.border} hover:border-orange-500/40`}
      >
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-orange-400" strokeWidth={2} />
        </div>
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors">
          {feature.title}
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
          {feature.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 text-sm font-bold uppercase tracking-widest mb-4 block">
            Why Choose APEX
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
            Everything You Need to{' '}
            <span className="text-gradient">Dominate</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            World-class facilities, elite trainers, and a community that pushes you further than you ever thought possible.
          </p>
        </motion.div>

        {/* Features grid – 3-D tilt cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature, i) => (
            <TiltCard key={feature.title} feature={feature} delay={i * 0.07} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-orange-500/10 hover:bg-orange-500 border border-orange-500/40 hover:border-orange-500 text-orange-400 hover:text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300"
          >
            Start Your Journey Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
