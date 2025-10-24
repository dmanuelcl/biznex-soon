"use client"

import type { SlideData } from "./Deck"
import Tagline from "./Tagline"

interface SlideProps {
  slide: SlideData
  slideNumber: number
  totalSlides: number
  onOpenRoadmap?: () => void
}

export default function Slide({ slide, slideNumber, totalSlides, onOpenRoadmap }: SlideProps) {
  const isHeroSlide = slide.type === "hero-heavy"
  const isRoadmapSlide = slide.id === "s08-roadmap"

  return (
    <section
      role="region"
      aria-label={`Slide ${slideNumber}: ${slide.title}`}
      className="flex items-center justify-center w-full h-full max-h-screen overflow-y-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 sm:py-6 md:py-8 pb-16 sm:pb-20"
    >
      <div className="w-full max-w-none">
        {isHeroSlide && slide.hero ? (
          <div className="flex items-center justify-center min-h-[80vh] w-full">
            <div className="w-full space-y-3 sm:space-y-4 md:space-y-6 max-w-6xl mx-auto">
              <div className="space-y-2 md:space-y-3">
                {slide.headline ? (
                  <>
                    {/* <div className="text-sm sm:text-base md:text-lg text-accent font-bold uppercase tracking-wider">
                      {slide.title}
                    </div> */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-balance leading-tight tracking-tight">
                      {slide.headline}
                    </h1>
                  </>
                ) : (
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-balance leading-tight tracking-tight">
                    {slide.title}
                  </h1>
                )}
                {slide.tagline && (
                  <div className="pt-1">
                    <Tagline text={slide.tagline} />
                  </div>
                )}
              </div>

              <div className="space-y-3 md:space-y-4 max-w-5xl">
                {slide.copy.map((line, i) => (
                  <p key={i} className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-neutral-200 leading-loose font-normal">
                    {line}
                  </p>
                ))}
              </div>

              {/* {slide.hero.cta && (
                <div className="pt-2 md:pt-3">
                  <a
                    href={slide.hero.cta.href}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 bg-accent text-black rounded-full font-semibold hover:bg-accent/90 transition-all text-sm sm:text-base md:text-lg group"
                  >
                    {slide.hero.cta.text}
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              )} */}
            </div>


          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-7 max-w-4xl mx-auto">
            <div className="space-y-2 sm:space-y-2.5 md:space-y-3 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-balance leading-tight tracking-tight">
                {slide.title}
              </h2>

              {slide.tagline && (
                <div className="pt-1 sm:pt-1.5">
                  <Tagline text={slide.tagline} />
                </div>
              )}
            </div>

            <div className={`space-y-2.5 sm:space-y-3 md:space-y-4 max-w-5xl mx-auto ${slide.visualHints?.includes("contactSlide") ? "text-center" : "text-left"}`}>
              {slide.copy.map((line, i) => (
                <p
                  key={i}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-neutral-200 leading-loose font-normal"
                >
                  {line}
                </p>
              ))}
            </div>

            {slide.note && (
              <p className="text-xs sm:text-sm md:text-base text-neutral-500 italic max-w-xl mx-auto pt-1 sm:pt-2 text-center">
                {slide.note}
              </p>
            )}

            {slide.cta && (
              <div className="pt-3 sm:pt-4 md:pt-5 text-center">
                {isRoadmapSlide ? (
                  <button
                    onClick={onOpenRoadmap}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 bg-accent text-black rounded-full font-semibold hover:bg-accent/90 transition-all text-sm sm:text-base md:text-lg group"
                  >
                    {slide.cta}
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                ) : (
                  <a
                    href="mailto:partners@biznex.co"
                    className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 bg-accent text-black rounded-full font-semibold hover:bg-accent/90 transition-all text-sm sm:text-base md:text-lg group"
                  >
                    {slide.cta}
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                )}
              </div>
            )}

            {slide.contact && (
              <div className="pt-2 sm:pt-3 md:pt-4 text-center">
                <a
                  href={`mailto:${slide.contact}`}
                  className="text-base sm:text-lg md:text-xl text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  {slide.contact}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
