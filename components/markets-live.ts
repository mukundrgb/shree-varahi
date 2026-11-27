"use client"

// Live data for the navbar's Markets menu: Stocks, F&O, Mutual Funds and ETFs are grouped by
// the categories the APIs send, and every item links to its real page. Nothing is fetched
// until the menu is opened. If an API fails, the tab says live data isn't available (there are no
// hand-written fallback lists any more; only Stocks › Market Movers is hand-written).
//
//   Stocks        sectors (StockListResult.categories) → stocks in the hovered sector (loaded then)
//   F&O           the four /fno categories → contracts in the hovered category (loaded then)
//   Mutual Funds  main categories (asset classes) → their sub-categories, plus fund houses (AMCs)
//   ETFs          ETF categories → ETFs in each, biggest first

import { useApiResource } from "@/hooks/use-api-resource"
import { stocksApi } from "@/lib/stocks/api-client"
import { fnoApi, type FnoCategory } from "@/lib/fno/api-client"
import { mutualFundsApi } from "@/lib/mutual-funds/api-client"
import { ALL_ETFS, etfApi } from "@/lib/etf/api-client"

export type LiveExchange = "NSE" | "BSE" | "MCX" | "GLOBAL"
export interface LiveItem { name: string; href: string; exchange?: LiveExchange; meta?: string }

/** One tab's menu: its sub-tabs and, per sub-tab, the items (null = still loading). */
export interface LiveTab {
  subs: string[]
  items: (sub: string) => LiveItem[] | null
  loading: boolean
  failed: boolean
}

const MENU_ITEMS = 12

const FNO_TABS: { category: FnoCategory; label: string; kind: "futures" | "options" }[] = [
  { category: "index-futures", label: "Index Futures", kind: "futures" },
  { category: "index-options", label: "Index Options", kind: "options" },
  { category: "stock-futures", label: "Stock Futures", kind: "futures" },
  { category: "stock-options", label: "Stock Options", kind: "options" },
]

const count = (n: number) => n.toLocaleString("en-IN")

/** Stocks: API sectors; each sector's stocks load when that sector is shown. */
function useStocksTab(enabled: boolean, sub: string | null): LiveTab {
  const base = useApiResource(enabled ? "menu-stock-sectors" : null, (signal) => stocksApi.list({ page: 1, limit: 1 }, signal))
  const sectors = base.data?.categories ?? []
  const current = sub && sectors.includes(sub) ? sub : null
  const list = useApiResource(enabled && current ? `menu-stocks-${current}` : null,
    (signal) => stocksApi.list({ page: 1, sector: current ?? undefined, limit: MENU_ITEMS }, signal))

  return {
    subs: sectors,
    items: (s) => {
      if (s !== current) return null
      if (!list.data) return list.error ? [] : null
      return list.data.items.map((st) => ({
        name: st.name || st.symbol,
        href: `/stocks/${st.slug}`,
        exchange: st.exchanges?.includes("NSE") ? "NSE" : st.exchanges?.includes("BSE") ? "BSE" : undefined,
      }))
    },
    // "Not loaded yet" counts as loading, so the menu never flashes the fallback list first.
    loading: !base.data && !base.error,
    failed: !!base.error && !base.data,
  }
}

/** F&O: the four API categories; each one's contracts load when it is shown. */
function useFnoTab(enabled: boolean, sub: string | null): LiveTab {
  const tab = FNO_TABS.find((t) => t.label === sub) ?? null
  const list = useApiResource(enabled && tab ? `menu-fno-${tab.category}` : null,
    (signal) => fnoApi.cards(tab!.category, { limit: MENU_ITEMS }, signal))

  return {
    subs: FNO_TABS.map((t) => t.label),
    items: (s) => {
      if (!tab || s !== tab.label) return null
      if (!list.data) return list.error ? [] : null
      const seen = new Set<string>()
      return list.data.items
        .filter((c) => !seen.has(c.slug) && seen.add(c.slug))
        .map((c) => ({
          name: `${c.name} ${tab.kind === "futures" ? "Futures" : "Options"}`,
          href: `/${tab.kind}/${c.slug}-${tab.kind}`,
          exchange: (list.data?.exchange === "BSE" ? "BSE" : "NSE") as LiveExchange,
        }))
    },
    loading: false,
    failed: !!list.error && !list.data,
  }
}

/** Mutual funds: main categories → sub-categories (with fund counts), plus the biggest AMCs. */
function useFundsTab(enabled: boolean): LiveTab {
  const page = useApiResource(enabled ? "menu-mf-page" : null, (signal) => mutualFundsApi.page(signal))
  const info = page.data
  const mains = info?.assetClasses ?? []
  const AMCS = "Fund Houses (AMCs)"

  return {
    subs: info ? [...mains.map((m) => `${m.label} Funds`), AMCS] : [],
    items: (s) => {
      if (!info) return null
      if (s === AMCS) {
        return info.amcs.filter((a) => a.fundCount > 0).slice(0, MENU_ITEMS)
          .map((a) => ({ name: a.name, href: `/mutual-funds/amc/${a.slug}`, meta: `${count(a.fundCount)} funds` }))
      }
      const main = mains.find((m) => `${m.label} Funds` === s)
      if (!main) return []
      const q = (sub?: string) => `/mutual-funds?category=${encodeURIComponent(main.name)}${sub ? `&sub=${encodeURIComponent(sub)}` : ""}#find-your-fund`
      return [
        { name: `All ${main.label} Funds`, href: q(), meta: count(main.count) },
        ...main.categories.filter((c) => c.count > 0).slice(0, MENU_ITEMS - 1)
          .map((c) => ({ name: c.name, href: q(c.name), meta: count(c.count) })),
      ]
    },
    loading: !info && !page.error,
    failed: !!page.error && !info,
  }
}

/** ETFs: API categories → ETFs in each, largest (AUM) first. */
function useEtfTab(enabled: boolean): LiveTab {
  const list = useApiResource(enabled ? "menu-etfs" : null,
    (signal) => etfApi.list({ limit: ALL_ETFS, sort: "aum", order: "desc" }, signal))
  const data = list.data
  const cats = (data?.categories ?? []).filter((c) => c.count > 0)

  return {
    subs: cats.map((c) => `${c.category} ETF`),
    items: (s) => {
      if (!data) return null
      const cat = cats.find((c) => `${c.category} ETF` === s)
      if (!cat) return []
      return data.items.filter((e) => e.category === cat.category).slice(0, MENU_ITEMS)
        .map((e) => ({
          name: e.name,
          href: `/etf/${e.slug}`,
          exchange: e.exchanges?.includes("NSE") ? "NSE" : e.exchanges?.includes("BSE") ? "BSE" : undefined,
        }))
    },
    loading: !data && !list.error,
    failed: !!list.error && !data,
  }
}

/**
 * Live menu data. `open` = the menu is showing (desktop dropdown or mobile accordion);
 * `tab` / `sub` = what is showing, so lazily loaded lists fetch only what's needed.
 */
export function useLiveMarkets(open: boolean, tab: string, sub: string | null): Record<string, LiveTab> {
  const stocks = useStocksTab(open && tab === "Stocks", tab === "Stocks" ? sub : null)
  const fno = useFnoTab(open && tab === "F&O", tab === "F&O" ? sub : null)
  const funds = useFundsTab(open && tab === "Mutual Funds")
  const etfs = useEtfTab(open && tab === "ETF")
  return { "Stocks": stocks, "F&O": fno, "Mutual Funds": funds, "ETF": etfs }
}
