// The single place that calls CMOTS: adds auth, unwraps responses, handles failures.

import "server-only"
import { getCmotsConfig, REQUEST_TIMEOUT_MS } from "./config"
import { CmotsError } from "./errors"
import type { CmotsResponse } from "./types/common"

const MAX_CACHE_ENTRIES = 5_000

const cache = new Map<string, { expires: number; data: unknown[] }>()
const inFlight = new Map<string, Promise<unknown[]>>()

async function request<T>(path: string): Promise<T[]> {
  const { baseUrl, token } = getCmotsConfig()

  let response: Response
  try {
    response = await fetch(`${baseUrl}${path}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
  } catch {
    throw new CmotsError(`CMOTS request failed: ${path}`, 502)
  }

  if (response.status === 401 || response.status === 403) {
    throw new CmotsError(`CMOTS rejected the token (${response.status})`, 502, true)
  }
  if (!response.ok) {
    throw new CmotsError(`CMOTS returned ${response.status}: ${path}`, 502)
  }

  let body: CmotsResponse<T>
  try {
    body = (await response.json()) as CmotsResponse<T>
  } catch {
    throw new CmotsError(`CMOTS returned invalid JSON: ${path}`, 502)
  }

  // CMOTS reports "no records" as success: false with data: null.
  return Array.isArray(body.data) ? body.data : []
}

function remember(path: string, data: unknown[], ttlMs: number) {
  if (cache.size >= MAX_CACHE_ENTRIES && !cache.has(path)) {
    const oldest = cache.keys().next().value
    if (oldest !== undefined) cache.delete(oldest)
  }
  cache.set(path, { expires: Date.now() + ttlMs, data })
}

/** Fetches a CMOTS path, reusing a cached result until `ttlMs` has passed. */
export async function cmotsGet<T>(path: string, ttlMs: number): Promise<T[]> {
  const cached = cache.get(path)
  if (cached && cached.expires > Date.now()) return cached.data as T[]

  const pending = inFlight.get(path)
  if (pending) return pending as Promise<T[]>

  const promise = request<T>(path)
    .then((data) => {
      remember(path, data, ttlMs)
      return data as unknown[]
    })
    .catch((error: unknown) => {
      // Prefer slightly old data to an error, unless the token itself has failed.
      if (cached && !(error instanceof CmotsError && error.fatal)) return cached.data
      throw error
    })
    .finally(() => inFlight.delete(path))

  inFlight.set(path, promise)
  return promise as Promise<T[]>
}
