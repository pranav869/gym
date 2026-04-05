'use client'

import { motion } from 'framer-motion'
import { Check, CalendarDays, Trophy, Dumbbell, ShieldCheck, RefreshCw, Zap, ArrowRight } from 'lucide-react'

const WHATSAPP_PT = `https://wa.me/15105551234?text=${encodeURIComponent('Hi, I want to know more about Personal Training at APEX GYM!')}`

type Plan = {
  name: string
  icon: React.ElementType
  price: number
  period: string
  tagline: string
  highlight: boolean
  badge: string | null
  features: string[]
  cta: string
}

const membershipPlans: Plan[] = [
  {
    name: 'Monthly',
    icon: CalendarDays,
    price: 1000,
    period: 'month',
    tagline: 'Flexible, commitment-free access',
    highlight: false,
    badge: null,
    features: [
      'Full gym floor access',
      'Access to all equipment',
      'Basic guidance from trainers',
      'Flexible timings',
    ],
    cta: 'Join Now',
  },
  {
    name: 'Yearly',
    icon: Trophy,
    price: 10000,
    period: 'year',
    tagline: 'Best value — save Rs.2,000',
    highlight: true,
    badge: 'Best Value',
    features: [
      'Full gym floor access',
      'All equipment access',
      'Basic trainer support',
      'Priority entry during peak hours',
      'Save Rs.2,000 vs monthly',
    ],
    cta: 'Get Best Value',
  },
]

const ptFeatures = [
  'Dedicated personal trainer',
  'Customized workout plan',
  'Diet & nutrition guidance',
  'Weekly progress tracking',
  'Form correction & injury prevention',
  'Faster results & accountability',
]

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-500/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-14"
        >
          <span className="text-orange-500 text-sm font-bold uppercase tracking-widest mb-4 block">
            Membership Plans
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Simple, Honest <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            No hidden charges. No complicated tiers. Just pick your plan and start training today.
          </p>
        </motion.div>

        {/* Membership plan cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        >
          {membershipPlans.map((plan, i) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                custom={i * 0.1}
                whileHover={{
                  y: -6,
                  boxShadow: plan.highlight
                    ? '0 20px 60px rgba(249,115,22,0.25)'
                    : '0 12px 40px rgba(0,0,0,0.4)',
                }}
                className={`relative rounded-2xl p-7 border transition-colors duration-300 ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-zinc-900 to-zinc-950 border-orange-500/60 shadow-2xl shadow-orange-500/15'
                    : 'card-glass hover:border-zinc-600/60'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-orange-500 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/40 whitespace-nowrap">
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${plan.highlight ? 'bg-orange-500' : 'bg-zinc-800'}`}>
                    <Icon className={`w-5 h-5 ${plan.highlight ? 'text-white' : 'text-zinc-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-xl">{plan.name} Plan</h3>
                    <p className="text-zinc-500 text-xs mt-0.5">{plan.tagline}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-black ${plan.highlight ? 'text-orange-400' : 'text-zinc-400'}`}>
                      Rs.
                    </span>
                    <span className={`text-6xl font-black leading-none ${plan.highlight ? 'text-gradient' : 'text-white'}`}>
                      {plan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-zinc-500 text-sm ml-1">/ {plan.period}</span>
                  </div>
                  {plan.highlight && (
                    <p className="text-emerald-400 text-xs font-semibold mt-1.5">
                      Just Rs.833/month when billed yearly
                    </p>
                  )}
                </div>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full block text-center font-bold py-3.5 rounded-xl mb-6 transition-all duration-200 text-sm flex items-center justify-center gap-2 ${
                    plan.highlight
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-600'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                <div className="h-px bg-zinc-800/80 mb-5" />

                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? 'bg-orange-500/20' : 'bg-zinc-800'}`}>
                        <Check className={`w-3 h-3 ${plan.highlight ? 'text-orange-400' : 'text-zinc-400'}`} />
                      </div>
                      <span className="text-zinc-400 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Personal Training card — badge sits ABOVE card in normal flow */}
        <motion.div
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-10"
        >
          {/* Badge row */}
          <div className="flex justify-center mb-[-14px] relative z-10">
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-lg shadow-orange-500/50 flex items-center gap-1.5 whitespace-nowrap">
              <Zap className="w-3.5 h-3.5 fill-white" />
              Recommended for Fast Results
            </div>
          </div>

          {/* Card */}
          <motion.div
            whileHover={{ y: -6, boxShadow: '0 24px 70px rgba(249,115,22,0.2)' }}
            className="relative rounded-2xl border border-orange-500/40 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-7 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/[0.08] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-600/[0.05] rounded-full blur-2xl pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-4">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/40">
                    <Dumbbell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-2xl">Personal Training</h3>
                    <p className="text-zinc-500 text-xs mt-0.5">1-on-1 with a dedicated trainer</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-orange-400 text-2xl font-black">Rs.</span>
                    <span className="text-6xl font-black text-gradient leading-none">3,000</span>
                    <span className="text-zinc-500 text-sm ml-1">/ month</span>
                  </div>
                  <p className="text-zinc-500 text-xs mt-1.5">Includes all gym access · No extra charges</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(249,115,22,0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black px-7 py-3.5 rounded-xl transition-colors duration-200 text-sm"
                  >
                    Get Free Trial
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href={WHATSAPP_PT}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 border border-green-500/40 hover:border-green-500 text-green-400 hover:text-white hover:bg-green-500 font-bold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Ask on WhatsApp
                  </motion.a>
                </div>
              </div>

              <div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-4">What&apos;s included</p>
                <ul className="space-y-3">
                  {ptFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-orange-400" />
                      </div>
                      <span className="text-zinc-300 text-sm font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust footer */}
        <motion.div
          variants={fadeUp}
          custom={0.3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-zinc-500"
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            No hidden charges
          </div>
          <div className="text-zinc-700">·</div>
          <div className="flex items-center gap-1.5">
            <RefreshCw className="w-4 h-4 text-emerald-500" />
            Cancel anytime
          </div>
          <div className="text-zinc-700">·</div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-orange-400" />
            Start with a free trial
          </div>
        </motion.div>
      </div>
    </section>
  )
}
