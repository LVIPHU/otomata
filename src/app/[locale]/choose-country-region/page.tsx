import NavigationLink from '@/components/atoms/navigation-link'
import { AppLocales } from '@/libs/next-intl/config'
import { cn } from '@/libs/utils'
import { unstable_setRequestLocale } from 'next-intl/server'

type Props = {
  params: { locale: string }
}

interface FooterItem {
  title: string
  children: {
    label: string
    locale: AppLocales
  }[]
}

export default function ChooseCountryRegion({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

  const data: FooterItem[] = [
    {
      title: 'Asia Pacific',
      children: [
        // { label: 'Australia', locale: 'en' },
        // { label: '中国大陆', locale: 'en' },
        { label: 'Việt Nam', locale: 'vi-VN' }
      ]
    },
    {
      title: 'The United States',
      children: [{ label: 'United States', locale: 'en-US' }]
    }
  ]
  return (
    <>
      <header className={'container mx-auto ps-6 pe-6'}>
        <div className={'h-14 flex items-center border-b border-gray-400'}>
          <NavigationLink href={'/choose-country-region'} className={'text-xl font-semibold'}>
            Choose Your Country or Region
          </NavigationLink>
        </div>
      </header>
      <main className={'mt-16'}>
        {data.map(({ title, children }, index) => (
          <section key={index} className={'container-content'}>
            <div className={cn('pt-8 pb-5', index === 0 ? '' : 'border-t border-gray-400')}>
              <h2 className={'font-semibold text-3xl'}>{title}</h2>
            </div>
            <div className={'mt-3'}>
              <ul className={'mt-3 mb-6 pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}>
                {children.map(({ label, locale }) => (
                  <li key={label}>
                    <NavigationLink href={'/'} locale={locale}>
                      <span>{label}</span>
                    </NavigationLink>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </main>
    </>
  )
}
