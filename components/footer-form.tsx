"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { type Language, translations } from "@/lib/i18n"
import { submitContactForm } from "@/app/actions"
import { CheckCircle2, Loader2 } from "lucide-react"

interface FooterFormProps {
  language: Language
  source?: string
}

export function FooterForm({ language, source }: FooterFormProps) {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("investor")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const t = translations[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await submitContactForm({
        email,
        role,
        language,
        source,
      })

      if (result.success) {
        setSubmitSuccess(true)
        setMessage(result.message)
        setEmail("")
        setRole("investor")

        // Reset success state after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
          setMessage("")
        }, 5000)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setMessage(language === "es" ? "Error al enviar. Intenta de nuevo." : "Error submitting. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-6 bg-primary/5 rounded-lg border border-primary/20">
        <CheckCircle2 className="w-12 h-12 text-primary" />
        <p className="text-center font-medium text-foreground">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          {t.footer.interested}
        </Label>
        <Input
          id="email"
          type="email"
          placeholder={t.footer.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
      </div>

      <RadioGroup value={role} onValueChange={setRole} className="space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="investor" id="investor" />
          <Label htmlFor="investor" className="font-normal cursor-pointer">
            {t.footer.roleInvestor}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="developer" id="developer" />
          <Label htmlFor="developer" className="font-normal cursor-pointer">
            {t.footer.roleDeveloper}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="partner" id="partner" />
          <Label htmlFor="partner" className="font-normal cursor-pointer">
            {t.footer.rolePartner}
          </Label>
        </div>
      </RadioGroup>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {language === "es" ? "Enviando..." : "Submitting..."}
          </>
        ) : (
          t.footer.submit
        )}
      </Button>

      {message && !submitSuccess && <p className="text-sm text-destructive text-center">{message}</p>}
    </form>
  )
}
