'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const WHATSAPP_NUMBER = '15105551234'
const WHATSAPP_MESSAGE = encodeURIComponent('Hi, I want a free trial at APEX GYM! 💪')
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

const testimonials = [
  {
    name: 'Ryan Mitchell',
    role: 'Pro member · 14 months',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    text: 'I lost 32 lbs in 5 months. The trainers here actually care — they track your progress, push you when you need it, and celebrate your wins. APEX completely changed my life.',
    highlight: 'Lost 32 lbs in 5 months',
    result: '-32 lbs',
    verified: true,
  },
  {
    name: 'Sophia Chen',
    role: 'Elite member · 2 years',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    text: 'The community here is unlike anything I\'ve experienced. I came in as a complete beginner and now I coach my own CrossFit team. The 24/7 access is a game changer for my schedule.',
    highlight: 'From beginner to CrossFit coach',
    result: '2 years strong',
    verified: true,
  },
  {
    name: 'Marcus Williams',
    role: 'Pro member · 8 months',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    text: 'The equipment is phenomenal. Olympic platforms, cable stations, saunas — everything is premium and always maintained. Worth every penny of the Pro membership.',
    highlight: 'World-class equipment',
    result: '+18 lbs muscle',
    verified: true,
  },
  {
    name: 'Priya Patel',
    role: 'Basic member · 6 months',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    text: 'I was intimidated by gyms for years. APEX\'s trainers made me feel so welcome. The yoga and group classes are incredible. I\'ve never felt stronger or more confident.',
    highlight: 'Overcame gym anxiety',
    result: 'Confidence ↑↑',
    verified: true,
  },
  {
    name: 'James Rodriguez',
    role: 'Elite member · 3 years',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    text: 'Three years in and I\'m still blown away by the quality. The nutrition coaching paired with training got me competition-ready. I placed 2nd in my first regional powerlifting meet.',
    highlight: 'Competition podium finish',
    result: '2nd place regionals',
    verified: true,
  },
  {
    name: 'Aisha Johnson',
    role: 'Pro member · 11 months',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    text: 'The HIIT classes here are next level. Coach Alex pushes you to your absolute edge but in the safest way. Down 20 lbs, up 15 lbs of muscle. My transformation photos speak for themselves.',
    highlight: 'Incredible body recomposition',
    result: '-20 lbs, +15 lbs muscle',
    verified: true,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-orange-500 text-sm font-bold uppercase tracking-widest mb-4 block">
            Member Stories
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
            Real People. <span className="text-gradient">Real Results.</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Over 12,000 members have transformed their lives at APEX. These are their stories.
          </p>
        </motion.div>

        {/* Google Rating Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-700/50 rounded-2xl px-5 py-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-white font-black text-lg leading-none">4.8</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400 fill-yellow-400 opacity-50'}`} />
                  ))}
                </div>
              </div>
              <div className="text-zinc-500 text-xs">Google Rating · 1,240+ reviews</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-700/50 rounded-2xl px-5 py-3">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white text-[10px] font-black">f</span>
            </div>
            <div>
              <div className="text-white font-black text-lg leading-none">4.9 <span className="text-zinc-400 text-sm font-normal">/ 5</span></div>
              <div className="text-zinc-500 text-xs">Facebook · 890+ reviews</div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="card-glass rounded-2xl p-6 flex flex-col gap-4 hover:border-orange-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 relative group"
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-10 h-10 text-orange-400" />
              </div>

              {/* Stars + verified */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-orange-400 fill-orange-400" />
                  ))}
                </div>
                {t.verified && (
                  <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                    Verified
                  </div>
                )}
              </div>

              {/* Highlight + result badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span className="text-orange-400 text-xs font-bold">{t.highlight}</span>
                </div>
                <div className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1">
                  <span className="text-emerald-400 text-xs font-black">{t.result}</span>
                </div>
              </div>

              {/* Review text */}
              <p className="text-zinc-400 text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-zinc-800/60">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-500/20"
                />
                <div>
                  <div className="text-white font-bold text-sm">{t.name}</div>
                  <div className="text-zinc-600 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((t) => (
                <img
                  key={t.name}
                  src={t.avatar}
                  alt={t.name}
                  className="w-8 h-8 rounded-full border-2 border-zinc-900 object-cover"
                />
              ))}
            </div>
            <span className="text-zinc-400 text-sm">
              <strong className="text-white">12,000+</strong> happy members
            </span>
          </div>
          <div className="w-px h-8 bg-zinc-800 hidden sm:block" />
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 text-orange-400 fill-orange-400" />
              ))}
            </div>
            <span className="text-zinc-400 text-sm">
              <strong className="text-white">4.9/5</strong> average rating
            </span>
          </div>
          <div className="w-px h-8 bg-zinc-800 hidden sm:block" />
          <span className="text-zinc-400 text-sm">
            <strong className="text-white">98%</strong> member retention rate
          </span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-orange-500/30"
          >
            Start Your Transformation
          </motion.a>
          <p className="text-zinc-600 text-xs mt-3">Join 12,000+ members. First week free.</p>
        </motion.div>
      </div>
    </section>
  )
}
