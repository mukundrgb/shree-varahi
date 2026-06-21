"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight, TrendingUp, TrendingDown, Bell,
  Check, Clock, Calendar, Users, Shield, Zap, Award,
  ArrowUpRight, AlertCircle, FileText,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// ─── Types ─────────────────────────────────────────────────────────────────

type IpoType = "Mainboard" | "SME" | "InvIT" | "REIT"

interface OpenIpo {
  id: string
  company: string
  sector: string
  ipoType: IpoType
  color: string
  openDate: string
  closeDate: string
  allotDate: string
  listDate: string
  exchange: string
  priceMin: number
  priceMax: number
  issueSizeCr: number
  lotSize: number
  gmp: number
  subscQIB: number
  subscHNI: number
  subscRII: number
  subscTotal: number
  highlight: string
}

interface UpcomingIpo {
  id: string
  company: string
  sector: string
  color: string
  expectedOpen: string
  estSizeCr: number
  estValuation: string
  highlight: string
}

interface ClosedIpo {
  id: string
  company: string
  sector: string
  color: string
  closeDate: string
  listDate: string
  exchange: string
  issuePrice: number
  listingPrice: number
  listingGainPct: number
  subscTotal: number
  issueSizeCr: number
  ipoType: IpoType
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

const OPEN_IPOS: OpenIpo[] = [
  {
    id: "ather",
    company: "Ather Energy Ltd.",
    sector: "EV / Auto",
    ipoType: "Mainboard",
    color: "#15803D",
    openDate: "28 Apr 2026",
    closeDate: "30 Apr 2026",
    allotDate: "2 May 2026",
    listDate: "6 May 2026",
    exchange: "NSE, BSE",
    priceMin: 304,
    priceMax: 321,
    issueSizeCr: 3100,
    lotSize: 46,
    gmp: 28,
    subscQIB: 8.2,
    subscHNI: 5.4,
    subscRII: 4.1,
    subscTotal: 5.8,
    highlight: "India's leading electric two-wheeler maker with 80%+ EV market share and 2 Mn+ vehicles on road.",
  },
  {
    id: "citius",
    company: "Citius Transnet InvIT",
    sector: "Infrastructure",
    ipoType: "InvIT",
    color: "#1E40AF",
    openDate: "28 Apr 2026",
    closeDate: "30 Apr 2026",
    allotDate: "3 May 2026",
    listDate: "7 May 2026",
    exchange: "NSE",
    priceMin: 100,
    priceMax: 100,
    issueSizeCr: 1105,
    lotSize: 1500,
    gmp: 5,
    subscQIB: 3.2,
    subscHNI: 2.1,
    subscRII: 2.8,
    subscTotal: 2.9,
    highlight: "Toll road and transmission InvIT offering stable distribution income from operational assets.",
  },
  {
    id: "propshare",
    company: "Property Share REIT",
    sector: "Real Estate",
    ipoType: "REIT",
    color: "#D97706",
    openDate: "26 Apr 2026",
    closeDate: "29 Apr 2026",
    allotDate: "30 Apr 2026",
    listDate: "5 May 2026",
    exchange: "BSE",
    priceMin: 10,
    priceMax: 10,
    issueSizeCr: 244,
    lotSize: 10000,
    gmp: 0,
    subscQIB: 1.2,
    subscHNI: 0.8,
    subscRII: 1.4,
    subscTotal: 1.2,
    highlight: "India's first retail-focused REIT investing in high-yield commercial real estate assets.",
  },
]

const UPCOMING_IPOS: UpcomingIpo[] = [
  {
    id: "jio",
    company: "Reliance Jio Platforms Ltd.",
    sector: "Telecom / Tech",
    color: "#1E40AF",
    expectedOpen: "Q3 FY27 (Est.)",
    estSizeCr: 92000,
    estValuation: "₹9.3 Lakh Cr",
    highlight: "India's largest telecom operator with 470 Mn+ subscribers. Could be the biggest IPO in Indian history.",
  },
  {
    id: "zepto",
    company: "Zepto (KiranaKart Technologies)",
    sector: "Quick Commerce",
    color: "#7C3AED",
    expectedOpen: "Aug 2026 (Est.)",
    estSizeCr: 35000,
    estValuation: "₹35,000 Cr",
    highlight: "10-minute grocery delivery startup with 120% revenue growth and presence in 10+ cities.",
  },
  {
    id: "meesho",
    company: "Meesho Inc.",
    sector: "E-Commerce",
    color: "#DC2626",
    expectedOpen: "Oct 2026 (Est.)",
    estSizeCr: 42000,
    estValuation: "₹42,000 Cr",
    highlight: "Social commerce leader with 150 Mn+ shoppers and the widest tier-2/3 city reach in India.",
  },
  {
    id: "pw",
    company: "PhysicsWallah Pvt. Ltd.",
    sector: "EdTech",
    color: "#0891B2",
    expectedOpen: "Sep 2026 (Est.)",
    estSizeCr: 8000,
    estValuation: "₹8,000 Cr",
    highlight: "India's fastest-growing affordable edtech platform with 8 Mn+ paid learners nationwide.",
  },
  {
    id: "bluestone",
    company: "BlueStone Jewellery Ltd.",
    sector: "Jewellery / Retail",
    color: "#B45309",
    expectedOpen: "Jul 2026 (Est.)",
    estSizeCr: 1500,
    estValuation: "₹4,500 Cr",
    highlight: "Omnichannel jewellery brand with 180+ stores and strong D2C digital-first positioning.",
  },
]

const CLOSED_IPOS: ClosedIpo[] = [
  {
    id: "hyundai",
    company: "Hyundai Motor India Ltd.",
    sector: "Auto",
    color: "#1D4ED8",
    ipoType: "Mainboard",
    closeDate: "17 Oct 2025",
    listDate: "22 Oct 2025",
    exchange: "NSE, BSE",
    issuePrice: 1960,
    listingPrice: 1934,
    listingGainPct: -1.33,
    subscTotal: 2.37,
    issueSizeCr: 27870,
  },
  {
    id: "swiggy",
    company: "Swiggy Ltd.",
    sector: "Food Delivery",
    color: "#EA580C",
    ipoType: "Mainboard",
    closeDate: "8 Nov 2025",
    listDate: "13 Nov 2025",
    exchange: "NSE, BSE",
    issuePrice: 390,
    listingPrice: 412,
    listingGainPct: 5.64,
    subscTotal: 3.59,
    issueSizeCr: 11327,
  },
  {
    id: "ntpcgreen",
    company: "NTPC Green Energy Ltd.",
    sector: "Renewable Energy",
    color: "#15803D",
    ipoType: "Mainboard",
    closeDate: "22 Nov 2025",
    listDate: "27 Nov 2025",
    exchange: "NSE, BSE",
    issuePrice: 108,
    listingPrice: 111,
    listingGainPct: 2.78,
    subscTotal: 2.55,
    issueSizeCr: 10000,
  },
  {
    id: "sagility",
    company: "Sagility India Ltd.",
    sector: "Healthcare IT",
    color: "#7C3AED",
    ipoType: "Mainboard",
    closeDate: "7 Nov 2025",
    listDate: "12 Nov 2025",
    exchange: "NSE, BSE",
    issuePrice: 30,
    listingPrice: 31.06,
    listingGainPct: 3.53,
    subscTotal: 3.21,
    issueSizeCr: 2106,
  },
  {
    id: "acme",
    company: "ACME Solar Holdings Ltd.",
    sector: "Solar Energy",
    color: "#D97706",
    ipoType: "Mainboard",
    closeDate: "8 Nov 2025",
    listDate: "13 Nov 2025",
    exchange: "NSE, BSE",
    issuePrice: 289,
    listingPrice: 279,
    listingGainPct: -3.46,
    subscTotal: 2.75,
    issueSizeCr: 2900,
  },
]

// ─── Sub-components ─────────────────────────────────────────────────────────

function CompanyBadge({
  company, color, size = "md",
}: {
  company: string; color: string; size?: "sm" | "md" | "lg"
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

function GmpBadge({ gmp, issuePrice }: { gmp: number; issuePrice: number }) {
  if (gmp === 0) return <span className="text-[10px] text-muted-foreground font-semibold">GMP: N/A</span>
  const pct = ((gmp / issuePrice) * 100).toFixed(1)
  const up = gmp > 0
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
        up ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"
      }`}
    >
      GMP: {up ? "+" : ""}₹{gmp} ({up ? "+" : ""}{pct}%)
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
  const minInvestment = ipo.priceMax * ipo.lotSize

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
            <CompanyBadge company={ipo.company} color={ipo.color} size="md" />
            <div>
              <div className="font-extrabold text-sm text-foreground leading-tight">{ipo.company}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{ipo.sector}</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <IpoTypeBadge type={ipo.ipoType} />
                <span className="text-[9px] text-muted-foreground">{ipo.exchange}</span>
              </div>
            </div>
          </div>
          <GmpBadge gmp={ipo.gmp} issuePrice={ipo.priceMax} />
        </div>

        {/* Highlight */}
        <p className="text-[11px] text-muted-foreground leading-relaxed mb-4 line-clamp-2">{ipo.highlight}</p>

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
            { label: "Price Band", val: ipo.priceMin === ipo.priceMax ? `₹${ipo.priceMin}` : `₹${ipo.priceMin}–${ipo.priceMax}` },
            { label: "Issue Size",  val: `₹${ipo.issueSizeCr.toLocaleString("en-IN")} Cr` },
            { label: "Lot Size",    val: `${ipo.lotSize} shares` },
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
          <span className="text-sm font-black text-burgundy">₹{minInvestment.toLocaleString("en-IN")}</span>
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
      <div className="flex items-start gap-3 mb-3">
        <CompanyBadge company={ipo.company} color={ipo.color} />
        <div className="min-w-0">
          <div className="font-extrabold text-sm text-foreground leading-tight truncate">{ipo.company}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">{ipo.sector}</div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] bg-secondary/60 text-muted-foreground border border-border/50">
              Expected
            </span>
            <span className="text-[10px] font-bold text-gold-deep">{ipo.expectedOpen}</span>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground leading-relaxed mb-4 line-clamp-2">{ipo.highlight}</p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-cream/60 rounded-[5px] px-3 py-2">
          <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide mb-0.5">Est. Issue Size</div>
          <div className="text-[12px] font-extrabold text-foreground">₹{ipo.estSizeCr.toLocaleString("en-IN")} Cr</div>
        </div>
        <div className="bg-cream/60 rounded-[5px] px-3 py-2">
          <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide mb-0.5">Est. Valuation</div>
          <div className="text-[12px] font-extrabold text-foreground">{ipo.estValuation}</div>
        </div>
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
  const up = ipo.listingGainPct >= 0

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="grid border-b border-border/40 last:border-0 hover:bg-cream/20 transition-colors duration-150"
      style={{ gridTemplateColumns: "40px 1fr 90px 90px 88px 72px 120px" }}
    >
      {/* Logo */}
      <div className="flex items-center py-3.5 pr-2">
        <CompanyBadge company={ipo.company} color={ipo.color} size="sm" />
      </div>

      {/* Company */}
      <div className="flex flex-col justify-center py-3.5 pl-2 min-w-0">
        <div className="font-extrabold text-sm text-foreground leading-tight truncate">{ipo.company}</div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <IpoTypeBadge type={ipo.ipoType} />
          <span className="text-[9px] text-muted-foreground/60">{ipo.sector}</span>
        </div>
      </div>

      {/* Issue price */}
      <div className="flex flex-col justify-center py-3.5">
        <div className="text-[9px] font-bold text-muted-foreground mb-0.5">Issue Price</div>
        <div className="text-sm font-extrabold text-foreground">₹{ipo.issuePrice}</div>
      </div>

      {/* Listing price */}
      <div className="flex flex-col justify-center py-3.5">
        <div className="text-[9px] font-bold text-muted-foreground mb-0.5">Listed At</div>
        <div className="text-sm font-extrabold text-foreground">₹{ipo.listingPrice}</div>
      </div>

      {/* Listing gain */}
      <div className="flex items-center py-3.5">
        <span
          className={`text-sm font-black flex items-center gap-0.5 ${up ? "text-profit" : "text-loss"}`}
        >
          {up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {up ? "+" : ""}{ipo.listingGainPct.toFixed(2)}%
        </span>
      </div>

      {/* Subscription */}
      <div className="flex flex-col justify-center py-3.5">
        <div className="text-[9px] font-bold text-muted-foreground mb-0.5">Subscribed</div>
        <div className="text-sm font-extrabold text-foreground">{ipo.subscTotal.toFixed(2)}x</div>
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

// ─── Allotment Checker ───────────────────────────────────────────────────────

function AllotmentChecker() {
  const [pan, setPan] = useState("")
  const [checked, setChecked] = useState(false)

  return (
    <div className="bg-white border border-border rounded-[10px] p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-[8px] bg-gold/12 border border-gold/20 flex items-center justify-center">
          <FileText className="w-5 h-5 text-gold-deep" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="font-extrabold text-foreground text-base">Check Allotment Status</h3>
          <p className="text-[11px] text-muted-foreground">Know if you received IPO shares.</p>
        </div>
      </div>

      {!checked ? (
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1.5 block">
              PAN Number / Application No.
            </label>
            <input
              type="text"
              placeholder="e.g. ABCDE1234F"
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
              maxLength={10}
              className="w-full px-3 py-2.5 text-sm rounded-[5px] border border-border bg-cream/50 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 font-mono tracking-wider"
            />
          </div>
          <Button
            onClick={() => pan.length >= 6 && setChecked(true)}
            className="w-full bg-burgundy hover:bg-burgundy-deep text-white font-bold rounded-[5px] h-10 text-sm"
          >
            Check Status
          </Button>
        </div>
      ) : (
        <div className="text-center space-y-3 py-2">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto">
            <AlertCircle className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="font-extrabold text-sm text-foreground mb-1">Allotment Pending</p>
            <p className="text-[11px] text-muted-foreground">Allotment results for open IPOs will be available after {OPEN_IPOS[0].allotDate}.</p>
          </div>
          <button
            onClick={() => { setPan(""); setChecked(false) }}
            className="text-[11px] font-bold text-burgundy hover:underline"
          >
            Check another
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

type Tab = "open" | "upcoming" | "closed"

export default function IpoPage() {
  const [tab, setTab] = useState<Tab>("open")

  const totalOpenSize = OPEN_IPOS.reduce((s, i) => s + i.issueSizeCr, 0)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative bg-cream border-b border-border/40 pt-28 pb-10 overflow-hidden">
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
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-5">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">IPO</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
                Initial Public Offerings
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
                Upcoming IPO <span className="text-burgundy">2026</span>
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                Apply for the latest IPOs with zero commission. Real-time subscription data, GMP tracking, and instant allotment status.
              </p>
              <div className="flex gap-3">
                <Button className="bg-burgundy hover:bg-burgundy-deep text-white px-6 h-10 font-bold rounded-[5px] text-sm">
                  Apply for IPO
                </Button>
                <Button variant="outline" className="border-border px-6 h-10 font-bold rounded-[5px] text-sm hover:bg-secondary">
                  Check Allotment
                </Button>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-3 shrink-0">
              {[
                { v: OPEN_IPOS.length.toString(),    l: "Open Now",      dot: true  },
                { v: UPCOMING_IPOS.length.toString(),l: "Upcoming",      dot: false },
                { v: `₹${(totalOpenSize / 100).toFixed(0)}+ Cr`, l: "Total Issue Size", dot: false },
              ].map((s) => (
                <div key={s.l} className="bg-white border border-border/60 rounded-[6px] px-4 py-3 min-w-[110px]">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {s.dot && <span className="w-1.5 h-1.5 rounded-full bg-profit animate-pulse" />}
                    <span className="text-xl font-black text-foreground">{s.v}</span>
                  </div>
                  <div className="text-[10px] font-semibold text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GMP STRIP ── */}
      <div className="bg-white border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center gap-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-widest whitespace-nowrap shrink-0">
              GMP Today
            </span>
            {OPEN_IPOS.filter((i) => i.gmp !== 0).map((ipo) => (
              <div key={ipo.id} className="flex items-center gap-2 shrink-0 bg-cream border border-border/60 rounded-full px-3 py-1">
                <span className="text-[10px] font-bold text-foreground">{ipo.company.split(" ")[0]}</span>
                <GmpBadge gmp={ipo.gmp} issuePrice={ipo.priceMax} />
              </div>
            ))}
            <span className="text-[9px] text-muted-foreground/60 italic shrink-0 ml-2">
              GMP is indicative and not guaranteed.
            </span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <section className="bg-background py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_300px] gap-8">

            {/* LEFT: Tabs + IPO listings */}
            <div>
              {/* Tabs */}
              <div className="flex gap-0 border border-border rounded-[6px] overflow-hidden bg-cream/50 w-fit mb-6">
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
                      <div className="text-center py-16 text-muted-foreground text-sm">No IPOs open right now. Check Upcoming IPOs.</div>
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
                        style={{ gridTemplateColumns: "40px 1fr 90px 90px 88px 72px 120px" }}
                      >
                        <div />
                        <div className="pl-2 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Company</div>
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Issue ₹</div>
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Listed ₹</div>
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Gain/Loss</div>
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Subs.</div>
                        <div />
                      </div>
                      <div className="px-4">
                        {CLOSED_IPOS.map((ipo, i) => <ClosedIpoRow key={ipo.id} ipo={ipo} index={i} />)}
                      </div>
                    </div>

                    {/* Mobile cards */}
                    <div className="md:hidden space-y-3">
                      {CLOSED_IPOS.map((ipo, i) => {
                        const up = ipo.listingGainPct >= 0
                        return (
                          <motion.div
                            key={ipo.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: i * 0.05 }}
                            className="bg-white border border-border rounded-[8px] p-4"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <CompanyBadge company={ipo.company} color={ipo.color} size="sm" />
                              <div className="min-w-0">
                                <div className="font-extrabold text-sm text-foreground truncate">{ipo.company}</div>
                                <div className="text-[10px] text-muted-foreground">{ipo.sector} · Listed {ipo.listDate}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mb-3">
                              <div className="text-center">
                                <div className="text-[9px] font-bold text-muted-foreground">Issue</div>
                                <div className="text-sm font-extrabold">₹{ipo.issuePrice}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-[9px] font-bold text-muted-foreground">Listed</div>
                                <div className="text-sm font-extrabold">₹{ipo.listingPrice}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-[9px] font-bold text-muted-foreground">Gain</div>
                                <div className={`text-sm font-extrabold ${up ? "text-profit" : "text-loss"}`}>
                                  {up ? "+" : ""}{ipo.listingGainPct.toFixed(2)}%
                                </div>
                              </div>
                            </div>
                            <button className="w-full text-[11px] font-bold text-burgundy border border-burgundy/25 rounded-[5px] py-1.5">
                              Check Allotment
                            </button>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* RIGHT: Sidebar */}
            <div className="space-y-5">
              {/* Allotment checker */}
              <AllotmentChecker />

              {/* Important dates */}
              <div className="bg-white border border-border rounded-[10px] p-5">
                <h3 className="font-extrabold text-sm text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold-deep" strokeWidth={1.8} />
                  Important IPO Dates
                </h3>
                <div className="space-y-3">
                  {OPEN_IPOS.map((ipo) => (
                    <div key={ipo.id} className="border-b border-border/40 last:border-0 pb-3 last:pb-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <CompanyBadge company={ipo.company} color={ipo.color} size="sm" />
                        <span className="font-bold text-xs text-foreground">{ipo.company.split(" ")[0]} {ipo.company.split(" ")[1]}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 pl-10">
                        {[
                          { l: "Open",     v: ipo.openDate   },
                          { l: "Close",    v: ipo.closeDate  },
                          { l: "Allotment",v: ipo.allotDate  },
                          { l: "Listing",  v: ipo.listDate   },
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
                color: "#1E40AF",
              },
              {
                step: "02",
                icon: TrendingUp,
                title: "Select the IPO",
                desc: "Browse open and upcoming IPOs. Read the Red Herring Prospectus, GMP, and analyst insights.",
                color: "#7C3AED",
              },
              {
                step: "03",
                icon: Award,
                title: "Bid & Track",
                desc: "Enter your price bid and quantity. Funds are blocked via ASBA — no upfront debit. Track allotment instantly.",
                color: "#15803D",
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
              { icon: Award,    color: "#D97706", title: "₹0 Application Fee",    desc: "Apply to any IPO with zero brokerage or application charges." },
              { icon: Zap,      color: "#7C3AED", title: "ASBA Based Bidding",    desc: "Funds stay in your bank until allotment. No premature debit." },
              { icon: Clock,    color: "#1E40AF", title: "Quick Allotment Alert", desc: "Get instant notifications on allotment status on app and email." },
              { icon: FileText, color: "#15803D", title: "Research & GMP",        desc: "In-depth IPO analysis, RHP summaries, and live GMP tracking." },
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

      {/* ── CTA ── */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-burgundy text-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center top, rgba(217,178,124,0.13) 0%, transparent 65%)" }}
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-5 z-10">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Never miss an IPO again.
          </h2>
          <p className="text-sm text-white/75 max-w-xl mx-auto leading-relaxed">
            Open a free Demat account with Shree Varahi and apply to IPOs with zero commission, ASBA protection, and real-time allotment updates.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="bg-white hover:bg-gold-champagne text-burgundy font-black px-8 h-11 text-sm rounded-[5px] shadow-xl">
              Open Free Account →
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white px-8 h-11 text-sm rounded-[5px]">
              View Open IPOs
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
