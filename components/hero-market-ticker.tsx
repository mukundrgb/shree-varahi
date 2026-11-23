"use client"

// Home hero: market ticker strip scrolling right to left, just above the red product bar.
// Static text for now (UI only). When live prices are available, replace TICKER_TIME / TICKER_ITEMS.

const TICKER_TIME = "Monday, November 23, 2026 10:58:00 AM"

/** [name, price, change] exactly as supplied */
const TICKER_ITEMS: [string, string, string][] = [
  ["SENSEX", "83165.32", "-754.39"],
  ["Adani Ports", "1917.40", "4.10"],
  ["Asian Paints", "2586.95", "-16.40"],
  ["Axis Bank", "1412.15", "-34.85"],
  ["Bajaj Finance", "1109.10", "-10.90"],
  ["Bajaj Finserv", "1884.15", "-7.15"],
  ["Bharat Electron", "399.65", "-1.40"],
  ["Bharti Airtel", "2133.50", "-22.00"],
  ["Eternal", "364.00", "0.00"],
  ["HCL Technologies", "1363.00", "26.00"],
  ["HDFC Bank", "830.10", "-15.15"],
  ["Hind. Unilever", "2046.50", "-7.50"],
  ["ICICI Bank", "1612.90", "-28.10"],
  ["Infosys", "1114.30", "17.90"],
  ["Interglobe Aviat", "5540.90", "-39.10"],
  ["ITC", "298.95", "0.15"],
  ["Kotak Mah. Bank", "506.25", "-9.75"],
  ["Larsen & Toubro", "4145.85", "-55.15"],
  ["M & M", "3515.00", "-26.50"],
  ["Maruti Suzuki", "14260.00", "269.70"],
  ["NTPC", "320.70", "-0.10"],
  ["Power Grid Corpn", "267.65", "-0.85"],
  ["Reliance Industries", "1357.65", "-17.45"],
  ["SBI", "1145.95", "-19.00"],
  ["Sun Pharma.Inds.", "1878.75", "-6.35"],
  ["Tata Steel", "163.90", "-13.85"],
  ["TCS", "2481.30", "106.30"],
  ["Tech Mahindra", "1800.00", "58.00"],
  ["Titan Company", "4633.00", "23.00"],
  ["Trent", "3213.00", "-39.25"],
  ["UltraTech Cem.", "12725.55", "-200.85"],
]

const changeClass = (change: string) => {
  const n = Number(change)
  return n > 0 ? "text-profit" : n < 0 ? "text-loss" : "text-muted-foreground"
}

function TickerRun({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex items-center shrink-0" aria-hidden={hidden || undefined}>
      <span className="flex items-center gap-2 pl-6 pr-5 text-[12.5px] font-bold text-foreground">
        <span className="w-1.5 h-1.5 rounded-full bg-burgundy" />
        {TICKER_TIME}
      </span>
      {TICKER_ITEMS.map(([name, price, change], i) => (
        <span key={name} className="flex items-center gap-1.5 px-5 text-[12.5px] whitespace-nowrap border-l border-border/70">
          <span className={i === 0 ? "font-black text-burgundy" : "font-semibold text-foreground/80"}>{name}</span>
          <span className="text-muted-foreground">:</span>
          <span className="font-bold text-foreground tabular-nums">{price}</span>
          <span className={`font-bold tabular-nums ${changeClass(change)}`}>[{change}]</span>
        </span>
      ))}
    </div>
  )
}

export function HeroMarketTicker() {
  return (
    <div className="relative z-10 w-full bg-white border-t border-border/60 overflow-hidden group" role="marquee" aria-label="Market prices">
      {/* Two identical runs side by side; the track moves left by one run (50%) and loops seamlessly */}
      <div className="flex w-max py-2.5 animate-[ticker_120s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <TickerRun />
        <TickerRun hidden />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />
    </div>
  )
}
