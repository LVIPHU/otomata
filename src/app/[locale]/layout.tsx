import { Roboto } from 'next/font/google'
import { ReactNode } from 'react'
import { locales } from '@/libs/next-intl/config'
import { getTranslations } from 'next-intl/server'
import Footer from '@/components/organisms/footer'
import Header from '@/components/organisms/header'
import ProviderRegistry from '@/provider'

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['vietnamese', 'latin'],
  display: 'swap'
})

type Props = {
  children: ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('title'),
    description: t('description')
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={roboto.className}>
        <ProviderRegistry params={params}>
          <Header />
          {children}
          <Footer />
        </ProviderRegistry>
      </body>
    </html>
  )
}
