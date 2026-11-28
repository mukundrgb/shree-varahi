"use client"

// Published Masters from the admin panel (GET /site-config, PRD §6.3, WEB-03), shared with the
// navbar, footer and risk popup. Every value has the website's own text as the fallback, so a
// section that was never published (or a backend that can't be reached) changes nothing.

import { createContext, useContext } from "react"

export type Company = { legalName: string; brandName: string; tagline: string; foundedYear: number; registrations: { sebi: string; nseMember: string; bseMember: string; mcxMember: string; cdslDp: string; cin: string }; registeredOffice: string; about: string[] }
export type Legal = {
  disclaimer: string; regulatoryLine: string; copyright: string; marketDataNotice: string; brokerageFootnote: string
  hiddenItems: string[]
  riskPopup: { enabled: boolean; title: string; points: string[]; source: string; button: string }
  legalLinks: { label: string; url: string; enabled: boolean }[]
}
export type SiteConfig = {
  "masters.company"?: Company
  "masters.legal"?: Legal
  "masters.social"?: { items: { name: string; url: string }[] }
  "masters.links"?: { items: { key: string; label: string; group: string; url: string }[] }
  "masters.logos"?: { primary: string; light: string; favicon: string; appIcon: string; socialImage: string }
  "masters.contacts"?: { supportPhone: string; supportEmail: string; whatsapp: string; hours: string }
}

const Ctx = createContext<SiteConfig>({})

export function SiteConfigProvider({ value, children }: { value: SiteConfig; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useSiteConfig = () => useContext(Ctx)

/** A link from Masters → Links by its name (e.g. "account.login"), or the fallback. */
export function useLink(key: string, fallback: string) {
  const items = useContext(Ctx)["masters.links"]?.items
  return items?.find((l) => l.key === key && l.url)?.url ?? fallback
}
