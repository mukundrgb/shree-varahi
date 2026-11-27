import React from 'react';
import { h2Style, pStyle, BulletItem, CheckItem, FormulaBox } from './DetailsShared';

export default function FDDetails() {
  return (
    <div className="space-y-8">
      <section>
        <h2 style={h2Style}>What is a Fixed Deposit (FD)?</h2>
        <p style={pStyle}>
          A Fixed Deposit (FD) is a financial instrument provided by banks and NBFCs which provides investors a higher rate of interest than a regular savings account, until the given maturity date. FDs are considered one of the safest investment options as they offer guaranteed returns at a fixed interest rate, unaffected by market fluctuations.
        </p>
      </section>

      <section>
        <h2 style={h2Style}>How does an FD Calculator work?</h2>
        <p style={{ ...pStyle, marginBottom: 12 }}>
          An FD calculator helps you find out how much interest your investment will earn and the total maturity amount at the end of the term. You need to provide:
        </p>
        <ul className="space-y-2.5">
          <BulletItem label="Total Investment (₹)">The principal amount you deposit in the FD account.</BulletItem>
          <BulletItem label="Interest Rate (% p.a)">The annual rate of interest offered by the bank for your chosen tenure.</BulletItem>
          <BulletItem label="Time Period (Years)">The lock-in duration of your deposit.</BulletItem>
        </ul>
        <p style={{ ...pStyle, marginTop: 12 }}>
          The calculator then instantly displays the total interest you will earn and the total maturity amount (Principal + Interest).
        </p>
      </section>

      <section>
        <h2 style={h2Style}>Formula to Calculate FD Returns</h2>
        <p style={{ ...pStyle, marginBottom: 12 }}>
          Banks generally calculate FD interest using the compound interest formula, typically compounded quarterly:
        </p>
        <FormulaBox
          formula="A = P × (1 + r/n)^(n×t)"
          vars={[
            { k: 'A', v: 'Maturity Amount' },
            { k: 'P', v: 'Principal amount invested' },
            { k: 'r', v: 'Annual interest rate (decimals, e.g. 6% = 0.06)' },
            { k: 'n', v: 'Number of times interest is compounded per year (usually 4 for quarterly)' },
            { k: 't', v: 'Tenure of the deposit in years' },
          ]}
        />
      </section>

      <section>
        <h2 style={h2Style}>Benefits of Fixed Deposits</h2>
        <ul className="space-y-2.5">
          <CheckItem label="Guaranteed Returns">Unlike market-linked investments, FD returns are guaranteed and locked in at the time of opening the account.</CheckItem>
          <CheckItem label="Safety">Bank FDs (up to ₹5 lakhs per bank per depositor) are insured by the DICGC, making them virtually risk-free.</CheckItem>
          <CheckItem label="Flexible Tenure">You can choose a tenure ranging from 7 days to 10 years, depending on your financial goals.</CheckItem>
          <CheckItem label="Loan Against FD">In case of emergencies, you can avail a loan against your FD without breaking it, usually up to 90% of the deposit value.</CheckItem>
        </ul>
      </section>
    </div>
  );
}
