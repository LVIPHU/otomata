import { ReactElement } from 'react'
import { AppPathnames } from '@/libs/next-intl/config'

export type MenuItem = {
  content: string | ReactElement
  href?: AppPathnames
  children?: {
    title: string
    href?: AppPathnames
    description?:string
    icon?: ReactElement
  }[]
}
