'use client'
import { useTranslations } from 'next-intl'
import NavigationLink from '@/components/atoms/navigation-link'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
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
import { cn } from '@/libs/utils'
import { useState } from 'react'
import { AlignRight } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/atoms/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/atoms/accordion'
import { ScrollArea } from '@/components/atoms/scroll-area'
import useMediaQuery from '@/hooks/use-media-query'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const slicePathname = pathname.slice(6)
  const t = useTranslations('Navbar')
  const { scrollY } = useScroll()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [hidden, setHidden] = useState(false)
  useMotionValueEvent(scrollY, 'change', (latestValue) => {
    const previousValue = scrollY.getPrevious()
    if (previousValue && latestValue > previousValue && latestValue > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })
  const menuItems: MenuItem[] = [
    {
      id: slicePathname === '' ? '#solution' : '/#solution',
      content: t('solutions')
    },
    {
      id: slicePathname === '' ? '#products' : '/#products',
      content: t('products')
    },
    {
      id: slicePathname === '' ? '#pricing' : '/#pricing',
      content: t('pricing')
    }
  ]

  const headerRightItems: MenuItem[] = [
    // {
    //   content: (
    //     <Button className={'w-full lg:w-auto'} variant={'ghost'}>
    //       {t('contact')}
    //     </Button>
    //   ),
    //   href: '/'
    // },
    {
      content: (
        <Button className={'w-full lg:w-auto'} variant={'outline'}>
          {t('sign-in')}
        </Button>
      ),
      href: '/sign-in'
    },
    { content: <Button className={'w-full lg:w-auto'}>{t('sign-up')}</Button>, href: '/sign-up' }
  ]

  const renderMenu = (items: MenuItem[]) => {
    return items.map(({ id, content, children }, index) => (
      <NavigationMenuItem key={index}>
        {id ? (
          <a href={id} className={'pr-9'}>
            <span className={'text-sm font-medium'}>{content}</span>
          </a>
        ) : (
          <>
            <NavigationMenuTrigger>{content}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                {children &&
                  children.map((item, index) => (
                    <li key={index}>
                      <NavigationMenuLink href={item.href ?? '/'}>
                        <div
                          className={cn(
                            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                          )}
                        >
                          <div className='text-sm font-medium leading-none'>{item.title}</div>
                          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{item.description}</p>
                        </div>
                      </NavigationMenuLink>
                    </li>
                  ))}
              </ul>
            </NavigationMenuContent>
          </>
        )}
      </NavigationMenuItem>
    ))
  }

  const renderMobileMenu = (items: MenuItem[]) => {
    return items.map(({ id, content, children }, index) => (
      <AccordionItem value={`item-${index}`} key={index}>
        {id ? (
          <div className={'flex items-center py-4 font-medium'}>
            <a href={id}>
              <span className={'text-sm font-medium leading-none'}>{content}</span>
            </a>
          </div>
        ) : (
          <>
            <AccordionTrigger>
              <span>{content}</span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className='grid gap-3 p-4'>
                {children &&
                  children.map((item, index) => (
                    <li key={index}>
                      <NavigationLink href={item.href ?? '/'}>
                        <span className='text-sm font-medium leading-none'>{item.title}</span>
                      </NavigationLink>
                    </li>
                  ))}
              </ul>
            </AccordionContent>
          </>
        )}
      </AccordionItem>
    ))
  }

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      animate={hidden ? 'hidden' : ' visible'}
      className={'container-content flex py-4 sticky top-0 bg-background z-10'}
    >
      <Sheet>
        <div className={'flex justify-between items-center w-full'}>
          {isDesktop ? (
            <>
              <NavigationMenu className={'flex'}>
                <div className={'mr-8'}>LOGO</div>
                <NavigationMenuList>{renderMenu(menuItems)}</NavigationMenuList>
              </NavigationMenu>
              <div className={'flex gap-3'}>
                <a href={'#contact'}>
                  <Button className={'w-full lg:w-auto'} variant={'ghost'}>
                    {t('contact')}
                  </Button>
                </a>
                {headerRightItems.map(({ href, content }, index) => (
                  <NavigationLink key={index} href={href || '/'} passHref>
                    {content}
                  </NavigationLink>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className={'mr-8 block lg:hidden'}>LOGO</div>
              <SheetTrigger>
                <AlignRight className={'inline-flex lg:hidden'} />
              </SheetTrigger>
            </>
          )}
        </div>
        <SheetContent side={'right'}>
          <div className={'grid grid-cols-1 gap-5 mt-7'}>
            {headerRightItems.map(({ href, content }, index) => (
              <NavigationLink key={index} href={href || '/'} passHref>
                {content}
              </NavigationLink>
            ))}
            <ScrollArea className={'h-[75vh]'}>
              <Accordion type='single' collapsible className='w-full'>
                {renderMobileMenu(menuItems)}
              </Accordion>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </motion.header>
  )
}
