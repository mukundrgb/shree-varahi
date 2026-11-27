import React from 'react';
import { h2Style, pStyle, BulletItem, CheckItem, FormulaBox } from './DetailsShared';

export default function LumpsumDetails() {
  return (
    <div className="space-y-8">
      <section>
        <h2 style={h2Style}>What is a Lumpsum Investment?</h2>
        <p style={pStyle}>
          A lumpsum investment is a single, bulk amount of money invested all at once, rather than in regular installments (like a SIP). This strategy is often used when an investor receives a large windfall, such as an annual bonus, an inheritance, or proceeds from the sale of an asset, and wishes to invest the entire amount immediately to maximize potential returns.
        </p>
      </section>

      <section>
        <h2 style={h2Style}>How does a Lumpsum Calculator work?</h2>
        <p style={{ ...pStyle, marginBottom: 12 }}>
          A lumpsum calculator helps you determine the future value of a one-time investment based on an expected rate of return over a specified period. It requires three inputs:
        </p>
        <ul className="space-y-2.5">
          <BulletItem label="Total Investment (₹)">The single, one-time amount you are investing today.</BulletItem>
          <BulletItem label="Expected Return Rate (% p.a)">The estimated annual interest rate or growth rate you expect from your investment.</BulletItem>
          <BulletItem label="Time Period (Years)">The number of years you plan to keep the money invested.</BulletItem>
        </ul>
        <p style={{ ...pStyle, marginTop: 12 }}>
          The calculator immediately shows you your initial invested amount, the estimated wealth gained (returns), and the total value at maturity.
        </p>
      </section>

      <section>
        <h2 style={h2Style}>Formula to Calculate Lumpsum Returns</h2>
        <p style={{ ...pStyle, marginBottom: 12 }}>
          The lumpsum calculator uses the standard compound interest formula to determine the future value of your investment:
        </p>
        <FormulaBox
          formula="FV = PV × (1 + r)^n"
          vars={[
            { k: 'FV', v: 'Future Value (Maturity Amount)' },
            { k: 'PV', v: 'Present Value (Your Lumpsum Investment)' },
            { k: 'r', v: 'Expected Return Rate (Annual Rate / 100)' },
            { k: 'n', v: 'Number of years the money is invested' },
          ]}
        />
      </section>

      <section>
        <h2 style={h2Style}>Benefits of Lumpsum Investing</h2>
        <ul className="space-y-2.5">
          <CheckItem label="Higher Compounding Potential">Since the entire amount is invested from day one, the power of compounding has a longer time to work on the entire principal, often resulting in higher returns compared to staggering investments over time.</CheckItem>
          <CheckItem label="Convenience">It is a one-time process. You don't have to worry about maintaining a monthly balance in your bank account for auto-debits as you do with a SIP.</CheckItem>
          <CheckItem label="Ideal for Windfalls">It is the perfect strategy for investing sudden, large cash inflows immediately rather than leaving them idle in a low-interest savings account.</CheckItem>
        </ul>
      </section>
    </div>
  );
}
