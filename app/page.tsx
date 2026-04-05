import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import ClassSchedule from '@/components/ClassSchedule'
import Transformation from '@/components/Transformation'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import UrgencyPopup from '@/components/UrgencyPopup'

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <Navbar />
      <Hero />
      <Features />
      <ClassSchedule />
      <Transformation />
      <Pricing />
      <Testimonials />
      <Footer />
      <FloatingCTA />
      <UrgencyPopup />
    </main>
  )
}
