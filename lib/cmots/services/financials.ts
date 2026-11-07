// Quarterly and yearly results calls, standalone and consolidated.

import "server-only"
import { cmotsGet } from "../client"
import { CACHE_TTL } from "../config"
import { CMOTS_ENDPOINTS } from "../endpoints"
import type { CmotsResultRow } from "../types/financials"
import type { FinancialsPeriod, FinancialsType } from "@/lib/stocks/types"

export function getFinancialResults(coCode: number, period: FinancialsPeriod, type: FinancialsType) {
  const resultType = type === "standalone" ? "S" : "C"
  const path =
    period === "quarterly"
      ? CMOTS_ENDPOINTS.quarterlyResults(coCode, resultType)
      : CMOTS_ENDPOINTS.yearlyResults(coCode, resultType)
  return cmotsGet<CmotsResultRow>(path, CACHE_TTL.financials)
}
