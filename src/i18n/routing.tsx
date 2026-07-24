import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react"
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom"
import { useI18n, useLocale, useTranslations } from "./I18nProvider"
export { useLocale, useTranslations }
import type { Locale } from "./messages"

/**
 * Drop-in replacement for `@/i18n/routing` (next-intl).
 * Exposes the same names — `Link`, `usePathname`, `useRouter`, `redirect` —
 * so consumers change nothing but (optionally) their import source.
 * Locale lives in localStorage, NOT in the URL, so routes have no `/ar` prefix.
 */

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: ReactNode
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, children, ...rest },
  ref
) {
  return (
    <RouterLink ref={ref} to={href} {...rest}>
      {children}
    </RouterLink>
  )
})

export function usePathname(): string {
  return useLocation().pathname
}

type RouterOptions = { locale?: Locale }

export function useRouter() {
  const navigate = useNavigate()
  const { setLocale } = useI18n()

  return {
    push: (to: string) => navigate(to),
    replace: (to: string, options?: RouterOptions) => {
      // next-intl: router.replace(pathname, { locale }) switches locale without
      // changing the URL. Here we just flip the locale in storage/context.
      if (options?.locale) {
        setLocale(options.locale)
        return
      }
      navigate(to, { replace: true })
    },
    refresh: () => navigate(0),
    back: () => navigate(-1),
    forward: () => navigate(1),
  }
}

// Unused in an SPA; kept for API parity with next-intl/navigation.
export function redirect(to: string) {
  if (typeof window !== "undefined") {
    window.location.href = to
  }
}
