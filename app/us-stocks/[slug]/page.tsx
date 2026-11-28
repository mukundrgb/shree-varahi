"use client"

// US stock page. Live US prices aren't connected yet, so the page shows the company and how to invest,
// without numbers (it used to show made-up prices; PRD v3.0 ST-08).

import { useParams } from "next/navigation"
import { MarketDataSoon, nameFromSlug } from "@/components/market-data-soon"

/** Names and sectors of the US companies linked from the site (no prices). */
const KNOWN: Record<string, { name: string; sector: string }> = {
  "aapl-apple-inc-share-price": { name: "Apple Inc.", sector: "Technology" },
  "msft-microsoft-corp-share-price": { name: "Microsoft Corp.", sector: "Technology" },
  "nvda-nvidia-corp-share-price": { name: "NVIDIA Corp.", sector: "Technology" },
  "googl-alphabet-inc-share-price": { name: "Alphabet Inc.", sector: "Communication Services" },
  "amzn-amazon-com-inc-share-price": { name: "Amazon.com Inc.", sector: "Consumer Discretionary" },
  "meta-meta-platforms-inc-share-price": { name: "Meta Platforms Inc.", sector: "Communication Services" },
  "tsla-tesla-inc-share-price": { name: "Tesla Inc.", sector: "Automobile" },
  "nflx-netflix-inc-share-price": { name: "Netflix Inc.", sector: "Communication Services" },
  "dis-the-walt-disney-co-share-price": { name: "The Walt Disney Co.", sector: "Communication Services" },
  "lly-eli-lilly-and-co-share-price": { name: "Eli Lilly and Co.", sector: "Healthcare" },
  "unh-unitedhealth-group-inc-share-price": { name: "UnitedHealth Group Inc.", sector: "Healthcare" },
  "v-visa-inc-share-price": { name: "Visa Inc.", sector: "Financials" },
  "ma-mastercard-inc-share-price": { name: "Mastercard Inc.", sector: "Financials" },
  "jpm-jpmorgan-chase-co-share-price": { name: "JPMorgan Chase & Co.", sector: "Financials" },
  "wmt-walmart-inc-share-price": { name: "Walmart Inc.", sector: "Consumer Staples" },
  "cost-costco-wholesale-corp-share-price": { name: "Costco Wholesale Corp.", sector: "Consumer Staples" },
  "ko-coca-cola-co-share-price": { name: "Coca-Cola Co.", sector: "Consumer Staples" },
  "pep-pepsico-inc-share-price": { name: "PepsiCo Inc.", sector: "Consumer Staples" },
  "pltr-palantir-technologies-inc-share-price": { name: "Palantir Technologies Inc.", sector: "Technology" },
  "avgo-broadcom-inc-share-price": { name: "Broadcom Inc.", sector: "Technology" },
}

export default function UsStockDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const known = KNOWN[slug]
  const name = known?.name ?? nameFromSlug(slug.replace(/^[a-z]+-/, ""), /-share-price$/)

  return (
    <MarketDataSoon
      crumbs={[{ label: "Global Investing", href: "/global-investing" }, { label: "US Stocks" }, { label: name }]}
      title={name}
      badges={["NASDAQ / NYSE", ...(known ? [known.sector] : [])]}
      message={`Live prices and key figures for ${name} will appear here shortly.`}
      browse={{ label: "About Global Investing", href: "/global-investing" }}
      cta={{
        title: `Invest in ${name} from India`,
        text: "Trade US stocks directly from India through Shree Varahi's Global Investing platform.",
        label: "Start Global Investing →",
        href: "/global-investing",
      }}
    />
  )
}
