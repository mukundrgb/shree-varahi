import type { ETFListPageData } from "@/components/etf-list-page"

// ETF list pages under /etf/traded-funds/* until their real data comes from the backend.
//
// These pages used to show made-up prices, AUM and returns for real ETFs. That was removed
// (27 Nov 2026): a broker's website must never show invented market data. Each page now shows
// its title and description with an honest "data coming soon" message, and no rows.

export function titleFromSlug(slug: string) {
  return slug
    .replace(/-/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

/** The page frame for an ETF list that has no real data yet: title, description, no rows. */
export function synthesizeETFList(
  slug: string,
  opts: { crumbCategory: string; titleOverride?: string; description?: string } = { crumbCategory: "By Type" },
): ETFListPageData {
  const title = opts.titleOverride ?? titleFromSlug(slug)
  return {
    slug,
    crumbCategory: opts.crumbCategory,
    title,
    lastUpdated: "",
    description: opts.description ?? `A list of ETFs under "${title}", covering price, assets, volume, returns and expense ratio.`,
    etfs: [],
  }
}
