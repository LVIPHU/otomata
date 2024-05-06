'use client'

import { MacbookScroll } from '@/components/molecules/macbook-scroll'
import Image from 'next/image'
import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import Autoplay from 'embla-carousel-autoplay'

import { Card, CardContent } from '@/components/atoms/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/atoms/carousel'
import { cn } from '@/libs/utils'

export default function MainTemplates() {
  const ref = useRef<HTMLDivElement>(null)
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const sectionTwo = (isLid: boolean) => {
    return (
      <div ref={ref} className={cn('flex flex-col mb-20', isLid ? 'gap-16' : 'gap-20')}>
        <h2 className={cn('text-center', isLid ? 'text-3xl font-bold' : 'text-4xl font-extrabold')}>
          OTOMATA sẽ làm gì cho bạn ?
        </h2>
        {data.map(({ image, content }, index) => (
          <div key={index} className={cn('grid grid-cols-2', isLid ? 'gap-8' : 'gap-10')}>
            <Image
              src={image}
              alt={`image-${index}`}
              height='500'
              width='500'
              className={cn('w-full h-full p-4 object-cover', index % 2 ? 'order-first' : 'order-last')}
            />
            <div className={cn('flex flex-col justify-center', index % 2 ? 'order-last' : 'order-first')}>
              <div className={'text-xl'}>{content}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className='overflow-hidden dark:bg-[#0B0B0F] bg-white w-full'>
        <MacbookScroll
          title={
            <div className={'max-w-[800px] flex flex-col gap-5 text-center'}>
              <h1 className={'text-5xl font-extrabold'}>
                Đêm OT ta đi ăn 🍜 <br /> Task gì việc gì tool này lo hết
              </h1>
              <p className={'text-xl text-color'}>
                OTOMATA là dự án freelance được ra đời để giúp 💪 các anh chị em văn phòng tự động hoá những công việc
                văn phòng trong công ty, chỉ với vài ngày lương và vài cú click.
              </p>
            </div>
          }
          content={<div className={'container-content'}>{sectionTwo(true)}</div>}
          showGradient={false}
        />
      </div>
      <div className={'container-content'}>{sectionTwo(false)}</div>
      <div className={'container-content'}>
        <Carousel
          plugins={[plugin.current]}
          className='w-full max-w-xs'
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className='p-1'>
                  <Card>
                    <CardContent className='flex aspect-square items-center justify-center p-6'>
                      <span className='text-4xl font-semibold'>{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

const data = [
  {
    image: '/images/placeholder-image.svg',
    content: (
      <p className={'text-color'}>
        {' '}
        Chạy luồng công việc phức tạp với tool được thiết kế riêng cho bạn hoặc công ty bạn, với quy trình dễ hiểu và
        đơn giản. <br /> Bạn đặt lịch tư vấn, đợi mình làm xong app giao cho bạn, bạn nhập liệu, bạn cấu hình tool rồi
        bấm nút chạy.{' '}
      </p>
    )
  },
  {
    image: '/images/placeholder-image.svg',
    content: (
      <p className={'text-color'}>
        Tự động hoá những quy trình, nghiệp vụ thủ công bạn phải làm đi làm lại quanh năm suốt tháng.
        <br />
        Có thể tự động hoá những quy trình ngõ ngách mà những sản phẩm tự động hoá trên thị trường chưa có làm được.
      </p>
    )
  },
  {
    image: '/images/placeholder-image.svg',
    content: (
      <p className={'text-color'}>
        {' '}
        Bảo hành 3 tháng sau khi giao tool.
        <br />
        Được hỗ trợ 30% chi phí thiết kế lại tool khi task văn phòng bạn có xảy ra thay đổi
      </p>
    )
  }
]
