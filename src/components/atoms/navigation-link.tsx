'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import { ComponentProps } from 'react'
import type { AppPathnames } from '@/libs/next-intl/config'
import { Link } from '@/libs/next-intl/navigation'
import { cn } from '@/libs/utils'

export default function NavigationLink<Pathname extends AppPathnames>({
  href,
  className,
  ...rest
}: ComponentProps<typeof Link<Pathname>>) {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'
  const isActive = pathname === href

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'no-underline whitespace-nowrap transition-colors',
          className
      )}
      href={href}
      {...rest}
    />
  )
}
