import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from '@next/third-parties/google';

import "./globals.css"


const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Biznex - The all-in-one Business OS",
  description:
    "Everything a founder needs to build and run a US company. Formation, compliance, and growth tools in one platform.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased bg-dot`}>
        {children}
        <Analytics />
        <GoogleAnalytics gaId="G-TW7WM85R6M" />
      </body>
    </html>
  )
}
