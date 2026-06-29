import type { Metadata } from 'next'
import { Instrument_Sans } from 'next/font/google'
import GrainOverlay from '@/components/ui/GrainOverlay'
import CustomCursor from '@/components/ui/CustomCursor'
import PageTransition from '@/components/providers/PageTransition'
import './globals.css'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Diego Suarez — Digital Product Designer',
  description: 'I make complex products feel obvious.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body>
        <PageTransition>{children}</PageTransition>
        <GrainOverlay />
        <CustomCursor />
      </body>
    </html>
  )
}
