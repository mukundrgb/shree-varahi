// Shared error type for CMOTS failures, and its conversion to an API response.

export class CmotsError extends Error {
  constructor(
    message: string,
    /** HTTP status our own API should return. */
    readonly status: number,
    /** True when every request will fail, such as a bad token. */
    readonly fatal = false,
  ) {
    super(message)
    this.name = "CmotsError"
  }
}

export function toErrorResponse(error: unknown): Response {
  if (error instanceof CmotsError) {
    if (error.status >= 500) console.error(`[cmots] ${error.message}`)
    const message = error.status >= 500 ? "Market data is temporarily unavailable" : error.message
    return Response.json({ success: false, message }, { status: error.status })
  }
  console.error("[cmots] Unexpected error", error)
  return Response.json({ success: false, message: "Something went wrong" }, { status: 500 })
}
