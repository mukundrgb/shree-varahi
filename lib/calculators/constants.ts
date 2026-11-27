import type { CalculatorCategory } from '@/lib/calculators/types';
import { 
  MdTrendingUp, MdSavings, MdShowChart, MdSync, MdAccountBalance, MdTimeline, MdFunctions, MdBarChart, MdViewList, MdMoneyOff, MdReceiptLong,
  MdSecurity, MdWork, MdLockClock, MdAutorenew, MdDescription, MdChildCare, MdElderly, MdMail,
  MdCreditCard, MdDirectionsCar, MdHome, MdCompareArrows,
  MdAccountBalanceWallet, MdHomeWork, MdCardGiftcard, MdContentCut, MdPayments,
  MdExposurePlus1, MdAllInclusive, MdStore, MdEvent, MdAnalytics, MdBeachAccess, MdCalculate,
  MdFlag, MdMonetizationOn, MdDiamond, MdHealthAndSafety, MdCurrencyExchange
} from 'react-icons/md';

export const CALCULATOR_CATEGORIES: CalculatorCategory[] = [
  {
    name: 'Investment',
    icon: MdTrendingUp,
    calculators: [
      { id: 'sip',           name: 'SIP',                      category: 'Investment', icon: MdTrendingUp, description: 'Calculate how much you need to save or how much you will accumulate with your SIP' },
      { id: 'lumpsum',       name: 'Lumpsum',                  category: 'Investment', icon: MdSavings, description: 'Calculate returns for lumpsum investments to achieve your financial goals', hidden: true },
      { id: 'swp',           name: 'SWP',                      category: 'Investment', icon: MdSync, description: 'Calculate your final amount with Systematic Withdrawal Plans (SWP)' },
      { id: 'mf-returns',    name: 'MF',                       category: 'Investment', icon: MdAccountBalance, description: 'Calculate the returns on your mutual fund investments' },
      { id: 'cagr',          name: 'CAGR',                     category: 'Investment', icon: MdTimeline, description: 'The simplest compound annual growth rate calculator' },
      { id: 'xirr',          name: 'XIRR Calculator',          category: 'Investment', icon: MdFunctions, description: 'Calculate the extended internal rate of return (XIRR) for your investments' },
      { id: 'roi',           name: 'ROI',                      category: 'Investment', icon: MdBarChart, description: 'Calculate the return on investment for your portfolio' },
      { id: 'stock-average', name: 'Stock Average Calculator', category: 'Investment', icon: MdViewList, description: 'Calculate average price of your stock investments' },
      { id: 'inflation',     name: 'Inflation',                category: 'Investment', icon: MdMoneyOff, description: 'Calculate inflation adjusted prices' },
      { id: 'brokerage',     name: 'Brokerage',                category: 'Investment', icon: MdReceiptLong, description: 'Calculate brokerage and other charges for your stock orders' },
      { id: 'goal-sip',      name: 'Goal SIP',                 category: 'Investment', icon: MdFlag,            description: 'Find out how much monthly SIP you need to reach your financial goal' },
      { id: 'dividend-yield',name: 'Dividend Yield',           category: 'Investment', icon: MdMonetizationOn,  description: 'Calculate the dividend yield and annual income from your stock holdings' },
      { id: 'net-worth',     name: 'Net Worth',                category: 'Investment', icon: MdDiamond,         description: 'Calculate your total net worth by tracking assets and liabilities' },
    ],
  },
  {
    name: 'Savings',
    icon: MdAccountBalance,
    calculators: [
      { id: 'ppf',     name: 'PPF',              category: 'Savings', icon: MdSecurity, description: 'Calculate your returns on Public Provident Fund (PPF)' },
      { id: 'epf',     name: 'EPF',              category: 'Savings', icon: MdWork, description: 'Calculate returns for your Employee’s Provident Fund (EPF)' },
      { id: 'fd',      name: 'FD',               category: 'Savings', icon: MdLockClock, description: 'Check returns on your fixed deposits (FDs) without any hassle' },
      { id: 'rd',      name: 'RD',               category: 'Savings', icon: MdAutorenew, description: 'Check returns on your Recurring Deposit (RD) in just a few clicks' },
      { id: 'nsc',     name: 'NSC',              category: 'Savings', icon: MdDescription, description: 'Calculate your returns under National Savings Certificate scheme' },
      { id: 'ssy',     name: 'SSY',              category: 'Savings', icon: MdChildCare, description: 'Calculate returns for Sukanya Smariddhi Yojana (SSY) as per your investment' },
      { id: 'nps',     name: 'NPS',              category: 'Savings', icon: MdElderly, description: 'Calculate returns for your National Pension Scheme (NPS)' },
      { id: 'scss-calculator', name: 'SCSS Calculator',  category: 'Savings', icon: MdElderly, description: 'Calculate senior citizens savings scheme returns' },
      { id: 'po-mis',  name: 'Post Office MIS',  category: 'Savings', icon: MdMail, description: 'Calculate post office monthly income scheme returns' },
      { id: 'emergency-fund', name: 'Emergency Fund', category: 'Savings', icon: MdHealthAndSafety, description: 'Calculate how much emergency fund you need and how long to build it' },
    ],
  },
  {
    name: 'Loans',
    icon: MdHome,
    calculators: [
      { id: 'emi-calculator',               name: 'EMI',               category: 'Loans', icon: MdCreditCard, description: 'Calculate EMI on your loans – home loan, car loan or personal loan' },
      { id: 'car-loan-emi-calculator',          name: 'Car Loan EMI',      category: 'Loans', icon: MdDirectionsCar, description: 'Calculate your car loan EMI' },
      { id: 'home-loan-emi-calculator',         name: 'Home Loan EMI',     category: 'Loans', icon: MdHome, description: 'Calculate your home loan EMI' },
      { id: 'flat-vs-reducing-rate-calculator',  name: 'Flat vs Reducing rate', category: 'Loans', icon: MdCompareArrows, description: 'Compare monthly EMI in Flat and Reducing balance interest rate schemes' },
      { id: 'loan-prepayment',   name: 'Loan Prepayment',       category: 'Loans', icon: MdCurrencyExchange, description: 'Calculate interest saved and time reduced by prepaying your loan' },
    ],
  },
  {
    name: 'Tax & Salary',
    icon: MdAccountBalanceWallet,
    calculators: [
      { id: 'income-tax-calculator', name: 'Income Tax',  category: 'Tax & Salary', icon: MdAccountBalanceWallet, description: 'Calculate your payable income tax with minimal effort' },
      { id: 'hra-calculator',        name: 'HRA',         category: 'Tax & Salary', icon: MdHomeWork, description: 'Calculate your House Rent Allowance (HRA)' },
      { id: 'gratuity-calculator',   name: 'Gratuity',    category: 'Tax & Salary', icon: MdCardGiftcard, description: 'Calculate how much gratuity you will get when you retire' },
      { id: 'tds-calculator',        name: 'TDS',         category: 'Tax & Salary', icon: MdContentCut, description: 'Calculate your TDS deductions' },
      { id: 'salary-calculator',     name: 'Salary',      category: 'Tax & Salary', icon: MdPayments, description: 'Calculate your net take home salary' },
    ],
  },
  {
    name: 'Other',
    icon: MdCalculate,
    calculators: [
      { id: 'simple-interest',   name: 'Simple Interest',   category: 'Other', icon: MdExposurePlus1, description: 'Calculate simple interest on your loans and saving schemes investments' },
      { id: 'compound-interest', name: 'Compound Interest', category: 'Other', icon: MdAllInclusive, description: 'Calculate compound interest with ease' },
      { id: 'gst',               name: 'GST',               category: 'Other', icon: MdStore, description: 'Calculate your payable GST amount with a few clicks' },
      { id: 'apy',               name: 'APY',               category: 'Other', icon: MdEvent, description: 'Calculate your monthly investments under Atal Pension Yojana' },
      { id: 'margin',            name: 'Margin',            category: 'Other', icon: MdAnalytics, description: 'Calculate margin for delivery and intraday based on your order details' },
      { id: 'retirement',        name: 'Retirement',        category: 'Other', icon: MdBeachAccess, description: 'Calculate how much you need for a relaxed retirement' },
    ],
  },
];

export const ALL_CALCULATORS = CALCULATOR_CATEGORIES.flatMap(c => c.calculators);
