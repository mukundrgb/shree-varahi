// Rules for the fields visitors fill in. Every form uses these, so they behave the same everywhere.

export const MOBILE_ERROR = "Enter a valid 10 digit mobile number"
export const EMAIL_ERROR = "Enter a valid email address, e.g. name@example.com"
export const NAME_ERROR = "Enter your name using letters only"

/**
 * Keeps digits only, at most 10, without the country code or a leading 0.
 * Pasted or autofilled "+91 98765 43210", "+91 098765 43210", "919876543210" and "098765 43210" all become 9876543210.
 * Pass the field's current value as `previous` so a digit typed into a full field is ignored instead of shifting the number.
 */
export function cleanMobile(value: string, previous = ""): string {
  const digits = value.replace(/\D/g, "")
  if (digits.length <= 10) return digits.replace(/^0+/, "")
  // One more digit typed at the end of a complete number: keep the number as it was.
  if (previous.length === 10 && digits.length === 11 && digits.startsWith(previous)) return previous
  let d = digits
  // 91 is the country code only when a full number follows it: 9123456789 is a normal mobile number.
  if (d.length >= 12 && d.startsWith("91")) d = d.slice(2)
  d = d.replace(/^0+/, "")
  // Anything still in front of the last 10 digits is a prefix (country code or trunk 0), not part of the number.
  return d.length > 10 ? d.slice(-10) : d
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
