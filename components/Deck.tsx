"use client"

import type React from "react"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Slide from "./Slide"
import DotPagination from "./DotPagination"
import ArrowNav from "./ArrowNav"
import Roadmap from "./Roadmap"

export interface SlideData {
  id: string
  order: number
  title: string
  type?: string
  headline?: string
  tagline?: string | null
  copy: string[]
  visual?: string
  hero?: {
    mockup: string
    metrics: Array<{ label: string; desc: string }>
    cta: { text: string; href: string }
  }
  note?: string
  cta?: string
  contact?: string
  visualHints?: string[]
  circleItems?: string[]
  profiles?: Array<{ name: string; title: string; bio: string }>
}

export default function Deck() {
  const [slides, setSlides] = useState<SlideData[]>(require("../data/slides.json").sort((a: SlideData, b: SlideData) => a.order - b.order))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const isNavigating = useRef(false)

  useEffect(() => {
     const hash = window.location.hash.slice(1)
        if (hash) {
          const index = slides.findIndex((s) => s.id === hash)
          if (index !== -1) {
            setCurrentIndex(index)
          }
        }
  }, [])

  useEffect(() => {
    if (slides.length > 0) {
      const slideId = slides[currentIndex]?.id
      if (slideId) {
        window.history.replaceState(null, "", `#${slideId}`)
      }
    }
  }, [currentIndex, slides])

  const goToSlide = useCallback(
    (index: number) => {
      if (isNavigating.current || index < 0 || index >= slides.length) return

      isNavigating.current = true
      setDirection(index > currentIndex ? 1 : -1)
      setCurrentIndex(index)

      setTimeout(() => {
        isNavigating.current = false
      }, 300)
    },
    [currentIndex, slides.length],
  )

  const nextSlide = useCallback(() => {
    if (isNavigating.current || currentIndex >= slides.length - 1) return

    isNavigating.current = true
    setDirection(1)
    setCurrentIndex((prev) => prev + 1)

    setTimeout(() => {
      isNavigating.current = false
    }, 300)
  }, [currentIndex, slides.length])

  const prevSlide = useCallback(() => {
    if (isNavigating.current || currentIndex <= 0) return

    isNavigating.current = true
    setDirection(-1)
    setCurrentIndex((prev) => prev - 1)

    setTimeout(() => {
      isNavigating.current = false
    }, 300)
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        prevSlide()
      } else if (e.key === "Escape" && showRoadmap) {
        setShowRoadmap(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide, showRoadmap])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (isNavigating.current) return

    const diff = touchStartX.current - touchEndX.current
    const threshold = 50

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }

  if (slides.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-neutral-500 text-lg">Loading pitch deck...</div>
      </div>
    )
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-dot"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.25,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="absolute inset-0"
        >
          <Slide
            slide={slides[currentIndex]}
            slideNumber={currentIndex + 1}
            totalSlides={slides.length}
            onOpenRoadmap={() => setShowRoadmap(true)}
          />
        </motion.div>
      </AnimatePresence>

      <ArrowNav
        onPrev={prevSlide}
        onNext={nextSlide}
        canGoPrev={currentIndex > 0}
        canGoNext={currentIndex < slides.length - 1}
      />

      <DotPagination total={slides.length} current={currentIndex} onSelect={goToSlide} slides={slides} />

      <Roadmap isOpen={showRoadmap} onClose={() => setShowRoadmap(false)} />

      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {slides.length}: {slides[currentIndex]?.title}
      </div>
    </div>
  )
}
