// The single place the browser calls the Shree Varahi backend (shree-varahi-be).
// Every response is { success: true, data } or { success: false, message }.

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:9001/api/v1").replace(/\/+$/, "")

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
    this.name = "ApiError"
  }
}

/** An array value is sent as a repeated param: ?key=a&key=b */
type Query = Record<string, string | number | string[] | null | undefined>

function toQueryString(query?: Query): string {
  if (!query) return ""
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    for (const item of Array.isArray(value) ? value : [value]) {
      if (item !== undefined && item !== null && item !== "") params.append(key, String(item))
    }
  }
  const text = params.toString()
  return text ? `?${text}` : ""
}

/** GET `${API_URL}${path}` and return its `data`. Throws ApiError on any failure. */
export async function apiGet<T>(path: string, { query, signal }: { query?: Query; signal?: AbortSignal } = {}): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${API_URL}${path}${toQueryString(query)}`, { signal })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new ApiError("Unable to reach the server", 0)
  }

  const body = (await response.json().catch(() => null)) as
    | { success: true; data: T }
    | { success: false; message?: string }
    | null

  if (!response.ok || !body?.success) {
    const message = (body && !body.success && body.message) || "Unable to load market data"
    throw new ApiError(message, response.status)
  }
  return body.data
}

/** Encodes one path segment, e.g. a slug or symbol. */
export const seg = (value: string) => `/${encodeURIComponent(value)}`
