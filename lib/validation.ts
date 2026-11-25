// Rules for the fields visitors fill in. Every form uses these, so they behave the same everywhere.

export const MOBILE_ERROR = "Enter a valid 10 digit mobile number"
export const EMAIL_ERROR = "Enter a valid email address, e.g. name@example.com"
export const NAME_ERROR = "Enter your name using letters only"

/** Keeps digits only, at most 10. A pasted "+91 98765 43210" or "098765 43210" becomes 9876543210. */
export function cleanMobile(value: string): string {
  let digits = value.replace(/\D/g, "").replace(/^0+/, "")
  // 91 is the country code only when a full number follows it: 9123456789 is a normal mobile number.
  if (digits.length >= 12 && digits.startsWith("91")) digits = digits.slice(2)
  return digits.slice(0, 10)
}

/** Indian mobile numbers have 10 digits and start with 6, 7, 8 or 9. */
export const isMobile = (value: string) => /^[6-9]\d{9}$/.test(value)

/** Keeps letters (any language), spaces, dots, hyphens and apostrophes. */
export const cleanName = (value: string) => value.replace(/[^\p{L}\p{M} .'’-]/gu, "").replace(/^\s+/, "").replace(/\s{2,}/g, " ").slice(0, 60)
export const isName = (value: string) => (value.match(/\p{L}/gu) ?? []).length >= 2

export const cleanEmail = (value: string) => value.replace(/\s/g, "").slice(0, 100)
export const isEmail = (value: string) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,}$/.test(value) && !value.includes("..")

/** One-time passwords: digits only. */
export const cleanDigits = (value: string, max: number) => value.replace(/\D/g, "").slice(0, max)

/** Client IDs and referral codes: letters and digits, in capitals. */
export const cleanCode = (value: string, max = 15) => value.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, max)
