'use client'
import * as React from 'react'
import { MenuItem } from '@/types/app'
import { useTranslations } from 'next-intl'
import NavigationLink from '@/components/atoms/navigation-link'
import { Label } from '@/components/atoms/label'
import Preferences from '@/components/molecules/preferences'
import { Facebook, Github, Linkedin, Youtube } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/atoms/collapsible'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const slicePathname = pathname.slice(6)
  const t = useTranslations('Navbar')
  const menuItems: MenuItem[] = [
    {
      id: slicePathname === '' ? '#products' : '/#products',
      content: t('products')
    },
    {
      id: slicePathname === '' ? '#products' : '/#products',
      content: t('resources')
    },
    {
      content: t('company'),
      children: [
        {
          title: t('terms'),
          href: '/legal/terms'
        },
        {
          title: t('privacy-policy'),
          href: '/legal/privacy-policy'
        }
      ]
    }
  ]

  const renderMenu = (items: MenuItem[]) => {
    return items.map(({ id, content, children }, index) => (
      <div key={index} className={'flex flex-col'}>
        <a href={id ?? '#'} className={'hover:cursor-pointer'}>
          <Label className={'text-base'}>{content}</Label>
        </a>
        <ul className={'grid grid-cols-1'}>
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

  const renderMobileMenu = (items: MenuItem[]) => {
    return items.map(({ content, children }, index) => (
      <Collapsible key={index} className={'border-b border-input pb-2 mb-2'}>
        <CollapsibleTrigger className={'w-full flex justify-start'}>
          <Label className={'text-base'}>{content}</Label>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className={'grid grid-cols-2'}>
            {children &&
              children.map((item, index) => (
                <li key={index} className={'py-1'}>
                  <NavigationLink href={item.href || '/'}>{item.title}</NavigationLink>
                </li>
              ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    ))
  }

  const social = (
    <div className={'flex gap-3 items-center'}>
      <Button variant={'ghost'} size={'icon'}>
        <Facebook className={'h-5 w-5'} />
      </Button>
      <Button variant={'ghost'} size={'icon'}>
        <Youtube className={'h-5 w-5'} />
      </Button>
      <Button variant={'ghost'} size={'icon'}>
        <Github className={'h-5 w-5'} />
      </Button>
      <Button variant={'ghost'} size={'icon'}>
        <Linkedin className={'h-5 w-5'} />
      </Button>
    </div>
  )

  return (
    <footer className={'border-t border-input'}>
      <nav className={'container-content py-8 md:py-12 flex flex-col lg:flex-row lg:gap-6 w-full'}>
        <div className={'flex flex-col pt-2 gap-2 mb-4 lg:mb-0'}>
          <div>LOGO</div>
          <div className={'hidden lg:block'}>{social}</div>
        </div>
        <div className={'hidden lg:grow lg:grid lg:grid-cols-3 gap-6'}>{renderMenu(menuItems)}</div>
        <div className={'block lg:hidden'}>{renderMobileMenu(menuItems)}</div>
        <Preferences social={social} />
      </nav>
    </footer>
  )
}
