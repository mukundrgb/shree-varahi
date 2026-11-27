import { CalculatorDetailData } from '../GenericDetails';

export const taxSalaryData: Record<string, CalculatorDetailData> = {
  'income-tax': {
    title: 'Income Tax Calculator',
    whatIs: 'An Income Tax Calculator helps individuals estimate the amount of tax they owe to the government based on their annual income, deductions, and the prevailing tax slabs. It simplifies the complex tax code into a straightforward calculation.',
    howWorksDesc: 'It takes your gross income and applies the relevant tax deductions and slab rates to find the net tax payable.',
    inputs: [
      { label: 'Gross Annual Income', desc: 'Your total income before any deductions.' },
      { label: 'Deductions', desc: 'Investments under 80C, 80D, HRA, Standard Deduction, etc.' },
      { label: 'Tax Regime', desc: 'Whether you are opting for the Old Tax Regime or the New Tax Regime.' }
    ],
    formulaDesc: 'The calculator subtracts deductions from the gross income to find taxable income, then applies progressive tax slab percentages.',
    formulaBox: 'Tax Payable = Sum of (Income in Slab × Slab Percentage) + Cess',
    formulaVars: [],
    benefits: [
      'Financial Planning: Know your tax liability in advance to avoid last-minute surprises.',
      'Regime Comparison: Easily compare whether the Old or New tax regime saves you more money.',
      'Maximize Deductions: See exactly how investing in 80C or 80D reduces your tax outgo.'
    ]
  },
  'hra': {
    title: 'House Rent Allowance (HRA) Exemption',
    whatIs: 'House Rent Allowance (HRA) is a common component of a salaried individual\'s pay. The Income Tax Act provides exemptions on HRA under Section 10(13A) if the employee lives in rented accommodation. This calculator determines exactly how much of your HRA is exempt from tax.',
    howWorksDesc: 'The exemption is calculated as the least of three specific rules defined by the IT department.',
    inputs: [
      { label: 'Basic Salary + DA', desc: 'Your basic pay and dearness allowance.' },
      { label: 'HRA Received', desc: 'The actual HRA component provided by your employer.' },
      { label: 'Actual Rent Paid', desc: 'The yearly rent you pay to your landlord.' },
      { label: 'City Type', desc: 'Whether you live in a Metro (50% of Basic) or Non-Metro (40% of Basic) city.' }
    ],
    formulaDesc: 'The exempt HRA is the minimum of: 1) Actual HRA received, 2) 50% or 40% of Basic Salary, or 3) Actual Rent paid minus 10% of Basic Salary.',
    formulaBox: 'Exempt HRA = MIN(Actual HRA, Rent - 10% Basic, 50%/40% Basic)',
    formulaVars: [],
    benefits: [
      'Tax Saving: Accurately calculate your exemption to reduce your taxable income.',
      'Optimal Rent: Helps you figure out if paying slightly more rent might result in higher tax savings.'
    ]
  },
  'gratuity': {
    title: 'Gratuity',
    whatIs: 'Gratuity is a monetary benefit given by an employer to an employee in return for services offered to the company. According to the Payment of Gratuity Act, 1972, it is payable to an employee who has completed at least five continuous years of service with the same employer.',
    howWorksDesc: 'The gratuity amount depends on your last drawn salary and your total tenure with the company.',
    inputs: [
      { label: 'Last Drawn Basic Salary + DA', desc: 'Your salary at the time of leaving the organization.' },
      { label: 'Years of Service', desc: 'Total continuous years worked (rounded off to the nearest year).' }
    ],
    formulaDesc: 'The formula pays 15 days of salary for every completed year of service.',
    formulaBox: 'Gratuity = (15 × Last Drawn Basic Salary × Tenure) / 26',
    formulaVars: [
      { label: '26', desc: 'Represents the number of working days in a month.' }
    ],
    benefits: [
      'Exit Planning: Know exactly how much lumpsum you will receive when resigning or retiring.',
      'Financial Security: Acts as a reward for loyalty and provides a financial cushion during job transitions.'
    ]
  },
  'tds': {
    title: 'Tax Deducted at Source (TDS)',
    whatIs: 'TDS is a mechanism introduced by the Government to collect tax at the very source of income. It means that when someone (deductor) pays you (deductee) for salary, professional fees, or rent, they must deduct a certain percentage of tax before making the payment.',
    howWorksDesc: 'It calculates the actual cash you will receive after the standard TDS rate is applied to your gross invoice or salary.',
    inputs: [
      { label: 'Gross Amount', desc: 'The total bill amount or income before tax.' },
      { label: 'TDS Rate', desc: 'The applicable percentage (e.g., 10% for professional fees under 194J).' }
    ],
    formulaDesc: 'Simple percentage deduction from the principal amount.',
    formulaBox: 'TDS Amount = (Gross Amount × TDS Rate) / 100',
    formulaVars: [],
    benefits: [
      'Invoice Planning: Freelancers and professionals can use it to know their exact in-hand cash flow.',
      'Compliance: Ensure the correct amount of tax is being deducted according to government regulations.'
    ]
  },
  'salary': {
    title: 'Take Home Salary Calculator',
    whatIs: 'A Take Home Salary (Net Salary) calculator breaks down your Cost to Company (CTC) into various components (Basic, HRA, Special Allowance) and deducts standard taxes and provident fund contributions to show you exactly how much cash will hit your bank account every month.',
    howWorksDesc: 'It takes your gross CTC and subtracts all statutory deductions like EPF, Professional Tax, and Income Tax.',
    inputs: [
      { label: 'Annual CTC', desc: 'Your total Cost to Company.' },
      { label: 'Bonuses', desc: 'Any variable pay or annual bonuses not paid monthly.' }
    ],
    formulaDesc: 'Net Salary is Gross Salary minus Deductions.',
    formulaBox: 'Take Home = Gross Monthly Income - (EPF + Professional Tax + Income Tax/TDS)',
    formulaVars: [],
    benefits: [
      'Job Offer Evaluation: Accurately compare two different job offers by looking at the in-hand salary rather than just the inflated CTC.',
      'Budgeting: Plan your monthly expenses, EMIs, and SIPs based on real cash inflow.'
    ]
  }
};
