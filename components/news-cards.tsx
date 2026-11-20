"use client"

// Horizontally scrolling news cards (stock detail "Latest News", Stocks page "Market News").
// Each card shows the tag, date & time, headline and the opening lines of the story;
// "Read full story" opens the whole text in a dialog so the cards stay the same size.

import { useRef, useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Newspaper } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Bone, SkeletonGroup } from "@/components/skeletons"
import { formatQuoteTime } from "@/lib/stocks/format"
import { cn } from "@/lib/utils"

export interface NewsCardItem {
  id: string
  tag: string
  headline: string
  caption: string | null
  /** Plain-text story (paragraphs separated by blank lines) */
  text: string | null
  /** ISO date-time (IST) */
  publishedAt: string | null
}

/** Story text for a card: plain text from the API, else the caption. */
const storyOf = (n: NewsCardItem) => n.text || n.caption || ""

function NewsCard({ item, onOpen, cardWidth, showTag }: { item: NewsCardItem; onOpen: () => void; cardWidth: string; showTag: boolean }) {
  const story = storyOf(item)
  return (
    <article
      className={cn("snap-start shrink-0 flex flex-col rounded-[10px] border border-border bg-white p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] hover:border-burgundy/25 hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all", cardWidth)}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        {showTag && <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-burgundy/10 text-burgundy rounded-[3px] uppercase tracking-wide truncate">{item.tag}</span>}
        {item.publishedAt && (
          <span className="text-[10px] text-muted-foreground flex items-center gap-1 shrink-0">
            <Calendar className="w-2.5 h-2.5" aria-hidden /> {formatQuoteTime(item.publishedAt)}
          </span>
        )}
      </div>
      <h3 className="text-[13px] font-extrabold text-foreground leading-snug line-clamp-2">{item.headline}</h3>
      {story && <p className="text-[12px] text-muted-foreground leading-relaxed mt-2 line-clamp-4 whitespace-pre-line">{story}</p>}
      <button type="button" onClick={onOpen}
        className="mt-auto pt-3 self-start text-[11px] font-bold text-burgundy hover:text-burgundy-deep hover:underline">
        Read full story →
      </button>
    </article>
  )
}

export function NewsCarousel({
  items,
  max,
  loading = false,
  label = "News",
  cardWidth = "w-[280px] sm:w-[300px]",
  showTag = true,
  className,
}: {
  items: NewsCardItem[]
  /** Show at most this many cards */
  max?: number
  /** Show each story's tag (e.g. "Corporate News") on its card and in the full-story dialog */
  showTag?: boolean
  loading?: boolean
  label?: string
  cardWidth?: string
  className?: string
}) {
  const scroller = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<NewsCardItem | null>(null)
  const shown = max ? items.slice(0, max) : items
  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current
    if (el) el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.8), behavior: "smooth" })
  }

  return (
    // min-w-0 + w-full: the card row scrolls inside its parent instead of widening it.
    <div className={cn("relative min-w-0 w-full max-w-full", className)}>
      {loading ? (
        <SkeletonGroup label={`Loading ${label}`} className="flex gap-3 overflow-hidden">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className={cn("shrink-0 rounded-[10px] border border-border bg-white p-4 space-y-2.5", cardWidth)}>
              <div className="flex justify-between"><Bone className="h-3.5 w-16" /><Bone className="h-3 w-20" /></div>
              <Bone className="h-4 w-11/12" /><Bone className="h-4 w-2/3" />
              <Bone className="h-3 w-full" /><Bone className="h-3 w-full" /><Bone className="h-3 w-4/5" />
            </div>
          ))}
        </SkeletonGroup>
      ) : (
        <>
          <div ref={scroller} role="list" aria-label={label}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1"
            style={{ scrollbarWidth: "thin" }}>
            {shown.map((n) => (
              <div role="listitem" key={n.id} className="flex">
                <NewsCard item={n} onOpen={() => setOpen(n)} cardWidth={cardWidth} showTag={showTag} />
              </div>
            ))}
          </div>
          {shown.length > 1 && (
            <div className="hidden sm:flex justify-end gap-1.5 mt-2">
              <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous stories"
                className="w-8 h-8 rounded-full border border-border bg-white flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/25">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => scrollBy(1)} aria-label="Next stories"
                className="w-8 h-8 rounded-full border border-border bg-white flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/25">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Full story */}
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          {open && (
            <>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                {showTag && <span className="font-extrabold px-1.5 py-0.5 bg-burgundy/10 text-burgundy rounded-[3px] uppercase tracking-wide">{open.tag}</span>}
                {open.publishedAt && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" aria-hidden /> {formatQuoteTime(open.publishedAt)}</span>}
              </div>
              <DialogTitle className="text-lg font-black leading-snug text-foreground">{open.headline}</DialogTitle>
              <DialogDescription asChild>
                <div className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
                  {storyOf(open) || (
                    <span className="flex items-center gap-2 text-muted-foreground"><Newspaper className="w-4 h-4" /> Full text is not available for this story.</span>
                  )}
                </div>
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
