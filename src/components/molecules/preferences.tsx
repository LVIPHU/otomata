'use client'
import * as React from 'react'
import dynamic from 'next/dynamic'

import { useTranslations } from 'next-intl'
import { Computer, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/libs/utils'
import { Label } from '@/components/atoms/label'
import NavigationLink from '@/components/atoms/navigation-link'
import { ReactNode } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/atoms/collapsible'
import useMediaQuery from '@/hooks/use-media-query'

const Button = dynamic(() => import('../atoms/button').then((module) => module.Button), {
  ssr: false
})

const data = [
  {
    name: 'light',
    icon: <Sun className='h-[1.2rem] w-[1.2rem]' />
  },
  {
    name: 'dark',
    icon: <Moon className='h-[1.2rem] w-[1.2rem]' />
  },
  {
    name: 'system',
    icon: <Computer className='h-[1.2rem] w-[1.2rem]' />
  }
]

export default function Preferences({ social }: { social: ReactNode }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const t = useTranslations('Navbar')
  const { setTheme, theme } = useTheme()
  if (isDesktop) {
    return (
      <div className={'flex flex-col gap-3'}>
        <Label className={'text-base'}>
          <h2>{t('preferences')}</h2>
        </Label>
        <div className={'flex gap-3'}>
          {data.map(({ name, icon }) => (
            <Button
              key={name}
              variant='outline'
              size='icon'
              onClick={() => setTheme(name)}
              className={cn('rounded-full', theme === name ? 'bg-accent text-accent-foreground' : '')}
            >
              {icon}
            </Button>
          ))}
        </div>
        <NavigationLink href={'/choose-country-region'}>{t('country')}</NavigationLink>
      </div>
    )
  } else {
    return (
      <div>
        <Collapsible className={'border-b border-input pb-2 mb-2'}>
          <CollapsibleTrigger className={'w-full flex justify-start'}>
            <Label className={'text-base'}>{t('preferences')}</Label>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={'flex justify-between'}>
              <div>{social}</div>
              <div className={'flex gap-3'}>
                {data.map(({ name, icon }) => (
                  <Button
                    key={name}
                    variant='outline'
                    size='icon'
                    onClick={() => setTheme(name)}
                    className={cn('rounded-full', theme === name ? 'bg-accent text-accent-foreground' : '')}
                  >
                    {icon}
                  </Button>
                ))}
              </div>
            </div>
            <NavigationLink className={'ml-4 pt-8'} href={'/choose-country-region'}>
              {t('country')}
            </NavigationLink>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  }
}
