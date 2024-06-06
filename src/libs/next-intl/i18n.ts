import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from './config'

// Can be imported from a shared config

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: {
      ...(await import(`../../../public/locales/${locale}/common.json`)).default,
      ...(await import(`../../../public/locales/${locale}/main.json`)).default,
      ...(await import(`../../../public/locales/${locale}/sign-in.json`)).default,
      ...(await import(`../../../public/locales/${locale}/sign-up.json`)).default
    }
  }
})
