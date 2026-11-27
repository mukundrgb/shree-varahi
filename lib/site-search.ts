// Global (navbar) search over the site's own pages and Knowledge Center content.
// Stocks and mutual funds are searched through the backend APIs in components/search-popup.tsx;
// everything here is a static index of pages that exist in the app router.

import { searchKnowledge } from "@/lib/knowledge-center/data"
import { CALCULATOR_LINKS, LOGIN_URL, OPEN_ACCOUNT_URL } from "@/lib/external-links"

export interface SitePage {
  title: string
  desc: string
  href: string
  /** Extra words people may type to find this page */
  keywords?: string
}

export const SITE_PAGES: SitePage[] = [
  // Account
  { title: "Open Free Demat Account", desc: "Start investing in minutes",            href: OPEN_ACCOUNT_URL, keywords: "open account signup register demat trading kyc" },
  { title: "Login",                   desc: "Sign in to your account",               href: LOGIN_URL,         keywords: "sign in" },
  // Trade & invest
  { title: "Stocks",                  desc: "All NSE & BSE stocks",                  href: "/stocks",          keywords: "equity shares" },
  { title: "F&O",                     desc: "Futures & options",                     href: "/futures-options", keywords: "futures options derivatives fno option chain" },
  { title: "ETF",                     desc: "Exchange traded funds",                 href: "/etf",             keywords: "etfs exchange traded funds gold etf" },
  { title: "IPO",                     desc: "Upcoming, open & closed IPOs",          href: "/ipo",             keywords: "ipo apply allotment upcoming public offering" },
  { title: "MTF",                     desc: "Margin Trading Facility",               href: "/mtf",             keywords: "margin trading leverage calculator" },
  { title: "MTF Eligible Stocks",     desc: "Stocks available on MTF",               href: "/mtf/eligible-stocks", keywords: "mtf stocks list margin" },
  { title: "Global Investing",        desc: "Invest in US stocks from India",        href: "/global-investing", keywords: "us stocks international" },
  // Calculators
  { title: "All Calculators",         desc: "35+ free financial calculators",        href: CALCULATOR_LINKS.all,       keywords: "calculator tools planning sip emi fd ppf tax" },
  { title: "Brokerage Calculator",    desc: "Charges for your stock orders",         href: CALCULATOR_LINKS.brokerage, keywords: "brokerage charges fees calculator" },
  { title: "Margin Calculator",       desc: "Margin needed for a trade",             href: CALCULATOR_LINKS.margin,    keywords: "margin intraday calculator" },
  { title: "EMI Calculator",          desc: "Monthly loan instalment",               href: CALCULATOR_LINKS.emi,       keywords: "emi loan home car calculator" },
  { title: "FD Calculator",           desc: "Fixed deposit returns",                 href: CALCULATOR_LINKS.fd,        keywords: "fd fixed deposit calculator" },
  { title: "PPF Calculator",          desc: "Public Provident Fund returns",         href: CALCULATOR_LINKS.ppf,       keywords: "ppf provident fund calculator" },
  { title: "Lumpsum Calculator",      desc: "One-time investment returns",           href: CALCULATOR_LINKS.lumpsum,   keywords: "lumpsum mutual fund calculator" },
  { title: "CAGR Calculator",         desc: "Compound annual growth rate",           href: CALCULATOR_LINKS.cagr,      keywords: "cagr growth return calculator" },
  { title: "Income Tax Calculator",   desc: "Old vs new regime tax",                 href: `${CALCULATOR_LINKS.all}/income-tax-calculator`, keywords: "income tax regime calculator" },
  // Mutual funds
  { title: "Mutual Funds",            desc: "Explore & invest by SIP or lumpsum",   href: "/mutual-funds",    keywords: "sip lumpsum funds" },
  { title: "NFO",                     desc: "New fund offers",                       href: "/nfo",             keywords: "new fund offer" },
  // Market movers
  { title: "Top Gainers Today",       desc: "Market movers",                         href: "/stock-market-live/top-gainers-today",     keywords: "gainers movers" },
  { title: "Top Losers Today",        desc: "Market movers",                         href: "/stock-market-live/top-losers-today",      keywords: "losers movers" },
  { title: "Most Active Stocks by Value",  desc: "Market movers",                    href: "/stock-market-live/most-active-by-value",  keywords: "most active traded value" },
  { title: "Most Active Stocks by Volume", desc: "Market movers",                    href: "/stock-market-live/most-active-by-volume", keywords: "most active traded volume" },
  { title: "52-Week High Stocks",     desc: "Market movers",                         href: "/stock-market-live/52-week-high-stocks",   keywords: "52 week high" },
  { title: "52-Week Low Stocks",      desc: "Market movers",                         href: "/stock-market-live/52-week-low-stocks",    keywords: "52 week low" },
  // Indices
  { title: "Nifty 50",                desc: "Index",                                 href: "/markets/indices/nifty-50",   keywords: "nifty index" },
  { title: "Sensex",                  desc: "Index",                                 href: "/markets/indices/sensex",     keywords: "bse sensex index" },
  { title: "Nifty Bank",              desc: "Index",                                 href: "/markets/indices/nifty-bank", keywords: "bank nifty index" },
  { title: "Nifty 50 Stocks",         desc: "Stocks in the Nifty 50",                href: "/nifty-stocks-list/nifty-50",   keywords: "nifty constituents list" },
  { title: "Bank Nifty Stocks",       desc: "Stocks in the Nifty Bank",              href: "/nifty-stocks-list/nifty-bank", keywords: "bank nifty constituents list" },
  // Products
  { title: "Shree Varahi Web",        desc: "Trade from any browser",                href: "/shree-varahi-web",         keywords: "web platform trading terminal" },
  { title: "Shree Varahi Mobile App", desc: "Trading app",                           href: "/shree-varahi-mobile-app",  keywords: "app android ios mobile" },
  { title: "Shree Varahi Desktop App", desc: "Desktop trading terminal",             href: "/shree-varahi-desktop-app", keywords: "desktop terminal software" },
  // Learn
  { title: "Knowledge Center",        desc: "Guides & articles",                     href: "/knowledge-center",         keywords: "learn knowledge panel education guides articles" },
  { title: "Blog",                    desc: "Market insights & analysis",            href: "/blog",                     keywords: "blog posts insights articles" },
  { title: "News",                    desc: "Live share market news",                href: "/news",                     keywords: "news market updates live latest" },
]

export interface SiteHit { title: string; desc: string; href: string; group: "Pages" | "Learn" }

/** Pages first (best match first), then Knowledge Center topics and articles. */
export function searchSite(query: string): SiteHit[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const words = q.split(/\s+/)
  const pages = SITE_PAGES
    .map((p) => {
      const title = p.title.toLowerCase()
      const text = `${title} ${p.desc.toLowerCase()} ${p.keywords ?? ""}`
      if (!words.every((w) => text.includes(w))) return null
      return { page: p, rank: title === q ? 0 : title.startsWith(q) ? 1 : title.includes(q) ? 2 : 3 }
    })
    .filter((x): x is { page: SitePage; rank: number } => x !== null)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 6)
    .map(({ page }) => ({ title: page.title, desc: page.desc, href: page.href, group: "Pages" as const }))

  const learn = searchKnowledge(q, 5).map((h) => ({
    title: h.title,
    desc: h.kind === "topic" ? "Knowledge Center topic" : `Knowledge Center · ${h.subtitle}`,
    href: h.href,
    group: "Learn" as const,
  }))
  return [...pages, ...learn]
}
