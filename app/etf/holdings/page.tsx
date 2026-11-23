"use client"

import { Suspense, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronRight, ChevronDown, ArrowUpRight, Search, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmartSearch, SmartSelect } from "@/components/smart-controls"
import { StockAvatar } from "@/components/stock-avatar"
import { EtfHoldingsTable } from "@/components/etf-holdings-table"
import { isHoldingsFor, useEtfHoldings, useEtfList } from "@/hooks/etf/use-etf"
import { ALL_ETFS } from "@/lib/etf/api-client"
import { formatDate } from "@/lib/stocks/format"

// Equity ETFs (largest AUM first) and their holdings come from the backend (/api/v1/etfs).
// Holdings data is available for equity ETFs only, so only those are listed.

const EQUITY_ETFS = { category: "Equity", sort: "aum", order: "desc", limit: ALL_ETFS } as const

export default function EtfHoldingsPage() {
  // useSearchParams needs a Suspense boundary in the App Router.
  return (
    <Suspense>
      <EtfHoldings />
    </Suspense>
  )
}

function EtfHoldings() {
  const params = useSearchParams()
  const etfList = useEtfList(EQUITY_ETFS)
  const etfs = useMemo(() => etfList.data?.items ?? [], [etfList.data])
  const requested = params.get("etf")

  const [picked, setPicked] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  // Picked ETF, else the one in ?etf=, else the largest equity ETF.
  const slug = picked ?? (requested && etfs.some((e) => e.slug === requested) ? requested : etfs[0]?.slug ?? "")
  // Holdings are looked up by the ETF's ISIN (the slug is only for the URL / picker).
  const isin = etfs.find((e) => e.slug === slug)?.isin ?? null
  const result = useEtfHoldings(isin)
  const data = isHoldingsFor(result.data, isin) ? result.data : null
  const etf = etfs.find((e) => e.slug === slug) ?? { slug, name: data?.name ?? "", symbol: data?.name ?? "" }
  const holdings = data?.holdings ?? []

  const query = search.trim().toLowerCase()
  const visible = query
    ? holdings.filter((h) => h.name.toLowerCase().includes(query) || h.sector.toLowerCase().includes(query))
    : holdings

  const pickEtf = (next: string) => { setPicked(next); setSearch("") }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HEADER ── */}
      <section className="bg-cream border-b border-border/40 pt-24 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-5">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/etf" className="hover:text-foreground transition-colors">ETFs</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">Equity Holdings</span>
          </nav>
          <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep mb-2">ETF Research</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">Equity ETF Holdings</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            See the stocks an equity ETF holds and how much of the fund each one makes up.
          </p>
        </div>
      </section>

      <section className="bg-background py-6 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ETF picker + search */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-4 mb-5">
            <div className="w-full sm:w-80">
              <label htmlFor="etf-picker" className="block text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1.5">
                Select Equity ETF
              </label>
              <SmartSelect
                id="etf-picker"
                value={etf.slug}
                onChange={pickEtf}
                options={etfs.map((e) => ({ value: e.slug, label: e.name }))}
                title="Select Equity ETF"
              />
            </div>

            <div className="w-full sm:w-80">
              <label htmlFor="holding-search" className="block text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1.5">
                Search Holdings
              </label>
              <SmartSearch value={search} onChange={setSearch} placeholder="Search by stock or sector…" ariaLabel="Search holdings" />
            </div>

            <Link href={`/etf/${etf.slug}`} className="lg:ml-auto lg:pb-2 text-[12px] font-bold text-burgundy hover:text-burgundy-deep flex items-center gap-1 transition-colors">
              View {etf.name} details <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <StockAvatar symbol={etf.symbol} name={etf.name} logoUrl={null} className="w-9 h-9 text-[11px]" />
            <div>
              <p className="text-sm font-black text-foreground">{etf.name}</p>
              <p className="text-xs text-muted-foreground">
                {query
                  ? <>Showing <span className="font-bold text-foreground">{visible.length}</span> of {holdings.length} equity holdings</>
                  : <><span className="font-bold text-foreground">{holdings.length}</span>{" "}equity holdings</>}
                {data?.portfolioDate && <> · as of {formatDate(data.portfolioDate)}</>}
              </p>
            </div>
          </div>

          <div className="rounded-[8px] border border-border overflow-hidden bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
            <EtfHoldingsTable
              holdings={visible}
              loading={!(etfList.error || result.error) && (etfList.loading || (!!isin && !data))}
              status={etfList.error || result.error ? (
                <>Unable to load holdings. <button onClick={() => { etfList.retry(); result.retry() }} className="text-burgundy font-bold hover:underline">Retry</button></>
              ) : query ? "No holdings match your search." : "No equity holdings data for this ETF."}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
