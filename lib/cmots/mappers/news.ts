// Maps corporate news records to the Latest News section.

import type { CmotsNews } from "../types/news"
import type { StockNews, StockNewsItem } from "@/lib/stocks/types"

const MAX_ITEMS = 3

/** CMOTS news dates look like "10/22/2026 12:00:00 AM" (month first). */
function toIsoDate(value: string | null): string | null {
  const match = value ? /^(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(value) : null
  if (!match) return null
  const [, month, day, year] = match
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00:00`
}

function toItem(news: CmotsNews): StockNewsItem {
  return {
    id: news.sno,
    tag: news.section_name?.trim() || "News",
    headline: news.heading.trim(),
    date: toIsoDate(news.date),
  }
}

/** The name as it appears in headlines: "Reliance Industries Ltd" -> "Reliance Industries". */
function headlineName(companyName: string): string {
  return companyName.replace(/\s+(ltd\.?|limited)$/i, "").trim()
}

/** CMOTS news has no company field, so stories are matched on the company name. */
export function toStockNews(news: CmotsNews[], companyName: string): StockNews {
  const name = headlineName(companyName).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const pattern = new RegExp(`\\b${name}\\b`, "i")
  const matches = news.filter((item) => pattern.test(`${item.heading} ${item.caption ?? ""}`))

  return matches.length > 0
    ? { items: matches.slice(0, MAX_ITEMS).map(toItem), matched: true }
    : { items: news.slice(0, MAX_ITEMS).map(toItem), matched: false }
}
