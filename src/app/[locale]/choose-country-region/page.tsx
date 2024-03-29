import NavigationLink from '@/components/molecules/navigation-link'
import { AppLocales } from '@/libs/next-intl/config'

interface FooterItem {
  title: string
  children: {
    label: string
    locale: AppLocales
  }[]
}

export default function ChooseCountryRegion() {
  const data: FooterItem[] = [
    {
      title: 'Africa, Middle East, and India',
      children: []
    },
    {
      title: 'Asia Pacific',
      children: [
        { label: 'Australia', locale: 'en' },
        { label: '中国大陆', locale: 'en' },
        { label: 'Việt Nam', locale: 'vi' }
      ]
    },
    {
      title: 'Europe',
      children: []
    },
    {
      title: 'Latin America and the Caribbean',
      children: []
    },
    {
      title: 'The United States, Canada, and Puerto Rico',
      children: [{ label: 'United States', locale: 'en' }]
    }
  ]
  return (
    <>
      <header className={'container mx-auto ps-6 pe-6'}>
        <div className={'h-14 flex items-center border-b border-gray-400'}>
          <NavigationLink href={'/choose-country-region'} className={'text-xl font-semibold'}>
            Choose Your Country or Region
          </NavigationLink>{' '}
        </div>
      </header>
      <main className={'mt-16'}>
        {data.map(({ title, children }, index) => (
          <section key={index} className={'container-content'}>
            <div className={'pt-8 pb-5 border-t border-gray-400'}>
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
