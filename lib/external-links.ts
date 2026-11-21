// External destinations used across the site, kept in one place so they are easy to change.

/** Login / account opening (eKYC portal). Every "Login" / "Open Account" button that used /login goes here. */
export const LOGIN_URL = "https://ekyc.lakshmishree.com:9080"

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
