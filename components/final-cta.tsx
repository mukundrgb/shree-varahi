"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Lock, Shield, Building2 } from "lucide-react"

export function FinalCTA() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    otp: ["", "", "", "", "", ""],
  })
  const [otpSent, setOtpSent] = useState(false)

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...formData.otp]
    newOtp[index] = value
    setFormData({ ...formData, otp: newOtp })

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  return (
    <section className="relative bg-cream py-16 lg:py-24 overflow-hidden">
      {/* Gold glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl" />
      </div>

      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-16" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Emotional Close */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              {"Your wealth's next chapter starts "}
              <span className="text-burgundy">here.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Join 60,000+ investors who trust Shree Varahi for their trading and investment needs. 
              Open your account in under 10 minutes. Start with ₹0.
            </p>

            {/* App download buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#"
                className="flex items-center gap-3 bg-foreground text-background px-4 py-2.5 rounded-[5px] hover:bg-foreground/80 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <p className="text-[9px] leading-tight opacity-70 uppercase tracking-wider">Download on the</p>
                  <p className="text-sm font-semibold leading-tight">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 bg-foreground text-background px-4 py-2.5 rounded-[5px] hover:bg-foreground/80 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0" aria-hidden="true">
                  <path d="M3.18 23.76c.35.19.74.24 1.12.14l.1-.06 9.74-9.74-2.76-2.76-8.2 12.42zm14.58-12.9a1.5 1.5 0 0 0 0-2.72L15.6 6.9l-2.93 2.93 2.93 2.93 2.16-1.9zM2.08.26A1.5 1.5 0 0 0 1.5 1.5v21a1.5 1.5 0 0 0 .58 1.24l.1.07 11.74-11.73L2.18.19l-.1.07zM4.3.1l9.74 9.74-2.76 2.76L3.32.2 4.3.1z" />
                </svg>
                <div>
                  <p className="text-[9px] leading-tight opacity-70 uppercase tracking-wider">Get it on</p>
                  <p className="text-sm font-semibold leading-tight">Google Play</p>
                </div>
              </a>
            </div>

            {/* Trust line */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-4">
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                256-bit Encrypted
              </span>
              <span className="w-px h-3 bg-border" />
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                SEBI Registered
              </span>
              <span className="w-px h-3 bg-border" />
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                Est. 1993
              </span>
              <span className="w-px h-3 bg-border" />
              <span>No Spam Calls</span>
            </div>
          </motion.div>

          {/* Right - Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-gold rounded-[5px] p-6 lg:p-8 shadow-lg float"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">
              Open Free Account
            </h3>
            <form className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-[5px] bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Mobile Number</label>
                <div className="flex gap-2">
                  <div className="flex flex-1">
                    <span className="px-4 py-3 bg-secondary rounded-l-[5px] border border-r-0 border-border text-muted-foreground">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-4 py-3 rounded-r-[5px] bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                      placeholder="Enter mobile number"
                    />
                  </div>
                  {!otpSent && formData.mobile.length === 10 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOtpSent(true)}
                      className="border-border text-foreground hover:bg-secondary whitespace-nowrap rounded-[5px]"
                    >
                      Get OTP
                    </Button>
                  )}
                </div>
              </div>

              {otpSent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <label className="text-sm text-muted-foreground mb-1.5 block">Enter OTP</label>
                  <div className="flex gap-2 justify-between">
                    {formData.otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-12 text-center text-lg font-mono rounded-[5px] bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {"Didn't receive OTP? "}
                    <button type="button" className="text-burgundy hover:underline font-medium">
                      Resend
                    </button>
                  </p>
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full bg-burgundy hover:bg-burgundy-deep text-primary-foreground py-6 text-lg rounded-[5px]"
              >
                Open Free Account
              </Button>
            </form>

            {/* Trust badges */}
            <div className="flex justify-center gap-4 mt-6">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3 text-gold" />
                Encrypted
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Shield className="h-3 w-3 text-gold" />
                SEBI Reg.
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Building2 className="h-3 w-3 text-gold" />
                Est. 1993
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
