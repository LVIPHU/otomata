import * as React from 'react'
import { MenuItem } from '@/types/app'
import { useTranslations } from 'next-intl'
import NavigationLink from '@/components/atoms/navigation-link'
import { Label } from '@/components/atoms/label'
import Preferences from '@/components/molecules/preferences'
import { Facebook, Github, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('Navbar')
  const menuItems: MenuItem[] = [
    { content: t('products'), children: [{ title: 'tool', href: '/' }] },
    {
      content: t('resources'),
      children: [
        { title: t('docs'), href: '/' },
        { title: t('pricing'), href: '/' },
        { title: t('customer'), href: '/' }
      ]
    },
    {
      content: t('company'),
      children: [
        { title: t('docs'), href: '/' },
        { title: t('pricing'), href: '/' },
        { title: t('customer'), href: '/' }
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
                <NavigationLink href={item.href || '/'}>{item.title}</NavigationLink>
              </li>
            ))}
        </ul>
      </div>
    ))
  }

  return (
    <footer className={'border-t border-input'}>
      <nav className={'container-content py-12 grid grid-cols-5 gap-6'}>
        <div className={'flex flex-col pt-2 gap-2'}>
          <div>LOGO</div>
          <div className={'flex gap-3 items-center'}>
            <Facebook className={'h-5 w-5'} />
            <Youtube className={'h-5 w-5'} />
            <Github className={'h-5 w-5'} />
            <Linkedin className={'h-5 w-5'} />
          </div>
        </div>
        {renderMenu(menuItems)}
        <Preferences />
      </nav>
    </footer>
  )
}
