import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'
import { Search, ShoppingBag } from 'lucide-react'
import type { AppPathnames } from '@/libs/next-intl/config'
import NavigationLink from '@/components/molecules/navigation-link'

interface MenuItem {
  content: string | ReactNode
  href?: AppPathnames
  children?: MenuItem[]
}

export default function Navbar() {
  const t = useTranslations('Navbar')

  const menuItems: MenuItem[] = [
    { content: 'LOGO' },
    { content: t('store'), href: '/sign-in' },
    { content: t('tool'), href: '/' },
    { content: t('support'), href: '/' },
    { content: <Search /> },
    { content: <ShoppingBag /> }
  ]

  const renderMenu = (items: MenuItem[]) => {
    return items.map((item, index) => (
      <li key={index}>
        {item.href ? (
          <NavigationLink href={item.href} className={'px-2 flex'}>
            <span className={'h-11 inline-flex justify-center items-center'}>{item.content}</span>
          </NavigationLink>
        ) : (
          <div className={'px-2 flex hover:cursor-pointer'}>
            <span className={'h-11 inline-flex justify-center items-center'}>{item.content}</span>
          </div>
        )}
      </li>
    ))
  }

  return (
    <nav className={'container-content'}>
      <ul className={'list-none flex justify-between items-center'}>{renderMenu(menuItems)}</ul>
    </nav>
  )
}
