import React from 'react';

const h2Style = { fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 };
const pStyle = { color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: 14 };

export default function SIPDetails() {
  return (
    <div className="space-y-8">
      <section>
        <h2 style={h2Style}>What is a SIP?</h2>
        <p style={pStyle}>
          A Systematic Investment Plan (SIP) is a disciplined way of investing in mutual funds. It allows you to invest a fixed amount regularly (e.g., monthly, quarterly) in a mutual fund scheme of your choice. SIPs instil financial discipline and help you build wealth over the long term through the power of compounding and rupee-cost averaging.
        </p>
      </section>

      <section>
        <h2 style={h2Style}>How does a SIP Calculator work?</h2>
        <p style={{ ...pStyle, marginBottom: 12 }}>
          A SIP calculator is a simple tool that helps you estimate the returns on your SIP investments over a specific period. It requires three key inputs:
        </p>
        <ul className="space-y-2.5">
          {[
            { label: 'Monthly Investment (₹)', desc: 'The amount you plan to invest every month.' },
            { label: 'Expected Return Rate (% p.a)', desc: 'The annual rate of return you expect from your investment. Note that mutual fund returns are subject to market risks and are not guaranteed.' },
            { label: 'Time Period (Years)', desc: 'The duration for which you plan to continue your SIP.' },
          ].map((item, i) => (
            <li key={i} className="flex gap-3" style={{ fontSize: 14 }}>
              <span style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }}>▸</span>
              <span style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{item.label}:</strong> {item.desc}
              </span>
            </li>
          ))}
        </ul>
        <p style={{ ...pStyle, marginTop: 12 }}>
          Based on these inputs, the calculator computes the total amount invested, the estimated returns, and the final maturity value of your investment.
        </p>
      </section>

      <section>
        <h2 style={h2Style}>Formula to Calculate SIP Returns</h2>
        <p style={{ ...pStyle, marginBottom: 12 }}>
          The SIP calculator uses the future value formula for an annuity due. The mathematical formula is:
        </p>
        <div className="font-mono text-center overflow-x-auto text-sm rounded-xl p-4"
          style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)', color: 'var(--accent-bright)', letterSpacing: '0.02em' }}>
          FV = P × [((1 + i)^n - 1) / i] × (1 + i)
        </div>
        <div className="mt-4 space-y-1.5" style={{ fontSize: 13 }}>
          <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Where:</p>
          <ul className="space-y-1.5 ml-2">
            {[
              { k: 'FV', v: 'Future Value or the estimated return amount.' },
              { k: 'P', v: 'Monthly SIP installment amount.' },
              { k: 'i', v: 'Monthly expected rate of return (Annual Rate / 12 / 100).' },
              { k: 'n', v: 'Total number of SIP installments (Years × 12).' },
            ].map((item, i) => (
              <li key={i} className="flex gap-2" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0 }}>·</span>
                <span><strong style={{ color: 'var(--text-primary)' }}>{item.k}</strong> = {item.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 style={h2Style}>Benefits of SIP</h2>
        <ul className="space-y-2.5">
          {[
            { k: 'Rupee-Cost Averaging', v: 'Since you invest a fixed amount regularly, you buy more units when the market is low and fewer units when the market is high, averaging out the cost per unit over time.' },
            { k: 'Power of Compounding', v: 'Returns earned on your investments start generating their own returns. The earlier you start, the more pronounced this effect becomes.' },
            { k: 'Flexibility', v: 'You can start a SIP with an amount as low as ₹500 and can step-up, pause, or stop it anytime.' },
            { k: 'Disciplined Saving', v: 'Automating your monthly investments ensures you save before you spend.' },
          ].map((item, i) => (
            <li key={i} className="flex gap-3" style={{ fontSize: 14 }}>
              <span style={{ color: 'var(--positive)', marginTop: 2, flexShrink: 0 }}>✓</span>
              <span style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{item.k}:</strong> {item.v}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
