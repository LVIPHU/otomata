'use client'

import clsx from 'clsx'
import { useSelectedLayoutSegment } from 'next/navigation'
import { ComponentProps } from 'react'
import type { AppPathnames } from '@/libs/next-intl/config'
import { Link } from '@/libs/next-intl/navigation'

export default function NavigationLink<Pathname extends AppPathnames>({
  href,
  ...rest
}: ComponentProps<typeof Link<Pathname>>) {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'
  const isActive = pathname === href

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'no-underline whitespace-nowrap transition-colors'
        // isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
      )}
      href={href}
      {...rest}
    />
  )
}
