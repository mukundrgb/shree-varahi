"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight, TrendingUp, Bell,
  Check, Clock, Calendar, Users, Shield, Zap, Award,
  ArrowUpRight, FileText,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CardGridSkeleton, TableRowsSkeleton } from "@/components/skeletons"
import { useIpoPage } from "@/hooks/use-ipos"
import type { ClosedIpoApi, OpenIpoApi, UpcomingIpoApi } from "@/lib/ipo/api-client"
import { formatDate } from "@/lib/stocks/format"

// ─── Types ─────────────────────────────────────────────────────────────────
// Card shapes used by this page. Data comes from the backend (/api/v1/ipos) via the adapters below.
// CMOTS does not provide GMP, subscription or allotment dates, so those are not shown.

type IpoType = "Mainboard" | "SME" | "InvIT" | "REIT"

interface OpenIpo {
  id: string
  company: string
  ipoType: IpoType
  color: string
  logoUrl: string | null
  openDate: string
  closeDate: string
  listDate: string
  exchange: string
  priceMin: number | null
  priceMax: number | null
  issueSizeCr: number | null
  lotSize: number | null
  minInvestment: number | null
}

interface UpcomingIpo {
  id: string
  company: string
  ipoType: IpoType
  color: string
  logoUrl: string | null
  openDate: string
  closeDate: string
  estSizeCr: number | null
  minInvestment: number | null
}

interface ClosedIpo {
  id: string
  company: string
  color: string
  logoUrl: string | null
  openDate: string
  closeDate: string
  listDate: string
  exchange: string
  issuePrice: number | null
  listingPrice: number | null
  listingGainPct: number | null
  issueSizeCr: number | null
  ipoType: IpoType
}

// ─── Adapters: backend IPO data → card shapes ──────────────────────────────

const BADGE_COLORS = ["#15803D", "#1E40AF", "#D97706", "#7C3AED", "#BE123C", "#0F766E", "#1D4ED8", "#B45309"]

/** Stable accent colour per company. */
function colorFor(id: number): string {
  return BADGE_COLORS[Math.abs(id) % BADGE_COLORS.length]
}

const showDate = (value: string | null) => (value ? formatDate(value) : "—")

function toOpenIpo(ipo: OpenIpoApi): OpenIpo {
  return {
    id: String(ipo.id),
    company: ipo.company,
    ipoType: ipo.category,
    color: colorFor(ipo.id),
    logoUrl: ipo.logoUrl,
    openDate: showDate(ipo.openDate),
    closeDate: showDate(ipo.closeDate),
    listDate: showDate(ipo.listingDate),
    exchange: ipo.exchanges.join(", ") || "—",
    priceMin: ipo.priceMin,
    priceMax: ipo.priceMax,
    issueSizeCr: ipo.issueSizeCr,
    lotSize: ipo.lotSize,
    minInvestment: ipo.minInvestment,
  }
}

function toUpcomingIpo(ipo: UpcomingIpoApi): UpcomingIpo {
  return {
    id: String(ipo.id),
    company: ipo.company,
    ipoType: ipo.category,
    color: colorFor(ipo.id),
    logoUrl: ipo.logoUrl,
    openDate: showDate(ipo.openDate),
    closeDate: showDate(ipo.closeDate),
    estSizeCr: ipo.issueSizeCr,
    minInvestment: ipo.minInvestment,
  }
}

function toClosedIpo(ipo: ClosedIpoApi): ClosedIpo {
  return {
    id: String(ipo.id),
    company: ipo.company,
    color: colorFor(ipo.id),
    logoUrl: ipo.logoUrl,
    openDate: showDate(ipo.openDate),
    closeDate: showDate(ipo.closeDate),
    listDate: showDate(ipo.listingDate),
    exchange: ipo.exchanges.join(", ") || "—",
    issuePrice: ipo.issuePrice,
    listingPrice: ipo.listingPrice,
    listingGainPct: ipo.listingGainPct,
    issueSizeCr: ipo.issueSizeCr,
    ipoType: ipo.category,
  }
}

const rupees = (value: number | null) => (value === null ? "—" : `₹${value.toLocaleString("en-IN")}`)
const crore = (value: number | null) => (value === null ? "—" : `₹${value.toLocaleString("en-IN")} Cr`)

/** Number of closed IPOs shown under "Recently Closed". */
const RECENTLY_CLOSED = 10


function CompanyBadge({
  company, color, logoUrl = null, size = "md",
}: {
  company: string; color: string; logoUrl?: string | null; size?: "sm" | "md" | "lg"
}) {
  const initials = company
    .split(" ")
    .filter((w) => w.length > 1 && !["Ltd.", "Ltd", "Pvt.", "Inc.", "Inc", "Platforms", "Holdings", "Technologies", "Energy", "Motor", "India"].includes(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("")

  const sizeMap = {
    sm: "w-8 h-8 text-[10px]",
    md: "w-11 h-11 text-[12px]",
    lg: "w-14 h-14 text-[14px]",
  }

  if (logoUrl) {
    return (
      <div className={`${sizeMap[size]} rounded-[8px] bg-white border border-border flex items-center justify-center overflow-hidden shrink-0`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoUrl} alt={company} className="w-full h-full object-contain p-1" loading="lazy" />
      </div>
    )
  }

  return (
    <div
      className={`${sizeMap[size]} rounded-[8px] flex items-center justify-center font-black shrink-0`}
      style={{ background: color + "18", color, border: `1.5px solid ${color}28` }}
    >
      {initials}
    </div>
  )
}

function IpoTypeBadge({ type }: { type: IpoType }) {
  const map: Record<IpoType, string> = {
    Mainboard: "bg-burgundy/8 text-burgundy border-burgundy/20",
    SME:       "bg-amber-500/10 text-amber-600 border-amber-200",
    InvIT:     "bg-blue-500/10 text-blue-600 border-blue-200",
    REIT:      "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  }
  return (
    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[3px] border ${map[type]}`}>
      {type}
    </span>
  )
}


function SubscBar({ label, value, max = 10 }: { label: string; value: number; max?: number }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-bold text-muted-foreground w-8 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-burgundy rounded-full"
        />
      </div>
      <span className="text-[10px] font-extrabold text-foreground w-10 text-right shrink-0">{value.toFixed(1)}x</span>
    </div>
  )
}

// ─── Open IPO Card ──────────────────────────────────────────────────────────

function OpenIpoCard({ ipo }: { ipo: OpenIpo }) {
  const minInvestment = ipo.minInvestment ?? (ipo.priceMax !== null && ipo.lotSize !== null ? ipo.priceMax * ipo.lotSize : null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white border border-border rounded-[10px] overflow-hidden hover:shadow-[0_6px_28px_rgba(0,0,0,0.07)] transition-all duration-300"
    >
      {/* Top accent */}
      <div className="h-[3px]" style={{ background: `linear-gradient(to right, ${ipo.color}80, ${ipo.color}30)` }} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <CompanyBadge company={ipo.company} color={ipo.color} logoUrl={ipo.logoUrl} size="md" />
            <div>
              <div className="font-extrabold text-sm text-foreground leading-tight">{ipo.company}</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <IpoTypeBadge type={ipo.ipoType} />
                <span className="text-[9px] text-muted-foreground">{ipo.exchange}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Date row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Opens",   val: ipo.openDate  },
            { label: "Closes",  val: ipo.closeDate },
            { label: "Listing", val: ipo.listDate  },
          ].map((d) => (
            <div key={d.label} className="bg-cream/70 rounded-[5px] px-2.5 py-2 text-center">
              <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide mb-0.5">{d.label}</div>
              <div className="text-[11px] font-extrabold text-foreground">{d.val}</div>
            </div>
          ))}
        </div>

        {/* Price / Issue / Lot */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Price Band", val: ipo.priceMin === null ? "—" : ipo.priceMin === ipo.priceMax ? `₹${ipo.priceMin}` : `₹${ipo.priceMin} to ₹${ipo.priceMax}` },
            { label: "Issue Size",  val: crore(ipo.issueSizeCr) },
            { label: "Lot Size",    val: ipo.lotSize === null ? "—" : `${ipo.lotSize} shares` },
          ].map((d) => (
            <div key={d.label}>
              <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide mb-0.5">{d.label}</div>
              <div className="text-[11px] font-extrabold text-foreground">{d.val}</div>
            </div>
          ))}
        </div>

        {/* Min investment */}
        <div className="flex items-center justify-between mb-4 py-2 px-3 rounded-[5px] bg-burgundy/[0.04] border border-burgundy/10">
          <span className="text-[10px] font-bold text-muted-foreground">Min. Investment</span>
          <span className="text-sm font-black text-burgundy">{rupees(minInvestment)}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5">
          <Button
            size="sm"
            className="flex-1 bg-burgundy hover:bg-burgundy-deep text-white font-bold rounded-[5px] h-9 text-xs"
          >
            Apply Now →
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-border text-muted-foreground hover:text-foreground rounded-[5px] h-9 px-3 text-xs"
          >
            <FileText className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Upcoming IPO Card ──────────────────────────────────────────────────────

function UpcomingIpoCard({ ipo, index }: { ipo: UpcomingIpo; index: number }) {
  const [notified, setNotified] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="bg-white border border-border rounded-[10px] p-5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-gold/25 transition-all duration-300"
    >
      <div className="flex items-start gap-3 mb-4">
        <CompanyBadge company={ipo.company} color={ipo.color} logoUrl={ipo.logoUrl} />
        <div className="min-w-0">
          <div className="font-extrabold text-sm text-foreground leading-tight truncate">{ipo.company}</div>
          <div className="mt-1.5">
            <IpoTypeBadge type={ipo.ipoType} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Opens",      val: ipo.openDate },
          { label: "Closes",     val: ipo.closeDate },
          { label: "Issue Size", val: crore(ipo.estSizeCr) },
        ].map((d) => (
          <div key={d.label} className="bg-cream/70 rounded-[5px] px-2.5 py-2 text-center">
            <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide mb-0.5">{d.label}</div>
            <div className="text-[11px] font-extrabold text-foreground">{d.val}</div>
          </div>
        ))}
      </div>

      {/* Min investment */}
      <div className="flex items-center justify-between mb-4 py-2 px-3 rounded-[5px] bg-burgundy/[0.04] border border-burgundy/10">
        <span className="text-[10px] font-bold text-muted-foreground">Min. Investment</span>
        <span className="text-sm font-black text-burgundy">{rupees(ipo.minInvestment)}</span>
      </div>

      <button
        onClick={() => setNotified(true)}
        className={`w-full h-9 rounded-[5px] text-xs font-bold border transition-all duration-200 flex items-center justify-center gap-2 ${
          notified
            ? "bg-profit/10 text-profit border-profit/25"
            : "bg-cream border-gold/30 text-gold-deep hover:bg-gold/10 hover:border-gold/50"
        }`}
      >
        {notified ? (
          <><Check className="w-3.5 h-3.5" /> Notification Set</>
        ) : (
          <><Bell className="w-3.5 h-3.5" /> Notify Me</>
        )}
      </button>
    </motion.div>
  )
}

// ─── Closed IPO Row ─────────────────────────────────────────────────────────

function ClosedIpoRow({ ipo, index }: { ipo: ClosedIpo; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="grid border-b border-border/40 last:border-0 hover:bg-cream/20 transition-colors duration-150"
      style={{ gridTemplateColumns: "40px 1fr 90px 90px 100px 100px 120px" }}
    >
      {/* Logo */}
      <div className="flex items-center py-3.5 pr-2">
        <CompanyBadge company={ipo.company} color={ipo.color} logoUrl={ipo.logoUrl} size="sm" />
      </div>

      {/* Company */}
      <div className="flex flex-col justify-center py-3.5 pl-2 min-w-0">
        <div className="font-extrabold text-sm text-foreground leading-tight truncate">{ipo.company}</div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <IpoTypeBadge type={ipo.ipoType} />
        </div>
      </div>

      {/* Issue price */}
      <div className="flex flex-col justify-center py-3.5">
        <div className="text-[9px] font-bold text-muted-foreground mb-0.5">Issue Price</div>
        <div className="text-sm font-extrabold text-foreground">{rupees(ipo.issuePrice)}</div>
      </div>

      {/* Listing price */}
      <div className="flex flex-col justify-center py-3.5">
        <div className="text-[9px] font-bold text-muted-foreground mb-0.5">Listed At</div>
        <div className="text-sm font-extrabold text-foreground">{rupees(ipo.listingPrice)}</div>
        {ipo.listingGainPct !== null && (
          <div className={`text-[10px] font-bold ${ipo.listingGainPct >= 0 ? "text-profit" : "text-loss"}`}>
            {ipo.listingGainPct >= 0 ? "+" : ""}{ipo.listingGainPct.toFixed(2)}%
          </div>
        )}
      </div>

      {/* Opened */}
      <div className="flex flex-col justify-center py-3.5">
        <div className="text-[9px] font-bold text-muted-foreground mb-0.5">Opened</div>
        <div className="text-sm font-extrabold text-foreground">{ipo.openDate}</div>
      </div>

      {/* Closed */}
      <div className="flex flex-col justify-center py-3.5">
        <div className="text-[9px] font-bold text-muted-foreground mb-0.5">Closed</div>
        <div className="text-sm font-extrabold text-foreground">{ipo.closeDate}</div>
      </div>

      {/* Allotment CTA */}
      <div className="flex items-center justify-end py-3.5">
        <button className="text-[10px] font-bold text-burgundy hover:text-burgundy-deep border border-burgundy/25 hover:border-burgundy/50 px-3 py-1.5 rounded-[5px] transition-all">
          Check Allotment
        </button>
      </div>
    </motion.div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

type Tab = "open" | "upcoming" | "closed"

export default function IpoPage() {
  const [tab, setTab] = useState<Tab>("open")

  const ipoData = useIpoPage()
  const OPEN_IPOS = useMemo(() => (ipoData.data?.open ?? []).map(toOpenIpo), [ipoData.data])
  const UPCOMING_IPOS = useMemo(() => (ipoData.data?.upcoming ?? []).map(toUpcomingIpo), [ipoData.data])
  const CLOSED_IPOS = useMemo(
    () => (ipoData.data?.closed ?? []).slice(0, RECENTLY_CLOSED).map(toClosedIpo),
    [ipoData.data],
  )

  /** Loading / error message for a tab, or null once data is in. */
  const ipoLoading = ipoData.loading && !ipoData.data
  const listStatus = ipoData.loading && !ipoData.data
    ? "Loading IPOs…"
    : ipoData.error
      ? <>Unable to load IPOs. <button onClick={ipoData.retry} className="text-burgundy font-bold hover:underline">Retry</button></>
      : null

  // Key dates sidebar: open IPOs, or upcoming ones when nothing is open.
  const DATES = OPEN_IPOS.length
    ? OPEN_IPOS.map((i) => ({ id: i.id, company: i.company, color: i.color, logoUrl: i.logoUrl, open: i.openDate, close: i.closeDate, listing: i.listDate }))
    : UPCOMING_IPOS.map((i) => ({ id: i.id, company: i.company, color: i.color, logoUrl: i.logoUrl, open: i.openDate, close: i.closeDate, listing: "—" }))

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative bg-cream border-b border-border/40 pt-24 pb-6 lg:pb-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">IPO</span>
          </nav>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-6 lg:gap-12 items-center">
            <div className="space-y-3 max-w-2xl">
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
                Initial Public Offerings
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-foreground tracking-tight leading-[1.1]">
                Upcoming IPO <span className="text-burgundy">2026</span>
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                Apply for the latest IPOs with zero commission. Real-time subscription data, GMP tracking, and instant allotment status.
              </p>
            </div>

            {/* Stats, on the right beside the heading */}
            <div className="grid grid-cols-2 gap-3 lg:w-[300px]">
              {[
                { v: OPEN_IPOS.length.toString(),    l: "Open Now",      dot: true  },
                { v: UPCOMING_IPOS.length.toString(),l: "Upcoming",      dot: false },
              ].map((s) => (
                <div key={s.l} className="bg-white border border-border shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-[10px] px-4 py-4">
                  <div className="flex items-center gap-1.5 mb-1">
                    {s.dot && <span className="w-1.5 h-1.5 rounded-full bg-profit animate-pulse" />}
                    <span className="text-xl lg:text-2xl font-black text-burgundy tabular-nums truncate">{s.v}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── MAIN CONTENT ── */}
      <section id="ipo-list" className="bg-background py-8 lg:py-12 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8 [&>*]:min-w-0">

            {/* LEFT: Tabs + IPO listings */}
            <div>
              {/* Tabs */}
              <div className="overflow-x-auto mb-6" style={{ scrollbarWidth: "none" }}>
                <div className="flex gap-0 border border-border rounded-[6px] overflow-hidden bg-cream/50 w-fit">
                  {([
                    { id: "open",     label: "Open Now",       dot: true  },
                    { id: "upcoming", label: "Upcoming IPOs",  dot: false },
                    { id: "closed",   label: "Recently Closed",dot: false },
                  ] as const).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`px-5 py-2.5 text-[12px] font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                        tab === t.id
                          ? "bg-burgundy text-white"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/60"
                      }`}
                    >
                      {t.dot && (
                        <span className={`w-1.5 h-1.5 rounded-full ${tab === t.id ? "bg-white animate-pulse" : "bg-profit animate-pulse"}`} />
                      )}
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">

                {/* ── OPEN IPOs ── */}
                {tab === "open" && (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {OPEN_IPOS.length === 0 ? (
                      ipoLoading ? <CardGridSkeleton count={4} className="grid sm:grid-cols-2 gap-5" cardClassName="h-48" />
                        : <div className="text-center py-16 text-muted-foreground text-sm">{listStatus ?? "No IPOs open right now. Check Upcoming IPOs."}</div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-5">
                        {OPEN_IPOS.map((ipo) => <OpenIpoCard key={ipo.id} ipo={ipo} />)}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ── UPCOMING IPOs ── */}
                {tab === "upcoming" && (
                  <motion.div
                    key="upcoming"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid sm:grid-cols-2 gap-5"
                  >
                    {UPCOMING_IPOS.length === 0 && (ipoLoading
                      ? <CardGridSkeleton count={4} className="sm:col-span-2 grid sm:grid-cols-2 gap-5" cardClassName="h-40" />
                      : <div className="sm:col-span-2 text-center py-16 text-muted-foreground text-sm">{listStatus ?? "No upcoming IPOs announced yet."}</div>
                    )}
                    {UPCOMING_IPOS.map((ipo, i) => <UpcomingIpoCard key={ipo.id} ipo={ipo} index={i} />)}
                  </motion.div>
                )}

                {/* ── CLOSED IPOs ── */}
                {tab === "closed" && (
                  <motion.div
                    key="closed"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Desktop table */}
                    <div className="hidden md:block rounded-[8px] border border-border bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                      <div
                        className="grid px-4 py-2.5 border-b border-border bg-cream/60"
                        style={{ gridTemplateColumns: "40px 1fr 90px 90px 100px 100px 120px" }}
                      >
                        <div />
                        <div className="pl-2 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Company</div>
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Issue ₹</div>
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Listed ₹</div>
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Opened</div>
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Closed</div>
                        <div />
                      </div>
                      <div className="px-4">
                        {CLOSED_IPOS.length === 0 && (ipoLoading
                          ? <TableRowsSkeleton rows={5} columns="minmax(0,1fr) 96px 96px" avatar label="Loading IPOs" className="px-0" />
                          : <div className="text-center py-12 text-muted-foreground text-sm">{listStatus ?? "No recently closed IPOs."}</div>
                        )}
                        {CLOSED_IPOS.map((ipo, i) => <ClosedIpoRow key={ipo.id} ipo={ipo} index={i} />)}
                      </div>
                    </div>

                    {/* Mobile cards */}
                    <div className="md:hidden space-y-3">
                      {CLOSED_IPOS.map((ipo, i) => (
                          <motion.div
                            key={ipo.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: i * 0.05 }}
                            className="bg-white border border-border rounded-[8px] p-4"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <CompanyBadge company={ipo.company} color={ipo.color} logoUrl={ipo.logoUrl} size="sm" />
                              <div className="min-w-0">
                                <div className="font-extrabold text-sm text-foreground truncate">{ipo.company}</div>
                                <div className="text-[10px] text-muted-foreground"> Listed {ipo.listDate}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2 mb-3">
                              <div className="text-center">
                                <div className="text-[9px] font-bold text-muted-foreground">Issue</div>
                                <div className="text-sm font-extrabold">{rupees(ipo.issuePrice)}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-[9px] font-bold text-muted-foreground">Listed</div>
                                <div className="text-sm font-extrabold">{rupees(ipo.listingPrice)}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-[9px] font-bold text-muted-foreground">Opened</div>
                                <div className="text-[11px] font-extrabold">{ipo.openDate}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-[9px] font-bold text-muted-foreground">Closed</div>
                                <div className="text-[11px] font-extrabold">{ipo.closeDate}</div>
                              </div>
                            </div>
                            <button className="w-full text-[11px] font-bold text-burgundy border border-burgundy/25 rounded-[5px] py-1.5">
                              Check Allotment
                            </button>
                          </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* RIGHT: Sidebar */}
            <div className="space-y-5">
              {/* Important dates */}
              <div className="bg-white border border-border rounded-[10px] p-5">
                <h3 className="font-extrabold text-sm text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold-deep" strokeWidth={1.8} />
                  Important IPO Dates
                </h3>
                <div className="space-y-3">
                  {DATES.length === 0 && <p className="text-[11px] text-muted-foreground">{listStatus ?? "No IPO dates to show."}</p>}
                  {DATES.map((ipo) => (
                    <div key={ipo.id} className="border-b border-border/40 last:border-0 pb-3 last:pb-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <CompanyBadge company={ipo.company} color={ipo.color} logoUrl={ipo.logoUrl} size="sm" />
                        <span className="font-bold text-xs text-foreground">{ipo.company.split(" ")[0]} {ipo.company.split(" ")[1]}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 pl-10">
                        {[
                          { l: "Open",     v: ipo.open    },
                          { l: "Close",    v: ipo.close   },
                          { l: "Listing",  v: ipo.listing },
                        ].map((d) => (
                          <div key={d.l}>
                            <span className="text-[9px] font-bold text-muted-foreground">{d.l}: </span>
                            <span className="text-[9px] font-extrabold text-foreground">{d.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility quick check */}
              <div className="bg-gold/[0.06] border border-gold/20 rounded-[10px] p-5">
                <h3 className="font-extrabold text-sm text-foreground mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gold-deep" strokeWidth={1.8} />
                  Who Can Apply?
                </h3>
                <ul className="space-y-2">
                  {["Indian Citizen / NRI", "Valid PAN Card", "Active Demat Account", "Bank with ASBA facility"].map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-[11px] text-foreground/80">
                      <Check className="w-3 h-3 text-profit shrink-0" strokeWidth={2.5} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-3 border-t border-gold/15">
                  <p className="text-[10px] text-muted-foreground">
                    Retail investors can apply up to <span className="font-bold text-foreground">₹2,00,000</span> per IPO.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── HOW TO APPLY ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-1">Simple Process</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">Apply for an IPO in 3 steps.</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: Users,
                title: "Open Your Account",
                desc: "Complete KYC digitally in minutes with Aadhaar & PAN. Get your Demat account instantly.",
                color: "#8B0D19",
              },
              {
                step: "02",
                icon: TrendingUp,
                title: "Select the IPO",
                desc: "Browse open and upcoming IPOs. Read the Red Herring Prospectus, GMP, and analyst insights.",
                color: "#8B0D19",
              },
              {
                step: "03",
                icon: Award,
                title: "Bid & Track",
                desc: "Enter your price bid and quantity. Funds are blocked via ASBA, no upfront debit. Track allotment instantly.",
                color: "#8B0D19",
              },
            ].map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative bg-white border border-border rounded-[10px] p-6 text-center hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-gold/25 transition-all duration-300"
                >
                  {i < 2 && (
                    <div className="hidden sm:block absolute top-8 right-0 translate-x-1/2 z-10">
                      <ChevronRight className="w-5 h-5 text-border" />
                    </div>
                  )}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: s.color + "12", border: `2px solid ${s.color}25` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: s.color }} strokeWidth={1.8} />
                  </div>
                  <span className="text-[10px] font-extrabold tracking-widest text-muted-foreground/60 block mb-2">{s.step}</span>
                  <h3 className="font-extrabold text-sm text-foreground mb-2">{s.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-12 lg:py-14 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-1">Why Shree Varahi</p>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">The smarter way to invest in IPOs.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Award,    color: "#8B0D19", title: "₹0 Application Fee",    desc: "Apply to any IPO with zero brokerage or application charges." },
              { icon: Zap,      color: "#8B0D19", title: "ASBA Based Bidding",    desc: "Funds stay in your bank until allotment. No premature debit." },
              { icon: Clock,    color: "#8B0D19", title: "Quick Allotment Alert", desc: "Get instant notifications on allotment status on app and email." },
              { icon: FileText, color: "#8B0D19", title: "Research & GMP",        desc: "In-depth IPO analysis, RHP summaries, and live GMP tracking." },
            ].map((b, i) => {
              const Icon = b.icon
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="bg-white border border-border rounded-[8px] p-5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:border-gold/20 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-[7px] flex items-center justify-center mb-3"
                    style={{ background: b.color + "12", border: `1px solid ${b.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: b.color }} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-extrabold text-sm text-foreground mb-1.5">{b.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{b.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
