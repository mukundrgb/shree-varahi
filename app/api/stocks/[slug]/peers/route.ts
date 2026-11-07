// GET /api/stocks/[slug]/peers: Peers tab and Related Stocks.

import { toErrorResponse } from "@/lib/cmots/errors"
import { getStockPeers } from "@/lib/cmots/services/stocks"

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    return Response.json({ success: true, data: await getStockPeers(slug) })
  } catch (error) {
    return toErrorResponse(error)
  }
}
