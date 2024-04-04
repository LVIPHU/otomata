import { unstable_setRequestLocale } from 'next-intl/server'

type Props = {
  params: { locale: string }
}

export default function SignIn({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)
  return <div>Sign In</div>
}
