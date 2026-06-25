"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  TrendingUp,
  ShieldCheck,
  Globe2,
  ChevronRight,
  Phone,
  CreditCard,
  Award,
  Users,
  ArrowLeft,
  RefreshCw,
  LayoutDashboard,
} from "lucide-react"

const slides = [
  {
    Icon: TrendingUp,
    title: "Invest With Confidence",
    text: "Access stocks, F&O, IPOs, and mutual funds with real-time data and zero complexity.",
  },
  {
    Icon: ShieldCheck,
    title: "Bank-Grade Security",
    text: "Your portfolio is protected with 256-bit encryption, 2FA, and SEBI-regulated infrastructure.",
  },
  {
    Icon: Globe2,
    title: "Markets at Your Fingertips",
    text: "Trade across NSE, BSE, MCX with live charts, instant execution, and AI-powered insights.",
  },
]

type Step = "input" | "otp" | "redirect"
type Tab = "mobile" | "client"

function LeftPanel({ slide, setSlide }: { slide: number; setSlide: (i: number) => void }) {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative flex-col bg-cream overflow-hidden">
      {/* Subtle atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(255,0,0,0.06)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,178,124,0.1)_0%,transparent_65%)]" />
        {/* Grid pattern (same as hero) */}
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
        <div className="w-full max-w-[360px]">
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
                    return <Icon className="w-9 h-9 text-[#8B0D19]" strokeWidth={1.5} />
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
                    backgroundColor: i === slide ? "#FF0000" : "rgba(26,26,26,0.15)",
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
  )
}

/* ── OTP Input ── */
function OtpInput({
  otp,
  onChange,
  onKeyDown,
  onPaste,
  refs,
  error,
}: {
  otp: string[]
  onChange: (i: number, v: string) => void
  onKeyDown: (i: number, e: React.KeyboardEvent<HTMLInputElement>) => void
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void
  refs: React.MutableRefObject<(HTMLInputElement | null)[]>
  error: boolean
}) {
  return (
    <motion.div
      className="flex gap-2.5 justify-center"
      animate={error ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {otp.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el }}
          type="tel"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => onChange(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onPaste={onPaste}
          className={`w-11 h-12 text-center text-[18px] font-bold rounded-[5px] outline-none transition-all duration-150 ${
            error
              ? "border-2 border-red-400 bg-red-50 text-red-500"
              : digit
              ? "border-2 border-gold bg-white text-foreground shadow-[0_0_0_3px_rgba(217,178,124,0.12)]"
              : "border border-border bg-[#F5F5F5] text-foreground focus:border-gold focus:ring-2 focus:ring-gold/15"
          }`}
        />
      ))}
    </motion.div>
  )
}

/* ── Redirect Screen ── */
function RedirectScreen({ name }: { name: string }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full w-full px-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated checkmark */}
      <div className="relative mb-8">
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-[#EBEBEB]"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent"
          style={{ borderTopColor: "#FF0000", borderRightColor: "#FF0000" }}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 270, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
            <motion.path
              d="M10 21 L17 28 L30 14"
              stroke="#FF0000"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
            />
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-[24px] font-extrabold text-foreground tracking-tight mb-2">Login Successful!</h2>
        <p className="text-muted-foreground text-[14px] mb-8 font-medium">
          Welcome back,{" "}
          <span className="text-foreground font-bold">{name}</span>
        </p>

        <div className="w-64 h-1 bg-[#EBEBEB] rounded-full overflow-hidden mx-auto mb-4">
          <motion.div
            className="h-full bg-burgundy rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.8, delay: 1, ease: "linear" }}
          />
        </div>

        <div className="flex items-center justify-center gap-2 text-[13px] text-muted-foreground font-medium">
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Redirecting to your dashboard</span>
          <span className="flex gap-1 ml-0.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1 h-1 rounded-full bg-muted-foreground/60 inline-block"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function LoginPage() {
  const [slide, setSlide] = useState(0)
  const [tab, setTab] = useState<Tab>("mobile")
  const [step, setStep] = useState<Step>("input")
  const [mobile, setMobile] = useState("")
  const [clientId, setClientId] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [otpError, setOtpError] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 4500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (step !== "otp") return
    setResendTimer(30)
    const t = setInterval(() => {
      setResendTimer((s) => {
        if (s <= 1) { clearInterval(t); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [step])

  const displayName = tab === "mobile" ? `+91 ${mobile}` : clientId

  const handleSend = () => {
    if (tab === "mobile" && mobile.length < 10) return
    if (tab === "client" && clientId.trim().length < 3) return
    setStep("otp")
    setTimeout(() => otpRefs.current[0]?.focus(), 150)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const next = [...otp]
    next[index] = value.slice(-1)
    setOtp(next)
    setOtpError(false)
    if (value && index < 5) otpRefs.current[index + 1]?.focus()
    if (next.every((d) => d !== "")) {
      const entered = next.join("")
      if (entered === "123456") {
        setTimeout(() => setStep("redirect"), 200)
      } else {
        setOtpError(true)
        setTimeout(() => {
          setOtp(["", "", "", "", "", ""])
          setOtpError(false)
          otpRefs.current[0]?.focus()
        }, 700)
      }
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (text.length === 6) {
      const digits = text.split("")
      setOtp(digits)
      if (text === "123456") {
        setTimeout(() => setStep("redirect"), 250)
      } else {
        setOtpError(true)
        setTimeout(() => {
          setOtp(["", "", "", "", "", ""])
          setOtpError(false)
          otpRefs.current[0]?.focus()
        }, 700)
      }
    }
  }

  const handleBack = () => {
    setStep("input")
    setOtp(["", "", "", "", "", ""])
    setOtpError(false)
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <LeftPanel slide={slide} setSlide={setSlide} />

      {/* ── Right Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === "redirect" ? (
            <motion.div
              key="redirect"
              className="w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <RedirectScreen name={displayName} />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="w-full max-w-[380px]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
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
                <AnimatePresence mode="wait">
                  {/* ── Step: Input ── */}
                  {step === "input" && (
                    <motion.div
                      key="input"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.22 }}
                    >
                      <h1 className="text-[22px] font-extrabold text-foreground leading-tight mb-1">Welcome back</h1>
                      <p className="text-muted-foreground text-sm mb-7">Sign in to continue to your account</p>

                      {/* Tabs */}
                      <div className="flex bg-[#F5F5F5] rounded-[5px] p-1 mb-7 gap-1">
                        {([["mobile", Phone, "Mobile Number"], ["client", CreditCard, "Client ID"]] as const).map(
                          ([key, Icon, label]) => (
                            <button
                              key={key}
                              onClick={() => setTab(key)}
                              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[3px] text-[13px] font-semibold transition-all duration-200 ${
                                tab === key
                                  ? "bg-white text-foreground shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                              {label}
                            </button>
                          )
                        )}
                      </div>

                      <AnimatePresence mode="wait">
                        {tab === "mobile" ? (
                          <motion.div key="mob" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.16 }}>
                            <label className="block text-[13px] font-semibold text-foreground mb-2">Mobile Number</label>
                            <div className="flex rounded-[5px] border border-border bg-[#F5F5F5] overflow-hidden focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/15 transition-all mb-5">
                              <div className="flex items-center px-3 border-r border-border bg-white/70 flex-shrink-0">
                                <span className="text-[13px] font-bold text-muted-foreground">+91</span>
                              </div>
                              <input
                                type="tel"
                                placeholder="Enter 10-digit number"
                                maxLength={10}
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                className="flex-1 min-w-0 px-3 py-3 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground/50 outline-none"
                              />
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div key="cid" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.16 }}>
                            <label className="block text-[13px] font-semibold text-foreground mb-2">Client ID</label>
                            <input
                              type="text"
                              placeholder="e.g. SV123456"
                              value={clientId}
                              onChange={(e) => setClientId(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && handleSend()}
                              className="w-full px-3 py-3 bg-[#F5F5F5] border border-border rounded-[5px] text-[14px] text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all mb-5"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        onClick={handleSend}
                        disabled={tab === "mobile" ? mobile.length < 10 : clientId.trim().length < 3}
                        className="w-full bg-burgundy hover:bg-burgundy-deep disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-[5px] transition-colors duration-200 flex items-center justify-center gap-2 text-[14px] shadow-[0_2px_10px_rgba(255,0,0,0.18)]"
                      >
                        Get OTP <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {/* ── Step: OTP ── */}
                  {step === "otp" && (
                    <motion.div
                      key="otp"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.22 }}
                    >
                      <button
                        onClick={handleBack}
                        className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground font-semibold mb-5 transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back
                      </button>

                      <h1 className="text-[22px] font-extrabold text-foreground leading-tight mb-1">Enter OTP</h1>
                      <p className="text-muted-foreground text-sm mb-1">We sent a 6-digit OTP to</p>
                      <p className="text-foreground text-[14px] font-bold mb-7">{displayName}</p>

                      <OtpInput
                        otp={otp}
                        onChange={handleOtpChange}
                        onKeyDown={handleOtpKeyDown}
                        onPaste={handleOtpPaste}
                        refs={otpRefs}
                        error={otpError}
                      />

                      {otpError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center text-[12.5px] text-red-500 font-semibold mt-3"
                        >
                          Incorrect OTP. Please try again.
                        </motion.p>
                      )}

                      <p className="text-center text-[11px] text-muted-foreground/60 mt-3 font-medium">
                        Use <span className="font-bold text-muted-foreground">123456</span> for demo
                      </p>

                      <div className="flex items-center justify-center mt-6">
                        {resendTimer > 0 ? (
                          <p className="text-[13px] text-muted-foreground font-medium">
                            Resend OTP in{" "}
                            <span className="text-foreground font-bold tabular-nums">{resendTimer}s</span>
                          </p>
                        ) : (
                          <button
                            onClick={() => {
                              setResendTimer(30)
                              setOtp(["", "", "", "", "", ""])
                              otpRefs.current[0]?.focus()
                            }}
                            className="flex items-center gap-1.5 text-[13px] text-burgundy font-bold hover:underline underline-offset-2"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Resend OTP
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {step === "input" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-[13px] text-muted-foreground mt-6"
                >
                  Don&apos;t have an account?{" "}
                  <Link href="/signup/register" className="text-burgundy font-bold hover:underline underline-offset-2">
                    Register Now!
                  </Link>
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
