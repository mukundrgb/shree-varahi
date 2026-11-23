// News categories = the CMOTS Capital Market Live News sections, one category per section, as listed in the
// API sheet (LakshmiShree_UAT_APIs.xlsx, "Live News"). Names are the sheet's section names without dashes.
//
// UI only for now: the pages show sample stories (lib/news/sample.ts), each tagged with its section name.
// When the API is integrated, each story's CMOTS section_name goes in `tag` and nothing here needs to change.

import type { StockNewsItem } from "@/lib/stocks/types"

export interface NewsSection {
  name: string
  /** CMOTS endpoint slug: /CapitalMarketLiveNews/<slug>/<count> */
  slug: string
}

/** Every section, in the sheet's order. */
export const NEWS_SECTIONS: readonly NewsSection[] = [
  { name: "Hot Pursuit",       slug: "hot-pursuit" },
  { name: "Foreign Markets",   slug: "foreign-markets" },
  { name: "Forex News",        slug: "forex-news" },
  { name: "Bullion",           slug: "Bullion" },
  { name: "Corporate News",    slug: "corporate-news" },
  { name: "Market Beat",       slug: "market-beat" },
  { name: "Economy News",      slug: "economy-news" },
  { name: "Corporate Results", slug: "corporate-results" },
  { name: "Stock Alert",       slug: "stock-alert" },
  { name: "Pre Session",       slug: "pre-session" },
  { name: "Mid Session",       slug: "mid-session" },
  { name: "End Session",       slug: "end-session" },
  { name: "Quick Review",      slug: "quick-review" },
  { name: "Derivatives News",  slug: "derivatives-news" },
  { name: "IPO News",          slug: "ipo-news" },
  { name: "Commodity News",    slug: "Commodity-news" },
  { name: "Mutual Fund News",  slug: "mutual-fund" },
]

/** Stories with an unknown section fall back here. */
export const OTHER_CATEGORY = "Market Beat"

const SECTION_NAMES = new Set(NEWS_SECTIONS.map((s) => s.name))

/** A story's category is its section (`tag`); unknown sections fall back to Market Beat. */
export function newsCategory(item: Pick<StockNewsItem, "tag">): string {
  return SECTION_NAMES.has(item.tag) ? item.tag : OTHER_CATEGORY
}

/** Every category name, in the sheet's order. */
export const ALL_NEWS_CATEGORIES = NEWS_SECTIONS.map((s) => s.name)

/** "21 Nov 2026, 1:19 PM" in IST. */
export function newsDateTime(iso: string | null): string {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ""
  return d.toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" })
}

/** Paragraphs of the plain-text story. */
export const newsParagraphs = (item: Pick<StockNewsItem, "text">) =>
  (item.text ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)

/** First paragraph, shortened, for cards. */
export function newsSummary(item: Pick<StockNewsItem, "text" | "caption">, max = 160): string {
  const first = item.caption?.trim() || newsParagraphs(item)[0] || ""
  return first.length > max ? `${first.slice(0, max).replace(/\s+\S*$/, "")}…` : first
}
