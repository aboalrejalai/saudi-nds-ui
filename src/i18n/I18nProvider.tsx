import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { defaultLocale, messages, type Locale } from "./messages"

type Vars = Record<string, string | number>

type Translate = (key: string, vars?: Vars) => string

type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translate
}

const I18nContext = createContext<I18nContextValue | null>(null)

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale
  const stored = window.localStorage.getItem("locale")
  return stored === "ar" || stored === "en" ? stored : defaultLocale
}

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, name: string) =>
    name in vars ? String(vars[name]) : `{${name}}`
  )
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  useEffect(() => {
    const dir = locale === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = locale
    document.documentElement.dir = dir
    window.localStorage.setItem("locale", locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => setLocaleState(next), [])

  const t = useCallback<Translate>(
    (key, vars) => {
      const bundle = messages[locale] as Record<string, unknown>
      const value = key
        .split(".")
        .reduce<unknown>((acc, part) => {
          if (acc && typeof acc === "object" && part in (acc as object)) {
            return (acc as Record<string, unknown>)[part]
          }
          return undefined
        }, bundle)
      return typeof value === "string" ? interpolate(value, vars) : key
    },
    [locale]
  )

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider")
  return ctx
}

/** Matches the next-intl signature: useTranslations(namespace) -> scoped t. */
export function useTranslations(namespace?: string): Translate {
  const { t } = useI18n()
  return useCallback(
    (key, vars) => t(namespace ? `${namespace}.${key}` : key, vars),
    [t, namespace]
  )
}

/** Matches the next-intl signature: useLocale() -> "en" | "ar". */
export function useLocale(): Locale {
  return useI18n().locale
}
