import type React from "react"
import type { Metadata, Viewport } from "next"
import { Nunito } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
})

export const metadata: Metadata = {
  title: "Sage - Your AI Teacher",
  description: "Learn anything with Sage, your calm and wise AI teacher companion",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#c77b3f",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${nunito.className} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
