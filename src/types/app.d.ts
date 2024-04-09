import { ReactElement } from 'react'
import { AppPathnames } from '@/libs/next-intl/config'

export type MenuItem = {
  content: string | ReactElement
  href?: AppPathnames
  children?: MenuItem[]
}
