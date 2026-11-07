// Maps CompanyProfile fields to the About tab.

import type { CmotsCompanyProfile } from "../types/company"
import type { StockAbout } from "@/lib/stocks/types"

function clean(value: string | null | undefined): string | null {
  return value?.trim() || null
}

export function toStockAbout(profile: CmotsCompanyProfile | undefined): StockAbout {
  const address = [profile?.REGADD1, profile?.REGADD2, profile?.REGDIST, profile?.REGSTATE, profile?.REGPIN]
    .map(clean)
    .filter(Boolean)
    .join(", ")

  return {
    incorporated: clean(profile?.INC_DT),
    name: clean(profile?.LNAME),
    faceValue: profile?.FV ?? null,
    marketLot: profile?.MKT_LOT ?? null,
    chairman: clean(profile?.CHAIRMAN),
    auditor: clean(profile?.AUDITOR),
    group: clean(profile?.HSE_S_NAME),
    address: address || null,
    phone: clean(profile?.TEL1),
    email: clean(profile?.EMAIL),
    website: clean(profile?.INTERNET)?.replace(/^https?:\/\//i, "").replace(/\/+$/, "") ?? null,
  }
}
