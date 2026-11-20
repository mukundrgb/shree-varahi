// Shared loading, error, refresh and cancellation logic for every backend data hook.

import { useCallback, useEffect, useRef, useState } from "react"
import { ApiError } from "@/lib/api/client"

/** Prices are refreshed this often in the background. */
export const QUOTE_REFRESH_MS = 30_000

interface Options {
  /** Set to refetch in the background. Failed refreshes keep the current data. */
  refreshMs?: number
}

/** The request in progress for this hook, so a quick unmount + remount can reuse it. */
interface InFlight<T> {
  id: string
  promise: Promise<T>
  controller: AbortController
  abortTimer?: ReturnType<typeof setTimeout>
}

/** Loads data for `key`. Pass a null key to wait, such as until a tab is opened. */
export function useApiResource<T>(
  key: string | null,
  load: (signal: AbortSignal) => Promise<T>,
  { refreshMs }: Options = {},
) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<ApiError | null>(null)
  const [loading, setLoading] = useState(key !== null)
  const [attempt, setAttempt] = useState(0)

  const loadRef = useRef(load)
  loadRef.current = load
  const inFlight = useRef<InFlight<T> | null>(null)

  useEffect(() => {
    if (key === null) return

    // React Strict Mode (development) mounts, unmounts and remounts every component once. Cancelling
    // the request on that unmount and sending it again shows a "(canceled)" call in the network tab
    // and asks the server twice. Instead the cancel waits a moment, and the remount takes the same request.
    const id = `${key}\u0000${attempt}`
    let request = inFlight.current
    if (request && request.id === id) {
      clearTimeout(request.abortTimer)
    } else {
      request?.controller.abort()
      const controller = new AbortController()
      request = { id, controller, promise: loadRef.current(controller.signal) }
      inFlight.current = request
      const done = request
      const forget = () => { if (inFlight.current === done) inFlight.current = null }
      done.promise.then(forget, forget)
    }
    const current = request

    let active = true
    setLoading(true)
    setError(null)

    const settle = (promise: Promise<T>, background: boolean) =>
      promise.then(
        (result) => {
          if (!active) return
          setData(result)
          setError(null)
          setLoading(false)
        },
        (reason: unknown) => {
          if (!active || background) return
          setError(reason instanceof ApiError ? reason : new ApiError("Unable to load market data", 0))
          setLoading(false)
        },
      )

    void settle(current.promise, false)

    // Background refreshes are separate requests, cancelled straight away on unmount.
    const refreshController = new AbortController()
    const timer = refreshMs
      ? setInterval(() => void settle(loadRef.current(refreshController.signal), true), refreshMs)
      : undefined

    return () => {
      active = false
      if (timer) clearInterval(timer)
      refreshController.abort()
      // Cancel the first request only if nothing picks it up again right away.
      current.abortTimer = setTimeout(() => {
        if (inFlight.current === current) {
          current.controller.abort()
          inFlight.current = null
        }
      }, 0)
    }
  }, [key, refreshMs, attempt])

  const retry = useCallback(() => setAttempt((value) => value + 1), [])

  return { data, error, loading, retry }
}
