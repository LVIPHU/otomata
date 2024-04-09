'use client'
import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Computer, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/libs/utils'
import { Label } from '@/components/atoms/label'
import { Button } from '@/components/atoms/button'
import NavigationLink from '@/components/molecules/navigation-link'

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

export default function Preferences() {
  const t = useTranslations('Navbar')
  const { setTheme, theme } = useTheme()
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
}
