import { notFound } from "next/navigation"

// The futures detail page is switched off for now; every /futures/... link shows the 404 page.
// To bring it back, restore the code below and the useFuturesDetail hook in hooks/use-fno.ts.
export default function FuturesDynamicPage() {
  notFound()
}

/*
"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { FuturesDetailPage } from "@/components/futures-detail-page"
import { PageStatus } from "@/components/page-status"
import { useFuturesDetail } from "@/hooks/use-fno"
import { parseFnoSlug } from "@/lib/fno/api-client"
import { toFuturesPageData } from "@/lib/fno/adapters"

// /futures/nifty-50-futures, /futures/reliance-futures, /futures/reliance-industries-ltd-futures-summary …
// Data comes from the backend (/api/v1/fno/{index|stock}-futures/:symbol).
export default function FuturesDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const { underlying, symbol } = parseFnoSlug(slug, "futures")
  const { data, error, retry } = useFuturesDetail(underlying, symbol)
  const pageData = useMemo(() => (data ? toFuturesPageData(data) : null), [data])

  if (!pageData) {
    return (
      <PageStatus
        error={error}
        onRetry={retry}
        notFoundTitle="No futures data for this contract"
        backHref="/futures-options"
        backLabel="Back to Futures & Options"
      />
    )
  }
  return <FuturesDetailPage data={pageData} />
}
*/
