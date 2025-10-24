"use client"

import type { SlideData } from "./Deck"

interface DotPaginationProps {
  total: number
  current: number
  onSelect: (index: number) => void
  slides: SlideData[]
}

export default function DotPagination({ total, current, onSelect, slides }: DotPaginationProps) {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20" aria-label="Slide navigation">
      <ul className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800/50">
        {Array.from({ length: total }).map((_, index) => (
          <li key={index}>
            <button
              onClick={() => onSelect(index)}
              aria-label={`Go to slide ${index + 1}: ${slides[index]?.title}`}
              aria-current={current === index ? "true" : "false"}
              className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-black ${
                current === index ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-neutral-600 hover:bg-neutral-400"
              }`}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
