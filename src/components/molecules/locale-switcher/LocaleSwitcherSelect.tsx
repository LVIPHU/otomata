'use client'
import { useParams } from 'next/navigation'
import { ReactNode, useTransition } from 'react'
import { useRouter, usePathname } from '@/libs/next-intl/navigation'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/atoms/select'

type Props = {
  children: ReactNode
  defaultValue: string
  placeholder: string
}

export default function LocaleSwitcherSelect({ children, defaultValue, placeholder }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(value: string) {
    startTransition(() => {
      router.replace(
        // @ts-ignore
        { pathname, params },
        { locale: value }
      )
    })
  }

  return (
    <Select disabled={isPending} onValueChange={onSelectChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  )
}
