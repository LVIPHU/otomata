import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from './config'

// Can be imported from a shared config

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (
      await (locale === 'vi-VN'
        ? // When using Turbopack, this will enable HMR for `en`
          import('../../../public/locales/vi-VN.json')
        : import(`../../../public/locales/${locale}.json`))
    ).default
  }
})
