import { Button } from '@/components/atoms/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/atoms/card'
import { unstable_setRequestLocale } from 'next-intl/server'
import LocaleSwitcher from '@/components/molecules/locale-switcher'
import { ThemeToggle } from '@/components/molecules/theme-toggle'

type Props = {
  params: { locale: string }
}

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <LocaleSwitcher />
      <ThemeToggle />
      <Button>Hello</Button>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </main>
  )
}
