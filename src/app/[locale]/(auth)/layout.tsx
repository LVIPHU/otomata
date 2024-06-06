import { ReactNode } from 'react'

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <main className={'min-h-screen pt-32'}>{children}</main>
}
