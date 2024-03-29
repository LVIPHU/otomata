import createMiddleware from 'next-intl/middleware'
import { pathnames, locales, localePrefix } from '@/libs/next-intl/config'

export default createMiddleware({
  defaultLocale: 'vi-VN',
  locales,
  pathnames,
  localePrefix
})

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(vi-VN|en-US)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
}
