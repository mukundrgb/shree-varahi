import React from 'react';
import { h2Style, pStyle, BulletItem, CheckItem, FormulaBox } from './DetailsShared';

export default function EMIDetails() {
  return (
    <div className="space-y-8">
      <section>
        <h2 style={h2Style}>What is EMI?</h2>
        <p style={pStyle}>
          Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is fully paid off. It makes borrowing affordable by breaking down a large lump sum debt into smaller, manageable monthly payments.
        </p>
      </section>

      <section>
        <h2 style={h2Style}>How does an EMI Calculator work?</h2>
        <p style={{ ...pStyle, marginBottom: 12 }}>
          An EMI calculator is a financial tool that helps you calculate your monthly loan repayment amount. It requires three fundamental inputs:
        </p>
        <ul className="space-y-2.5">
          <BulletItem label="Loan Amount (₹)">The principal amount you intend to borrow from the bank or financial institution.</BulletItem>
          <BulletItem label="Interest Rate (% p.a)">The annual rate of interest charged by the lender on the loan.</BulletItem>
          <BulletItem label="Loan Tenure (Years or Months)">The duration over which you will repay the loan.</BulletItem>
        </ul>
        <p style={{ ...pStyle, marginTop: 12 }}>
          Based on these details, the calculator displays your exact monthly EMI, the total interest payable over the loan's lifetime, and the total payment (Principal + Interest).
        </p>
      </section>

      <section>
        <h2 style={h2Style}>Formula to Calculate EMI</h2>
        <p style={{ ...pStyle, marginBottom: 12 }}>
          The mathematical formula used to calculate EMIs on a reducing balance basis is:
        </p>
        <FormulaBox
          formula="EMI = [P × R × (1 + R)^N] / [(1 + R)^N - 1]"
          vars={[
            { k: 'P', v: 'Principal loan amount' },
            { k: 'R', v: 'Monthly interest rate (Annual Rate / 12 / 100)' },
            { k: 'N', v: 'Loan tenure in months' },
          ]}
        />
      </section>

      <section>
        <h2 style={h2Style}>Importance of using an EMI Calculator</h2>
        <ul className="space-y-2.5">
          <CheckItem label="Financial Planning">Knowing your EMI in advance helps you assess your affordability and budget your monthly expenses accordingly.</CheckItem>
          <CheckItem label="Compare Loan Offers">You can input different interest rates and tenures from various banks to see which loan offer is the most economical.</CheckItem>
          <CheckItem label="Decide Loan Tenure">If the calculated EMI is too high, you can increase the tenure to lower the monthly burden, or vice versa, to find a balance that suits your income.</CheckItem>
          <CheckItem label="Accuracy">Manual calculations can be complex and prone to errors. A calculator provides instant, 100% accurate results.</CheckItem>
        </ul>
      </section>
    </div>
  );
}
