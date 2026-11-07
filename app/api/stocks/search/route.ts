// GET /api/stocks/search?q=: global search. Returns names only, without quotes or logos.

import { toErrorResponse } from "@/lib/cmots/errors"
import { searchStocks } from "@/lib/cmots/services/stocks"

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? ""
  try {
    return Response.json({ success: true, data: await searchStocks(query) })
  } catch (error) {
    return toErrorResponse(error)
  }
}
