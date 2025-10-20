export type Language = "en" | "es"

export const translations = {
  en: {
    hero: {
      title_top: "Your all‑in‑one",
      title_main: "Business OS",
      subtitle: "Preview the roadmap — features in progress and planned.",
    },
    cta: {
      invest: "Invest",
      joinDev: "Join as Dev",
      refer: "Refer",
      requestAccess: "Request Early Access",
      talkToProduct: "Talk to Product",
      referFounder: "Refer a Founder",
    },
    footer: {
      pitch:
        "Invest early in a modular business OS focused on formation, compliance and growth — built for founders and operators.",
      interested: "Interested:",
      emailPlaceholder: "your@email.com",
      roleInvestor: "I'm an investor",
      roleDeveloper: "I'm a developer",
      rolePartner: "I'm a partner",
      submit: "Submit",
      privacy: "Privacy",
      contact: "Contact",
    },
    stages: {
      in_progress_v1: "V1 — In progress",
      planned_possible_v1: "Planned — Candidate for v1",
      planned_future: "Planned",
    },
    modal: {
      whyMatters: "Why this matters",
      marketNote:
        "This feature addresses a critical need for founders launching US companies, streamlining processes that typically require multiple service providers.",
    },
  },
  es: {
    hero: {
      title_top: "Tu todo‑en‑uno",
      title_main: "Business OS",
      subtitle:
        "Vista previa de la hoja de ruta — funciones en progreso y planificadas.",
    },
    cta: {
      invest: "Invertir",
      joinDev: "Únete como Dev",
      refer: "Referir",
      requestAccess: "Solicitar Acceso",
      talkToProduct: "Hablar con Producto",
      referFounder: "Referir a un Fundador",
    },
    footer: {
      pitch:
        "Invierte temprano en un business OS modular enfocado en formación, cumplimiento y crecimiento — pensado para fundadores y operadores.",
      interested: "Interesado:",
      emailPlaceholder: "tu@email.com",
      roleInvestor: "Soy inversor",
      roleDeveloper: "Soy desarrollador",
      rolePartner: "Soy socio",
      submit: "Enviar",
      privacy: "Privacidad",
      contact: "Contacto",
    },
    stages: {
      in_progress_v1: "V1 — En progreso",
      planned_possible_v1: "Planeado — Candidato para v1",
      planned_future: "Planeado",
    },
    modal: {
      whyMatters: "Por qué importa",
      marketNote:
        "Esta función aborda una necesidad crítica para fundadores que lanzan empresas en EE. UU., simplificando procesos que típicamente requieren múltiples proveedores de servicios.",
    },
  },
}

export function detectLanguage(): Language {
  if (typeof window === "undefined") return "en"

  const stored = localStorage.getItem("biznex-language")
  if (stored === "en" || stored === "es") return stored

  const browserLang = navigator.language.toLowerCase()
  return browserLang.startsWith("es") ? "es" : "en"
}

export function setLanguage(lang: Language) {
  if (typeof window !== "undefined") {
    localStorage.setItem("biznex-language", lang)
  }
}
