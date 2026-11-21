// The CMOTS Market Beat feed tags every story "Market Beat", so the News page groups stories
// by keywords in the headline. Order matters: the first matching category wins.

import type { StockNewsItem } from "@/lib/stocks/types"

export const NEWS_CATEGORIES = [
  { name: "IPO",                          test: /\bipo\b|drhp|listing|price band|subscri/i },
  { name: "Results",                      test: /\bresults?\b|\bq[1-4]\b|net profit|profit (rises|falls|jumps|declines)|revenue|ebitda/i },
  { name: "Dividends & Corporate Actions", test: /dividend|record date|bonus|split|buyback|rights issue/i },
  { name: "Orders & Deals",               test: /\border\b|orders|contract|bags|wins|acquir|acquisition|stake|merger|\bmou\b|partnership/i },
  { name: "Economy",                      test: /\brbi\b|gdp|inflation|economy|government|policy|\bgst\b|budget|rupee/i },
] as const

export const OTHER_CATEGORY = "Market Beat"

export function newsCategory(item: Pick<StockNewsItem, "headline">): string {
  return NEWS_CATEGORIES.find((c) => c.test.test(item.headline))?.name ?? OTHER_CATEGORY
}

/** Every category name the page can show, "Market Beat" last. */
export const ALL_NEWS_CATEGORIES = [...NEWS_CATEGORIES.map((c) => c.name), OTHER_CATEGORY]

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
