"use client"

// Sections shared by the Products pages (Shree Varahi Web / Desktop App), in the site's existing theme.
// Content comes from lakshmishree.com (supplied by the client). UI only.

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ImageIcon, Plus, Quote, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { OPEN_ACCOUNT_URL } from "@/lib/external-links"

export const EYEBROW =
  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-xs font-bold text-gold-deep uppercase tracking-wider"

export const fadeUp = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.45 } }

export interface SiteImageSrc { src: string | null; alt: string }

/** The image when its URL is set, otherwise a placeholder box of the same shape. */
export function SiteImage({ image, className = "" }: { image: SiteImageSrc; className?: string }) {
  if (image.src) {
    // eslint-disable-next-line @next/next/no-img-element -- external URLs of unknown size
    return <img src={image.src} alt={image.alt} className={`w-full h-auto ${className}`} />
  }
  return (
    <div className={`w-full aspect-[4/3] rounded-[14px] border-2 border-dashed border-border bg-white/60 flex flex-col items-center justify-center gap-2 text-muted-foreground ${className}`}>
      <ImageIcon className="w-8 h-8" />
      <span className="text-xs font-semibold">{image.alt}</span>
    </div>
  )
}

export function OpenAccountButton({ label, variant = "primary" }: { label: string; variant?: "primary" | "light" }) {
  return (
    <Link href={OPEN_ACCOUNT_URL}>
      <Button
        size="lg"
        className={
          variant === "light"
            ? "bg-white text-burgundy hover:bg-white/90 rounded-[5px] h-12 px-9 text-sm font-black"
            : "bg-burgundy hover:bg-burgundy-deep text-white px-8 h-12 text-sm font-bold rounded-[5px]"
        }
      >
        {label} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  )
}

const APP_STORES = [
  {
    href: "https://apps.apple.com/in/app/shree-varahi/id1475075572",
    top: "Download on the", name: "App Store", rating: "4.3★ App Store",
    icon: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z",
  },
  {
    href: "https://play.google.com/store/search?q=shree%20varahi&c=apps&hl=en",
    top: "Get it on", name: "Google Play", rating: "4.5★ Play Store",
    icon: "M5 3.5c-.2 0-.4.1-.5.3l9.8 9.8 3.2-3.2L5.4 3.8c-.1-.2-.3-.3-.4-.3zM3.8 4.7c-.2.2-.3.5-.3.8v13c0 .3.1.6.3.8l7.2-7.2L3.8 4.7zm15 4.4L15.6 11l3.2 3.2 3.1-1.8c.4-.2.6-.6.6-1s-.2-.8-.6-1l-3.1-1.8zM4.3 19.9c.1.2.3.3.5.3.2 0 .3-.1.4-.2l12.1-7-3.2-3.2-9.8 9.8z",
  },
]

/** App Store + Google Play buttons (open the store pages in a new tab), each with its rating below. */
export function AppStoreButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-start gap-4 ${className}`}>
      {APP_STORES.map((s) => (
        <div key={s.name} className="flex flex-col items-center gap-1.5">
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.top} ${s.name}`}
            className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-[10px] px-5 py-2.5 min-w-[170px] flex items-center gap-3 transition-colors shadow-sm"
          >
            <svg className="w-6 h-6 fill-white shrink-0" viewBox="0 0 24 24" aria-hidden="true"><path d={s.icon} /></svg>
            <span className="text-left leading-none">
              <span className="text-[9px] text-white/60 block font-semibold uppercase tracking-wider">{s.top}</span>
              <span className="text-base font-bold block mt-0.5">{s.name}</span>
            </span>
          </a>
          <span className="text-xs font-semibold text-muted-foreground">{s.rating}</span>
        </div>
      ))}
    </div>
  )
}

/** Cream hero band with the faint grid used across the site. */
export function HeroSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative bg-cream overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 90%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

// ── Your All-in-one Investment Account ──────────────────────────────────────

export function InvestmentAccountBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
      <div className="rounded-[14px] p-8 sm:p-12 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}>
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-white/10" />
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 relative z-10">Your All-in-one Investment Account</h2>
        <p className="text-sm sm:text-base text-white/85 mb-7 relative z-10">Open today Free trading and demat account</p>
        <div className="relative z-10 inline-block">
          <OpenAccountButton label="Open an Account" variant="light" />
        </div>
      </div>
    </section>
  )
}

// ── FAQs ────────────────────────────────────────────────────────────────────

export interface Faq { q: string; a: string }

/** The source site shows these same four questions on both the Web and Desktop App pages. */
export const VARAHI_WEB_FAQS: Faq[] = [
  { q: "What is Varahi Web Portal?", a: "The platform is a web based application that helps you get an altogether clean view of the options that we offer you for smoother trading." },
  { q: "How can I register on Varahi Web?", a: "Once you open your account with Lakshmishree Investment & Securities Ltd, you can access the web through your PAN ID and password." },
  { q: "I forgot my login credentials, what can I do?", a: "We have a strong IT back-end team. You can anytime click on Forgot Password and get a confirmation through your registered email or number to reset your password." },
  { q: "Can I use my Shree Varahi Web credentials in apps?", a: "The Web & App are the platforms built for your comfort. Therefore, you can access them through the same credentials you have set." },
]

export function FaqSection({ faqs, label }: { faqs: Faq[]; label: string }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-20 lg:py-24 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className={EYEBROW}>{label}</span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={faq.q} className="bg-cream border border-border/80 rounded-[12px] overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 hover:bg-secondary/40 transition-colors"
                >
                  <span className="font-extrabold text-foreground text-sm">{faq.q}</span>
                  <span className={`shrink-0 w-6 h-6 rounded-[5px] flex items-center justify-center transition-colors ${isOpen ? "bg-burgundy text-white" : "bg-secondary text-muted-foreground"}`}>
                    {isOpen ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="px-6 pb-5 pt-2 text-sm text-muted-foreground leading-relaxed border-t border-border/40">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Customer reviews ────────────────────────────────────────────────────────

// TODO: placeholder reviews carried over from the source site's template. Replace with real customer reviews before going live.
const REVIEWS = [
  { name: "Adorn Themes",    text: "Every element is designed beautifully and pixel perfect, so it is really a modern theme. Support team is very kind." },
  { name: "Ben AVW",         text: "You don't need a web developer to use this theme. Simple and easy to integrate and build the whole website." },
  { name: "Chantal Winston", text: "Out of all the themes that I have purchased and customized, this is the 1st one that didn't require any support." },
  { name: "Studio JAS",      text: "While everything is great about this theme, from design quality to flexibility. I'm using this theme for 5 websites." },
  { name: "Brent Nolan",     text: "Support for this product has always been above and beyond, their technical team has been very reliable." },
  { name: "Forextv",         text: "I have limited coding skills and these guys make it simple. Recommend this theme and support team." },
  { name: "Super Mario",     text: "A professional template with a great code quality and a very detailed and understandable documentation." },
]

export const REVIEWS_IMAGE: SiteImageSrc = { src: "/products/product-review.png", alt: "Customer reviews" }

const AUTOPLAY_MS = 4500

/** Reviews slider: 1 card on phones, 2 on tablets, 3 on desktop. Loops, auto-advances, pauses on hover. */
function ReviewsCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState<number[]>([])
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!api) return
    const sync = () => { setSnaps(api.scrollSnapList()); setSelected(api.selectedScrollSnap()) }
    sync()
    api.on("select", sync)
    api.on("reInit", sync)
    return () => { api.off("select", sync); api.off("reInit", sync) }
  }, [api])

  useEffect(() => {
    if (!api || paused) return
    const timer = setInterval(() => api.scrollNext(), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [api, paused])

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Carousel setApi={setApi} opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-5">
          {REVIEWS.map((r) => (
            <CarouselItem key={r.name} className="pl-5 basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="h-full bg-white border border-border/70 rounded-[12px] p-6 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <Quote className="w-6 h-6 text-burgundy/25" />
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => <Star key={i} className="w-3 h-3 fill-gold text-gold" />)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{r.text}</p>
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-burgundy/10 text-burgundy text-sm font-black flex items-center justify-center">
                    {r.name.charAt(0)}
                  </span>
                  <span className="text-sm font-black text-foreground">{r.name}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex items-center justify-between gap-4 mt-6">
          <div className="flex gap-1.5">
            {snaps.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === selected ? "w-6 bg-burgundy" : "w-2 bg-border hover:bg-muted-foreground/40"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <CarouselPrevious className="static translate-y-0 rounded-[5px] border-border hover:border-burgundy hover:text-burgundy" />
            <CarouselNext className="static translate-y-0 rounded-[5px] border-border hover:border-burgundy hover:text-burgundy" />
          </div>
        </div>
      </Carousel>
    </div>
  )
}

export function ReviewsSection() {
  return (
    <section className="bg-cream py-16 lg:py-24 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center mb-10">
          <motion.div {...fadeUp}>
            <span className={`${EYEBROW} mb-4`}>Customer Reviews</span>
            <p className="text-5xl font-black text-burgundy mb-2">1000+</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-1">Product Reviews</h2>
            <p className="text-sm text-muted-foreground mb-4">Thousands of happy customers</p>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => <Star key={i} className="w-4 h-4 fill-gold text-gold" />)}
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="max-w-md lg:ml-auto w-full">
            <SiteImage image={REVIEWS_IMAGE} />
          </motion.div>
        </div>
        <ReviewsCarousel />
      </div>
    </section>
  )
}
