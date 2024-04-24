import { unstable_setRequestLocale } from 'next-intl/server'
import MainTemplates from '@/components/templates/main'

type Props = {
  params: { locale: string }
}

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)
  return (
    <main>
      <MainTemplates></MainTemplates>
    </main>
  )
}
