"use client"

import type { Language } from "@/lib/i18n"

interface LanguageToggleProps {
  currentLanguage: Language
  onLanguageChange: (lang: Language) => void
}

export function LanguageToggle({ currentLanguage, onLanguageChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
      <button
        onClick={() => onLanguageChange("en")}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          currentLanguage === "en"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => onLanguageChange("es")}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          currentLanguage === "es"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  )
}
