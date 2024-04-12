import { useTranslations } from 'next-intl'
import NavigationLink from '@/components/atoms/navigation-link'
import { Button } from '@/components/atoms/button'
import { MenuItem } from '@/types/app'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/atoms/navigation-menu'

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
      <NavigationMenuItem key={index}>
        {href ? (
          <NavigationMenuLink href={href}>
            <span className={'text-sm font-medium'}>{content}</span>
          </NavigationMenuLink>
        ) : (
          <>
            <NavigationMenuTrigger>{content}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <span>{content}</span>
            </NavigationMenuContent>
          </>
        )}
      </NavigationMenuItem>
    ))
  }

  return (
    <header className={'container-content flex py-4 sticky top-0 bg-background'}>
      <div className={'flex justify-between items-center w-full'}>
        <NavigationMenu>
          <div className={'mr-8'}>LOGO</div>
          <NavigationMenuList>{renderMenu(menuItems)}</NavigationMenuList>
        </NavigationMenu>
        <div className={'flex gap-3'}>
          {headerRightItems.map(({ href, content }, index) => (
            <NavigationLink key={index} href={href || '/'} passHref>
              {content}
            </NavigationLink>
          ))}
        </div>
      </div>
    </header>
  )
}
