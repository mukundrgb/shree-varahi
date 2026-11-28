"use client"

// Renders an article body as stored by the admin panel's editor (ProseMirror JSON, PRD §8.4) with
// React only — never raw HTML. The backend already checked it (allowed blocks, safe links), so this
// only draws. Blocks ("widgets") look like the panel's preview; buttons and cards become real links.

import { createElement, useState, type ReactNode } from "react"
import Link from "next/link"
import {
  ArrowRight, Check, CheckCircle2, ChevronDown, CircleX, Download, FileText, Info, Lightbulb, Minus, Play, Plus, Quote, Smartphone, TrendingUp, TriangleAlert, Calculator,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { OPEN_ACCOUNT_URL } from "@/lib/external-links"
import type { PmNode } from "@/lib/server/cms"

type Data = Record<string, unknown>

const s = (d: Data, k: string) => (typeof d[k] === "string" || typeof d[k] === "number" ? String(d[k]) : "")
const list = (d: Data, k = "items") => (Array.isArray(d[k]) ? (d[k] as Data[]) : [])
const box = "rounded-[12px] border border-border bg-white"
const slugify = (t: string) => t.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80)

function textOf(n: PmNode): string {
  if (n.type === "text") return n.text ?? ""
  if (n.type === "hardBreak") return " "
  return (n.content ?? []).map(textOf).join("")
}

/** Internal links stay in the site; outside ones open in a new tab. */
function SmartLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (!href) return <span className={className}>{children}</span>
  if (href.startsWith("/") && !href.startsWith("//")) return <Link href={href} className={className}>{children}</Link>
  return <a href={href} className={className} target={/^https?:/.test(href) ? "_blank" : undefined} rel="noopener noreferrer">{children}</a>
}

export function ArticleBody({ doc, className }: { doc: PmNode | null | undefined; className?: string }) {
  if (!doc) return null
  // Heading ids must match the backend's table of contents (same rule, with -2, -3 for repeats).
  const used = new Set<string>()
  const idFor = (text: string) => {
    let id = slugify(text) || "section"
    for (let i = 2; used.has(id); i++) id = `${slugify(text)}-${i}`
    used.add(id)
    return id
  }
  return (
    <div
      className={cn(
        "article-body text-[15.5px] text-foreground/85 leading-[1.75]",
        "[&_p]:mb-4 [&_h2]:text-[24px] [&_h2]:font-black [&_h2]:text-foreground [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:scroll-mt-24",
        "[&_h3]:text-[19px] [&_h3]:font-extrabold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:scroll-mt-24 [&_h4]:text-[16px] [&_h4]:font-extrabold [&_h4]:mt-6 [&_h4]:mb-2",
        "[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_ul]:mb-4 [&_ol]:mb-4 [&_li]:mb-1.5 [&_li>p]:mb-1",
        "[&_blockquote]:border-l-4 [&_blockquote]:border-gold [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-foreground/75 [&_blockquote]:my-6",
        "[&_hr]:my-8 [&_hr]:border-border [&_a]:text-burgundy [&_a]:font-semibold [&_a:hover]:underline [&_code]:bg-cream [&_code]:px-1.5 [&_code]:rounded [&_code]:text-[13.5px]",
        "[&_pre]:bg-ink [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded-[10px] [&_pre]:overflow-x-auto [&_pre]:my-5 [&_mark]:bg-gold/30 [&_mark]:px-0.5",
        "[&_table]:w-full [&_table]:text-[14px] [&_th]:bg-cream [&_th]:font-bold [&_th]:text-left [&_th]:p-2.5 [&_td]:p-2.5 [&_th]:border [&_td]:border [&_th]:border-border [&_td]:border-border",
        className,
      )}
    >
      {(doc.content ?? []).map((n, i) => <Block key={i} n={n} doc={doc} idFor={idFor} />)}
    </div>
  )
}

function Block({ n, doc, idFor }: { n: PmNode; doc: PmNode; idFor: (t: string) => string }) {
  const kids = () => (n.content ?? []).map((c, i) => <Block key={i} n={c} doc={doc} idFor={idFor} />)
  const align = n.attrs?.textAlign ? { textAlign: n.attrs.textAlign as "left" | "center" | "right" | "justify" } : undefined
  switch (n.type) {
    case "text": return <Marked n={n} />
    case "paragraph": return <p style={align}>{n.content?.length ? kids() : <br />}</p>
    case "heading": {
      const level = [2, 3, 4].includes(Number(n.attrs?.level)) ? Number(n.attrs?.level) : 2
      return createElement(`h${level}`, { id: idFor(textOf(n)), style: align }, kids())
    }
    case "bulletList": return <ul>{kids()}</ul>
    case "orderedList": return <ol start={Number(n.attrs?.start ?? 1)}>{kids()}</ol>
    case "listItem": return <li>{kids()}</li>
    case "blockquote": return <blockquote>{kids()}</blockquote>
    case "codeBlock": return <pre><code>{textOf(n)}</code></pre>
    case "horizontalRule": return <hr />
    case "hardBreak": return <br />
    case "table": return <div className="overflow-x-auto my-6"><table><tbody>{kids()}</tbody></table></div>
    case "tableRow": return <tr>{kids()}</tr>
    case "tableHeader": return <th colSpan={Number(n.attrs?.colspan ?? 1)} rowSpan={Number(n.attrs?.rowspan ?? 1)}>{kids()}</th>
    case "tableCell": return <td colSpan={Number(n.attrs?.colspan ?? 1)} rowSpan={Number(n.attrs?.rowspan ?? 1)}>{kids()}</td>
    case "widget": {
      const view = <WidgetView kind={String(n.attrs?.kind)} data={(n.attrs?.data ?? {}) as Data} doc={doc} />
      return view ? <div className="not-prose my-7 text-[15px] leading-normal">{view}</div> : null
    }
    default: return null
  }
}

function Marked({ n }: { n: PmNode }) {
  let out: ReactNode = n.text ?? ""
  for (const m of n.marks ?? []) {
    if (m.type === "bold") out = <strong>{out}</strong>
    else if (m.type === "italic") out = <em>{out}</em>
    else if (m.type === "underline") out = <u>{out}</u>
    else if (m.type === "strike") out = <s>{out}</s>
    else if (m.type === "code") out = <code>{out}</code>
    else if (m.type === "highlight") out = <mark>{out}</mark>
    else if (m.type === "link") out = <SmartLink href={String(m.attrs?.href ?? "")}>{out}</SmartLink>
  }
  return <>{out}</>
}

function headingsOf(doc: PmNode) {
  const out: { level: number; text: string; id: string }[] = []
  const used = new Set<string>()
  const walk = (n: PmNode) => {
    if (n.type === "heading") {
      const text = textOf(n).trim()
      if (text) {
        let id = slugify(text) || "section"
        for (let i = 2; used.has(id); i++) id = `${slugify(text)}-${i}`
        used.add(id)
        out.push({ level: Number(n.attrs?.level ?? 2), text, id })
      }
    }
    n.content?.forEach(walk)
  }
  walk(doc)
  return out
}

const niceDate = (v: string) => (/^\d{4}-\d{2}-\d{2}$/.test(v) ? new Date(`${v}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }) : v)

function WidgetView({ kind, data: d, doc }: { kind: string; data: Data; doc: PmNode }): ReactNode {
  switch (kind) {
    case "image": {
      const src = s(d, "src")
      if (!src) return null
      const w = { full: "w-full", medium: "max-w-[560px] mx-auto", small: "max-w-[320px] mx-auto" }[s(d, "size")] ?? "w-full"
      // eslint-disable-next-line @next/next/no-img-element
      const img = <img src={src} alt={s(d, "alt")} className="w-full rounded-[12px]" loading="lazy" />
      return <figure className={w}>{s(d, "href") ? <SmartLink href={s(d, "href")}>{img}</SmartLink> : img}{s(d, "caption") && <figcaption className="text-[12.5px] text-muted-foreground text-center mt-2">{s(d, "caption")}</figcaption>}</figure>
    }
    case "gallery":
      // eslint-disable-next-line @next/next/no-img-element
      return <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${s(d, "columns") || 3}, minmax(0, 1fr))` }}>{list(d).filter((x) => s(x, "src")).map((x, i) => <img key={i} src={s(x, "src")} alt={s(x, "alt")} loading="lazy" className="w-full aspect-[4/3] object-cover rounded-[10px]" />)}</div>
    case "imageText": {
      const src = s(d, "src")
      return (
        <div className="grid sm:grid-cols-2 gap-6 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className={cn(s(d, "side") === "right" && "sm:order-2")}>{src && <img src={src} alt={s(d, "alt")} loading="lazy" className="w-full rounded-[12px]" />}</div>
          <div>{s(d, "title") && <p className="text-[19px] font-black leading-snug mb-2">{s(d, "title")}</p>}<p className="text-[15px] text-foreground/80 leading-relaxed whitespace-pre-line">{s(d, "text")}</p>{s(d, "button") && <SmartLink href={s(d, "href")} className="inline-flex mt-3 h-10 px-5 items-center rounded-[6px] bg-burgundy text-white text-[13.5px] font-bold">{s(d, "button")}</SmartLink>}</div>
        </div>
      )
    }
    case "video": {
      const id = s(d, "url").match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1]
      if (s(d, "file")) return <figure><video src={s(d, "file")} controls className="w-full rounded-[12px] bg-black aspect-video" />{s(d, "title") && <figcaption className="text-[12.5px] text-muted-foreground text-center mt-2">{s(d, "title")}</figcaption>}</figure>
      if (id) return <YouTube id={id} title={s(d, "title")} />
      return s(d, "url") ? <SmartLink href={s(d, "url")} className="text-burgundy font-bold">{s(d, "title") || "Watch the video"}</SmartLink> : null
    }
    case "file":
      if (!s(d, "src")) return null
      return <SmartLink href={s(d, "src")} className={cn(box, "px-5 py-4 flex items-center gap-4 hover:border-burgundy/40")}><span className="w-11 h-11 rounded-[10px] bg-burgundy/[0.08] text-burgundy grid place-items-center shrink-0"><FileText className="w-5 h-5" /></span><span className="flex-1 min-w-0"><span className="block text-[15px] font-extrabold">{s(d, "title")}</span><span className="block text-[12px] text-muted-foreground">{s(d, "note") || "Download"}</span></span><Download className="w-5 h-5 text-burgundy" /></SmartLink>
    case "takeaways":
      return <div className="bg-cream border border-border/70 rounded-[12px] p-5 sm:p-6">{s(d, "title") && <p className="text-[14px] font-black mb-3">{s(d, "title")}</p>}<ul className="space-y-2">{list(d).map((x, i) => <li key={i} className="flex items-start gap-2.5 text-[14px] text-foreground/85 leading-relaxed"><CheckCircle2 className="w-4 h-4 text-gold-deep shrink-0 mt-1" />{typeof x === "string" ? x : s(x, "text")}</li>)}</ul></div>
    case "callout": {
      const tone = s(d, "tone") || "info"
      const c = { info: ["border-blue-200 bg-blue-50", "text-blue-700"], tip: ["border-emerald-200 bg-emerald-50", "text-emerald-700"], warning: ["border-amber-300 bg-amber-50", "text-amber-700"], red: ["border-burgundy/25 bg-burgundy/[0.04]", "text-burgundy"] }[tone] ?? ["border-border bg-cream", ""]
      const Icon = tone === "tip" ? Lightbulb : tone === "info" ? Info : TriangleAlert
      return <div className={cn("rounded-[12px] border px-5 py-4 flex gap-3.5", c[0])}><Icon className={cn("w-5 h-5 shrink-0 mt-0.5", c[1])} /><div>{s(d, "title") && <p className={cn("text-[14.5px] font-black", c[1])}>{s(d, "title")}</p>}<p className="text-[14.5px] text-foreground/80 leading-relaxed whitespace-pre-line">{s(d, "text")}</p></div></div>
    }
    case "quote":
      return <blockquote className="!not-italic border-l-4 border-gold pl-6 py-1"><Quote className="w-6 h-6 text-gold mb-1" /><p className="text-[21px] font-extrabold leading-snug text-foreground">{s(d, "text")}</p>{s(d, "by") && <p className="text-[13px] text-muted-foreground font-semibold mt-2">{s(d, "by")}</p>}</blockquote>
    case "stats":
      return <div className={cn(box, "grid divide-y sm:divide-y-0 sm:divide-x divide-border/70")} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}>{list(d).map((x, i) => <div key={i} className="px-5 py-4 text-center"><p className="text-[26px] font-black text-burgundy leading-none">{s(x, "value")}</p><p className="text-[12.5px] font-semibold text-muted-foreground mt-1.5">{s(x, "label")}</p></div>)}</div>
    case "proscons":
      return <div className="grid sm:grid-cols-2 gap-4">{([["pros", "prosTitle", "text-emerald-700", "border-emerald-200 bg-emerald-50/60", Check], ["cons", "consTitle", "text-red-600", "border-red-200 bg-red-50/60", CircleX]] as const).map(([k, tk, tc, bc, Icon]) => <div key={k} className={cn("rounded-[12px] border p-5", bc)}><p className={cn("text-[15px] font-black mb-2.5", tc)}>{s(d, tk)}</p><ul className="space-y-2">{list(d, k).map((x, i) => <li key={i} className="flex gap-2 text-[14px] leading-relaxed"><Icon className={cn("w-4 h-4 shrink-0 mt-1", tc)} />{s(x, "text")}</li>)}</ul></div>)}</div>
    case "steps":
      return <ol className="!list-none !pl-0 space-y-4">{list(d).map((x, i) => <li key={i} className="flex gap-4"><span className="w-8 h-8 rounded-full bg-burgundy text-white text-[14px] font-black grid place-items-center shrink-0">{i + 1}</span><div className="pt-0.5"><p className="text-[16px] font-extrabold">{s(x, "title")}</p><p className="text-[14.5px] text-foreground/75 leading-relaxed whitespace-pre-line">{s(x, "text")}</p></div></li>)}</ol>
    case "timeline":
      return <ul className={cn(box, "!list-none p-5")}>{list(d).map((x, i, all) => <li key={i} className="flex gap-4"><span className="flex flex-col items-center"><span className="w-3 h-3 rounded-full bg-burgundy mt-1.5" />{i < all.length - 1 && <span className="w-px flex-1 bg-border my-1" />}</span><div className="pb-4"><p className="text-[12px] font-extrabold text-gold-deep">{s(x, "when")}</p><p className="text-[14.5px] font-semibold">{s(x, "text")}</p></div></li>)}</ul>
    case "toc": {
      const hs = headingsOf(doc)
      if (!hs.length) return null
      return <nav className={cn(box, "p-5")}><p className="text-[14px] font-black mb-2.5">{s(d, "title") || "In this article"}</p><ul className="!list-none !pl-0 space-y-1.5">{hs.map((h, i) => <li key={i} style={{ paddingLeft: (h.level - 2) * 16 }} className="text-[14px] font-semibold"><a href={`#${h.id}`} className="!text-foreground/80 hover:!text-burgundy">{h.text}</a></li>)}</ul></nav>
    }
    case "faq": return <Faq d={d} />
    case "checklist": return <Checklist d={d} />
    case "tabs": return <TabsBlock d={d} />
    case "reveal": return <Reveal d={d} />
    case "quiz": return <QuizBlock d={d} />
    case "stock": {
      const sym = s(d, "symbol")
      return <SmartLink href={sym ? `/stocks/${sym.toLowerCase()}` : ""} className={cn(box, "px-5 py-4 block hover:border-burgundy/40")}><span className="flex items-center gap-4"><span className="w-11 h-11 rounded-[10px] bg-burgundy/[0.08] text-burgundy grid place-items-center"><TrendingUp className="w-5 h-5" /></span><span className="flex-1"><span className="block text-[15.5px] font-extrabold">{s(d, "name") || sym}</span><span className="block text-[12px] text-muted-foreground font-mono">{s(d, "exchange")}: {sym}</span></span><ArrowRight className="w-4 h-4 text-burgundy" /></span>{s(d, "note") && <span className="block text-[13.5px] text-foreground/75 mt-3 pt-3 border-t border-border/70 whitespace-pre-line">{s(d, "note")}</span>}</SmartLink>
    }
    case "chart": {
      const sym = s(d, "symbol")
      return sym ? <SmartLink href={`/stocks/${sym.split(":").pop()!.toLowerCase()}`} className={cn(box, "px-5 py-4 flex items-center justify-between hover:border-burgundy/40")}><span className="text-[15px] font-extrabold">{s(d, "title") || sym}</span><span className="text-[13px] font-bold text-burgundy">See the chart →</span></SmartLink> : null
    }
    case "fund":
      return <div className={cn(box, "px-5 py-4")}><p className="text-[15.5px] font-extrabold">{s(d, "name") || "Mutual fund"}</p>{s(d, "note") && <p className="text-[13.5px] text-foreground/75 mt-2 whitespace-pre-line">{s(d, "note")}</p>}</div>
    case "ipo":
      return <div className={cn(box, "overflow-hidden")}><div className="bg-cream px-5 py-3 flex items-center justify-between border-b border-border/70"><p className="text-[15.5px] font-extrabold">{s(d, "name")} IPO</p>{s(d, "href") && <SmartLink href={s(d, "href")} className="text-[13px] font-bold text-burgundy">Apply →</SmartLink>}</div><dl className="grid grid-cols-2 sm:grid-cols-3">{([["Price band", "band"], ["Lot size", "lot"], ["Issue size", "size"], ["Opens", "open"], ["Closes", "close"], ["Lists on", "listing"]] as const).filter(([, k]) => s(d, k)).map(([l, k]) => <div key={k} className="px-5 py-3 border-b border-border/50"><dt className="text-[11.5px] text-muted-foreground font-semibold">{l}</dt><dd className="text-[14.5px] font-extrabold">{niceDate(s(d, k))}</dd></div>)}</dl></div>
    case "calculator":
      return <div className={cn(box, "px-5 py-5 flex flex-wrap items-center gap-4 bg-cream")}><span className="w-12 h-12 rounded-[12px] bg-burgundy text-white grid place-items-center"><Calculator className="w-6 h-6" /></span><div className="flex-1 min-w-[180px]"><p className="text-[16px] font-extrabold">{s(d, "title")}</p><p className="text-[13.5px] text-muted-foreground">{s(d, "text")}</p></div>{s(d, "button") && <SmartLink href={s(d, "href") || (s(d, "calculator") ? `/calculators/${s(d, "calculator")}` : "/calculators")} className="h-10 px-5 inline-flex items-center rounded-[6px] bg-burgundy text-white text-[13.5px] font-bold">{s(d, "button")}</SmartLink>}</div>
    case "button": {
      const look = { primary: "bg-burgundy text-white", outline: "border border-burgundy text-burgundy bg-white", gold: "bg-gold text-ink" }[s(d, "style")] ?? "bg-burgundy text-white"
      return <div className={cn(s(d, "align") === "center" && "text-center")}><SmartLink href={s(d, "href")} className={cn("inline-flex items-center gap-2 h-11 px-6 rounded-[6px] text-[14.5px] font-bold no-underline", look)}>{s(d, "text") || "Learn more"} <ArrowRight className="w-4 h-4" /></SmartLink></div>
    }
    case "cta": {
      const bg = s(d, "bg")
      return <div className={cn("rounded-[14px] p-6 sm:p-8 flex items-center gap-6 overflow-hidden", bg === "cream" ? "bg-cream border border-border" : bg === "dark" ? "bg-ink text-white" : "text-white")} style={bg === "red" || !bg ? { background: "linear-gradient(135deg,#FF0000,#c20000)" } : undefined}><div className="flex-1"><p className="text-[21px] font-black leading-snug">{s(d, "title")}</p><p className={cn("text-[14px] mt-1 whitespace-pre-line", bg === "cream" ? "text-muted-foreground" : "text-white/85")}>{s(d, "text")}</p>{s(d, "button") && <SmartLink href={s(d, "href") || OPEN_ACCOUNT_URL} className={cn("inline-flex mt-4 h-10 px-5 items-center rounded-[6px] text-[14px] font-black", bg === "cream" ? "bg-burgundy !text-white" : "bg-white !text-burgundy")}>{s(d, "button")}</SmartLink>}</div>{/* eslint-disable-next-line @next/next/no-img-element */}{s(d, "image") && <img src={s(d, "image")} alt="" className="hidden sm:block w-40 rounded-[10px]" />}</div>
    }
    case "lead":
      // Lead forms collect nothing yet (forms module comes later): the visitor is sent to account opening.
      return <div className={cn(box, "p-6")}><p className="text-[18px] font-black">{s(d, "title")}</p><p className="text-[13.5px] text-muted-foreground mb-4">{s(d, "text")}</p><SmartLink href={OPEN_ACCOUNT_URL} className="inline-flex h-11 px-6 items-center rounded-[6px] bg-burgundy !text-white text-[14px] font-bold">{s(d, "button") || "Open Free Account"}</SmartLink></div>
    case "app":
      return <div className={cn(box, "p-6 flex items-center gap-5 bg-cream")}><Smartphone className="w-10 h-10 text-burgundy shrink-0" /><div className="flex-1"><p className="text-[17px] font-black">{s(d, "title")}</p><p className="text-[13.5px] text-muted-foreground">{s(d, "text")}</p><div className="flex gap-2 mt-3">{s(d, "play") && <SmartLink href={s(d, "play")} className="h-9 px-4 rounded-[8px] bg-ink !text-white text-[12.5px] font-bold inline-flex items-center">Google Play</SmartLink>}{s(d, "ios") && <SmartLink href={s(d, "ios")} className="h-9 px-4 rounded-[8px] bg-ink !text-white text-[12.5px] font-bold inline-flex items-center">App Store</SmartLink>}</div></div></div>
    case "spacer": return <div style={{ height: { small: 16, medium: 40, large: 80 }[s(d, "size")] ?? 40 }} />
    // Not shown until they work on the website (they need the forms/polls module): poll, newsletter.
    // "related" lists are shown by the page itself from the article's related list.
    default: return null
  }
}

function YouTube({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false)
  return (
    <figure>
      <div className="relative aspect-video rounded-[12px] overflow-hidden bg-ink">
        {play ? (
          <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`} title={title || "Video"} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" />
        ) : (
          <button type="button" onClick={() => setPlay(true)} aria-label={`Play ${title || "video"}`} className="absolute inset-0 grid place-items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" className="absolute inset-0 w-full h-full object-cover opacity-85" />
            <span className="relative w-16 h-16 rounded-full bg-burgundy text-white grid place-items-center"><Play className="w-7 h-7 fill-current" /></span>
          </button>
        )}
      </div>
      {title && <figcaption className="text-[12.5px] text-muted-foreground text-center mt-2">{title}</figcaption>}
    </figure>
  )
}

function Faq({ d }: { d: Data }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section>
      {s(d, "title") && <p className="text-[22px] font-black tracking-tight mb-4 text-foreground">{s(d, "title")}</p>}
      <div className="space-y-3">
        {list(d).map((x, i) => (
          <div key={i} className="bg-white border border-border/80 rounded-[10px] overflow-hidden">
            <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="w-full px-5 py-4 text-left flex justify-between items-center gap-4 text-[14.5px] font-extrabold text-foreground">{s(x, "q")}{open === i ? <Minus className="w-4 h-4 text-burgundy shrink-0" /> : <Plus className="w-4 h-4 text-muted-foreground shrink-0" />}</button>
            {open === i && <p className="px-5 pb-5 text-[14px] text-muted-foreground leading-relaxed whitespace-pre-line">{s(x, "a")}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

function Checklist({ d }: { d: Data }) {
  const [on, setOn] = useState<number[]>([])
  return <div className={cn(box, "p-6")}><p className="text-[16px] font-black mb-3">{s(d, "title")}</p><div className="space-y-2">{list(d).map((x, i) => { const c = on.includes(i); return <button key={i} type="button" onClick={() => setOn(c ? on.filter((k) => k !== i) : [...on, i])} className="w-full flex items-center gap-3 text-left text-[14.5px] font-semibold"><span className={cn("w-5 h-5 rounded-[6px] border-2 grid place-items-center shrink-0", c ? "bg-emerald-600 border-emerald-600 text-white" : "border-black/20")}>{c && <Check className="w-3.5 h-3.5" />}</span><span className={cn(c && "line-through text-muted-foreground")}>{s(x, "text")}</span></button> })}</div></div>
}

function TabsBlock({ d }: { d: Data }) {
  const [at, setAt] = useState(0)
  const items = list(d)
  const cur = items[Math.min(at, items.length - 1)]
  return <div className={cn(box, "overflow-hidden")}><div className="flex border-b border-border bg-cream overflow-x-auto">{items.map((x, i) => <button key={i} type="button" onClick={() => setAt(i)} className={cn("px-5 py-3 text-[14px] font-bold whitespace-nowrap", i === at ? "bg-white text-burgundy" : "text-muted-foreground")}>{s(x, "title")}</button>)}</div><p className="p-5 text-[14.5px] leading-relaxed whitespace-pre-line">{cur ? s(cur, "text") : ""}</p></div>
}

function Reveal({ d }: { d: Data }) {
  const [open, setOpen] = useState(false)
  return <div className={box}><button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="w-full flex items-center justify-between px-5 py-3.5 text-[14.5px] font-extrabold">{s(d, "title")}<ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} /></button>{open && <p className="px-5 pb-5 text-[14.5px] text-foreground/75 leading-relaxed whitespace-pre-line">{s(d, "text")}</p>}</div>
}

function QuizBlock({ d }: { d: Data }) {
  const [ans, setAns] = useState<Record<number, string>>({})
  const qs = list(d)
  const score = qs.filter((x, i) => ans[i] === s(x, "right")).length
  return (
    <div className={cn(box, "p-6 space-y-5")}>
      <div className="flex items-center justify-between gap-3"><p className="text-[17px] font-black">{s(d, "title")}</p>{Object.keys(ans).length === qs.length && qs.length > 0 && <span className="text-[13px] font-extrabold text-emerald-700">{score} of {qs.length} correct</span>}</div>
      {qs.map((x, i) => (
        <div key={i}>
          <p className="text-[15px] font-bold mb-2.5">{i + 1}. {s(x, "q")}</p>
          <div className="space-y-2">
            {["a", "b", "c"].filter((k) => s(x, k)).map((k) => {
              const shown = ans[i] !== undefined
              const right = k === s(x, "right")
              return <button key={k} type="button" disabled={shown} onClick={() => setAns({ ...ans, [i]: k })} className={cn("w-full text-left rounded-[9px] border px-4 py-2.5 text-[14px] font-semibold flex items-center justify-between", shown && right ? "border-emerald-600 bg-emerald-50" : shown && ans[i] === k ? "border-red-500 bg-red-50" : "border-border")}>{s(x, k)}{shown && right && <Check className="w-4 h-4 text-emerald-600" />}{shown && !right && ans[i] === k && <CircleX className="w-4 h-4 text-red-500" />}</button>
            })}
          </div>
          {ans[i] !== undefined && s(x, "why") && <p className="text-[13.5px] text-muted-foreground mt-2">{s(x, "why")}</p>}
        </div>
      ))}
    </div>
  )
}
