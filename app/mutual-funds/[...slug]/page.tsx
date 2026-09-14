"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { MutualFundListPage } from "@/components/mutual-fund-list-page"
import { synthesizeMutualFundList, synthesizeAmcFundList, titleFromSlug } from "@/lib/synthesize-mf-etf"

const CATEGORY_MAP: Record<string, string> = {
  "equity-funds": "Equity", "debt-funds": "Debt", "hybrid-funds": "Hybrid", "index-funds": "Equity", "elss-funds": "Equity",
}

const AMC_NAMES: Record<string, string> = {
  "sbi-mutual-fund": "SBI", "mirae-asset-mutual-fund": "Mirae Asset", "edelweiss-mutual-fund": "Edelweiss",
  "icici-prudential-mutual-fund": "ICICI Prudential", "hdfc-mutual-fund": "HDFC", "dsp-mutual-fund": "DSP",
  "nippon-india-mutual-fund": "Nippon India", "tata-mutual-fund": "Tata", "bandhan-mutual-fund": "Bandhan",
  "kotak-mahindra-mutual-fund": "Kotak Mahindra", "aditya-birla-sun-life-mutual-fund": "Aditya Birla Sun Life",
  "hsbc-mutual-fund": "HSBC", "uti-mutual-fund": "UTI", "canara-robeco-mutual-fund": "Canara Robeco", "axis-mutual-fund": "Axis",
}

export default function MutualFundsCatchAllPage() {
  const params = useParams()
  const parts = Array.isArray(params.slug) ? params.slug : [params.slug].filter(Boolean) as string[]
  const [top, sub] = parts

  const data = useMemo(() => {
    if (top === "amc" && sub) {
      const amcKey = sub.replace(/-mutual-fund$/, "")
      const amcName = AMC_NAMES[sub] ?? titleFromSlug(amcKey)
      return synthesizeAmcFundList(sub, amcName)
    }
    if (top === "mf-to-invest" && sub) {
      return synthesizeMutualFundList(sub, { crumbCategory: "MF To Invest", titleOverride: titleFromSlug(sub.replace(/^best-/, "")) })
    }
    if (sub) {
      // e.g. /mutual-funds/equity-funds/large-cap-funds/
      return synthesizeMutualFundList(sub, {
        crumbCategory: titleFromSlug(top),
        titleOverride: titleFromSlug(sub),
        category: CATEGORY_MAP[top] ?? "Equity",
      })
    }
    // single-level e.g. /mutual-funds/equity-funds/
    return synthesizeMutualFundList(top ?? "equity-funds", {
      crumbCategory: "By Category",
      titleOverride: titleFromSlug(top ?? "equity-funds"),
      category: CATEGORY_MAP[top] ?? "Equity",
    })
  }, [top, sub])

  return <MutualFundListPage data={data} />
}
