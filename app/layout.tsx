import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import ModalProvider from '@/providers/modal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NHL example',
  description: 'BlockApps interview example',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  )
}
