"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogOverlay } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type Language, translations } from "@/lib/i18n"
import { useState } from "react"
import { FooterForm } from "@/components/footer-form"
import { MessageSquare, Users, Sparkles } from "lucide-react"
import { sendGAEvent } from '@next/third-parties/google';

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

interface FeatureModalProps {
  feature: Feature | null
  language: Language
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FeatureModal({ feature, language, open, onOpenChange }: FeatureModalProps) {
  const [showContactForm, setShowContactForm] = useState(false)

  if (!feature) return null

  const title = language === "en" ? feature.title_en : feature.title_es
  const description = language === "en" ? feature.description_en : feature.description_es
  const whyItMatters = language === "en" ? feature.why_it_matters_en : feature.why_it_matters_es
  const t = translations[language]

  const stageConfig = {
    in_progress_v1: {
      label: t.stages.in_progress_v1,
      color: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    },
    planned_possible_v1: {
      label: t.stages.planned_possible_v1,
      color: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    },
    planned_future: { label: t.stages.planned_future, color: "bg-muted text-muted-foreground border-border" },
  }

  const stage = stageConfig[feature.stage as keyof typeof stageConfig] || stageConfig.planned_future

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setShowContactForm(false)
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>

      <DialogOverlay className="fixed inset-0 bg-black/5 backdrop-blur-xs" />
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className=" items-start justify-between gap-4 mb-2">
            <DialogTitle className="text-2xl text-balance leading-tight">{title}</DialogTitle>
            <Badge variant="outline" className={`${stage.color} text-xs flex-shrink-0`}>
              {stage.label}
            </Badge>
          </div>
          <DialogDescription className="text-base leading-relaxed pt-2">{description}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 p-4 bg-accent/50 rounded-lg border border-border">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            {t.modal.whyMatters}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{whyItMatters}</p>
        </div>

        {showContactForm ? (
          <div className="mt-6 p-6 bg-muted/30 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4 text-center">
              {language === "es" ? "Solicitar Acceso Anticipado" : "Request Early Access"}
            </h3>
            <FooterForm language={language} source={`feature-${feature.id}`} />
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-6">
            <Button className="w-full" size="lg"  onClick={() => {
                  sendGAEvent({
                    eventName: 'click',
                    eventCategory: 'Product',
                    eventAction: 'Request Early Access',
                  });
                  window.open("mailto:info@biznex.co?subject=Early Access Request", "_blank")
                }}>
              {t.cta.requestAccess}
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  sendGAEvent({
                    eventName: 'click',
                    eventCategory: 'Product',
                    eventAction: 'Inquiry',
                  });
                  window.open("mailto:info@biznex.co?subject=Product Inquiry", "_blank")
                }}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                {t.cta.talkToProduct}
              </Button>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  sendGAEvent({
                    eventName: 'click',
                    eventCategory: 'Developer',
                    eventAction: 'Apply',
                  });
                  window.open("mailto:info@biznex.co?subject=Join as Developer", "_blank")
                }}
              >
                <Users className="w-4 h-4 mr-2" />
                {t.cta.joinDev}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
