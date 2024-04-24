import SignUpTemplates from '@/components/templates/sign-up'
import { unstable_setRequestLocale } from 'next-intl/server'

type Props = {
  params: { locale: string }
}

export default function SignUp({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

  return (
    <>
      <SignUpTemplates />
    </>
  )
}
