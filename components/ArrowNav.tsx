"use client"

interface ArrowNavProps {
  onPrev: () => void
  onNext: () => void
  canGoPrev: boolean
  canGoNext: boolean
}

export default function ArrowNav({ onPrev, onNext, canGoPrev, canGoNext }: ArrowNavProps) {
  return (
    <>
      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        aria-label="Previous slide"
        className={`fixed left-4 md:left-8 bottom-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/80 backdrop-blur-md border border-neutral-800/50 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-black ${
          canGoPrev
            ? "hover:bg-accent hover:border-accent hover:scale-110 text-white cursor-pointer"
            : "opacity-20 cursor-not-allowed text-neutral-700"
        }`}
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next slide"
        className={`fixed right-4 md:right-8 bottom-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/80 backdrop-blur-md border border-neutral-800/50 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-black ${
          canGoNext
            ? "hover:bg-accent hover:border-accent hover:scale-110 text-white cursor-pointer"
            : "opacity-20 cursor-not-allowed text-neutral-700"
        }`}
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </>
  )
}
