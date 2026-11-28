"use client"

// Source and delay line shown with prices (PRD ST-02a). The wording comes from the admin panel
// (Masters → Disclosures → Market data notice) and can be switched off there.

import { useSiteConfig } from "@/components/site-config"

const FALLBACK = "Market data: CMOTS. NSE/BSE prices may be delayed."

export function MarketDataNotice({ className = "" }: { className?: string }) {
  const legal = useSiteConfig()["masters.legal"]
  if (legal?.hiddenItems?.includes("marketDataNotice")) return null
  return <p className={`text-[10.5px] text-muted-foreground ${className}`}>{legal?.marketDataNotice || FALLBACK}</p>
}
