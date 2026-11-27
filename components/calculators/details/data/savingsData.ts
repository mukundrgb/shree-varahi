import { CalculatorDetailData } from '../GenericDetails';

export const savingsData: Record<string, CalculatorDetailData> = {
  'epf': {
    title: 'Employees\' Provident Fund (EPF)',
    whatIs: 'EPF is a retirement benefits scheme mandatory for salaried employees in India working in organizations with 20 or more staff. Both the employee and the employer contribute a fixed percentage (usually 12%) of the employee\'s basic salary and dearness allowance to the fund. The EPF account earns a government-declared interest rate, creating a substantial retirement corpus.',
    howWorksDesc: 'The EPF calculator projects your retirement corpus based on your current salary, age, and contributions.',
    inputs: [
      { label: 'Basic Salary + DA', desc: 'Your monthly basic salary plus dearness allowance.' },
      { label: 'Employee Contribution', desc: 'Usually 12% of Basic + DA.' },
      { label: 'Employer Contribution', desc: '3.67% goes to EPF, and 8.33% goes to EPS (Pension Scheme).' },
      { label: 'Current Age & Retirement Age', desc: 'Used to calculate the total years of contribution.' }
    ],
    formulaDesc: 'It calculates the annual contribution and applies the compound interest formula year-on-year until retirement age.',
    formulaBox: 'Year-end Balance = (Opening Balance + Annual Contribution) × (1 + Interest Rate)',
    formulaVars: [],
    benefits: [
      'Retirement Security: Forces disciplined saving for your post-work life.',
      'Tax Free: Contributions are tax-deductible under 80C, and the maturity amount is tax-free (EEE status).',
      'Employer Matching: Your employer contributes to your retirement wealth.'
    ]
  },
  'rd': {
    title: 'Recurring Deposit (RD)',
    whatIs: 'A Recurring Deposit (RD) is a special kind of term deposit offered by banks which helps people with regular incomes to deposit a fixed amount every month into their recurring deposit account and earn interest at the rate applicable to Fixed Deposits.',
    howWorksDesc: 'The RD calculator finds the maturity value of your monthly deposits over the chosen tenure.',
    inputs: [
      { label: 'Monthly Installment', desc: 'The fixed amount you deposit every month.' },
      { label: 'Interest Rate', desc: 'The annual interest rate offered by the bank.' },
      { label: 'Time Period', desc: 'The total duration of the RD in months or years.' }
    ],
    formulaDesc: 'Interest on RD is compounded quarterly. The formula is quite complex as the tenure for each monthly installment varies.',
    formulaBox: 'M = R × [(1+i)^n - 1] / [1 - (1+i)^(-1/3)]',
    formulaVars: [
      { label: 'M', desc: 'Maturity value' },
      { label: 'R', desc: 'Monthly Installment' },
      { label: 'n', desc: 'Number of quarters' },
      { label: 'i', desc: 'Interest rate per quarter' }
    ],
    benefits: [
      'Habitual Savings: Encourages a regular savings habit without needing a large lumpsum.',
      'Guaranteed Returns: Interest rates are locked in and insulated from market risks.',
      'Accessibility: You can open an RD with as little as ₹100 per month.'
    ]
  },
  'nsc': {
    title: 'National Savings Certificate (NSC)',
    whatIs: 'The National Savings Certificate (NSC) is a fixed-income investment scheme offered by the Government of India, primarily available at post offices. It is designed for small to mid-income investors to save tax while earning a guaranteed return. It comes with a fixed lock-in period of 5 years.',
    howWorksDesc: 'The calculator determines the maturity value of your one-time NSC investment after 5 years.',
    inputs: [
      { label: 'Investment Amount', desc: 'The lumpsum amount used to purchase the certificate.' },
      { label: 'Interest Rate', desc: 'The prevailing NSC interest rate (set quarterly by the govt).' }
    ],
    formulaDesc: 'Interest is compounded annually but paid out only at maturity.',
    formulaBox: 'Maturity Value = Principal × (1 + Rate)^5',
    formulaVars: [],
    benefits: [
      'Tax Savings: Investment up to ₹1.5 lakh is eligible for deduction under Section 80C.',
      'Reinvestment Benefit: The interest earned in the first 4 years is deemed reinvested and qualifies for fresh 80C deductions.',
      'Sovereign Guarantee: 100% capital protection backed by the Government.'
    ]
  },
  'ssy': {
    title: 'Sukanya Samriddhi Yojana (SSY)',
    whatIs: 'SSY is a government-backed savings scheme targeted at parents of girl children. It was launched under the "Beti Bachao, Beti Padhao" campaign to help parents build a fund for their daughter\'s higher education and marriage. The scheme matures after 21 years from the date of account opening.',
    howWorksDesc: 'The SSY calculator projects the wealth accumulated over 21 years based on your annual contributions.',
    inputs: [
      { label: 'Yearly Investment', desc: 'The amount invested annually (Max ₹1.5 Lakh).' },
      { label: 'Girl\'s Current Age', desc: 'The age of the girl child when the account is opened.' }
    ],
    formulaDesc: 'You deposit money for 15 years, but the account continues to earn interest until maturity at 21 years.',
    formulaBox: 'A = P(1+r/n)^(nt)',
    formulaVars: [],
    benefits: [
      'Highest Interest Rate: Historically offers one of the highest interest rates among small savings schemes.',
      'EEE Tax Benefit: Contributions, interest, and maturity amount are all entirely tax-free.',
      'Dedicated Purpose: Secures the financial future of the girl child.'
    ]
  },
  'nps': {
    title: 'National Pension Scheme (NPS)',
    whatIs: 'NPS is a voluntary, long-term retirement savings scheme managed by the PFRDA. It allows individuals to contribute to a pension account during their working life. On retirement, subscribers can withdraw a part of the corpus in a lumpsum and use the remaining to buy an annuity for a regular monthly pension.',
    howWorksDesc: 'It estimates your retirement corpus and expected monthly pension.',
    inputs: [
      { label: 'Monthly Investment', desc: 'Amount invested in NPS every month.' },
      { label: 'Current Age', desc: 'Used to calculate total years of investment until 60.' },
      { label: 'Expected Return', desc: 'Growth rate of the NPS fund (Equity/Debt mix).' }
    ],
    formulaDesc: 'It uses compound interest for wealth accumulation and an annuity formula for the pension phase.',
    formulaBox: 'Corpus = Monthly Inv. × [((1+r)^n - 1) / r] × (1+r)',
    formulaVars: [],
    benefits: [
      'Extra Tax Benefit: An exclusive deduction of ₹50,000 under Section 80CCD(1B) over and above the 80C limit.',
      'Low Cost: One of the lowest cost pension schemes globally.',
      'Market-Linked Growth: Option to invest a portion in equities for inflation-beating returns.'
    ]
  },
  'scss': {
    title: 'Senior Citizens Savings Scheme (SCSS)',
    whatIs: 'SCSS is a government-sponsored savings instrument designed exclusively for individuals aged 60 years and above. It provides a steady and secure stream of income post-retirement, offering a higher interest rate than standard FDs.',
    howWorksDesc: 'Calculates the quarterly interest payout and total maturity amount.',
    inputs: [
      { label: 'Investment Amount', desc: 'Lumpsum deposited (Max ₹30 Lakhs).' },
      { label: 'Interest Rate', desc: 'The prevailing SCSS rate.' }
    ],
    formulaDesc: 'Interest is calculated annually but paid out quarterly. The principal remains intact until the 5-year maturity.',
    formulaBox: 'Quarterly Payout = (Investment × Annual Interest Rate) / 4',
    formulaVars: [],
    benefits: [
      'Regular Income: Guarantees a steady quarterly payout to meet living expenses.',
      'High Safety: Government backed with zero default risk.',
      'Tax Benefits: Eligible for Section 80C deductions.'
    ]
  },
  'po-mis': {
    title: 'Post Office Monthly Income Scheme (POMIS)',
    whatIs: 'POMIS is a popular investment scheme offered by India Post where you invest a specific amount and get a guaranteed fixed amount every month as interest. The lock-in period is 5 years.',
    howWorksDesc: 'Determines the fixed monthly income you will receive from your lumpsum deposit.',
    inputs: [
      { label: 'Investment Amount', desc: 'Max ₹9 Lakh for single, ₹15 Lakh for joint accounts.' },
      { label: 'Interest Rate', desc: 'As declared by the government.' }
    ],
    formulaDesc: 'Simple calculation of the annual interest divided into 12 equal monthly payouts.',
    formulaBox: 'Monthly Income = (Investment Amount × Annual Rate) / 12',
    formulaVars: [],
    benefits: [
      'Fixed Monthly Income: Reliable source of passive income without market risks.',
      'Capital Protection: 100% sovereign guarantee on the invested amount.',
      'No TDS: Post office does not deduct TDS on the interest payouts.'
    ]
  },
  'emergency-fund': {
    title: 'Emergency Fund Calculator',
    whatIs: 'An Emergency Fund is a dedicated pool of liquid money set aside exclusively for unplanned financial shocks — a job loss, a medical emergency, a major car repair, or any unexpected expense. Financial experts universally recommend maintaining 3 to 6 months of living expenses as an emergency fund, kept in a safe and highly liquid account like a savings account or liquid mutual fund.',
    howWorksDesc: 'The calculator determines your target emergency fund size and how quickly you can build it:',
    inputs: [
      { label: 'Monthly Expenses', desc: 'Your total monthly household expenditure including rent, groceries, EMIs, utilities, and subscriptions.' },
      { label: 'Months of Cover', desc: 'Typically 3 months for dual-income households and 6+ months for single-income or self-employed individuals.' },
      { label: 'Current Savings', desc: 'The amount you have already set aside towards this fund.' },
      { label: 'Monthly Savings', desc: 'How much you can save each month to build the fund faster.' }
    ],
    formulaDesc: 'The target fund and monthly progress are straightforward to calculate:',
    formulaBox: 'Target Fund = Monthly Expenses × Months of Cover\nMonths to Goal = (Target − Current Savings) / Monthly Contribution',
    formulaVars: [],
    benefits: [
      'Financial Security: Protects you from going into debt when an emergency strikes.',
      'Peace of Mind: Knowing you have a buffer reduces financial anxiety and allows you to take better long-term investment decisions.',
      'Prevents Wealth Erosion: Without an emergency fund, you may be forced to redeem long-term investments (like ELSS or PPF) at the wrong time, losing compounding benefits.'
    ]
  }
};
