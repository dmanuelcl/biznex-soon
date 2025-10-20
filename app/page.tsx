"use client"

import { useState, useEffect } from "react"
import { AnimatedLogo } from "@/components/animated-logo"
import { LanguageToggle } from "@/components/language-toggle"
import { FeatureCard } from "@/components/feature-card"
import { FeatureModal } from "@/components/feature-modal"
import { FooterForm } from "@/components/footer-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type Language, translations, detectLanguage, setLanguage } from "@/lib/i18n"
import featuresData from "@/data/features.json"
import { Sparkles, Hammer, Clock } from "lucide-react"
import { sendGAEvent } from '@next/third-parties/google';

export default function RoadmapPage() {
  const [language, setLanguageState] = useState<Language>("en")
  const [selectedFeature, setSelectedFeature] = useState<(typeof featuresData.features)[0] | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const detected = detectLanguage()
    setLanguageState(detected)
    document.documentElement.lang = detected
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguageState(lang)
    setLanguage(lang)
    document.documentElement.lang = lang
  }

  const handleFeatureClick = (feature: (typeof featuresData.features)[0]) => {
    setSelectedFeature(feature)
    setModalOpen(true)
  }

  const t = translations[language]

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    in_progress_v1: false,
    planned_possible_v1: false,
    planned_future: false,
  })

  const toggleStage = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="min-h-screen bg-dot">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <AnimatedLogo />

          <div className="flex items-center gap-3">
            <LanguageToggle currentLanguage={language} onLanguageChange={handleLanguageChange} />
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  sendGAEvent({
                    eventName: 'click',
                    eventCategory: 'Investment',
                    eventAction: 'Invest',
                  });
                  window.open("mailto:info@biznex.co?subject=Investment Inquiry", "_blank")
                }}
              >
                {t.cta.invest}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  sendGAEvent({
                    eventName: 'click',
                    eventCategory: 'Developer',
                    eventAction: 'Apply',
                  });
                  window.open("mailto:info@biznex.co?subject=Developer Application", "_blank")
                }}
              >
                {t.cta.joinDev}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 md:py-28 text-center max-w-4xl">
        <h1 className="mb-6 leading-tight tracking-tight">
          <span className="block text-2xl md:text-3xl lg:text-4xl font-medium text-foreground/80">
            {t.hero.title_top}
          </span>
          <span className="block whitespace-nowrap text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            {t.hero.title_main}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed max-w-3xl mx-auto">
          {t.hero.subtitle}
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mt-8 whitespace-nowrap mx-auto">
          <Sparkles className="w-4 h-4" />
          {language === "es" ? "Próximamente" : "Coming Soon"}
        </div>
      </section>

      {/* Roadmap Columns by Stage */}
      <section className="container mx-auto px-4 py-12 pb-24">
        {(() => {
          const inProgress = featuresData.features.filter((f) => f.stage === "in_progress_v1")
          const possibleV1 = featuresData.features.filter((f) => f.stage === "planned_possible_v1")
          const planned = featuresData.features.filter((f) => f.stage === "planned_future")

          const initialLimits: Record<string, number> = {
            in_progress_v1: 6,
            planned_possible_v1: 6,
            planned_future: 6,
          }

          const columns = [
            {
              stageKey: "in_progress_v1",
              title: t.stages.in_progress_v1,
              items: inProgress,
            },
            {
              stageKey: "planned_possible_v1",
              title: t.stages.planned_possible_v1,
              items: possibleV1,
            },
            {
              stageKey: "planned_future",
              title: t.stages.planned_future,
              items: planned,
            },
          ]

          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {columns.map((col, colIndex) => {
                const isExpanded = expanded[col.stageKey]
                const limit = initialLimits[col.stageKey]
                const visibleItems = isExpanded ? col.items : col.items.slice(0, limit)

                return (
                  <div key={col.stageKey} className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 sticky top-0 z-10 bg-background py-4 border-b border-border/50 px-4">
                      {col.stageKey === "in_progress_v1" ? (
                        <Hammer className="h-5 w-5 text-emerald-500" aria-hidden="true" />
                      ) : col.stageKey === "planned_possible_v1" ? (
                        <Sparkles className="h-5 w-5 text-amber-500" aria-hidden="true" />
                      ) : (
                        <Clock className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                      )}
                      <h2 className="text-xl font-semibold tracking-tighter">{col.title}</h2>
                      <Badge
                        className={`${
                          col.stageKey === "in_progress_v1"
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                            : col.stageKey === "planned_possible_v1"
                            ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                            : "bg-muted text-foreground/70"
                        } border-transparent`}
                      >
                        {col.items.length}
                      </Badge>
                    </div>

                    {visibleItems.map((feature, index) => (
                      <FeatureCard
                        key={feature.id}
                        feature={feature}
                        language={language}
                        onClick={() => handleFeatureClick(feature)}
                        index={index + colIndex * 10}
                      />
                    ))}

                    {col.items.length > limit && (
                      <Button
                        onClick={() => toggleStage(col.stageKey)}
                        className="w-full text-xs md:text-sm text-foreground hover:text-foreground border rounded-md py-2 transition-colors hover:bg-muted/40 cursor-pointer bg-background"
                      >
                        {isExpanded
                          ? language === "es"
                            ? "Mostrar menos"
                            : "Show less"
                          : language === "es"
                            ? "Mostrar más"
                            : "Show more"}
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })()}
      </section>

      {/* Footer */}
      {/* <footer className="border-t border-border/50 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold mb-4 text-balance">
              {language === "es" ? "Únete a la revolución" : "Join the revolution"}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">{t.footer.pitch}</p>
            <FooterForm language={language} />
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-8 border-t border-border/50">
            <button className="hover:text-foreground transition-colors">{t.footer.privacy}</button>
            <span className="text-border">•</span>
            <button
              className="hover:text-foreground transition-colors"
              onClick={() => window.open("mailto:hello@biznex.com", "_blank")}
            >
              {t.footer.contact}
            </button>
          </div>

          <div className="text-center mt-8 text-xs text-muted-foreground">
            © 2025 Biznex. {language === "es" ? "Todos los derechos reservados." : "All rights reserved."}
          </div>
        </div>
      </footer> */}

      {/* Feature Modal */}
      <FeatureModal feature={selectedFeature} language={language} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
