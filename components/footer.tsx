"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const footerLinks = {
  Trade: [
    "Trading App",
    "Web Terminal",
    "Options Trader",
    "Algo & API",
    "Stocks Intraday",
    "Futures",
    "Commodities",
  ],
  Invest: [
    "Stocks Delivery",
    "Mutual Funds",
    "SIP",
    "IPO",
    "ETF",
    "US Stocks",
    "Digital Gold",
  ],
  "Markets & Tools": [
    "Stock Screener",
    "Option Chain",
    "Strategy Builder",
    "Market News",
    "Research Reports",
    "Webinars",
  ],
  Company: [
    "About Us",
    "Careers",
    "Press",
    "Branch Locator",
    "Partner Program",
    "Contact Us",
  ],
}

const exchangeLogos = ["NSE", "BSE", "MCX", "CDSL", "SEBI", "NSDL"]

const socials = [
  {
    name: "twitter",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "linkedin",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "youtube",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    name: "instagram",
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
  },
]

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-burgundy text-white"
      style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.15)",
      }}
    >
      {/* Gold atmospheric glow — top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[320px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(217,178,124,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Gold accent — top edge */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* ── Main content ── */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-white/10">
                <svg viewBox="0 0 40 40" className="h-6 w-6 text-gold">
                  <path
                    fill="currentColor"
                    d="M20 2C11.16 2 4 9.16 4 18c0 4.42 1.79 8.42 4.69 11.31L20 38l11.31-8.69C34.21 26.42 36 22.42 36 18c0-8.84-7.16-16-16-16z"
                  />
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold text-white">Shree Varahi</span>
                <span className="block text-[10px] text-gold-champagne font-semibold">
                  by Lakshmishree
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/70 mb-5 max-w-xs leading-relaxed">
              Trading & investment platform by Lakshmishree Investment &
              Securities Ltd. SEBI registered since 1993.
            </p>

            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="w-8 h-8 rounded-[5px] bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-white mb-4 text-sm tracking-wide">
                {category}
              </h4>
              <ul className="space-y-[10px]">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/70 hover:text-gold-champagne transition-colors duration-150"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Exchange logos */}
        <div
          className="flex flex-wrap justify-center items-center gap-6 lg:gap-10 mt-12 py-8"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
        >
          {exchangeLogos.map((logo) => (
            <span
              key={logo}
              className="text-sm font-bold text-white/40 hover:text-gold transition-colors duration-150 cursor-default"
            >
              {logo}
            </span>
          ))}
        </div>

        {/* Disclaimer */}
        <div
          className="mt-8 p-4 rounded-[5px] text-xs text-white/60 leading-relaxed"
          style={{
            background: "rgba(0,0,0,0.2)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <p className="mb-2">
            <strong className="text-white/90">Disclaimer:</strong> Investments
            in securities market are subject to market risks, read all the
            related documents carefully before investing. Brokerage will not
            exceed the SEBI prescribed limit. Registration granted by SEBI and
            certification from NISM in no way guarantee performance of the
            intermediary or provide any assurance of returns to investors.
          </p>
          <p>
            Lakshmishree Investment & Securities Ltd. | SEBI Registration No:
            INZ000215633 | NSE Member ID: 14136 | BSE Member ID: 6736 | MCX
            Member ID: 46685 | CDSL DP ID: IN-DP-596-2021 | CIN:
            U67120MH1993PLC074454
          </p>
        </div>

        {/* Copyright row */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-8"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
        >
          <p className="text-sm text-white/60">
            © 2026 Shree Varahi — Lakshmishree Investment & Securities Ltd.
          </p>
          <p className="text-sm text-white/50 flex flex-col items-center sm:items-end gap-0.5 leading-relaxed">
            <span className="flex items-center gap-1.5">
              built with
              <svg
                viewBox="0 0 24 24"
                className="w-[15px] h-[15px] fill-white"
                style={{ animation: "footer-heartbeat 1.2s ease-in-out infinite" }}
                aria-hidden="true"
              >
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
              </svg>
              love
            </span>
            <span>for the trader, the saver, the dreamer — built in India</span>
          </p>
          <style>{`
            @keyframes footer-heartbeat {
              0%, 100% { transform: scale(1);    }
              14%       { transform: scale(1.3);  }
              28%       { transform: scale(1);    }
              42%       { transform: scale(1.18); }
              56%       { transform: scale(1);    }
            }
          `}</style>
        </div>
      </div>

      {/* ── Large marquee — SHREE VARAHI ── */}
      <div
        className="overflow-hidden"
        style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
      >
        {/* 4 copies, animate -25% = exactly one copy width → seamless */}
        <motion.div
          animate={{ x: ["0%", "-25%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap py-3"
          style={{ willChange: "transform" }}
        >
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="inline-flex items-baseline shrink-0">
              <span
                className="font-bold tracking-tight select-none shrink-0"
                style={{
                  fontSize: "clamp(56px, 11vw, 152px)",
                  lineHeight: 0.88,
                  paddingRight: "5vw",
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.12)",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  letterSpacing: "0.04em",
                }}
              >
                SHREE VARAHI
              </span>
              <span
                className="shrink-0 select-none font-bold"
                style={{
                  fontSize: "clamp(24px, 4vw, 56px)",
                  color: "#D9B27C",
                  opacity: 0.5,
                  paddingRight: "5vw",
                }}
              >
                ✦
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Gold accent — bottom edge */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </footer>
  )
}
