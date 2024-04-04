import { unstable_setRequestLocale } from 'next-intl/server'
import { ThemeToggle } from '@/components/molecules/theme-toggle'

type Props = {
  params: { locale: string }
}

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <ThemeToggle />
    </main>
  )
}
