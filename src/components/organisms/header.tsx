import { useTranslations } from 'next-intl'
import NavigationLink from '@/components/molecules/navigation-link'
import { Button } from '@/components/atoms/button'
import { MenuItem } from '@/types/app'

export default function Header() {
  const t = useTranslations('Navbar')

  const menuItems: MenuItem[] = [
    { content: t('products') },
    { content: t('solutions') },
    { content: t('resources') },
    { content: t('docs'), href: '/' },
    { content: t('pricing'), href: '/' }
  ]

  const headerRightItems: MenuItem[] = [
    { content: <Button variant={'ghost'}>{t('contact')}</Button>, href: '/' },
    { content: <Button variant={'outline'}>{t('sign-in')}</Button>, href: '/sign-in' },
    { content: <Button>{t('sign-up')}</Button>, href: '/sign-up' }
  ]

  const renderMenu = (items: MenuItem[]) => {
    return items.map(({ href, content }, index) => (
      <li key={index} className={'flex items-center justify-center'}>
        {href ? (
          <NavigationLink href={href} className={'px-3 py-2'}>
            <span>{content}</span>
          </NavigationLink>
        ) : (
          <button className={'px-3 py-2'}>
            <span>{content}</span>
          </button>
        )}
      </li>
    ))
  }

  return (
    <header className={'container-content flex py-4 sticky top-0 bg-background'}>
      <div className={'flex justify-between items-center w-full'}>
        <div className={'flex items-center'}>
          <div className={'mr-8'}>LOGO</div>
          <nav>
            <ul className={'list-none flex justify-between items-center relative'}>{renderMenu(menuItems)}</ul>
          </nav>
        </div>
        <div className={'flex gap-3'}>
          {headerRightItems.map(({ href, content }, index) => (
            <NavigationLink href={href || '/'} key={index}>
              {content}
            </NavigationLink>
          ))}
        </div>
      </div>
    </header>
  )
}
