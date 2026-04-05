'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Flame, Users, ChevronRight } from 'lucide-react'

const WHATSAPP_NUMBER = '15105551234'
const makeWhatsAppUrl = (className: string, time: string, day: string) => {
  const msg = encodeURIComponent(`Hi! I want to book the ${className} class on ${day} at ${time}. Is there still a spot available? 💪`)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const categories = ['All', 'HIIT', 'Strength', 'Yoga', 'CrossFit', 'Cycling', 'Boxing']

const schedule: Record<string, Array<{
  time: string
  name: string
  trainer: string
  duration: string
  intensity: 'Low' | 'Medium' | 'High'
  spots: number
  category: string
}>> = {
  Mon: [
    { time: '06:00', name: 'Morning HIIT', trainer: 'Alex Carter', duration: '45 min', intensity: 'High', spots: 3, category: 'HIIT' },
    { time: '09:00', name: 'Power Yoga', trainer: 'Priya Sharma', duration: '60 min', intensity: 'Low', spots: 12, category: 'Yoga' },
    { time: '12:00', name: 'Strength & Conditioning', trainer: 'Marcus Webb', duration: '55 min', intensity: 'High', spots: 8, category: 'Strength' },
    { time: '18:00', name: 'Evening CrossFit', trainer: 'Jordan Lee', duration: '60 min', intensity: 'High', spots: 0, category: 'CrossFit' },
    { time: '20:00', name: 'Spin Cycling', trainer: 'Nadia Torres', duration: '45 min', intensity: 'Medium', spots: 5, category: 'Cycling' },
  ],
  Tue: [
    { time: '06:30', name: 'Boxing Bootcamp', trainer: 'Marcus Webb', duration: '50 min', intensity: 'High', spots: 6, category: 'Boxing' },
    { time: '10:00', name: 'Vinyasa Flow', trainer: 'Priya Sharma', duration: '60 min', intensity: 'Low', spots: 15, category: 'Yoga' },
    { time: '17:00', name: 'Olympic Lifting', trainer: 'Alex Carter', duration: '75 min', intensity: 'High', spots: 4, category: 'Strength' },
    { time: '19:00', name: 'HIIT Blast', trainer: 'Jordan Lee', duration: '45 min', intensity: 'High', spots: 2, category: 'HIIT' },
  ],
  Wed: [
    { time: '07:00', name: 'Morning Yoga', trainer: 'Priya Sharma', duration: '60 min', intensity: 'Low', spots: 20, category: 'Yoga' },
    { time: '12:00', name: 'Lunchtime HIIT', trainer: 'Nadia Torres', duration: '30 min', intensity: 'High', spots: 7, category: 'HIIT' },
    { time: '17:30', name: 'CrossFit WOD', trainer: 'Jordan Lee', duration: '60 min', intensity: 'High', spots: 0, category: 'CrossFit' },
    { time: '19:00', name: 'Functional Strength', trainer: 'Marcus Webb', duration: '55 min', intensity: 'Medium', spots: 9, category: 'Strength' },
    { time: '20:30', name: 'Evening Spin', trainer: 'Alex Carter', duration: '45 min', intensity: 'Medium', spots: 11, category: 'Cycling' },
  ],
  Thu: [
    { time: '06:00', name: 'HIIT & Core', trainer: 'Alex Carter', duration: '45 min', intensity: 'High', spots: 5, category: 'HIIT' },
    { time: '09:30', name: 'Restorative Yoga', trainer: 'Priya Sharma', duration: '75 min', intensity: 'Low', spots: 18, category: 'Yoga' },
    { time: '18:00', name: 'Boxing Fundamentals', trainer: 'Marcus Webb', duration: '60 min', intensity: 'Medium', spots: 8, category: 'Boxing' },
    { time: '19:30', name: 'Strength Circuit', trainer: 'Nadia Torres', duration: '50 min', intensity: 'High', spots: 3, category: 'Strength' },
  ],
  Fri: [
    { time: '06:00', name: 'CrossFit Friday', trainer: 'Jordan Lee', duration: '60 min', intensity: 'High', spots: 1, category: 'CrossFit' },
    { time: '11:00', name: 'Mindful Yoga', trainer: 'Priya Sharma', duration: '60 min', intensity: 'Low', spots: 22, category: 'Yoga' },
    { time: '17:00', name: 'Power HIIT', trainer: 'Alex Carter', duration: '45 min', intensity: 'High', spots: 4, category: 'HIIT' },
    { time: '19:00', name: 'Spin Party', trainer: 'Nadia Torres', duration: '45 min', intensity: 'Medium', spots: 6, category: 'Cycling' },
  ],
  Sat: [
    { time: '08:00', name: 'Weekend Warrior HIIT', trainer: 'Marcus Webb', duration: '60 min', intensity: 'High', spots: 0, category: 'HIIT' },
    { time: '10:00', name: 'Olympic Lifting Workshop', trainer: 'Alex Carter', duration: '90 min', intensity: 'High', spots: 5, category: 'Strength' },
    { time: '12:00', name: 'CrossFit Competition Prep', trainer: 'Jordan Lee', duration: '75 min', intensity: 'High', spots: 7, category: 'CrossFit' },
    { time: '15:00', name: 'Saturday Yoga', trainer: 'Priya Sharma', duration: '60 min', intensity: 'Low', spots: 16, category: 'Yoga' },
  ],
  Sun: [
    { time: '09:00', name: 'Sunday Stretch & Flow', trainer: 'Priya Sharma', duration: '75 min', intensity: 'Low', spots: 25, category: 'Yoga' },
    { time: '11:00', name: 'Light Spin Recovery', trainer: 'Nadia Torres', duration: '45 min', intensity: 'Low', spots: 14, category: 'Cycling' },
    { time: '16:00', name: 'Boxing Cardio', trainer: 'Marcus Webb', duration: '50 min', intensity: 'Medium', spots: 10, category: 'Boxing' },
  ],
}

const intensityConfig = {
  Low: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  Medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  High: { color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
}

export default function ClassSchedule() {
  const [activeDay, setActiveDay] = useState('Mon')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = schedule[activeDay].filter(
    (cls) => activeCategory === 'All' || cls.category === activeCategory
  )

  return (
    <section id="classes" className="py-24 bg-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-orange-500 text-sm font-bold uppercase tracking-widest mb-4 block">
            Weekly Schedule
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
            Find Your <span className="text-gradient">Perfect Class</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            200+ weekly sessions across every fitness discipline. Book your spot and secure your transformation.
          </p>
        </motion.div>

        {/* Day selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-6 flex-wrap"
        >
          {days.map((day) => (
            <motion.button
              key={day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                activeDay === day
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-zinc-800/60 text-zinc-400 hover:text-orange-400 hover:bg-zinc-800'
              }`}
            >
              {day}
            </motion.button>
          ))}
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-10 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-orange-500/20 border-orange-500/60 text-orange-400'
                  : 'border-zinc-700/50 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Classes list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay + activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {filtered.length === 0 ? (
              <div className="col-span-2 text-center py-16 text-zinc-600">
                <p className="text-lg font-semibold">No classes scheduled</p>
                <p className="text-sm mt-1">Try a different day or category</p>
              </div>
            ) : (
              filtered.map((cls, i) => {
                const intensity = intensityConfig[cls.intensity]
                const isFull = cls.spots === 0
                return (
                  <motion.div
                    key={cls.time + cls.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="card-glass rounded-2xl p-5 flex items-center gap-5 group hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5"
                  >
                    {/* Time */}
                    <div className="text-center min-w-[52px]">
                      <div className="text-orange-400 font-black text-lg leading-none">{cls.time}</div>
                      <div className="text-zinc-600 text-xs mt-1">AM/PM</div>
                    </div>

                    <div className="w-px h-12 bg-zinc-700/60" />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-white font-bold text-base group-hover:text-orange-400 transition-colors">
                          {cls.name}
                        </h3>
                        <span className={`text-xs font-semibold border px-2 py-0.5 rounded-full ${intensity.bg} ${intensity.color}`}>
                          {cls.intensity}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-zinc-500 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {cls.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5" />
                          {cls.trainer}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {isFull ? (
                            <span className="text-red-400 font-semibold">Full</span>
                          ) : (
                            <span className="text-emerald-400">{cls.spots} spots</span>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Book button → WhatsApp */}
                    {isFull ? (
                      <div className="flex items-center gap-1 text-sm font-bold px-4 py-2 rounded-lg bg-zinc-800 text-zinc-600 cursor-not-allowed">
                        Full
                      </div>
                    ) : (
                      <motion.a
                        href={makeWhatsAppUrl(cls.name, cls.time, activeDay)}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-lg bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white border border-green-500/30 hover:border-green-500 transition-all duration-200"
                      >
                        Book
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      </motion.a>
                    )}
                  </motion.div>
                )
              })
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <p className="text-zinc-500 text-sm mb-4">All classes included in Pro & Elite memberships</p>
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors duration-200 shadow-lg shadow-orange-500/25"
          >
            View Membership Plans
            <ChevronRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
