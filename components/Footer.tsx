'use client'

import { motion } from 'framer-motion'
import { Zap, MapPin, Clock, Phone, Mail, Instagram, Twitter, Youtube, Facebook } from 'lucide-react'

const footerLinks = {
  Company: ['About Us', 'Careers', 'Press', 'Blog'],
  Services: ['Personal Training', 'Group Classes', 'Nutrition Coaching', 'Online Programs'],
  Support: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
}

const hours = [
  { day: 'Monday – Friday', time: '5:00 AM – 11:00 PM' },
  { day: 'Saturday', time: '6:00 AM – 10:00 PM' },
  { day: 'Sunday', time: '7:00 AM – 9:00 PM' },
  { day: 'Members (24/7 Key)', time: 'Always Open' },
]

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/60 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      {/* CTA Banner */}
      <div className="border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Ready to transform your life?
              </h3>
              <p className="text-zinc-500 text-sm">Join 12,000+ members. First week absolutely free.</p>
            </div>
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-orange-500/30 whitespace-nowrap pulse-ring"
            >
              Start Free Today
            </motion.a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-black text-white">
                APEX<span className="text-orange-500">GYM</span>
              </span>
            </a>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-xs">
              Premium fitness destination where champions are built. World-class equipment, elite trainers, and a community that drives results.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-zinc-500 text-sm">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>2450 Fitness Boulevard, Suite 100<br />Los Angeles, CA 90001</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-500 text-sm">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>+1 (310) 555-APEX</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-500 text-sm">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>hello@apexgym.com</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                    className="w-9 h-9 bg-zinc-800 hover:bg-orange-500 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-zinc-500 hover:text-orange-400 text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Google Map */}
        <div className="mt-12 pt-8 border-t border-zinc-800/60">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                Find Us
              </h4>
              <motion.a
                href="https://maps.google.com/?q=2450+Fitness+Boulevard+Los+Angeles+CA"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 bg-orange-500/10 hover:bg-orange-500 border border-orange-500/30 hover:border-orange-500 text-orange-400 hover:text-white text-sm font-bold px-4 py-2 rounded-lg transition-all duration-200"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </motion.a>
            </div>
            <div className="rounded-2xl overflow-hidden border border-zinc-800/60 h-56">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7259820685165!2d-118.24368!3d34.05223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="APEX GYM Location"
              />
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                Opening Hours
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {hours.map((h) => (
                  <div key={h.day} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-zinc-500">{h.day}</span>
                    <span className={`font-semibold ${h.time === 'Always Open' ? 'text-orange-400' : 'text-zinc-300'}`}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                Stay in the loop
              </h4>
              <p className="text-zinc-500 text-sm mb-4">
                Get weekly workout tips, nutrition advice, and member-exclusive deals.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-zinc-900 border border-zinc-700/60 hover:border-orange-500/40 focus:border-orange-500 text-white placeholder-zinc-600 rounded-lg px-4 py-2.5 text-sm outline-none transition-colors duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-lg text-sm transition-colors duration-200 whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-zinc-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <p>© 2025 APEX GYM. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for champions · Los Angeles, CA
          </p>
        </div>
      </div>
    </footer>
  )
}
