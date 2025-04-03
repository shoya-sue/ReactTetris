import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'React Tetris',
  description: 'A modern Tetris game built with React and Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 