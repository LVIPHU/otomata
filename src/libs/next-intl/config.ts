import { Pathnames } from 'next-intl/navigation'

export const locales = ['vi', 'en'] as const

export const pathnames = {
  '/': '/',
  '/choose-country-region': '/choose-country-region',
  '/sign-in': {
    vi: '/dang-nhap',
    en: '/sign-in'
  }
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = undefined

export type AppLocales = (typeof locales)[number]
export type AppPathnames = keyof typeof pathnames
