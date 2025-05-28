import './globals.css'
import type { Metadata } from 'next'
import { Inter, Montserrat, Fira_Code } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gourav Dash | GariFFon - Software Developer & Problem Solver',
  description: 'Personal portfolio website showcasing my skills, projects, and professional journey as a software developer',
  keywords: ['developer', 'software', 'portfolio', 'projects', 'web development', 'Gourav Dash', 'GariFFon'],
  authors: [{ name: 'Gourav Dash' }],
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${montserrat.variable} ${firaCode.variable}`}>
      <body className={`${inter.className} overflow-x-hidden min-h-screen font-sans bg-fixed`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}