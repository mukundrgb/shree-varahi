"use client"

import Link from "next/link"
import type { ApiError } from "@/lib/api/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DetailPageSkeleton } from "@/components/skeletons"

/** Full-page loading / not found / error state for pages loaded from the backend. */
export function PageStatus({
  error,
  onRetry,
  notFoundTitle,
  backHref,
  backLabel,
}: {
  error: ApiError | null
  onRetry: () => void
  notFoundTitle: string
  backHref: string
  backLabel: string
}) {
  // While loading, show the shape of a detail page instead of a "Loading…" line.
  if (!error) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <DetailPageSkeleton />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 px-4 pt-24 text-center">
        {error.status === 404 ? (
          <>
            <p className="text-2xl font-black text-foreground">{notFoundTitle}</p>
            <Link href={backHref} className="text-burgundy font-semibold hover:underline">← {backLabel}</Link>
          </>
        ) : (
          <>
            <p className="text-lg font-black text-foreground">Unable to load market data</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
            <button onClick={onRetry} className="text-burgundy font-semibold hover:underline">Try again</button>
          </>
        )}
      </div>
      <Footer />
    </main>
  )
}
