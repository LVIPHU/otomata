import { useTranslations } from 'next-intl'
import NavigationLink from '@/components/atoms/navigation-link'
import { Button } from '@/components/atoms/button'
import {MenuItem, MenuItemChildren} from '@/types/app'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/atoms/navigation-menu'
import {cn} from "@/libs/utils";

export default function Header() {
  const t = useTranslations('Navbar')

  const menuItems: MenuItem[] = [
    { content: t('products'), children:[
        {
          title: "Alert Dialog",
          href: "/",
          description:
              "A modal dialog that interrupts the user with important content and expects a response.",
        },
        {
          title: "Hover Card",
          href: "/",
          description:
              "For sighted users to preview content available behind a link.",
        },
        {
          title: "Progress",
          href: "/",
          description:
              "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
        },
        {
          title: "Scroll-area",
          href: "/",
          description: "Visually or semantically separates content.",
        },
        {
          title: "Tabs",
          href: "/",
          description:
              "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
        },
        {
          title: "Tooltip",
          href: "/",
          description:
              "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
        },
      ]},
    { content: t('solutions'), children:[
        {
          title: "Alert Dialog",
          href: "/",
          description:
              "A modal dialog that interrupts the user with important content and expects a response.",
        },
        {
          title: "Hover Card",
          href: "/",
          description:
              "For sighted users to preview content available behind a link.",
        },
        {
          title: "Progress",
          href: "/",
          description:
              "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
        },
        {
          title: "Scroll-area",
          href: "/",
          description: "Visually or semantically separates content.",
        },
        {
          title: "Tabs",
          href: "/",
          description:
              "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
        },
        {
          title: "Tooltip",
          href: "/",
          description:
              "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
        },
      ]},
    { content: t('resources'), children:[
        {
          title: "Alert Dialog",
          href: "/",
          description:
              "A modal dialog that interrupts the user with important content and expects a response.",
        },
        {
          title: "Hover Card",
          href: "/",
          description:
              "For sighted users to preview content available behind a link.",
        },
        {
          title: "Progress",
          href: "/",
          description:
              "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
        },
        {
          title: "Scroll-area",
          href: "/",
          description: "Visually or semantically separates content.",
        },
        {
          title: "Tabs",
          href: "/",
          description:
              "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
        },
        {
          title: "Tooltip",
          href: "/",
          description:
              "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
        },
      ]},
    { content: t('docs'), href: '/' },
    { content: t('pricing'), href: '/' }
  ]

  const headerRightItems: MenuItem[] = [
    { content: <Button variant={'ghost'}>{t('contact')}</Button>, href: '/' },
    { content: <Button variant={'outline'}>{t('sign-in')}</Button>, href: '/sign-in' },
    { content: <Button>{t('sign-up')}</Button>, href: '/sign-up' }
  ]

  const ListItem = ( props: MenuItemChildren ) => {
    return (
        <li>
          <NavigationMenuLink href={props.href ?? '/'}>
            <div
                className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                )}
            >
              <div className="text-sm font-medium leading-none">{props.title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {props.description}
              </p>
            </div>
          </NavigationMenuLink>
        </li>
    )
  }

  const renderMenu = (items: MenuItem[]) => {
    return items.map(({ href, content, children }, index) => (
      <NavigationMenuItem key={index}>
        {href ? (
          <NavigationMenuLink href={href}>
            <span className={'text-sm font-medium'}>{content}</span>
          </NavigationMenuLink>
        ) : (
          <>
            <NavigationMenuTrigger>{content}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {children && children.map((item) => (
                    ListItem(item)
                ))}
              </ul>
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
