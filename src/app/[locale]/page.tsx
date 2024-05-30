'use client'
import MainTemplates from '@/components/templates/main'
import { useEffect, useState } from 'react'
import LoadingTemplates from '@/components/templates/loading'

type Props = {
  params: { locale: string }
}

export default function Home({ params: { locale } }: Props) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Giả lập quá trình tải dữ liệu hoặc chuẩn bị trang
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 giây

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingTemplates />
  }
  return (
    <main>
      <MainTemplates></MainTemplates>
    </main>
  )
}
