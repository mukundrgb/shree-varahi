// External destinations used across the site, kept in one place so they are easy to change.

/** Account opening (eKYC portal). Every "Open Account" / "Invest" / "Start Trading" button goes here. */
export const OPEN_ACCOUNT_URL = "https://ekyc.lakshmishree.com:9080/"

/** Trading login. Every "Login" button goes here. */
export const LOGIN_URL = "https://trades.shreevarahi.com/"

/** Global investing (GIFT City / IFSC) has its own partner portal. */
export const GLOBAL_INVESTING_LINKS = {
  register:   "https://trade.clientbridge.in/register?lakshmishree",
  login:      "https://trade.clientbridge.in/login?lakshmishree",
  userGuide:  "https://www.indiainxga.com/static/marketoperations/userguide.aspx",
} as const

/** Calculators live inside this site at /calculators (app/calculators). */
export const CALCULATORS_URL = "/calculators"

export const CALCULATOR_LINKS = {
  all:              CALCULATORS_URL,
  brokerage:        `${CALCULATORS_URL}/brokerage`,
  margin:           `${CALCULATORS_URL}/margin`,
  mfReturns:        `${CALCULATORS_URL}/mf-returns`,
  cagr:             `${CALCULATORS_URL}/cagr`,
  goalSip:          `${CALCULATORS_URL}/goal-sip`,
  lumpsum:          `${CALCULATORS_URL}/lumpsum`,
  sip:              `${CALCULATORS_URL}/sip`,
  xirr:             `${CALCULATORS_URL}/xirr`,
  inflation:        `${CALCULATORS_URL}/inflation`,
  retirement:       `${CALCULATORS_URL}/retirement`,
  ppf:              `${CALCULATORS_URL}/ppf`,
  epf:              `${CALCULATORS_URL}/epf`,
  fd:               `${CALCULATORS_URL}/fd`,
  rd:               `${CALCULATORS_URL}/rd`,
  nps:              `${CALCULATORS_URL}/nps`,
  nsc:              `${CALCULATORS_URL}/nsc`,
  compoundInterest: `${CALCULATORS_URL}/compound-interest`,
  emi:              `${CALCULATORS_URL}/emi-calculator`,
  hra:              `${CALCULATORS_URL}/hra-calculator`,
  gratuity:         `${CALCULATORS_URL}/gratuity-calculator`,
} as const
