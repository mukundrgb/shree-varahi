import React from 'react';
import { h2Style, pStyle, BulletItem, CheckItem, FormulaBox } from './DetailsShared';

export default function PPFDetails() {
  return (
    <div className="space-y-8">
      <section>
        <h2 style={h2Style}>What is Public Provident Fund (PPF)?</h2>
        <p style={pStyle}>
          The Public Provident Fund (PPF) is a popular long-term savings scheme in India backed by the Government of India. It offers a safe investment avenue with attractive tax benefits. Designed to encourage small savings, PPF helps individuals build a retirement corpus while providing guaranteed returns. The scheme has a mandatory lock-in period of 15 years, which can be extended in blocks of 5 years.
        </p>
      </section>

      <section>
        <h2 style={h2Style}>How does a PPF Calculator work?</h2>
        <p style={{ ...pStyle, marginBottom: 12 }}>
          A PPF calculator helps you estimate the total corpus you will accumulate at the end of your investment tenure. It asks for two primary inputs:
        </p>
        <ul className="space-y-2.5">
          <BulletItem label="Yearly Investment (₹)">The amount you plan to deposit into your PPF account each financial year. The minimum investment is ₹500, and the maximum is ₹1,50,000 per year.</BulletItem>
          <BulletItem label="Time Period (Years)">The duration of your investment. While the base tenure is 15 years, you can input up to 50 years to simulate extensions.</BulletItem>
        </ul>
        <p style={{ ...pStyle, marginTop: 12 }}>
          The interest rate is predetermined by the government and is revised quarterly. The calculator typically uses the current prevailing rate (e.g., 7.1% p.a.) to project your future wealth.
        </p>
      </section>

      <section>
        <h2 style={h2Style}>Formula to Calculate PPF Returns</h2>
        <p style={{ ...pStyle, marginBottom: 12 }}>
          PPF interest is calculated monthly on the lowest balance between the 5th and the last day of the month, but it is compounded annually. The calculator uses the future value of an annuity formula:
        </p>
        <FormulaBox
          formula="F = P × [((1 + i)^n - 1) / i]"
          vars={[
            { k: 'F', v: 'Maturity Amount' },
            { k: 'P', v: 'Annual installments' },
            { k: 'i', v: 'Expected rate of return (in percentage)' },
            { k: 'n', v: 'Total number of years' },
          ]}
        />
      </section>

      <section>
        <h2 style={h2Style}>Benefits of PPF</h2>
        <ul className="space-y-2.5">
          <CheckItem label="EEE Tax Benefit">PPF enjoys the "Exempt-Exempt-Exempt" tax status. The investment amount is deductible under Section 80C, the interest earned is tax-free, and the maturity amount is entirely exempt from tax.</CheckItem>
          <CheckItem label="Risk-Free Returns">Since PPF is a government-backed scheme, the capital invested and the interest earned are entirely secure.</CheckItem>
          <CheckItem label="Compounding Benefit">Over a 15-year or longer tenure, the power of annual compounding significantly boosts your final corpus, making it an excellent tool for retirement planning.</CheckItem>
          <CheckItem label="Loan Facility">You can avail of a loan against your PPF balance between the 3rd and 6th financial year of opening the account.</CheckItem>
        </ul>
      </section>
    </div>
  );
}
