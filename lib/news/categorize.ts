// News categories = the CMOTS Capital Market Live News sections, one category per section, as listed in the
// API sheet (LakshmiShree_UAT_APIs.xlsx, "Live News"). Names are the sheet's section names without dashes.
//
// UI only for now: the backend serves the Market Beat section alone, so stories are sorted into sections by
// keywords in the headline (first match wins, the order of TESTS matters) and anything unmatched stays in
// Market Beat. When the backend serves every section, use the story's own section via `slug` instead.

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

/** The section the current feed comes from; unmatched stories stay here. */
export const OTHER_CATEGORY = "Market Beat"

/** Headline keywords per section, checked in this order. */
const TESTS: readonly [string, RegExp][] = [
  ["IPO News",          /\bipo\b|drhp|listing|price band|subscri|anchor investors/i],
  ["Corporate Results", /\bresults?\b|\bq[1-4]\b|net profit|profit (rises|falls|jumps|declines|surges|slumps)|revenue|ebitda|\bpat\b/i],
  ["Mutual Fund News",  /mutual fund|\bnfo\b|\bamc\b|\bamfi\b|\bsip\b/i],
  ["Derivatives News",  /\bf&o\b|futures|options|open interest|expiry|derivative|put.call/i],
  ["Bullion",           /\bgold\b|silver|bullion/i],
  ["Commodity News",    /crude|\boil prices?\b|copper|aluminium|zinc|nickel|natural gas|\bmcx\b|commodit|cotton|soybean/i],
  ["Forex News",        /rupee|forex|dollar index|\busd\b|\binr\b|currency/i],
  ["Foreign Markets",   /wall street|dow jones|nasdaq|s&p 500|nikkei|hang seng|shanghai|european (markets|stocks)|ftse|\bdax\b|asian (markets|stocks)|global markets|\bfed\b/i],
  ["Economy News",      /\brbi\b|gdp|inflation|economy|government|policy|\bgst\b|budget|\bcpi\b|\bwpi\b|\biip\b|\bpmi\b|fiscal/i],
  ["Pre Session",       /(likely|set|poised|seen) to open|pre.?open|opening bell|gift nifty|sgx nifty/i],
  ["Mid Session",       /mid.?session|(trades?|trading) (higher|lower|flat|in the red|in the green)|(sensex|nifty|market)s? (hovers?|extends?|pares?)/i],
  ["End Session",       /(ends?|closes?|settles?|finish(es)?) (higher|lower|flat|in the red|in the green|with)|closing bell/i],
  ["Quick Review",      /quick review|week ahead|weekly (review|wrap)/i],
  ["Stock Alert",       /52.week|upper circuit|lower circuit|volume (spurt|surge)|hits? (record|new|fresh) (high|low)/i],
  ["Hot Pursuit",       /shares? (rise|rises|gain|gains|jump|jumps|surge|surges|fall|falls|slide|slides|drop|drops|decline|declines|slump|slumps|rally|rallies|soar|soars|tumble|tumbles|climb|climbs)/i],
  ["Corporate News",    /\border\b|orders|contract|bags|wins|acquir|acquisition|stake|merger|\bmou\b|partnership|dividend|record date|bonus|split|buyback|rights issue|board approves|appoint/i],
]

export function newsCategory(item: Pick<StockNewsItem, "headline">): string {
  return TESTS.find(([, test]) => test.test(item.headline))?.[0] ?? OTHER_CATEGORY
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
