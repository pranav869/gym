'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Flame, ArrowRight, Clock } from 'lucide-react'

const WHATSAPP_NUMBER = '15105551234'
const WHATSAPP_MESSAGE = encodeURIComponent('Hi, I want a free trial at APEX GYM! 💪')
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

export default function UrgencyPopup() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 min countdown

  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (!dismissed) setVisible(true)
    }, 6000)
    return () => clearTimeout(showTimer)
  }, [dismissed])

  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [visible])

  const dismiss = () => {
    setVisible(false)
    setDismissed(true)
  }

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const secs = String(timeLeft % 60).padStart(2, '0')

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal — centering wrapper is static; Framer only animates scale/opacity */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="w-full max-w-md pointer-events-auto"
          >
            <div className="bg-zinc-900 border border-orange-500/40 rounded-3xl p-8 shadow-2xl shadow-orange-500/20 relative overflow-hidden">
              {/* Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Close */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-400 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-orange-500/15 border border-orange-500/30 rounded-2xl flex items-center justify-center">
                  <Flame className="w-7 h-7 text-orange-400 fill-orange-400/50" />
                </div>
              </div>

              {/* Headline */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black text-white mb-2">
                  Grab Your Free Pass<br />
                  <span className="text-gradient">Before Slots Fill Up!</span>
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Only <strong className="text-orange-400">20 free passes</strong> available this week.
                  Reserve yours now — no credit card required.
                </p>
              </div>

              {/* Countdown */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-zinc-400 text-sm">Offer expires in</span>
                <div className="flex items-center gap-1">
                  <span className="bg-orange-500/20 border border-orange-500/30 text-orange-300 font-black text-lg px-2.5 py-1 rounded-lg tabular-nums">
                    {mins}
                  </span>
                  <span className="text-orange-400 font-black">:</span>
                  <span className="bg-orange-500/20 border border-orange-500/30 text-orange-300 font-black text-lg px-2.5 py-1 rounded-lg tabular-nums">
                    {secs}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <motion.a
                  href="#pricing"
                  onClick={dismiss}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-base py-4 rounded-xl flex items-center justify-center gap-2 transition-colors glow-orange-sm"
                >
                  Claim My Free Pass Now
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={dismiss}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-500/10 hover:bg-green-500 border border-green-500/30 hover:border-green-500 text-green-400 hover:text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 text-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Or WhatsApp us directly
                </motion.a>
              </div>

              <p className="text-center text-zinc-600 text-xs mt-4">
                No credit card · No commitment · Cancel anytime
              </p>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
