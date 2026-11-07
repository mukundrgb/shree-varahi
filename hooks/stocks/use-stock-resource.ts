// Shared loading, error, refresh and cancellation logic for the stock hooks.

import { useCallback, useEffect, useRef, useState } from "react"
import { StockApiError } from "@/lib/stocks/api-client"

export const QUOTE_REFRESH_MS = 30_000

interface Options {
  /** Set to refetch in the background. Failed refreshes keep the current data. */
  refreshMs?: number
}

/** Loads data for `key`. Pass a null key to wait, such as until a tab is opened. */
export function useStockResource<T>(
  key: string | null,
  load: (signal: AbortSignal) => Promise<T>,
  { refreshMs }: Options = {},
) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<StockApiError | null>(null)
  const [loading, setLoading] = useState(key !== null)
  const [attempt, setAttempt] = useState(0)

  const loadRef = useRef(load)
  loadRef.current = load

  useEffect(() => {
    if (key === null) return

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    const run = (background: boolean) =>
      loadRef.current(controller.signal).then(
        (result) => {
          if (controller.signal.aborted) return
          setData(result)
          setError(null)
          setLoading(false)
        },
        (reason: unknown) => {
          if (controller.signal.aborted || background) return
          setError(reason instanceof StockApiError ? reason : new StockApiError("Unable to load market data", 0))
          setLoading(false)
        },
      )

    void run(false)
    const timer = refreshMs ? setInterval(() => void run(true), refreshMs) : undefined

    return () => {
      controller.abort()
      if (timer) clearInterval(timer)
    }
  }, [key, refreshMs, attempt])

  const retry = useCallback(() => setAttempt((value) => value + 1), [])

  return { data, error, loading, retry }
}
