import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })

export const metadata: Metadata = {
  title: 'APEX GYM — Push Your Limits',
  description: 'Premium gym memberships, elite trainers, and world-class facilities. Join APEX GYM today and redefine your limits.',
  keywords: 'gym, fitness, membership, personal training, workout, HIIT, CrossFit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-zinc-950 text-zinc-50 antialiased">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
