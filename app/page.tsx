"use client"

import { Logo } from "@/components/logo"
import { Slogan } from "@/components/slogan"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dot flex items-center justify-center">
      {/* Main Content - Centered */}
      <main className="w-full max-w-4xl mx-auto px-4">
        <div className="text-center space-y-6">
          {/* Large Logo */}
          <div className="flex justify-center">
            <Logo />
          </div>

          {/* Slogan */}
          <div>
            <Slogan />
          </div>

          {/* Learn More Button */}
          <div className="pt-8">
             <Link
          href="/pitch"
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-black rounded-full font-semibold hover:bg-accent/90 transition-all group"
        >
          Learn More
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
