import React, { ReactNode } from 'react'
import ThemeProvider from '@/provider/theme'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import FirebaseAuthProvider from '@/provider/firebase-auth'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export default function ProviderRegistry({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale)
  const messages = useMessages()
  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
        <FirebaseAuthProvider>{children}</FirebaseAuthProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
