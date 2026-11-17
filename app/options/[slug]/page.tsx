import { notFound } from "next/navigation"

// The options detail page is switched off for now; every /options/... link shows the 404 page.
// To bring it back, restore the code below and the useOptionsDetail hook in hooks/use-fno.ts.
export default function OptionsDynamicPage() {
  notFound()
}

/*
"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { OptionsDetailPage } from "@/components/options-detail-page"
import { PageStatus } from "@/components/page-status"
import { useOptionsDetail } from "@/hooks/use-fno"
import { parseFnoSlug } from "@/lib/fno/api-client"
import { toOptionsPageData } from "@/lib/fno/adapters"

// /options/nifty-50-options, /options/reliance-options, /options/reliance-industries-ltd-options-summary …
// Data comes from the backend (/api/v1/fno/{index|stock}-options/:symbol); nearest expiry.
export default function OptionsDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const { underlying, symbol } = parseFnoSlug(slug, "options")
  const { data, error, retry } = useOptionsDetail(underlying, symbol)
  const pageData = useMemo(() => (data ? toOptionsPageData(data) : null), [data])

  if (!pageData) {
    return (
      <PageStatus
        error={error}
        onRetry={retry}
        notFoundTitle="No options data for this contract"
        backHref="/futures-options"
        backLabel="Back to Futures & Options"
      />
    )
  }
  return <OptionsDetailPage data={pageData} />
}
*/
