// GET /api/stocks/[slug]: stock details header and price data.

import { toErrorResponse } from "@/lib/cmots/errors"
import { getStockOverview } from "@/lib/cmots/services/stocks"

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    return Response.json({ success: true, data: await getStockOverview(slug) })
  } catch (error) {
    return toErrorResponse(error)
  }
}
