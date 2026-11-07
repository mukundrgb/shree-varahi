// Stock quote calls.

import "server-only"
import { cmotsGet } from "../client"
import { CACHE_TTL } from "../config"
import { CMOTS_ENDPOINTS } from "../endpoints"
import { CmotsError } from "../errors"
import type { CmotsQuote } from "../types/quote"

/**
 * Returns the latest quote, preferring NSE. One unavailable quote returns null so
 * it can't blank a whole table, but token and configuration failures still surface.
 */
export async function getQuote(coCode: number): Promise<CmotsQuote | null> {
  try {
    const rows = await cmotsGet<CmotsQuote>(CMOTS_ENDPOINTS.quoteDetails(coCode), CACHE_TTL.quote)
    const priced = rows.filter((row) => row.Price !== null)
    return priced.find((row) => row.XCHNG?.trim() === "NSE") ?? priced[0] ?? null
  } catch (error) {
    if (error instanceof CmotsError && error.fatal) throw error
    return null
  }
}
