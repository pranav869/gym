'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'

const WHATSAPP_NUMBER = '15105551234'
const WHATSAPP_MESSAGE = encodeURIComponent('Hi, I want a free trial at APEX GYM! 💪')
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

export default function FloatingCTA() {
  const [cardVisible, setCardVisible] = useState(false)
  const [cardDismissed, setCardDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!cardDismissed) setCardVisible(true)
    }, 4000)
    return () => clearTimeout(timer)
  }, [cardDismissed])

  const dismissCard = () => {
    setCardVisible(false)
    setCardDismissed(true)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup card */}
      <AnimatePresence>
        {cardVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="relative card-glass border border-green-500/30 rounded-2xl p-4 w-[270px] shadow-2xl shadow-black/60"
          >
            <button
              onClick={dismissCard}
              className="absolute top-2.5 right-2.5 text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold">Trainer online now</span>
            </div>

            <p className="text-white font-bold text-sm mb-1">Chat with us on WhatsApp</p>
            <p className="text-zinc-400 text-xs leading-relaxed mb-3">
              Get your free trial pass in under 2 minutes. No commitment needed.
            </p>

            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={dismissCard}
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors w-full"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp — "Hi, I want a free trial"
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp FAB */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex flex-col items-center justify-center shadow-xl shadow-green-500/40 transition-colors duration-200 pulse-ring gap-0.5"
        style={{ '--tw-shadow-color': 'rgba(34,197,94,0.4)' } as React.CSSProperties}
      >
        <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="text-white text-[9px] font-bold leading-none">WhatsApp</span>
      </motion.a>
    </div>
  )
}
