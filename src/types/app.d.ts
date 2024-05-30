import { ReactElement } from 'react'
import { AppPathnames } from '@/libs/next-intl/config'

export type MenuItemChildren = {
  title: string
  href?: AppPathnames
  description?: string
  icon?: ReactElement
}

export type MenuItem = {
  content: string | ReactElement
  href?: AppPathnames
  id?: string
  children?: MenuItemChildren[]
}
