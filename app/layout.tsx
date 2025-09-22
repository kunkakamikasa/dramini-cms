import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dramini CMS',
  description: 'Content Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
