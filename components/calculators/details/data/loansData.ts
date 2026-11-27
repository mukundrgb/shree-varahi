import { CalculatorDetailData } from '../GenericDetails';

export const loansData: Record<string, CalculatorDetailData> = {
  'car-loan': {
    title: 'Car Loan EMI',
    whatIs: 'A Car Loan EMI calculator specifically helps you determine the monthly payments required to finance the purchase of a new or used vehicle. Car loans typically have shorter tenures (1 to 7 years) compared to home loans.',
    howWorksDesc: 'It requires the total loan amount, interest rate, and tenure to compute the Equated Monthly Installment.',
    inputs: [
      { label: 'Car Loan Amount', desc: 'The total amount you are borrowing from the bank.' },
      { label: 'Interest Rate', desc: 'The annual interest rate for the auto loan.' },
      { label: 'Loan Tenure', desc: 'The duration over which you will repay the loan, usually in months or years.' }
    ],
    formulaDesc: 'It uses the standard reducing balance EMI formula.',
    formulaBox: 'EMI = [P × R × (1 + R)^N] / [(1 + R)^N - 1]',
    formulaVars: [],
    benefits: [
      'Budgeting: Ensure the monthly car payment fits within your household budget without strain.',
      'Downpayment Planning: Adjust the loan amount in the calculator to see how different downpayment sizes affect your EMI.'
    ]
  },
  'home-loan': {
    title: 'Home Loan EMI',
    whatIs: 'A Home Loan EMI calculator helps prospective home buyers estimate their monthly mortgage payments. Home loans are typically large amounts borrowed over very long periods (10 to 30 years).',
    howWorksDesc: 'Calculates the EMI, total interest payable, and the total cost of the property over the loan lifecycle.',
    inputs: [
      { label: 'Home Loan Amount', desc: 'The principal amount borrowed for purchasing the property.' },
      { label: 'Interest Rate', desc: 'The home loan interest rate (fixed or floating).' },
      { label: 'Loan Tenure', desc: 'Duration of the loan, up to 30 years.' }
    ],
    formulaDesc: 'Uses the standard reducing balance method.',
    formulaBox: 'EMI = [P × R × (1 + R)^N] / [(1 + R)^N - 1]',
    formulaVars: [],
    benefits: [
      'Affordability Check: Find out what property price range you can actually afford.',
      'Prepayment Strategy: Understand how much total interest you pay, highlighting the benefit of making early prepayments.'
    ]
  },
  'flat-vs-reducing': {
    title: 'Flat vs Reducing Rate',
    whatIs: 'This calculator compares two different methods banks use to calculate interest. A "Flat Rate" calculates interest on the entire initial principal amount for the whole tenure. A "Reducing Rate" calculates interest only on the outstanding principal balance which decreases every month as you pay EMIs.',
    howWorksDesc: 'It takes the loan parameters and calculates the EMI and Total Interest using both methods simultaneously for direct comparison.',
    inputs: [
      { label: 'Loan Amount', desc: 'The principal amount.' },
      { label: 'Interest Rate', desc: 'The quoted interest rate.' },
      { label: 'Tenure', desc: 'The duration of the loan.' }
    ],
    formulaDesc: 'Flat rate interest is simple interest on the full amount. Reducing rate uses the amortization formula.',
    formulaBox: 'Flat EMI = (Principal + (Principal × Rate × Years)) / Months',
    formulaVars: [],
    benefits: [
      'Avoid Deception: A 10% Flat Rate is actually much more expensive than a 10% Reducing Rate. This tool reveals the true cost of borrowing.',
      'Smart Borrowing: Helps you choose the genuinely cheaper loan offer.'
    ]
  },
  'loan-prepayment': {
    title: 'Loan Prepayment Calculator',
    whatIs: 'A Loan Prepayment Calculator helps borrowers understand the massive financial benefit of making a lump-sum payment towards their outstanding loan principal before the scheduled EMI. Even a single prepayment can save lakhs in interest and significantly cut the loan tenure.',
    howWorksDesc: 'It calculates your original loan details and then simulates the effect of a prepayment made at a specific month:',
    inputs: [
      { label: 'Loan Amount', desc: 'The original principal amount of the loan.' },
      { label: 'Interest Rate', desc: 'The annual interest rate charged by the lender.' },
      { label: 'Loan Tenure', desc: 'The original repayment duration in years.' },
      { label: 'Prepayment Amount', desc: 'The lump-sum extra payment you plan to make.' },
      { label: 'Prepayment Month', desc: 'The EMI number after which you make the prepayment.' }
    ],
    formulaDesc: 'It calculates the outstanding balance at the prepayment month and recomputes the remaining tenure or EMI:',
    formulaBox: 'Outstanding Balance after Month M = P × (1+r)^M - EMI × [(1+r)^M - 1] / r',
    formulaVars: [
      { label: 'r', desc: 'Monthly interest rate = Annual Rate / 12 / 100' },
      { label: 'M', desc: 'Month at which prepayment is made' }
    ],
    benefits: [
      'Massive Interest Savings: Prepayments in the early years of a home loan can save 30-50% of the total interest outgo.',
      'Shorter Tenure: The faster you reduce the principal, the sooner you become debt-free.',
      'Better Than Investing: For loans above 8% interest, prepaying is often better than investing in fixed-income instruments of similar rate.'
    ]
  }
};
