import createMiddleware from 'next-intl/middleware'
import { pathnames, locales, localePrefix, AppLocales } from '@/libs/next-intl/config'
import { NextRequest, NextResponse } from 'next/server'

const authPaths = ['/sign-in', '/sign-up'] as const
const privatePaths = ['/account', '/dashboard'] as const

export default function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split('/')
  const sessionToken = request.cookies.get('token')?.value

  if (locale && locales.includes(locale as AppLocales)) {
    const path = `/${segments.join('/')}`
    const localeKey = locale as AppLocales

    const getPathname = (path: string, locale: AppLocales) => {
      // @ts-ignore
      const localizedPath = pathnames[path]
      return typeof localizedPath === 'object' ? localizedPath[locale] : localizedPath
    }

    if (privatePaths.some((privatePath) => path === getPathname(privatePath, localeKey)) && !sessionToken) {
      const homePath = `/${locale}/${getPathname('/sign-in', localeKey)}`
      return NextResponse.redirect(new URL(homePath, request.url))
    }

    if (authPaths.some((authPath) => path === getPathname(authPath, localeKey)) && sessionToken) {
      const signInPath = `/${locale}/${getPathname('/', localeKey)}`
      return NextResponse.redirect(new URL(signInPath, request.url))
    }
  }

  // Handle i18n routing after authentication checks
  const handleI18nRouting = createMiddleware({
    defaultLocale: 'vi-VN',
    locales,
    pathnames,
    localePrefix
  })

  return handleI18nRouting(request)
}

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
