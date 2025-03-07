import Slidebar from '@/components/slidebar/Slidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import QuerryProvider from '@/components/QuerryProvider'
import { Toaster } from 'sonner';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Friendz',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster  richColors position="top-center" />
        <QuerryProvider>

          <Slidebar />
          {children}
        </QuerryProvider>
      </body>
    </html>
  )
}
