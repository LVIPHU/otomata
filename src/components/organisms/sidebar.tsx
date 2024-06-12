import { Button } from '@/components/atoms/button'
import { MenuItem } from '@/types/app'
import NavigationLink from '@/components/atoms/navigation-link'

export default function Sidebar() {
  return (
    <div className={'flex flex-col gap-5'}>
      {menuItems.map(({ content, href }, index) => (
        <NavigationLink key={index} href={href ?? '/'}>
          <Button className={'w-full justify-start'} variant={'ghost'}>
            {content}
          </Button>
        </NavigationLink>
      ))}
    </div>
  )
}

const menuItems: MenuItem[] = [
  { content: 'General', href: '/account' },
  { content: 'Authentication', href: '/account/authentication' }
]
