"use client"

// Client pieces for the server-rendered Blog / Knowledge Center / News pages. They take plain data
// (server components can't pass functions) and change the URL; the server page then renders the
// new list. Filters live in the address, so every list view can be linked and is indexable.

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { CategoryChips, CategoryLinkRow, CategorySidebar, PostCover } from "@/components/content-ui"
import { KcPagination } from "@/components/knowledge-center"

export type CatLink = { name: string; slug: string; count: number }

function useUrl() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const go = (patch: Record<string, string | null>, { replace = false, scroll = true } = {}) => {
    const next = new URLSearchParams(params.toString())
    for (const [k, v] of Object.entries(patch)) (v === null || v === "" ? next.delete(k) : next.set(k, v))
    const qs = next.toString()
    const url = `${pathname}${qs ? `?${qs}` : ""}`
    replace ? router.replace(url, { scroll }) : router.push(url, { scroll })
  }
  return { params, go }
}

/** Category chips ("All" + each category). */
export function ChipsNav({ cats, current }: { cats: CatLink[]; current: string }) {
  const { go } = useUrl()
  const names = cats.map((c) => c.name)
  const currentName = cats.find((c) => c.slug === current)?.name ?? "All"
  return (
    <CategoryChips
      categories={names}
      value={currentName}
      counts={Object.fromEntries(cats.map((c) => [c.name, c.count]))}
      onChange={(name) => go({ category: name === "All" ? null : cats.find((c) => c.name === name)?.slug ?? null, page: null, q: null })}
    />
  )
}

/** The left sidebar (desktop) and swipeable row (phones) of categories, as links. */
export function CategoryNav({ cats, current, base, mode = "query" }: { cats: CatLink[]; current?: string; base: string; mode?: "query" | "path" }) {
  const byName = new Map(cats.map((c) => [c.name, c]))
  const hrefFor = (name: string) => {
    const slug = byName.get(name)?.slug ?? ""
    return mode === "path" ? `${base}/${slug}` : `${base}?category=${encodeURIComponent(slug)}`
  }
  const currentName = cats.find((c) => c.slug === current)?.name
  return { sidebar: <CategorySidebar categories={cats.map((c) => c.name)} current={currentName} hrefFor={hrefFor} counts={Object.fromEntries(cats.map((c) => [c.name, c.count]))} />, row: <CategoryLinkRow categories={cats.map((c) => c.name)} current={currentName} hrefFor={hrefFor} /> }
}

export function CategorySidebarNav(p: { cats: CatLink[]; current?: string; base: string; mode?: "query" | "path" }) {
  return CategoryNav(p).sidebar
}
export function CategoryRowNav(p: { cats: CatLink[]; current?: string; base: string; mode?: "query" | "path" }) {
  return CategoryNav(p).row
}

/** Search box: updates ?q= after a short pause while typing. */
export function SearchBox({ placeholder, label }: { placeholder: string; label: string }) {
  const { params, go } = useUrl()
  const [value, setValue] = useState(params.get("q") ?? "")
  const first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    const t = setTimeout(() => go({ q: value.trim() || null, page: null }, { replace: true, scroll: false }), 400)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  return (
    <label className="relative block">
      <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="w-full h-12 pl-10 pr-9 rounded-[8px] border border-border bg-white text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
      />
      {value && (
        <button onClick={() => setValue("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </label>
  )
}

export function PagerNav({ page, totalPages }: { page: number; totalPages: number }) {
  const { go } = useUrl()
  return <KcPagination page={page} totalPages={totalPages} onChange={(p) => go({ page: p > 1 ? String(p) : null })} />
}

/** The article's cover image, or the category's coloured cover when it has none. */
export function CardCover({ cover, category, className = "", large = false }: { cover: { url: string; alt: string } | null; category: string; className?: string; large?: boolean }) {
  if (cover?.url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={cover.url} alt={cover.alt} loading={large ? "eager" : "lazy"} className={`object-cover w-full ${className}`} />
  }
  return <PostCover category={category} large={large} className={className} />
}
