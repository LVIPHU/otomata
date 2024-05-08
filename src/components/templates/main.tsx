'use client'

import { MacbookScroll } from '@/components/molecules/macbook-scroll'
import Image from 'next/image'
import { useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/atoms/carousel'
import { cn } from '@/libs/utils'

export default function MainTemplates() {
  const plugin = useRef(Autoplay({ delay: 20000, stopOnInteraction: true }))

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
      <div className={'container-content mb-20'}>{sectionTwo(false)}</div>
      <div className={'container-content mb-20 group'}>
        <div className={'flex flex-col gap-5 px-6'}>
          <h2 className={'text-center text-4xl font-extrabold'}>Các sản phẩm đã làm cho khách</h2>
          <Carousel
            plugins={[plugin.current]}
            className='w-full'
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {dataSection3.map(({ video, title }, index) => (
                <CarouselItem key={index}>
                  <div className='p-1'>
                    <Card>
                      <CardHeader>
                        <CardTitle>{title}</CardTitle>
                      </CardHeader>
                      <CardContent className={'relative h-[400px] md:h-[600px] lg:h-[700px]'}>
                        <iframe
                          className={'absolute top-0 left-0 w-full h-full'}
                          width='560'
                          height='320'
                          src={video}
                          title={title}
                          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                          referrerPolicy='strict-origin-when-cross-origin'
                          allowFullScreen
                        ></iframe>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={'hidden group-hover:inline-flex'}/>
            <CarouselNext className={'hidden group-hover:inline-flex'}/>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

const sectionTwo = (isLid: boolean) => {
  return (
    <div className={cn('flex flex-col', isLid ? 'gap-16' : 'gap-20')}>
      <h2 className={cn('text-center', isLid ? 'text-3xl font-bold' : 'text-4xl font-extrabold')}>
        OTOMATA sẽ làm gì cho bạn ?
      </h2>
      {dataSection2.map(({ image, content }, index) => (
        <div key={index} className={cn('grid grid-cols-1 md:grid-cols-2', isLid ? 'gap-8' : 'gap-10')}>
          <Image
            src={image}
            alt={`image-${index}`}
            height='500'
            width='500'
            className={cn('w-full h-full p-4 object-cover order-none', index % 2 ? 'md:order-first' : 'md:order-last')}
          />
          <div className={cn('flex flex-col justify-center order-none', index % 2 ? 'md:order-last' : 'md:order-first')}>
            <div className={'text-xl'}>{content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

const dataSection2 = [
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

const dataSection3 = [
  {
    title: 'OTOMATA task automation',
    video: 'https://www.youtube.com/embed/JgflLii5MbM?si=QSh7m0kc7Pa45BBD'
  },
  {
    title: 'OTOMATA form filler',
    video: 'https://www.youtube.com/embed/rEvjrCESMpc?si=r-zT3jQpQuXTTfIF'
  }
]
