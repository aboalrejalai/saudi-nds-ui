import en from "../../messages/en.json"
import ar from "../../messages/ar.json"

export type Locale = "en" | "ar"

export const messages = { en, ar } as const

export const defaultLocale: Locale = "en"

export const locales: Locale[] = ["en", "ar"]
