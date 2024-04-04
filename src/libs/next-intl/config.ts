import { Pathnames } from 'next-intl/navigation'

export const locales = ['vi-VN', 'en-US'] as const

export const pathnames = {
  '/': '/',
  '/choose-country-region': '/choose-country-region',
  '/sign-in': {
    'vi-VN': '/dang-nhap',
    'en-US': '/sign-in'
  },
  '/sign-up': {
    'vi-VN': '/dang-ky',
    'en-US': '/sign-up'
  }
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = undefined

export type AppLocales = (typeof locales)[number]
export type AppPathnames = keyof typeof pathnames
