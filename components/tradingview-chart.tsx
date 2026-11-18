"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const EMBED_BASE = "https://s3.tradingview.com/external-embedding"

/** Runs a TradingView embed script inside the returned container. */
function useTradingViewEmbed(script: string, config: Record<string, unknown>, enabled = true) {
  const containerRef = useRef<HTMLDivElement>(null)
  const serialized = JSON.stringify(config)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !enabled) return

    const widget = document.createElement("div")
    widget.className = "tradingview-widget-container__widget h-full w-full"

    const embed = document.createElement("script")
    embed.src = `${EMBED_BASE}/${script}`
    embed.async = true
    embed.type = "text/javascript"
    embed.textContent = serialized

    container.append(widget, embed)
    return () => container.replaceChildren()
  }, [script, serialized, enabled])

  return containerRef
}

/** Delays a widget until it scrolls near the screen, as each one loads an iframe. */
function useNearViewport<T extends Element>() {
  const ref = useRef<T>(null)
  const [isNear, setIsNear] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsNear(true)
        observer.disconnect()
      },
      { rootMargin: "200px" },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, isNear }
}

interface TradingViewMiniChartProps {
  symbol: string
  className?: string
  /** Size the chart takes in the table, px. */
  width?: number
  height?: number
}

/**
 * TradingView's "mini" widget shows only its logo for these (BSE) symbols, so table rows use
 * the same symbol-overview widget as the detail page — chart only, no axes or grid. It needs
 * room to draw (about 320×150px), so it is drawn at that size and scaled down into the cell.
 */
const MINI_RENDER_WIDTH = 360
const MINI_RENDER_HEIGHT = 200

/** Small one-month price line for table rows. Clicks pass through to the row. */
export function TradingViewMiniChart({ symbol, className, width = 128, height = 56 }: TradingViewMiniChartProps) {
  const { ref, isNear } = useNearViewport<HTMLDivElement>()
  const containerRef = useTradingViewEmbed(
    "embed-widget-symbol-overview.js",
    {
      symbols: [[symbol, `${symbol}|1D`]],
      dateRanges: ["1m|1D"],
      chartOnly: true,
      hideDateRanges: true,
      width: MINI_RENDER_WIDTH,
      height: MINI_RENDER_HEIGHT,
      autosize: false,
      locale: "en",
      colorTheme: "light",
      isTransparent: true,
      // "area" is the style that honours our colours ("line" ignores lineColor).
      chartType: "area",
      lineWidth: 3,
      // Neutral: a 1-month line's direction isn't known here, so it isn't coloured green/red.
      lineColor: "#475569",
      topColor: "rgba(71, 85, 105, 0.12)",
      bottomColor: "rgba(71, 85, 105, 0)",
      scalePosition: "no",
      scaleMode: "Normal",
      valuesTracking: "0",
      showVolume: false,
      showMA: false,
      hideMarketStatus: true,
      hideSymbolLogo: true,
      noTimeScale: true,
      gridLineColor: "rgba(0, 0, 0, 0)",
      fontSize: "10",
    },
    isNear,
  )
  const scale = Math.min(width / MINI_RENDER_WIDTH, height / MINI_RENDER_HEIGHT)

  return (
    <div ref={ref} className={cn("pointer-events-none overflow-hidden relative shrink-0", className)}
      style={{ width, height }} aria-hidden="true">
      {!isNear && <div className="absolute inset-x-2 top-1/2 h-px bg-secondary" />}
      <div
        ref={containerRef}
        className="tradingview-widget-container absolute left-0 top-0 origin-top-left"
        style={{ width: MINI_RENDER_WIDTH, height: MINI_RENDER_HEIGHT, transform: `scale(${scale})` }}
      />
    </div>
  )
}

/**
 * Each value is "range|bar size". The widget has end-of-day data for Indian stocks, so
 * bars are daily or longer, and a 1-day chart isn't possible.
 */
const CHART_RANGES = [
  { label: "1 week", value: "5d|1D" },
  { label: "1 month", value: "1m|1D" },
  { label: "3 months", value: "3m|1D" },
  { label: "6 months", value: "6m|1D" },
  { label: "Year to date", value: "ytd|1D" },
  { label: "1 year", value: "12m|1D" },
  { label: "5 years", value: "60m|1W" },
  { label: "All time", value: "all|1M" },
] as const

export function tradingViewSymbolUrl(symbol: string) {
  return `https://www.tradingview.com/symbols/${symbol.replace(":", "-")}/`
}

/** Area price chart with our own time range tabs below it. */
export function TradingViewPriceChart({ symbol, name }: { symbol: string; name: string }) {
  const [activeRange, setActiveRange] = useState<string>(CHART_RANGES[1].value)

  const containerRef = useTradingViewEmbed("embed-widget-symbol-overview.js", {
    symbols: [[name, `${symbol}|1D`]],
    dateRanges: [activeRange],
    chartOnly: true,
    hideDateRanges: true,
    width: "100%",
    height: "100%",
    autosize: true,
    locale: "en",
    colorTheme: "light",
    isTransparent: true,
    chartType: "area",
    lineWidth: 2,
    lineColor: "#089981",
    topColor: "rgba(8, 153, 129, 0.3)",
    bottomColor: "rgba(8, 153, 129, 0.02)",
    scalePosition: "right",
    scaleMode: "Normal",
    changeMode: "price-and-percent",
    valuesTracking: "1",
    showVolume: false,
    showMA: false,
    hideMarketStatus: true,
    hideSymbolLogo: true,
    noTimeScale: false,
  })

  return (
    <div className="px-2 pt-3">
      <div ref={containerRef} className="tradingview-widget-container h-[380px] w-full" />

      <div className="flex gap-1 overflow-x-auto px-2 pt-3" role="group" aria-label="Chart time range" style={{ scrollbarWidth: "none" }}>
        {CHART_RANGES.map((item) => (
          <button
            key={item.value}
            onClick={() => setActiveRange(item.value)}
            aria-pressed={item.value === activeRange}
            className={`flex-1 whitespace-nowrap rounded-[8px] px-3 py-2.5 text-xs font-semibold transition-colors ${
              item.value === activeRange
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* <div className="flex items-center justify-between gap-3 px-2 py-1.5">
        <a
          href={tradingViewSymbolUrl(symbol)}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-[11px] font-bold text-burgundy hover:underline"
        >
          Open full chart ↗
        </a>
        <TradingViewCredit symbol={symbol} />
      </div> */}
    </div>
  )
}

/** TradingView's free widgets require this credit to stay visible. */
export function TradingViewCredit({ symbol, className }: { symbol?: string; className?: string }) {
  return (
    <p className={cn("text-[10px] text-muted-foreground", className)}>
      <a
        href={symbol ? tradingViewSymbolUrl(symbol) : "https://www.tradingview.com/"}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="hover:text-burgundy transition-colors"
      >
        Charts by TradingView
      </a>
    </p>
  )
}
