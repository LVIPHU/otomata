import { ReactNode } from 'react'

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <div className={'min-h-screen pt-32'}>{children}</div>
}
