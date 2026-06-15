"use client"

import { motion } from "framer-motion"

export function AppPromoSection() {
  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Outer Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-7xl mx-auto rounded-[24px] overflow-hidden bg-white border border-border shadow-sm p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16"
      >
        {/* Dynamic line grid background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, var(--color-gold) 1px, transparent 1px), linear-gradient(to bottom, var(--color-gold) 1px, transparent 1px)', 
            backgroundSize: '28px 28px' 
          }} 
        />

        {/* Soft burgundy radial glow */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, rgba(139,13,25,0.2) 0%, transparent 75%)",
            filter: "blur(40px)"
          }}
        />

        {/* Left: Content panel */}
        <div className="relative z-10 flex-1 space-y-6 text-center lg:text-left max-w-2xl">
          {/* Eyebrow Tag */}
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-xs font-bold text-gold-deep tracking-widest uppercase">
            ✦ MOBILE TRADING ✦
          </span>

          {/* Heading */}
          <h2 className="text-2xl sm:text-5xl lg:text-5xl font-black text-foreground leading-tight">
            Trade & Invest on the <br className="hidden sm:inline" />
            <span className="text-burgundy">Shree Varahi App.</span>
          </h2>

          {/* Highlights */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 text-xs sm:text-sm font-semibold text-muted-foreground">
            <span>4.5★ App Rating</span>
            <span className="text-gold-deep">◆</span>
            <span>60,000+ Active Investors</span>
            <span className="text-gold-deep">◆</span>
            <span>31+ Years of Trust</span>
          </div>

          {/* Store Download Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            {/* Apple App Store */}
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()} 
              className="bg-neutral-900 border border-neutral-850 text-white hover:bg-neutral-800 rounded-[10px] px-5 py-2.5 flex items-center gap-3 transition-all cursor-pointer shadow-xs"
            >
              {/* Apple SVG Icon */}
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
              </svg>
              <div className="text-left leading-none">
                <span className="text-[9px] text-white/50 block font-medium uppercase tracking-wider">Download on the</span>
                <span className="text-sm font-bold block mt-0.5">App Store</span>
              </div>
            </a>

            {/* Google Play Store */}
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()} 
              className="bg-neutral-900 border border-neutral-855 text-white hover:bg-neutral-800 rounded-[10px] px-5 py-2.5 flex items-center gap-3 transition-all cursor-pointer shadow-xs"
            >
              {/* Google Play SVG Icon */}
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path d="M5 3.5c-.2 0-.4.1-.5.3l9.8 9.8 3.2-3.2L5.4 3.8c-.1-.2-.3-.3-.4-.3zM3.8 4.7c-.2.2-.3.5-.3.8v13c0 .3.1.6.3.8l7.2-7.2L3.8 4.7zm15 4.4L15.6 11l3.2 3.2 3.1-1.8c.4-.2.6-.6.6-1s-.2-.8-.6-1l-3.1-1.8zM4.3 19.9c.1.2.3.3.5.3.2 0 .3-.1.4-.2l12.1-7-3.2-3.2-9.8 9.8z" />
              </svg>
              <div className="text-left leading-none">
                <span className="text-[9px] text-white/50 block font-medium uppercase tracking-wider">Get it on</span>
                <span className="text-sm font-bold block mt-0.5">Google Play</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right: Smartphone Mockup */}
        <div className="relative flex-shrink-0 flex items-center justify-center lg:pr-6 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative w-[260px] sm:w-[300px] lg:w-[330px] select-none"
          >
            <img 
              src="https://cdni.iconscout.com/illustration/premium/thumb/finance-help-via-mutual-fund-business-illustration-svg-download-png-3667389.png"
              alt="Shree Varahi Mobile App"
              className="w-full h-auto object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
              draggable="false"
            />
          </motion.div>

          {/* Glowing background halo around phone */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full pointer-events-none opacity-[0.08] z-0"
            style={{
              background: "radial-gradient(circle, rgba(139,13,25,0.4) 0%, transparent 70%)",
              filter: "blur(40px)"
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
