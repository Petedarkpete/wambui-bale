import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wambui Bales - Wholesale Clothing Bales for Retailers',
  description: 'Premium quality clothing bales for small retailers and resellers. Kids, ladies, gents, and mixed bales at competitive wholesale prices.',
  keywords: 'wholesale clothing, clothing bales, second hand clothes, bulk clothing, retail clothing',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
