import { unstable_setRequestLocale } from 'next-intl/server'

type Props = {
  params: { locale: string }
}

export default function TermsOfService({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

  return <div>Terms of Service</div>
}
