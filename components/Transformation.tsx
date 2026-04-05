'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Trophy, TrendingUp } from 'lucide-react'

const transformations = [
  {
    name: 'Ryan M.',
    duration: '5 months',
    loss: '32 lbs',
    stat: 'Fat Loss',
    before: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    after: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80',
    quote: 'I went from couch to athlete in 5 months. APEX changed everything.',
  },
  {
    name: 'Aisha J.',
    duration: '11 months',
    loss: '-20 lbs / +15 lbs muscle',
    stat: 'Body Recomp',
    before: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    after: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    quote: 'The HIIT + nutrition coaching combo is absolutely elite.',
  },
  {
    name: 'Marcus W.',
    duration: '8 months',
    loss: '+18 lbs muscle',
    stat: 'Muscle Gain',
    before: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80',
    after: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80',
    quote: 'Olympic lifts, premium sauna, coaches who actually care.',
  },
]

function BeforeAfterSlider({ before, after, name }: { before: string; after: string; name: string }) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setPosition(pct)
  }, [])

  const onMouseDown = () => { dragging.current = true }
  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) updatePosition(e.clientX) }
  const onMouseUp = () => { dragging.current = false }
  const onTouchMove = (e: React.TouchEvent) => { updatePosition(e.touches[0].clientX) }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden select-none cursor-col-resize"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* After (base) */}
      <img src={after} alt={`${name} after`} className="absolute inset-0 w-full h-full object-cover" />

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={before} alt={`${name} before`} className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: containerRef.current?.offsetWidth || 300 }} />
      </div>

      {/* Divider */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg shadow-black/60" style={{ left: `${position}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-4 bg-zinc-400 rounded" />
            <div className="w-0.5 h-4 bg-zinc-400 rounded" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3">
        <span className="bg-zinc-950/80 text-zinc-300 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">BEFORE</span>
      </div>
      <div className="absolute top-3 right-3">
        <span className="bg-orange-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">AFTER</span>
      </div>
    </div>
  )
}

const WHATSAPP_NUMBER = '15105551234'
const WHATSAPP_MESSAGE = encodeURIComponent('Hi, I want a free trial at APEX GYM! 💪')
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

export default function Transformation() {
  return (
    <section id="transformations" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 text-sm font-bold uppercase tracking-widest mb-4 block">
            Transformations
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
            See the <span className="text-gradient">Proof</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Drag the slider to see real member transformations. These results were achieved with our coaches, nutrition plans, and training programs.
          </p>
        </motion.div>

        {/* Slider cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transformations.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col gap-4"
            >
              <BeforeAfterSlider before={t.before} after={t.after} name={t.name} />

              {/* Card info */}
              <div className="card-glass rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold">{t.name}</div>
                    <div className="text-zinc-500 text-xs">{t.duration} at APEX</div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1">
                    <Trophy className="w-3.5 h-3.5 text-orange-400" />
                    <span className="text-orange-400 text-xs font-black">{t.loss}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400 text-sm">
                  <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <p className="italic">&ldquo;{t.quote}&rdquo;</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <p className="text-zinc-500 text-sm mb-5">
            Over <strong className="text-white">12,000 members</strong> have started their transformation. Will you be next?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-orange-500/30"
            >
              Start My Transformation
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 border border-green-500/40 hover:border-green-500 text-green-400 hover:text-white hover:bg-green-500 font-bold px-8 py-4 rounded-xl transition-all duration-200"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Chat on WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
