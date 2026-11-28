import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"
import { cmsGetOr } from "@/lib/server/cms"

// Sitemap (PRD WEB-05): the main pages plus every published article and qualifying category from
// the backend. Refreshed when content is published (tag "sitemap") and at least daily.

export const revalidate = 86400

const STATIC_PATHS = [
  "", "/stocks", "/mutual-funds", "/etf", "/ipo", "/nfo", "/futures-options", "/mtf", "/mtf/eligible-stocks", "/global-investing",
  "/calculators", "/blog", "/knowledge-center", "/news", "/commodity", "/shree-varahi-web", "/shree-varahi-mobile-app", "/shree-varahi-desktop-app",
  "/stock-market-live/top-gainers-today", "/stock-market-live/top-losers-today", "/stock-market-live/52-week-high-stocks", "/stock-market-live/52-week-low-stocks",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await cmsGetOr<{ type: string; path: string; updatedAt?: string; category?: boolean }[]>("/content/sitemap", [], { tags: ["sitemap"], revalidate: 86400 })
  const now = new Date()
  return [
    ...STATIC_PATHS.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: now, changeFrequency: p === "/news" ? ("hourly" as const) : ("daily" as const) })),
    ...entries.map((e) => ({ url: `${SITE_URL}${e.path}`, lastModified: e.updatedAt ? new Date(e.updatedAt) : now, changeFrequency: e.category ? ("daily" as const) : ("weekly" as const) })),
  ]
}
