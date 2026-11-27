import { CalculatorDetailData } from '../GenericDetails';

export const investmentData: Record<string, CalculatorDetailData> = {

  'swp': {
    title: 'Systematic Withdrawal Plan (SWP)',
    whatIs: 'A Systematic Withdrawal Plan (SWP) allows an investor to withdraw a fixed amount of money from their mutual fund investments at regular intervals (monthly, quarterly, etc.). It provides a steady source of income, making it highly suitable for retirees or those needing regular cash flow while their remaining capital continues to grow.',
    howWorksDesc: 'The SWP calculator determines the final value of your investment after regular withdrawals. It needs:',
    inputs: [
      { label: 'Total Investment', desc: 'The initial corpus or current value of your mutual fund.' },
      { label: 'Withdrawal Amount', desc: 'The fixed amount you wish to withdraw periodically.' },
      { label: 'Expected Return', desc: 'The annual growth rate of your remaining investment.' },
      { label: 'Time Period', desc: 'The number of years you plan to continue the withdrawals.' }
    ],
    formulaDesc: 'It subtracts the withdrawal amount from the principal while adding the compound interest earned on the remaining balance.',
    formulaBox: 'Remaining Balance = Previous Balance + (Previous Balance × Rate) - Withdrawal',
    formulaVars: [],
    benefits: [
      'Regular Income: Provides a predictable and steady cash flow like a salary or pension.',
      'Capital Appreciation: The unwithdrawn amount remains invested and continues to earn returns.',
      'Tax Efficiency: SWP is often more tax-efficient than earning interest from fixed deposits.'
    ]
  },
  'mf-returns': {
    title: 'Mutual Fund Returns',
    whatIs: 'A Mutual Fund Returns calculator helps you evaluate the performance of your mutual fund investments. It projects how much your one-time (lumpsum) or regular (SIP) investments will grow over a given period based on an assumed growth rate.',
    howWorksDesc: 'It estimates the maturity value by calculating compounding interest over the investment tenure.',
    inputs: [
      { label: 'Investment Amount', desc: 'The amount you have invested.' },
      { label: 'Expected Return Rate', desc: 'The estimated annual interest or growth rate.' },
      { label: 'Time Period', desc: 'The duration for which you plan to stay invested.' }
    ],
    formulaDesc: 'For lumpsum, it uses the standard compound interest formula. For SIPs, it uses the future value of an annuity formula.',
    formulaBox: 'FV = P × (1 + r/n)^(n×t)',
    formulaVars: [],
    benefits: [
      'Goal Planning: Helps map your investments against financial goals.',
      'Expectation Setting: Gives a realistic picture of wealth accumulation over the long term.'
    ]
  },
  'cagr': {
    title: 'Compound Annual Growth Rate (CAGR)',
    whatIs: 'CAGR stands for Compound Annual Growth Rate. It is the mean annual growth rate of an investment over a specified period of time longer than one year. It represents the smoothed annualized yield, masking the volatility and fluctuations that occurred during the investment period.',
    howWorksDesc: 'The CAGR calculator requires only three data points to find the smoothed annual growth rate:',
    inputs: [
      { label: 'Initial Value', desc: 'The starting value of the investment.' },
      { label: 'Final Value', desc: 'The current or ending value of the investment.' },
      { label: 'Duration', desc: 'The number of years the investment was held.' }
    ],
    formulaDesc: 'The formula calculates the rate of return that would be required for an investment to grow from its beginning balance to its ending balance, assuming profits were reinvested.',
    formulaBox: 'CAGR = (Final Value / Initial Value)^(1 / Years) - 1',
    formulaVars: [
      { label: 'Years', desc: 'Total duration of the investment in years.' }
    ],
    benefits: [
      'Easy Comparison: Allows you to compare the performance of different investments (e.g., Stocks vs. Real Estate) on an even playing field.',
      'Smoothes Volatility: Ignores the jagged up-and-down movements of the market to provide a single, understandable growth metric.'
    ]
  },
  'xirr': {
    title: 'Extended Internal Rate of Return (XIRR)',
    whatIs: 'XIRR is a metric used to calculate the return on investments where multiple transactions (investments and withdrawals) happen at irregular intervals. It is the most accurate way to measure the performance of SIPs, stock portfolios, or mutual funds where cash flows are not strictly periodic.',
    howWorksDesc: 'Unlike CAGR which assumes a single investment, XIRR evaluates the dates and amounts of every cash flow.',
    inputs: [
      { label: 'Cash Flows', desc: 'The exact amounts invested (negative values) or withdrawn (positive values).' },
      { label: 'Dates', desc: 'The exact dates when each cash flow occurred.' },
      { label: 'Current Value', desc: 'The final, present value of the portfolio on the latest date.' }
    ],
    formulaDesc: 'XIRR is the discount rate that makes the Net Present Value (NPV) of all cash flows equal to zero. It is calculated iteratively.',
    formulaBox: '0 = Σ [Cash Flow_t / (1 + XIRR)^((Date_t - Date_0) / 365)]',
    formulaVars: [],
    benefits: [
      'Real Accuracy: The only truly accurate way to measure SIP or irregular investment returns.',
      'Time-Weighted: Factors in exactly how long each rupee has been invested.'
    ]
  },
  'roi': {
    title: 'Return on Investment (ROI)',
    whatIs: 'Return on Investment (ROI) is a simple, universal metric used to measure the profitability of an investment relative to its initial cost. It is expressed as a percentage and can be applied to anything from buying a stock to purchasing real estate or starting a business.',
    howWorksDesc: 'The ROI calculator determines the net profit as a percentage of the initial cost.',
    inputs: [
      { label: 'Investment Amount', desc: 'The initial cost or amount spent.' },
      { label: 'Final Amount', desc: 'The total value gained or the final sale value.' }
    ],
    formulaDesc: 'ROI is simply the net profit divided by the total investment cost.',
    formulaBox: 'ROI = [(Final Value - Initial Cost) / Initial Cost] × 100',
    formulaVars: [],
    benefits: [
      'Simplicity: Incredibly easy to understand and calculate.',
      'Universal Applicability: Can evaluate the efficiency of practically any type of investment or expenditure.'
    ]
  },
  'stock-average': {
    title: 'Stock Average Calculator',
    whatIs: 'A Stock Average Calculator helps investors find the average price of a stock after making multiple purchases at different prices. "Averaging down" (buying more shares when the price drops) is a common strategy to lower the overall break-even point.',
    howWorksDesc: 'It takes your previous purchase details and your new purchase details to calculate the new blended holding price.',
    inputs: [
      { label: 'First Purchase', desc: 'The quantity and price of shares already held.' },
      { label: 'Second Purchase', desc: 'The quantity and price of new shares being bought.' }
    ],
    formulaDesc: 'It uses a weighted average formula based on the total capital invested.',
    formulaBox: 'Average Price = (Total Capital Invested) / (Total Number of Shares)',
    formulaVars: [],
    benefits: [
      'Break-even Analysis: Helps you know exactly what price the stock needs to reach for you to be profitable.',
      'Strategic Buying: Allows you to plan how many shares to buy to bring your average down to a specific target.'
    ]
  },
  'inflation': {
    title: 'Inflation Calculator',
    whatIs: 'An Inflation Calculator shows how the purchasing power of money decreases over time due to inflation. It helps you understand what a certain amount of money today will be worth in the future, or what past amounts are equivalent to in today\'s money.',
    howWorksDesc: 'It uses the estimated inflation rate to discount the future value of money.',
    inputs: [
      { label: 'Current Amount', desc: 'The amount of money today.' },
      { label: 'Inflation Rate', desc: 'The expected annual inflation percentage (e.g., 6%).' },
      { label: 'Time Period', desc: 'The number of years into the future.' }
    ],
    formulaDesc: 'It applies a reverse compound interest logic to find the degraded purchasing power.',
    formulaBox: 'Future Value = Present Value × (1 + Inflation Rate)^Years',
    formulaVars: [],
    benefits: [
      'Retirement Planning: Crucial for understanding how much corpus you *really* need to maintain your lifestyle 20 years from now.',
      'Reality Check: Helps investors ensure their portfolio returns are actually beating inflation (Real Returns).'
    ]
  },
  'brokerage': {
    title: 'Brokerage Calculator',
    whatIs: 'A Brokerage Calculator helps traders and investors calculate the exact fees, taxes, and brokerage charges incurred during stock market transactions (Intraday or Delivery). It reveals the actual net profit or loss from a trade.',
    howWorksDesc: 'It calculates all statutory charges like STT, Exchange Transaction Charges, GST, SEBI charges, and Stamp Duty on top of the broker\'s fee.',
    inputs: [
      { label: 'Buy Price & Sell Price', desc: 'The entry and exit prices of the trade.' },
      { label: 'Quantity', desc: 'Number of shares traded.' },
      { label: 'Trade Type', desc: 'Whether the trade was Delivery (Equity) or Intraday.' }
    ],
    formulaDesc: 'It applies fixed percentage algorithms as mandated by the government and stock exchanges (NSE/BSE).',
    formulaBox: 'Net Profit = (Total Sale Value - Total Buy Value) - (Brokerage + STT + Exchange Charges + GST + SEBI Charges + Stamp Duty)',
    formulaVars: [],
    benefits: [
      'Transparency: Ensures you know exactly what the broker and government are taking from your trade.',
      'Break-even Calculation: Intraday traders can use it to find the exact price they need to sell at to not lose money on fees.'
    ]
  },
  'goal-sip': {
    title: 'Goal SIP Calculator',
    whatIs: 'A Goal SIP Calculator works backwards from your financial goal — instead of telling you what your monthly investment will grow to, it tells you exactly how much you need to invest each month to reach a specific target amount within your chosen timeframe.',
    howWorksDesc: 'You provide the goal, the expected returns, and the time horizon — the calculator computes the required monthly SIP. It needs:',
    inputs: [
      { label: 'Goal Amount (₹)', desc: 'The total corpus or target amount you want to accumulate.' },
      { label: 'Expected Return Rate (% p.a)', desc: 'The annual return you expect from your mutual fund or investment.' },
      { label: 'Time Period (Years)', desc: 'The number of years in which you want to achieve this goal.' }
    ],
    formulaDesc: 'It uses the inverse of the SIP future value formula — solving for P (monthly installment) given FV (goal):',
    formulaBox: 'SIP = Goal × r / [((1 + r)^n - 1) × (1 + r)]',
    formulaVars: [
      { label: 'r', desc: 'Monthly interest rate = Annual Rate / 12 / 100' },
      { label: 'n', desc: 'Total months = Years × 12' }
    ],
    benefits: [
      'Goal-Oriented Investing: Connects your investment directly to real-life milestones like retirement, education, or buying a home.',
      'Reality Check: Tells you if your current budget is enough to meet your target, or if you need to extend the timeline.',
      'Motivation: Seeing a specific monthly amount to invest removes ambiguity and turns a dream into an actionable plan.'
    ]
  },
  'dividend-yield': {
    title: 'Dividend Yield Calculator',
    whatIs: 'Dividend Yield is a financial ratio that tells you how much a company pays in dividends each year relative to its share price. It is expressed as a percentage and is a critical metric for income-focused investors who seek regular cash flow from their stock portfolio.',
    howWorksDesc: 'The calculator computes the yield percentage and projects actual income based on your total shareholding:',
    inputs: [
      { label: 'Stock Price (₹)', desc: 'The current market price of one share.' },
      { label: 'Annual Dividend Per Share (₹)', desc: 'The total dividend declared per share in a financial year.' },
      { label: 'Number of Shares', desc: 'How many shares of the company you hold.' }
    ],
    formulaDesc: 'The dividend yield is calculated as the annual dividend per share divided by the current stock price:',
    formulaBox: 'Dividend Yield (%) = (Annual Dividend Per Share / Stock Price) × 100',
    formulaVars: [],
    benefits: [
      'Passive Income: A key tool for building a portfolio that generates regular income without selling shares.',
      'Stock Comparison: Allows you to compare the "income efficiency" of different stocks — a higher yield means more income per rupee invested.',
      'Inflation Hedge: Companies that consistently grow their dividends help investors beat inflation over the long term.'
    ]
  },
  'net-worth': {
    title: 'Net Worth Calculator',
    whatIs: 'Net Worth is the single most important measure of your overall financial health. It is the difference between everything you own (your assets) and everything you owe (your liabilities). A growing net worth over time is the primary indicator that your financial plan is working.',
    howWorksDesc: 'You simply enter the estimated value of all your assets and the outstanding amounts of all your liabilities. The calculator gives you your true financial picture.',
    inputs: [
      { label: 'Assets', desc: 'Cash & savings, stocks & mutual funds, real estate market value, gold, EPF/PPF balance, etc.' },
      { label: 'Liabilities', desc: 'Outstanding home loan, car loan, personal loan, and credit card dues.' }
    ],
    formulaDesc: 'Net Worth is the simple subtraction of all liabilities from all assets:',
    formulaBox: 'Net Worth = Total Assets − Total Liabilities',
    formulaVars: [],
    benefits: [
      'Financial Clarity: Gives you a complete, honest snapshot of your true financial position in minutes.',
      'Track Progress: Calculate it every 6-12 months to measure whether your wealth is genuinely growing.',
      'Debt Awareness: Highlights hidden liabilities and motivates you to aggressively pay down high-interest debt.'
    ]
  }
};
