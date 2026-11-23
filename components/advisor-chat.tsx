"use client"

// Floating advisor chat (home page, bottom-right).
//   Chat tab     — greeting, quick-reply chips, typed questions answered from a small built-in FAQ,
//                  and a "request a callback" form.
//   Advisor tab  — the advisor's profile: photo/initials, role, experience, languages, expertise, hours.
// UI only: nothing is sent anywhere yet. Connect `sendMessage` / the callback form to a chat or CRM backend later.

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, BadgeCheck, Clock, Globe, MessageCircle, PhoneCall, Send, Sparkles, UserRound, X } from "lucide-react"
import { CALCULATOR_LINKS, LOGIN_URL } from "@/lib/external-links"

// TODO: replace with the real advisor's details and photo.
const ADVISOR = {
  name: "Shree Varahi Advisor",
  role: "Investment Advisor",
  photo: null as string | null,
  experience: "10+ years in Indian markets",
  languages: ["English", "Hindi", "Marathi"],
  expertise: ["Stocks & IPOs", "Mutual Funds & SIPs", "F&O", "Portfolio Review"],
  hours: "Mon to Sat, 9:00 AM to 6:00 PM",
}

type Msg = { id: number; from: "bot" | "user"; text: string; link?: { label: string; href: string } }

const QUICK_REPLIES = ["Open an account", "Brokerage charges", "Upcoming IPOs", "Mutual funds", "Talk to an advisor"]

/** Keyword → reply. The first match wins; anything else offers a callback. */
const ANSWERS: { test: RegExp; text: string; link?: Msg["link"] }[] = [
  { test: /open|account|demat|kyc|sign ?up/i, text: "You can open a free demat & trading account in minutes with PAN, Aadhaar and bank details, zero account opening charges.", link: { label: "Open Free Account", href: LOGIN_URL } },
  { test: /brokerage|charge|fee|cost|amc/i, text: "Equity delivery is free. Intraday and F&O orders have a flat low brokerage per executed order, with zero AMC.", link: { label: "Brokerage Calculator", href: CALCULATOR_LINKS.brokerage } },
  { test: /ipo/i, text: "See every open, upcoming and recently listed IPO with dates, price bands and lot sizes.", link: { label: "View IPOs", href: "/ipo" } },
  { test: /mutual|fund|sip|lumpsum/i, text: "Explore 1,000+ mutual funds with zero commission, compare returns and start a SIP.", link: { label: "Explore Mutual Funds", href: "/mutual-funds" } },
  { test: /mtf|margin|leverage/i, text: "With the Margin Trading Facility you can buy eligible stocks with up to 3× buying power.", link: { label: "Learn about MTF", href: "/mtf" } },
  { test: /f&o|fno|future|option/i, text: "Trade index and stock futures & options with live option chains and strategy tools.", link: { label: "Go to F&O", href: "/futures-options" } },
  { test: /learn|guide|beginner|knowledge/i, text: "Our Knowledge Center has simple guides on stocks, IPOs, F&O, taxes and more.", link: { label: "Knowledge Center", href: "/knowledge-center" } },
]

const initials = (name: string) => name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()

function Avatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const cls = size === "lg" ? "w-20 h-20 text-2xl" : size === "sm" ? "w-8 h-8 text-[11px]" : "w-11 h-11 text-sm"
  return (
    <span className={`relative shrink-0 ${cls} rounded-full bg-gradient-to-br from-burgundy to-[#c20000] text-white font-black flex items-center justify-center ring-2 ring-white`}>
      {ADVISOR.photo
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={ADVISOR.photo} alt={ADVISOR.name} className="w-full h-full rounded-full object-cover" />
        : initials(ADVISOR.name)}
      <span className={`absolute bottom-0 right-0 ${size === "lg" ? "w-4 h-4" : "w-2.5 h-2.5"} rounded-full bg-profit ring-2 ring-white`} aria-label="Online" />
    </span>
  )
}

export function AdvisorChat() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<"chat" | "profile">("chat")
  const [messages, setMessages] = useState<Msg[]>([
    { id: 1, from: "bot", text: `Hi! I'm your ${ADVISOR.role.toLowerCase()} at Shree Varahi. How can I help you today?` },
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [callback, setCallback] = useState<"closed" | "form" | "done">("closed")
  const [cbName, setCbName] = useState("")
  const [cbPhone, setCbPhone] = useState("")
  const [showTeaser, setShowTeaser] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(2)

  // A small "Need help?" bubble a few seconds after the page loads, until the chat is opened.
  useEffect(() => {
    const t = setTimeout(() => setShowTeaser(true), 4000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, typing, callback])

  const push = (m: Omit<Msg, "id">) => setMessages((prev) => [...prev, { ...m, id: nextId.current++ }])

  const sendMessage = (text: string) => {
    const t = text.trim()
    if (!t) return
    push({ from: "user", text: t })
    setInput("")
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      if (/advisor|call|talk|human|person|help/i.test(t)) {
        push({ from: "bot", text: "Happy to connect you with an advisor. Share your name and number and we'll call you back." })
        setCallback("form")
        return
      }
      const hit = ANSWERS.find((a) => a.test.test(t))
      if (hit) push({ from: "bot", text: hit.text, link: hit.link })
      else {
        push({ from: "bot", text: "Good question! An advisor can help with that. Would you like a callback?" })
        setCallback("form")
      }
    }, 700)
  }

  const submitCallback = (e: React.FormEvent) => {
    e.preventDefault()
    setCallback("done")
    push({ from: "bot", text: `Thanks ${cbName.split(" ")[0]}! An advisor will call you on ${cbPhone} during ${ADVISOR.hours}.` })
  }

  const openChat = () => { setOpen(true); setShowTeaser(false) }

  return (
    // Sits directly above the scroll-to-top button (56px at bottom/right 28px, components/scroll-progress.tsx).
    <div className="fixed right-7 bottom-24 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Chat with an advisor"
            className="w-[calc(100vw-44px)] sm:w-[380px] h-[min(580px,calc(100vh-180px))] lg:h-[min(600px,calc(100vh-200px))] bg-white rounded-[16px] border border-border shadow-[0_24px_70px_rgba(0,0,0,0.22)] overflow-hidden flex flex-col"
          >
            {/* Header: advisor */}
            <div className="relative px-4 pt-4 pb-3 text-white" style={{ background: "linear-gradient(135deg, #8B0D19 0%, #c20000 100%)" }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
              <div className="relative flex items-center gap-3">
                <Avatar />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black truncate flex items-center gap-1">{ADVISOR.name} <BadgeCheck className="w-4 h-4 text-gold shrink-0" /></p>
                  <p className="text-[11px] text-white/80">{ADVISOR.role} · <span className="text-white">Online</span></p>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close chat" className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="relative flex gap-1 mt-3 p-0.5 rounded-[8px] bg-white/15" role="tablist">
                {([["chat", "Chat", MessageCircle], ["profile", "Advisor Profile", UserRound]] as const).map(([id, label, Icon]) => (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={tab === id}
                    onClick={() => setTab(id)}
                    className={`flex-1 h-8 rounded-[6px] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${tab === id ? "bg-white text-burgundy" : "text-white/90 hover:bg-white/10"}`}
                  >
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </button>
                ))}
              </div>
            </div>

            {tab === "profile" ? (
              /* Advisor profile */
              <div className="flex-1 overflow-y-auto p-5">
                <div className="flex flex-col items-center text-center mb-5">
                  <Avatar size="lg" />
                  <p className="text-lg font-black text-foreground mt-3">{ADVISOR.name}</p>
                  <p className="text-xs font-semibold text-muted-foreground">{ADVISOR.role}</p>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: Sparkles, label: "Experience", value: ADVISOR.experience },
                    { icon: Globe,    label: "Languages",  value: ADVISOR.languages.join(", ") },
                    { icon: Clock,    label: "Available",  value: ADVISOR.hours },
                  ].map((r) => (
                    <div key={r.label} className="flex items-start gap-3 bg-cream/60 border border-border/60 rounded-[10px] px-3.5 py-3">
                      <r.icon className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">{r.label}</p>
                        <p className="text-sm font-bold text-foreground">{r.value}</p>
                      </div>
                    </div>
                  ))}
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-2">Expertise</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ADVISOR.expertise.map((e) => (
                        <span key={e} className="text-xs font-bold px-2.5 py-1 rounded-full bg-burgundy/[0.07] text-burgundy">{e}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-6">
                  <button onClick={() => setTab("chat")} className="h-10 rounded-[6px] bg-burgundy hover:bg-burgundy-deep text-white text-sm font-black flex items-center justify-center gap-1.5">
                    <MessageCircle className="w-4 h-4" /> Chat now
                  </button>
                  <button onClick={() => { setTab("chat"); setCallback("form") }} className="h-10 rounded-[6px] border border-border text-sm font-black text-foreground hover:border-burgundy hover:text-burgundy flex items-center justify-center gap-1.5">
                    <PhoneCall className="w-4 h-4" /> Callback
                  </button>
                </div>
              </div>
            ) : (
              /* Chat */
              <>
                <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-cream/40" aria-live="polite">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex items-end gap-2 ${m.from === "user" ? "justify-end" : ""}`}>
                      {m.from === "bot" && <Avatar size="sm" />}
                      <div className={`max-w-[78%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                        m.from === "user"
                          ? "bg-burgundy text-white rounded-[14px] rounded-br-[4px]"
                          : "bg-white border border-border/70 text-foreground rounded-[14px] rounded-bl-[4px]"
                      }`}>
                        {m.text}
                        {m.link && (
                          <Link href={m.link.href} className="mt-2 flex items-center gap-1 text-xs font-black text-burgundy hover:underline">
                            {m.link.label} <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}

                  {typing && (
                    <div className="flex items-end gap-2">
                      <Avatar size="sm" />
                      <div className="bg-white border border-border/70 rounded-[14px] rounded-bl-[4px] px-3.5 py-3 flex gap-1" aria-label="Typing">
                        {[0, 1, 2].map((i) => (
                          <span key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </div>
                    </div>
                  )}

                  {callback === "form" && (
                    <form onSubmit={submitCallback} className="bg-white border border-border rounded-[12px] p-3.5 space-y-2.5 ml-10">
                      <p className="text-xs font-black text-foreground">Request a callback</p>
                      <input
                        required value={cbName} onChange={(e) => setCbName(e.target.value)} placeholder="Your name" autoComplete="name"
                        className="w-full h-9 px-3 rounded-[6px] border border-border bg-cream/40 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
                      />
                      <input
                        required value={cbPhone} onChange={(e) => setCbPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="10-digit mobile number" inputMode="numeric" pattern="[0-9]{10}" title="Enter a 10-digit mobile number" autoComplete="tel"
                        className="w-full h-9 px-3 rounded-[6px] border border-border bg-cream/40 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
                      />
                      <button type="submit" className="w-full h-9 rounded-[6px] bg-burgundy hover:bg-burgundy-deep text-white text-xs font-black">Call me back</button>
                    </form>
                  )}
                </div>

                {/* Quick replies */}
                <div className="flex gap-1.5 overflow-x-auto px-3 pt-2.5 pb-1 border-t border-border/60 bg-white" style={{ scrollbarWidth: "none" }}>
                  {QUICK_REPLIES.map((q) => (
                    <button key={q} onClick={() => sendMessage(q)} className="shrink-0 text-[11px] font-bold px-3 py-1.5 rounded-full border border-burgundy/25 text-burgundy hover:bg-burgundy/5 whitespace-nowrap">
                      {q}
                    </button>
                  ))}
                </div>

                {/* Composer */}
                <form onSubmit={(e) => { e.preventDefault(); sendMessage(input) }} className="flex items-center gap-2 p-3 bg-white">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question…"
                    aria-label="Type your question"
                    className="flex-1 h-10 px-3.5 rounded-full border border-border bg-cream/40 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:bg-white"
                  />
                  <button type="submit" disabled={!input.trim()} aria-label="Send" className="w-10 h-10 rounded-full bg-burgundy hover:bg-burgundy-deep text-white flex items-center justify-center disabled:opacity-40 transition-opacity">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teaser bubble */}
      <AnimatePresence>
        {!open && showTeaser && (
          <motion.button
            key="teaser"
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
            onClick={openChat}
            className="max-w-[240px] text-left bg-white border border-border rounded-[14px] rounded-br-[4px] shadow-[0_12px_40px_rgba(0,0,0,0.15)] px-4 py-3"
          >
            <span className="block text-xs font-black text-foreground">Need help investing?</span>
            <span className="block text-[11px] text-muted-foreground">Chat with our advisor, we reply instantly.</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <button
        onClick={open ? () => setOpen(false) : openChat}
        aria-label={open ? "Close chat" : "Chat with an advisor"}
        aria-expanded={open}
        className="relative w-14 h-14 rounded-full text-white shadow-[0_12px_32px_rgba(139,13,25,0.45)] flex items-center justify-center hover:scale-105 transition-transform"
        style={{ background: "linear-gradient(135deg, #8B0D19 0%, #c20000 100%)" }}
      >
        {!open && <span className="absolute inset-0 rounded-full bg-burgundy/40 animate-ping" style={{ animationDuration: "2.4s" }} />}
        {open ? <X className="w-6 h-6 relative" /> : <MessageCircle className="w-6 h-6 relative" />}
        {!open && <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-profit ring-2 ring-white" />}
      </button>
    </div>
  )
}
