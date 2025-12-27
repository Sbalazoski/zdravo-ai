import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Zdravo AI - The Universal AI Memory Layer',
  description: 'Capture, organize, and search AI outputs from ChatGPT, Claude, Gemini, and more. Your centralized AI brain.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
