// GET /api/stocks/[slug]/corporate-actions: Corp. Actions tab.

import { toErrorResponse } from "@/lib/cmots/errors"
import { getStockCorporateActions } from "@/lib/cmots/services/stocks"

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    return Response.json({ success: true, data: await getStockCorporateActions(slug) })
  } catch (error) {
    return toErrorResponse(error)
  }
}
