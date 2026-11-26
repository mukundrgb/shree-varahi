"use client"

// Mobile, name and email inputs with the site's validation (lib/validation.ts).
// They only take valid characters while typing, and the browser shows the message when the form is submitted.
// Looks come from the className each form passes in. Leave out `value` to let the input keep its own.

import { useEffect, useRef, useState } from "react"
import { EMAIL_ERROR, MOBILE_ERROR, NAME_ERROR, cleanEmail, cleanMobile, cleanName, isEmail, isMobile, isName } from "@/lib/validation"

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> & {
  value?: string
  onValueChange?: (value: string) => void
}

function CheckedInput({ value, onValueChange, required, clean, valid, emptyError, error, ...rest }: Props & {
  type: string
  clean: (v: string, previous: string) => string
  valid: (v: string) => boolean
  emptyError: string
  error: string
}) {
  const ref = useRef<HTMLInputElement>(null)
  const [own, setOwn] = useState("")
  const current = value ?? own
  const message = !current ? (required ? emptyError : "") : valid(current) ? "" : error

  useEffect(() => { ref.current?.setCustomValidity(message) }, [message])

  return (
    <input
      ref={ref}
      required={required}
      value={current}
      onChange={(e) => { const next = clean(e.target.value, current); setOwn(next); onValueChange?.(next) }}
      {...rest}
    />
  )
}

export function MobileInput(props: Props) {
  return (
    <CheckedInput
      type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="Enter mobile number"
      clean={cleanMobile} valid={isMobile} emptyError="Enter your mobile number" error={MOBILE_ERROR} {...props}
    />
  )
}

export function NameInput(props: Props) {
  return (
    <CheckedInput
      type="text" autoComplete="name" placeholder="Enter your full name"
      clean={cleanName} valid={isName} emptyError="Enter your name" error={NAME_ERROR} {...props}
    />
  )
}

export function EmailInput(props: Props) {
  return (
    <CheckedInput
      type="email" inputMode="email" autoComplete="email" placeholder="you@example.com"
      clean={cleanEmail} valid={isEmail} emptyError="Enter your email address" error={EMAIL_ERROR} {...props}
    />
  )
}
