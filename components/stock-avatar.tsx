"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const COLORS = ["#1E40AF", "#0369A1", "#15803D", "#6D28D9", "#B45309", "#1D4ED8", "#DC2626", "#0891B2", "#16A34A", "#7C3AED", "#0D9488", "#B91C1C"]

function colorFor(symbol: string) {
  let hash = 0
  for (const char of symbol) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return COLORS[hash % COLORS.length]
}

interface StockAvatarProps {
  symbol: string
  name: string
  logoUrl: string | null
  className?: string
}

/** Shows the company logo, or the symbol's initials when there is no usable logo. */
export function StockAvatar({ symbol, name, logoUrl, className }: StockAvatarProps) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null)
  const color = colorFor(symbol)

  if (logoUrl && logoUrl !== failedUrl) {
    return (
      <img
        src={logoUrl}
        alt={`${name} logo`}
        loading="lazy"
        onError={() => setFailedUrl(logoUrl)}
        className={cn("rounded-[6px] object-contain bg-white border border-border/60 shrink-0", className)}
      />
    )
  }

  return (
    <div
      className={cn("rounded-[6px] flex items-center justify-center font-black shrink-0", className)}
      style={{ background: `${color}18`, color, border: `1px solid ${color}28` }}
    >
      {symbol.slice(0, 2)}
    </div>
  )
}
