import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

export const metadata: Metadata = {
  title: 'Apex Gym — Best Gym in Kolathur, Chennai',
  description: 'Apex Gym at Intuc Nagar Main Road, Kathirvedu, Chennai 600066. Premium gym memberships, elite trainers & world-class facilities. Join today — first week free!',
  keywords: 'gym in kolathur, gym in chennai, apex gym, best gym kolathur, fitness center chennai, personal training chennai, gym kathirvedu, gym intuc nagar',
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
      <body className="bg-gray-50 text-gray-900 antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
