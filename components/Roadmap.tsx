"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"

interface RoadmapProps {
  isOpen: boolean
  onClose: () => void
}

export default function Roadmap({ isOpen, onClose }: RoadmapProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const phases = [
    {
      phase: "Phase 1",
      title: "Foundation",
      status: "In Development",
      features: [
        "Entity Formation (LLC, C-Corp, S-Corp)",
        "Registered Agent Services",
        "Corporate Mail Management",
        "Compliance Calendar & Alerts",
        "Document Storage & Templates",
      ],
    },
    {
      phase: "Phase 2",
      title: "Communication & Growth",
      status: "Q2 2025",
      features: [
        "VoIP Phone System",
        "Business Banking Integration",
        "CRM & Contact Management",
        "Email & SMS Campaigns",
        "Partner White-Label Portal",
      ],
    },
    {
      phase: "Phase 3",
      title: "Operations & Scale",
      status: "Q3-Q4 2025",
      features: [
        "Accounting & Bookkeeping",
        "Payroll Management",
        "Inventory Tracking",
        "Equity & Cap Table Management",
        "Global Expansion Modules",
      ],
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-20 z-50 flex items-center justify-center"
          >
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-5xl max-h-full overflow-y-auto shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 bg-neutral-950 border-b border-neutral-800 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Product Roadmap</h2>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                    Building the future of business infrastructure
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-neutral-800 rounded-lg"
                  aria-label="Close roadmap"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 space-y-6 sm:space-y-8">
                {phases.map((phase, index) => (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Phase Card */}
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 sm:p-5 md:p-6 hover:border-accent/30 transition-colors">
                      {/* Phase Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 border border-accent/20">
                            <span className="text-accent font-bold text-sm sm:text-base">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{phase.title}</h3>
                            <p className="text-xs sm:text-sm text-neutral-500">{phase.phase}</p>
                          </div>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full self-start sm:self-auto">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          <span className="text-xs sm:text-sm font-medium text-accent">{phase.status}</span>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="space-y-2 sm:space-y-2.5">
                        {phase.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2.5 sm:gap-3 group">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-xs sm:text-sm md:text-base text-neutral-300 group-hover:text-white transition-colors leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Connector Line */}
                    {index < phases.length - 1 && (
                      <div className="flex justify-center py-3 sm:py-4">
                        <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-neutral-700 to-transparent" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Footer Note */}
                <div className="pt-4 sm:pt-6 border-t border-neutral-800">
                  <p className="text-xs sm:text-sm text-neutral-500 text-center italic">
                    Roadmap subject to change. Some features may be released earlier or later than planned.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
