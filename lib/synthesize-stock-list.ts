import type { StockListPageData } from "@/components/stock-list-page"
import type { CollectionGroup } from "@/hooks/use-stock-collection"

// The page frame for a stock list: title, breadcrumb, description and where its rows come from.
// Rows are loaded from the backend's stored CMOTS data (GET /stocks/collections/:group/:slug,
// PRD M6b). Pages without a source show an honest "data coming soon" message, never made-up numbers.

export function titleFromSlug(slug: string) {
  return slug
    .replace(/-/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export function synthesizeStockList(
  slug: string,
  opts: { crumbCategory: string; titleOverride?: string; description?: string; group?: CollectionGroup } = { crumbCategory: "Market Cap" },
): StockListPageData {
  const title = opts.titleOverride ?? titleFromSlug(slug)
  return {
    slug,
    crumbCategory: opts.crumbCategory,
    title,
    lastUpdated: "",
    description: opts.description ?? `A list of stocks under "${title}" with their latest price, change, volume and 52-week range.`,
    ...(opts.group && slug ? { source: { group: opts.group, slug } } : {}),
  }
}
