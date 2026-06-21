"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  TrendingUp,
  ShieldCheck,
  Globe2,
  ChevronRight,
  Award,
  Users,
  MessageSquare,
} from "lucide-react"

const slides = [
  {
    Icon: TrendingUp,
    title: "Start Your Wealth Journey",
    text: "Open your free account in minutes and start investing in stocks, F&O, IPOs and more.",
  },
  {
    Icon: ShieldCheck,
    title: "Safe & Regulated",
    text: "SEBI-registered broker with bank-grade security. Your investments are always protected.",
  },
  {
    Icon: Globe2,
    title: "3.25 Crore+ Investors",
    text: "Join India's growing community of smart investors who trust Shree Varahi every day.",
  },
]

export default function RegisterPage() {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col bg-cream overflow-hidden">
        {/* Subtle atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(255,0,0,0.06)_0%,transparent_65%)]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,178,124,0.1)_0%,transparent_65%)]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        {/* Logo */}
        <div className="relative z-10 p-10 flex items-center gap-2.5">
          <Image
            src="/favicon.jpg"
            alt="Shree Varahi"
            width={40}
            height={40}
            className="rounded-[5px] object-contain"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground leading-tight">Shree Varahi</span>
            <span className="text-[10px] text-gold-deep font-medium">by Lakshmishree</span>
          </div>
        </div>

        {/* Slider */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-10">
          <div className="w-full max-w-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -22 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                {/* Icon box */}
                <div className="mx-auto mb-8 w-20 h-20 relative">
                  <div className="absolute inset-0 rounded-2xl bg-white border border-border shadow-[0_2px_16px_rgba(0,0,0,0.06)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {(() => {
                      const { Icon } = slides[slide]
                      return <Icon className="w-9 h-9 text-burgundy" strokeWidth={1.5} />
                    })()}
                  </div>
                  {/* Gold corner accents */}
                  <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-gold rounded-tl-2xl" />
                  <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-gold rounded-tr-2xl" />
                  <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-gold rounded-bl-2xl" />
                  <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-gold rounded-br-2xl" />
                </div>

                <h2 className="text-[24px] font-extrabold text-foreground mb-3 leading-snug tracking-tight">
                  {slides[slide].title}
                </h2>
                <p className="text-muted-foreground text-[14px] leading-relaxed font-medium max-w-[280px] mx-auto">
                  {slides[slide].text}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Pagination dots */}
            <div className="flex items-center justify-center gap-2 mt-10">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)} className="p-1">
                  <motion.div
                    className="h-1.5 rounded-full"
                    animate={{
                      width: i === slide ? 28 : 6,
                      backgroundColor:
                        i === slide ? "#FF0000" : "rgba(26,26,26,0.15)",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="relative z-10 p-8 grid grid-cols-2 gap-3">
          <div className="bg-white border border-border rounded-[5px] p-4 flex items-center gap-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <div className="w-8 h-8 rounded-full bg-gold/[0.12] border border-gold/30 flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4 text-gold-deep" />
            </div>
            <div>
              <p className="text-muted-foreground text-[9px] font-bold uppercase tracking-widest mb-0.5">Certified By</p>
              <p className="text-foreground text-[11px] font-bold leading-tight">ISO/IEC 27001:2022</p>
            </div>
          </div>
          <div className="bg-white border border-border rounded-[5px] p-4 flex items-center gap-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <div className="w-8 h-8 rounded-full bg-gold/[0.12] border border-gold/30 flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-gold-deep" />
            </div>
            <div>
              <p className="text-muted-foreground text-[9px] font-bold uppercase tracking-widest mb-0.5">Trusted By</p>
              <p className="text-foreground text-[11px] font-bold leading-tight">3.25 Cr+ Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-cream px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-[380px]">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <Image
              src="/favicon.jpg"
              alt="Shree Varahi"
              width={44}
              height={44}
              className="rounded-[5px] object-contain"
            />
            <div className="flex flex-col">
              <span className="text-[19px] font-bold text-foreground leading-tight">Shree Varahi</span>
              <span className="text-[10px] text-gold-deep font-medium">by Lakshmishree</span>
            </div>
          </div>

          {/* Card */}
          <div
            className="bg-white rounded-[5px] border border-border p-8"
            style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.06)" }}
          >
            <h1 className="text-[22px] font-extrabold text-foreground leading-tight mb-1">
              Create Account
            </h1>
            <p className="text-muted-foreground text-sm mb-7">
              Join 3.25 Cr+ investors on Shree Varahi
            </p>

            {/* Mobile Number */}
            <div className="mb-5">
              <label className="block text-[13px] font-semibold text-foreground mb-2">
                Register With Mobile Number
              </label>
              <div className="flex rounded-[5px] border border-border bg-[#F5F5F5] overflow-hidden focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/15 transition-all">
                <div className="flex items-center px-3 border-r border-border bg-white/70 flex-shrink-0">
                  <span className="text-[13px] font-bold text-muted-foreground">+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="Enter 10-digit number"
                  maxLength={10}
                  className="flex-1 min-w-0 px-3 py-3 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground/50 outline-none"
                />
              </div>
            </div>

            {/* Introducer Code */}
            <div className="mb-6">
              <label className="block text-[13px] font-semibold text-foreground mb-2">
                Enter Introducer Code{" "}
                <span className="text-muted-foreground font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="Enter referral or introducer code"
                className="w-full px-3 py-3 bg-[#F5F5F5] border border-border rounded-[5px] text-[14px] text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all"
              />
            </div>

            {/* OTP help text */}
            <div className="flex items-start gap-2.5 bg-[#FAF8F5] border border-[#E5E5E5] rounded-[5px] px-3.5 py-3 mb-6">
              <MessageSquare className="w-4 h-4 text-gold-deep mt-0.5 flex-shrink-0" />
              <p className="text-[12.5px] text-muted-foreground font-medium leading-snug">
                We will send an OTP to your mobile number
              </p>
            </div>

            {/* Next button */}
            <button className="w-full bg-burgundy hover:bg-burgundy-deep text-white font-bold py-3 rounded-[5px] transition-colors duration-200 flex items-center justify-center gap-2 text-[14px] shadow-[0_2px_10px_rgba(255,0,0,0.18)]">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Login link */}
          <p className="text-center text-[13px] text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-burgundy font-bold hover:underline underline-offset-2"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
