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

/** Calculators app. */
export const CALCULATORS_URL = "http://l5b7booc1v6okc4700748zn9.187.127.157.145.sslip.io"

export const CALCULATOR_LINKS = {
  all:       `${CALCULATORS_URL}/`,
  brokerage: `${CALCULATORS_URL}/brokerage`,
  margin:    `${CALCULATORS_URL}/margin`,
  mfReturns: `${CALCULATORS_URL}/mf-returns`,
  cagr:      `${CALCULATORS_URL}/cagr`,
  goalSip:   `${CALCULATORS_URL}/goal-sip`,
  lumpsum:   `${CALCULATORS_URL}/lumpsum`,
} as const
