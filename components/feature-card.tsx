"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { type Language, translations } from "@/lib/i18n"

interface Feature {
  id: string
  title_en: string
  title_es: string
  short_description_en: string
  short_description_es: string
  description_en: string
  description_es: string
  why_it_matters_en: string
  why_it_matters_es: string
  stage: string
}

interface FeatureCardProps {
  feature: Feature
  language: Language
  onClick: () => void
  index: number
}

export function FeatureCard({ feature, language, onClick, index }: FeatureCardProps) {
  const title = language === "en" ? feature.title_en : feature.title_es
  const shortDesc = language === "en" ? feature.short_description_en : feature.short_description_es

  const stageConfig = {
    in_progress_v1: {
      label: translations[language].stages.in_progress_v1,
      badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
    },
    planned_possible_v1: {
      label: translations[language].stages.planned_possible_v1,
      badge: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25",
    },
    planned_future: {
      label: translations[language].stages.planned_future,
      badge: "bg-neutral-500/10 text-neutral-700 dark:text-neutral-400 border-neutral-500/25",
    },
  }

  const stage = stageConfig[feature.stage as keyof typeof stageConfig] || stageConfig.planned_future

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card
        className={
          "group relative cursor-pointer transition-all duration-300 p-4 h-full flex flex-col bg-card/50 backdrop-blur-sm border border-border/60 hover:-translate-y-[2px] hover:bg-card/60 hover:border-border focus-visible:ring-1 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none gap-2"
        }
        onClick={onClick}
        role="button"
        aria-label={title}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onClick()
          }
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base md:text-lg font-semibold text-foreground tracking-tight transition-colors text-balance leading-tight">
            {title}
          </h3>
          <ChevronRight className="w-5 h-5 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
        </div>

        <Badge variant="outline" className={`w-fit text-[11px] ${stage.badge}`}>
          {stage.label}
        </Badge>

        <p
          className="text-sm text-muted-foreground leading-relaxed flex-grow"
          style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {shortDesc}
        </p>

        <div className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
          {language === "es" ? "Más info" : "More info"}
          <ChevronRight className="w-4 h-4" />
        </div>
      </Card>
    </motion.div>
  )
}
