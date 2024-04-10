import * as React from 'react'
import { MenuItem } from '@/types/app'
import { useTranslations } from 'next-intl'
import NavigationLink from '@/components/molecules/navigation-link'
import { Label } from '@/components/atoms/label'
import Preferences from '@/components/molecules/preferences'

export default function Footer() {
  const t = useTranslations('Navbar')
  const menuItems: MenuItem[] = [
    { content: t('products'), children: [{ content: 'tool', href: '/' }] },
    {
      content: t('resources'),
      children: [
        { content: t('docs'), href: '/' },
        { content: t('pricing'), href: '/' },
        { content: t('customer'), href: '/' }
      ]
    },
    {
      content: t('company'),
      children: [
        { content: t('docs'), href: '/' },
        { content: t('pricing'), href: '/' },
        { content: t('customer'), href: '/' }
      ]
    }
  ]

  const renderMenu = (items: MenuItem[]) => {
    return items.map(({ content, children }, index) => (
      <div key={index} className={'flex flex-col'}>
        <Label className={'text-base'}>
          <h2>{content}</h2>
        </Label>
        <ul className={'grid grid-cols-2'}>
          {children &&
            children.map((item, index) => (
              <li key={index} className={'py-1'}>
                <NavigationLink href={item.href || '/'}>{item.content}</NavigationLink>
              </li>
            ))}
        </ul>
      </div>
    ))
  }

  return (
    <footer className={'border-t border-gray-400 dark:bg-gray-900'}>
      <nav className={'container-content py-12 grid grid-cols-5 gap-6'}>
        <div className={'flex flex-col pt-2 gap-2'}>
          <div>LOGO</div>
          <div>social contact</div>
        </div>
        {renderMenu(menuItems)}
        <Preferences />
      </nav>
    </footer>
  )
}
