import { CalculatorDetailData } from '../GenericDetails';

export const otherData: Record<string, CalculatorDetailData> = {
  'simple-interest': {
    title: 'Simple Interest',
    whatIs: 'Simple Interest is a quick and easy method of calculating the interest charge on a loan or the return on an investment. Unlike compound interest, simple interest is determined by multiplying the daily/annual interest rate by the principal by the number of days/years that elapse between payments. It does not earn interest on the interest.',
    howWorksDesc: 'Calculates the flat interest amount over the entire period.',
    inputs: [
      { label: 'Principal Amount', desc: 'The initial amount borrowed or invested.' },
      { label: 'Interest Rate', desc: 'The flat percentage rate per annum.' },
      { label: 'Time Period', desc: 'Duration of the loan/investment in years.' }
    ],
    formulaDesc: 'The formula is a straightforward multiplication of principal, rate, and time.',
    formulaBox: 'Simple Interest (SI) = (P × R × T) / 100',
    formulaVars: [
      { label: 'P', desc: 'Principal' },
      { label: 'R', desc: 'Rate' },
      { label: 'T', desc: 'Time' }
    ],
    benefits: [
      'Ease of Calculation: The simplest financial formula to understand.',
      'Borrower Friendly: Loans that use simple interest (like some personal or car loans) are cheaper than those using compound interest.'
    ]
  },
  'compound-interest': {
    title: 'Compound Interest',
    whatIs: 'Compound Interest is the "interest on interest". It is the addition of interest to the principal sum of a loan or deposit. It is the result of reinvesting interest, rather than paying it out, so that interest in the next period is then earned on the principal sum plus previously accumulated interest.',
    howWorksDesc: 'Calculates the exponential growth of an investment over time.',
    inputs: [
      { label: 'Principal Amount', desc: 'The starting balance.' },
      { label: 'Interest Rate', desc: 'The annual percentage yield.' },
      { label: 'Compounding Frequency', desc: 'How often interest is added (Annually, Quarterly, Monthly).' },
      { label: 'Time Period', desc: 'Total years of investment.' }
    ],
    formulaDesc: 'The future value formula factoring in compounding frequency.',
    formulaBox: 'A = P × (1 + R/N)^(N×T)',
    formulaVars: [
      { label: 'A', desc: 'Total Amount' },
      { label: 'N', desc: 'Number of times interest is compounded per year' }
    ],
    benefits: [
      'Wealth Creation: Known as the "8th wonder of the world," it makes your money grow exponentially over long periods.',
      'Investment Essential: The core mechanism behind Mutual Funds, Stocks, and FDs.'
    ]
  },
  'gst': {
    title: 'Goods and Services Tax (GST)',
    whatIs: 'GST is a comprehensive, multi-stage, destination-based tax that is levied on every value addition in India. The GST calculator helps businesses and consumers quickly add or reverse-calculate the GST amount from a product\'s price.',
    howWorksDesc: 'It can either add GST to a base amount or extract the base amount and GST component from a total inclusive price.',
    inputs: [
      { label: 'Amount', desc: 'The net price or gross price.' },
      { label: 'GST Rate', desc: 'Standard tax slabs (e.g., 5%, 12%, 18%, 28%).' },
      { label: 'Calculation Type', desc: 'Whether to Add GST (Exclusive) or Remove GST (Inclusive).' }
    ],
    formulaDesc: 'Uses straightforward percentage addition or division.',
    formulaBox: 'Add GST: Total = Base + (Base × Rate/100) | Remove GST: Base = Total / (1 + Rate/100)',
    formulaVars: [],
    benefits: [
      'Invoicing: Essential for business owners generating bills.',
      'Transparency: Helps consumers see the exact tax they are paying on an MRP.'
    ]
  },
  'apy': {
    title: 'Atal Pension Yojana (APY)',
    whatIs: 'Atal Pension Yojana is a pension scheme primarily aimed at the unorganized sector in India. Administered by PFRDA, it guarantees a minimum monthly pension of ₹1,000 to ₹5,000 to subscribers post-retirement at age 60.',
    howWorksDesc: 'Calculates the monthly contribution required based on your current age to achieve your desired pension amount.',
    inputs: [
      { label: 'Current Age', desc: 'Entry age must be between 18 and 40 years.' },
      { label: 'Desired Pension', desc: 'Guaranteed pension amount (₹1k to ₹5k).' }
    ],
    formulaDesc: 'Contributions are determined by predefined actuarial tables provided by the government, not a simple formula.',
    formulaBox: 'Based on Government APY Contribution Charts',
    formulaVars: [],
    benefits: [
      'Guaranteed Pension: The government backs the fixed pension amount.',
      'Low Cost: Very small monthly contributions, especially if started early (e.g., at age 18).'
    ]
  },
  'margin': {
    title: 'Stock Market Margin Calculator',
    whatIs: 'A Margin Calculator helps stock market traders know exactly how much capital (margin) they need in their brokerage account to execute a specific trade, leveraging the broker\'s provided exposure/leverage.',
    howWorksDesc: 'Determines the required capital based on the trade size and leverage ratio.',
    inputs: [
      { label: 'Stock Price', desc: 'Current market price of the share.' },
      { label: 'Quantity', desc: 'Number of shares to buy/sell.' },
      { label: 'Leverage/Margin Multiplier', desc: 'The exposure provided by the broker (e.g., 5x for Intraday).' }
    ],
    formulaDesc: 'Divides the total trade value by the leverage factor.',
    formulaBox: 'Required Margin = (Stock Price × Quantity) / Leverage Factor',
    formulaVars: [],
    benefits: [
      'Capital Efficiency: Traders can take larger positions with smaller capital.',
      'Risk Management: Ensure you have enough funds to avoid auto-square-off by the broker.'
    ]
  },
  'retirement': {
    title: 'Retirement Planning Calculator',
    whatIs: 'A comprehensive Retirement Calculator helps you figure out exactly how much money you need to save today to maintain your lifestyle after you stop working. It accounts for inflation, life expectancy, and post-retirement returns.',
    howWorksDesc: 'It is one of the most advanced calculators, projecting your future living costs and calculating the corpus needed to sustain them.',
    inputs: [
      { label: 'Current Age & Retirement Age', desc: 'Determines your accumulation phase.' },
      { label: 'Life Expectancy', desc: 'Determines your withdrawal phase.' },
      { label: 'Current Monthly Expenses', desc: 'Used to project future lifestyle costs using inflation.' },
      { label: 'Inflation & Expected Returns', desc: 'Variables to calculate Real Return.' }
    ],
    formulaDesc: 'Uses inflation formulas to find future expenses, and present value of annuity formulas to find the required retirement corpus.',
    formulaBox: 'Corpus = Future Annual Expense × [1 - (1+Real Return)^(-Years)] / Real Return',
    formulaVars: [
      { label: 'Real Return', desc: '[(1 + Investment Return) / (1 + Inflation Rate)] - 1' }
    ],
    benefits: [
      'Reality Check: Shows the massive impact of inflation on future living costs.',
      'Actionable Plan: Gives you an exact SIP amount required today to meet your future retirement goal.'
    ]
  }
};
