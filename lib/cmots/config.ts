// Reads the CMOTS base URL and JWT token from server environment variables.

import "server-only"
import { CmotsError } from "./errors"

const MINUTE = 60_000
const HOUR = 60 * MINUTE

/** How long each kind of CMOTS data is reused before it is fetched again. */
export const CACHE_TTL = {
  master: 24 * HOUR,
  profile: 24 * HOUR,
  logo: 24 * HOUR,
  financials: 6 * HOUR,
  corporateActions: 6 * HOUR,
  news: 5 * MINUTE,
  quote: 30_000,
} as const

export const REQUEST_TIMEOUT_MS = 30_000

export function getCmotsConfig() {
  const baseUrl = process.env.CMOTS_API_BASE_URL?.trim().replace(/\/+$/, "")
  const token = process.env.CMOTS_API_TOKEN?.trim()

  if (!baseUrl || !token) {
    throw new CmotsError("CMOTS_API_BASE_URL or CMOTS_API_TOKEN is not set", 503, true)
  }
  return { baseUrl, token }
}
