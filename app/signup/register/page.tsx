"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  TrendingUp, ShieldCheck, Globe2,
  ChevronRight, ChevronLeft,
  Award, Users, MessageSquare,
  Phone, Mail, Lock, User,
  CheckCircle2, Loader2,
  ArrowRight, ExternalLink,
} from "lucide-react"

// ─── Slide data ─────────────────────────────────────────────────────────────

const SLIDES = [
  { Icon: TrendingUp,  title: "Start Your Wealth Journey",  text: "Open your free account in minutes and start investing in stocks, F&O, IPOs and more." },
  { Icon: ShieldCheck, title: "Safe & Regulated",            text: "SEBI-registered broker with bank-grade security. Your investments are always protected." },
  { Icon: Globe2,      title: "3.25 Crore+ Investors",       text: "Join India's growing community of smart investors who trust Shree Varahi every day."  },
]

// ─── Step config ─────────────────────────────────────────────────────────────

type Step = "mobile" | "mobile-otp" | "details" | "email-otp" | "kyc"

const STEP_ORDER: Step[] = ["mobile", "mobile-otp", "details", "email-otp", "kyc"]

const STEP_LABELS: Record<Step, string> = {
  "mobile":     "Mobile",
  "mobile-otp": "Verify",
  "details":    "Profile",
  "email-otp":  "Email",
  "kyc":        "eKYC",
}

// ─── eKYC steps ──────────────────────────────────────────────────────────────

const KYC_ITEMS = [
  { icon: "🪪", label: "PAN Verification",     desc: "Validating your PAN number"          },
  { icon: "🔐", label: "Aadhaar Verification",  desc: "Linking Aadhaar for KYC"             },
  { icon: "📸", label: "Selfie Capture",        desc: "Biometric identity confirmation"     },
  { icon: "🏦", label: "Bank Account",          desc: "Verifying your bank account details" },
]

// ─── OTP box grid ────────────────────────────────────────────────────────────

function OtpBoxes({
  value,
  onChange,
  length = 6,
}: {
  value: string[]
  onChange: (v: string[]) => void
  length?: number
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ""}
          onChange={(e) => {
            const digit = e.target.value.replace(/\D/g, "").slice(-1)
            const next = [...value]
            next[i] = digit
            onChange(next)
            if (digit && i < length - 1) inputRefs.current[i + 1]?.focus()
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !value[i] && i > 0) {
              inputRefs.current[i - 1]?.focus()
            }
          }}
          onPaste={(e) => {
            e.preventDefault()
            const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
            const next = [...value]
            digits.split("").forEach((d, j) => { next[j] = d })
            onChange(next)
            inputRefs.current[Math.min(digits.length, length - 1)]?.focus()
          }}
          className={`w-11 h-12 text-center text-[18px] font-bold rounded-[5px] border outline-none transition-all
            focus:border-burgundy focus:ring-2 focus:ring-burgundy/15 focus:bg-white
            ${value[i]
              ? "border-burgundy bg-burgundy/[0.05] text-burgundy"
              : "border-border bg-[#F5F5F5] text-foreground"
            }`}
        />
      ))}
    </div>
  )
}

// ─── Step progress bar ───────────────────────────────────────────────────────

function StepBar({ current }: { current: Step }) {
  const idx = STEP_ORDER.indexOf(current)
  return (
    <div className="flex items-start mb-7">
      {STEP_ORDER.map((s, i) => {
        const done   = i < idx
        const active = i === idx
        return (
          <div key={s} className="flex items-start flex-1">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                  done   ? "bg-emerald-500 text-white" :
                  active ? "bg-burgundy text-white" :
                           "bg-secondary text-muted-foreground/40"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className={`text-[9px] font-bold whitespace-nowrap leading-none transition-all ${
                  active ? "text-burgundy" : done ? "text-emerald-600" : "text-muted-foreground/40"
                }`}
              >
                {STEP_LABELS[s]}
              </span>
            </div>
            {i < STEP_ORDER.length - 1 && (
              <div
                className={`flex-1 h-px mt-3 mx-1 transition-all ${done ? "bg-emerald-400" : "bg-border"}`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Disclaimer ─────────────────────────────────────────────────────────────

function Disclaimer() {
  return (
    <div className="bg-[#FAF8F5] border border-[#E5E5E5] rounded-[5px] px-3.5 py-3 mb-5">
      <p className="text-[11.5px] text-muted-foreground leading-relaxed">
        By clicking{" "}
        <span className="font-bold text-foreground">&apos;SUBMIT&apos;</span>, I confirm that
        I have read, understood and agreed to the{" "}
        <button className="text-burgundy font-semibold hover:underline">AOL TnC</button>
        {" "}and{" "}
        <button className="text-burgundy font-semibold hover:underline">RA TnC</button>
        {" "}
        <button className="text-burgundy font-semibold hover:underline">...Read More</button>
      </p>
    </div>
  )
}

// ─── Animation variants ──────────────────────────────────────────────────────

const stepVariants = {
  enter:  (d: number) => ({ opacity: 0, x: d * 40 }),
  center: { opacity: 1, x: 0 },
  exit:   (d: number) => ({ opacity: 0, x: -d * 40 }),
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const [slide, setSlide] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4500)
    return () => clearInterval(t)
  }, [])

  // Form state
  const [step, setStep]           = useState<Step>("mobile")
  const [direction, setDirection] = useState<1 | -1>(1)
  const [mobile, setMobile]       = useState("")
  const [introCode, setIntroCode] = useState("")
  const [mobileOtp, setMobileOtp] = useState(Array(6).fill(""))
  const [name, setName]           = useState("")
  const [email, setEmail]         = useState("")
  const [emailOtp, setEmailOtp]   = useState(Array(6).fill(""))
  const [otpTimer, setOtpTimer]   = useState(30)
  const [kycProgress, setKycProgress] = useState(-1)
  const [countdown, setCountdown] = useState(5)

  const goNext = (next: Step) => { setDirection(1);  setStep(next) }
  const goBack = (prev: Step) => { setDirection(-1); setStep(prev) }

  // OTP countdown – fires when step changes to an OTP step
  useEffect(() => {
    if (step !== "mobile-otp" && step !== "email-otp") return
    setOtpTimer(30)
    const id = setInterval(() => {
      setOtpTimer((t) => { if (t <= 1) { clearInterval(id); return 0 } return t - 1 })
    }, 1000)
    return () => clearInterval(id)
  }, [step])

  // eKYC item progression
  useEffect(() => {
    if (step !== "kyc") return
    setKycProgress(-1)
    let cur = -1
    const id = setInterval(() => {
      cur++
      setKycProgress(cur)
      if (cur >= KYC_ITEMS.length - 1) clearInterval(id)
    }, 1300)
    return () => clearInterval(id)
  }, [step])

  // Redirect countdown after all eKYC steps done
  useEffect(() => {
    if (kycProgress < KYC_ITEMS.length - 1) return
    setCountdown(5)
    const id = setInterval(() => {
      setCountdown((c) => { if (c <= 1) { clearInterval(id); return 0 } return c - 1 })
    }, 1000)
    return () => clearInterval(id)
  }, [kycProgress])

  const allKycDone = kycProgress >= KYC_ITEMS.length - 1

  const maskedMobile = mobile
    ? `+91 ${mobile.slice(0, 2)}XXXXX${mobile.slice(-3)}`
    : "+91 XXXXXXXXXX"
  const maskedEmail = email
    ? email.replace(/(.{2}).+(@.+)/, "$1•••$2")
    : "your@email.com"

  return (
    <div className="flex h-screen w-screen overflow-hidden">

      {/* ── Left panel ──────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col bg-cream overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(255,0,0,0.06)_0%,transparent_65%)]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,178,124,0.1)_0%,transparent_65%)]" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        <div className="relative z-10 p-10 flex items-center gap-2.5">
          <Image src="/favicon.jpg" alt="Shree Varahi" width={40} height={40} className="rounded-[5px] object-contain" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground leading-tight">Shree Varahi</span>
            <span className="text-[10px] text-gold-deep font-medium">by Lakshmishree</span>
          </div>
        </div>

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
                <div className="mx-auto mb-8 w-20 h-20 relative">
                  <div className="absolute inset-0 rounded-2xl bg-white border border-border shadow-[0_2px_16px_rgba(0,0,0,0.06)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {(() => { const { Icon } = SLIDES[slide]; return <Icon className="w-9 h-9 text-[#8B0D19]" strokeWidth={1.5} /> })()}
                  </div>
                  <div className="absolute -top-px -left-px  w-3 h-3 border-t-2 border-l-2 border-gold rounded-tl-2xl" />
                  <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-gold rounded-tr-2xl" />
                  <div className="absolute -bottom-px -left-px  w-3 h-3 border-b-2 border-l-2 border-gold rounded-bl-2xl" />
                  <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-gold rounded-br-2xl" />
                </div>
                <h2 className="text-[24px] font-extrabold text-foreground mb-3 leading-snug tracking-tight">
                  {SLIDES[slide].title}
                </h2>
                <p className="text-muted-foreground text-[14px] leading-relaxed font-medium max-w-[280px] mx-auto">
                  {SLIDES[slide].text}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center justify-center gap-2 mt-10">
              {SLIDES.map((_, i) => (
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

        <div className="relative z-10 p-8 grid grid-cols-2 gap-3">
          {[
            { Icon: Award, label: "Certified By", value: "ISO/IEC 27001:2022" },
            { Icon: Users, label: "Trusted By",   value: "3.25 Cr+ Users" },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="bg-white border border-border rounded-[5px] p-4 flex items-center gap-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <div className="w-8 h-8 rounded-full bg-gold/[0.12] border border-gold/30 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-gold-deep" />
              </div>
              <div>
                <p className="text-muted-foreground text-[9px] font-bold uppercase tracking-widest mb-0.5">{label}</p>
                <p className="text-foreground text-[11px] font-bold leading-tight">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel ─────────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-cream px-5 py-10 overflow-y-auto">
        <div className="w-full max-w-[400px]">

          {/* Mobile-only logo */}
          <div className="flex lg:hidden items-center justify-center gap-2.5 mb-7">
            <Image src="/favicon.jpg" alt="Shree Varahi" width={36} height={36} className="rounded-[5px]" />
            <div>
              <div className="text-base font-bold">Shree Varahi</div>
              <div className="text-[9px] text-gold-deep font-medium">by Lakshmishree</div>
            </div>
          </div>

          {/* Card */}
          <div
            className="bg-white rounded-[5px] border border-border p-7"
            style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.06)" }}
          >
            <StepBar current={step} />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
              >

                {/* ══ Step 1: Mobile number ══════════════════════════════ */}
                {step === "mobile" && (
                  <div>
                    <h1 className="text-[21px] font-extrabold text-foreground mb-0.5">Create Account</h1>
                    <p className="text-sm text-muted-foreground mb-6">Join 3.25 Cr+ investors on Shree Varahi</p>

                    {/* Mobile input */}
                    <div className="mb-4">
                      <label className="block text-[11px] font-bold text-foreground mb-1.5 uppercase tracking-wider">
                        Mobile Number
                      </label>
                      <div className="flex rounded-[5px] border border-border bg-[#F5F5F5] overflow-hidden focus-within:border-burgundy focus-within:ring-2 focus-within:ring-burgundy/15 transition-all">
                        <div className="flex items-center px-3 border-r border-border bg-white/80 shrink-0 gap-1.5">
                          <span className="text-base leading-none">🇮🇳</span>
                          <span className="text-[13px] font-bold text-foreground">+91</span>
                        </div>
                        <input
                          type="tel"
                          placeholder="10-digit mobile number"
                          maxLength={10}
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          className="flex-1 min-w-0 px-3 py-3 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground/50 outline-none"
                        />
                        {mobile.length === 10 && (
                          <span className="flex items-center pr-3 text-emerald-500">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Introducer */}
                    <div className="mb-5">
                      <label className="block text-[11px] font-bold text-foreground mb-1.5 uppercase tracking-wider">
                        Introducer Code{" "}
                        <span className="normal-case text-muted-foreground font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter referral or introducer code"
                        value={introCode}
                        onChange={(e) => setIntroCode(e.target.value)}
                        className="w-full px-3 py-3 bg-[#F5F5F5] border border-border rounded-[5px] text-[14px] text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/15 transition-all"
                      />
                    </div>

                    {/* OTP note */}
                    <div className="flex items-start gap-2.5 bg-[#FAF8F5] border border-[#E5E5E5] rounded-[5px] px-3 py-2.5 mb-5">
                      <MessageSquare className="w-3.5 h-3.5 text-gold-deep mt-0.5 shrink-0" />
                      <p className="text-[12px] text-muted-foreground font-medium">
                        We will send a one-time password to your mobile number
                      </p>
                    </div>

                    <button
                      onClick={() => goNext("mobile-otp")}
                      disabled={mobile.length !== 10}
                      className="w-full bg-burgundy hover:bg-burgundy-deep disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-[5px] transition-colors flex items-center justify-center gap-2 text-[14px] shadow-[0_2px_10px_rgba(255,0,0,0.18)]"
                    >
                      Send OTP <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* ══ Step 2: Mobile OTP ════════════════════════════════ */}
                {step === "mobile-otp" && (
                  <div>
                    <button
                      onClick={() => goBack("mobile")}
                      className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground mb-4 transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Back
                    </button>

                    <h1 className="text-[21px] font-extrabold text-foreground mb-1">Verify Mobile</h1>
                    <div className="flex items-center gap-2 mb-6">
                      <p className="text-sm text-muted-foreground">
                        OTP sent to <strong className="text-foreground">{maskedMobile}</strong>
                      </p>
                      <button
                        onClick={() => goBack("mobile")}
                        className="text-[11px] text-burgundy font-semibold hover:underline shrink-0"
                      >
                        Change
                      </button>
                    </div>

                    <div className="mb-5">
                      <OtpBoxes value={mobileOtp} onChange={setMobileOtp} />
                    </div>

                    {/* Resend timer */}
                    <div className="flex items-center justify-center mb-6 text-sm">
                      {otpTimer > 0 ? (
                        <span className="text-muted-foreground text-[13px]">
                          Resend OTP in{" "}
                          <strong className="text-foreground tabular-nums">{otpTimer}s</strong>
                        </span>
                      ) : (
                        <button
                          onClick={() => setOtpTimer(30)}
                          className="text-burgundy font-bold text-[13px] hover:underline"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>

                    <Disclaimer />

                    <button
                      onClick={() => goNext("details")}
                      disabled={mobileOtp.join("").length < 6}
                      className="w-full bg-burgundy hover:bg-burgundy-deep disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-3 rounded-[5px] transition-colors text-[15px] tracking-wider shadow-[0_2px_10px_rgba(255,0,0,0.18)]"
                    >
                      SUBMIT
                    </button>
                  </div>
                )}

                {/* ══ Step 3: Personal Details ══════════════════════════ */}
                {step === "details" && (
                  <div>
                    <button
                      onClick={() => goBack("mobile-otp")}
                      className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground mb-4 transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Back
                    </button>

                    <h1 className="text-[21px] font-extrabold text-foreground mb-0.5">Your Details</h1>
                    <p className="text-sm text-muted-foreground mb-5">Almost there — just a few more details</p>

                    {/* Full name */}
                    <div className="mb-4">
                      <label className="block text-[11px] font-bold text-foreground mb-1.5 uppercase tracking-wider">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <input
                          type="text"
                          placeholder="As per PAN card"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-9 pr-3 py-3 bg-[#F5F5F5] border border-border rounded-[5px] text-[14px] text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/15 transition-all"
                        />
                      </div>
                    </div>

                    {/* Mobile prefilled */}
                    <div className="mb-5">
                      <label className="block text-[11px] font-bold text-foreground mb-1.5 uppercase tracking-wider">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <input
                          type="tel"
                          value={`+91 ${mobile}`}
                          readOnly
                          className="w-full pl-9 pr-10 py-3 bg-secondary/50 border border-border rounded-[5px] text-[14px] text-muted-foreground cursor-not-allowed outline-none"
                        />
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40 pointer-events-none" />
                      </div>
                      <p className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified via OTP
                      </p>
                    </div>

                    {/* Email section */}
                    <div className="mb-4">
                      <label className="block text-[11px] font-bold text-foreground mb-1.5 uppercase tracking-wider">
                        Email ID
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <input
                          type="email"
                          placeholder="yourname@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-3 bg-[#F5F5F5] border border-border rounded-[5px] text-[14px] text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/15 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => goNext("email-otp")}
                      disabled={!name.trim() || !email.includes("@")}
                      className="w-full bg-burgundy hover:bg-burgundy-deep disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-[5px] transition-colors flex items-center justify-center gap-2 text-[14px] shadow-[0_2px_10px_rgba(255,0,0,0.18)] mb-4"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Social divider */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-[11px] font-semibold text-muted-foreground whitespace-nowrap">
                        or sign up with
                      </span>
                      <div className="flex-1 h-px bg-border" />
                    </div>

                    {/* Google */}
                    <button
                      onClick={() => goNext("kyc")}
                      className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-[5px] border border-border bg-white hover:bg-secondary/40 transition-colors font-semibold text-[13.5px] text-foreground shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
                    >
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.5 2.5 30.1 0 24 0 14.6 0 6.6 5.5 2.6 13.6l7.8 6.1C12.3 13.5 17.7 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17z" />
                        <path fill="#FBBC05" d="M10.4 28.3A14.5 14.5 0 0 1 9.5 24c0-1.5.3-3 .9-4.3L2.6 13.6A24 24 0 0 0 0 24c0 3.8.9 7.4 2.6 10.6l7.8-6.3z" />
                        <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.3 0-11.7-4.2-13.6-9.9l-7.8 6.1C6.6 42.5 14.6 48 24 48z" />
                      </svg>
                      Continue with Google
                    </button>
                  </div>
                )}

                {/* ══ Step 4: Email OTP ════════════════════════════════ */}
                {step === "email-otp" && (
                  <div>
                    <button
                      onClick={() => goBack("details")}
                      className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground mb-4 transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Back
                    </button>

                    <h1 className="text-[21px] font-extrabold text-foreground mb-1">Verify Email</h1>
                    <div className="flex items-center gap-2 mb-6">
                      <p className="text-sm text-muted-foreground">
                        OTP sent to <strong className="text-foreground">{maskedEmail}</strong>
                      </p>
                      <button
                        onClick={() => goBack("details")}
                        className="text-[11px] text-burgundy font-semibold hover:underline shrink-0"
                      >
                        Change
                      </button>
                    </div>

                    <div className="mb-5">
                      <OtpBoxes value={emailOtp} onChange={setEmailOtp} />
                    </div>

                    <div className="flex items-center justify-center mb-6 text-sm">
                      {otpTimer > 0 ? (
                        <span className="text-muted-foreground text-[13px]">
                          Resend in{" "}
                          <strong className="text-foreground tabular-nums">{otpTimer}s</strong>
                        </span>
                      ) : (
                        <button
                          onClick={() => setOtpTimer(30)}
                          className="text-burgundy font-bold text-[13px] hover:underline"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>

                    <Disclaimer />

                    <button
                      onClick={() => goNext("kyc")}
                      disabled={emailOtp.join("").length < 6}
                      className="w-full bg-burgundy hover:bg-burgundy-deep disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-3 rounded-[5px] transition-colors text-[15px] tracking-wider shadow-[0_2px_10px_rgba(255,0,0,0.18)]"
                    >
                      SUBMIT
                    </button>
                  </div>
                )}

                {/* ══ Step 5: eKYC Loading ══════════════════════════════ */}
                {step === "kyc" && (
                  <div>
                    <h1 className="text-[21px] font-extrabold text-foreground mb-0.5">
                      Identity Verification
                    </h1>
                    <p className="text-sm text-muted-foreground mb-6">
                      Preparing your eKYC — please don&apos;t close this tab
                    </p>

                    {/* KYC progress items */}
                    <div className="space-y-2.5 mb-6">
                      {KYC_ITEMS.map((k, i) => {
                        const done    = i < kycProgress
                        const active  = i === kycProgress && !allKycDone
                        const pending = !done && !active

                        return (
                          <motion.div
                            key={k.label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className={`flex items-center gap-3 p-3.5 rounded-[7px] border transition-all duration-500 ${
                              done    ? "bg-emerald-50  border-emerald-200" :
                              active  ? "bg-burgundy/[0.04] border-burgundy/25" :
                                        "bg-secondary/30 border-border"
                            }`}
                          >
                            {/* Status circle */}
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                                done    ? "bg-emerald-500" :
                                active  ? "bg-burgundy" :
                                          "bg-background border border-border"
                              }`}
                            >
                              {done ? (
                                <CheckCircle2 className="w-4.5 h-4.5 text-white" />
                              ) : active ? (
                                <Loader2 className="w-4 h-4 text-white animate-spin" />
                              ) : (
                                <span className="text-sm">{k.icon}</span>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className={`text-[13px] font-bold truncate transition-colors ${
                                done   ? "text-emerald-700" :
                                active ? "text-burgundy" :
                                         "text-muted-foreground/50"
                              }`}>
                                {k.label}
                              </p>
                              <p className="text-[11px] text-muted-foreground">{k.desc}</p>
                            </div>

                            {done && (
                              <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-[3px] shrink-0 uppercase tracking-wider">
                                Done
                              </span>
                            )}
                            {active && (
                              <span className="text-[9px] font-black text-burgundy bg-burgundy/10 border border-burgundy/20 px-2 py-0.5 rounded-[3px] shrink-0 uppercase tracking-wider animate-pulse">
                                In Progress
                              </span>
                            )}
                          </motion.div>
                        )
                      })}
                    </div>

                    {/* All done → redirect UI */}
                    <AnimatePresence>
                      {allKycDone && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="text-center"
                        >
                          <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center mx-auto mb-2.5">
                            <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                          </div>
                          <p className="text-sm font-bold text-foreground mb-0.5">
                            Verification Ready
                          </p>
                          <p className="text-xs text-muted-foreground mb-4">
                            Redirecting to eKYC portal
                            {countdown > 0 ? ` in ${countdown}s…` : " now"}
                          </p>

                          {/* Countdown bar */}
                          <div className="w-full h-1 bg-secondary rounded-full overflow-hidden mb-5">
                            <motion.div
                              className="h-full bg-burgundy rounded-full"
                              initial={{ width: "0%" }}
                              animate={{ width: `${((5 - countdown) / 5) * 100}%` }}
                              transition={{ duration: 0.95, ease: "linear" }}
                            />
                          </div>

                          {/* eKYC steps teaser */}
                          <div className="grid grid-cols-4 gap-2 mb-5">
                            {[
                              { icon: "🪪", label: "PAN"     },
                              { icon: "🔐", label: "Aadhaar" },
                              { icon: "📸", label: "Selfie"  },
                              { icon: "🏦", label: "Bank"    },
                            ].map((item) => (
                              <div
                                key={item.label}
                                className="flex flex-col items-center gap-1 p-2 rounded-[5px] bg-secondary/40 border border-border"
                              >
                                <span className="text-base">{item.icon}</span>
                                <span className="text-[9px] font-semibold text-muted-foreground">{item.label}</span>
                              </div>
                            ))}
                          </div>

                          <button className="w-full bg-burgundy hover:bg-burgundy-deep text-white font-bold py-3 rounded-[5px] transition-colors flex items-center justify-center gap-2 text-[14px] shadow-[0_2px_10px_rgba(255,0,0,0.18)]">
                            Proceed to eKYC Portal
                            <ExternalLink className="w-4 h-4" />
                          </button>

                          <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
                            You will complete Aadhaar, PAN, Selfie &amp; Bank verification on a
                            secure eKYC portal. All data is encrypted end-to-end.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Still processing message */}
                    {!allKycDone && (
                      <div className="flex items-center justify-center gap-2 text-[12px] text-muted-foreground">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-burgundy" />
                        Setting up your verification environment…
                      </div>
                    )}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer: login link */}
          {step !== "kyc" && (
            <p className="text-center text-[13px] text-muted-foreground mt-5">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-burgundy font-bold hover:underline underline-offset-2"
              >
                Login
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
