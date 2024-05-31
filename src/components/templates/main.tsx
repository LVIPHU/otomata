'use client'

import { MacbookScroll } from '@/components/molecules/macbook-scroll'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/atoms/carousel'
import { cn, ContactBody, ContactBodyType } from '@/libs/utils'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/form'
import { Input } from '@/components/atoms/input'
import { Button } from '@/components/atoms/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/atoms/textarea'
import Reveal from '@/components/molecules/reveal'
import { usePathname, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function MainTemplates() {
  const pathname = usePathname()
  const t = useTranslations('Main')
  const searchParams = useSearchParams()
  const plugin = useRef(Autoplay({ delay: 20000, stopOnInteraction: true }))
  const form = useForm<ContactBodyType>({
    resolver: zodResolver(ContactBody),
    defaultValues: {
      fullName: '',
      company: '',
      email: '',
      subject: '',
      message: ''
    }
  })

  useEffect(() => {
    if (pathname && searchParams) {
      const hash = window.location.hash
      if (hash) {
        const elementId = hash.substring(1) // Loại bỏ dấu #
        const element = document.getElementById(elementId)
        if (element) {
          window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
          })
        }
      }
    }
  }, [pathname, searchParams])

  async function onSubmit(values: ContactBodyType) {}

  return (
    <div>
      <div className='overflow-hidden dark:bg-[#0B0B0F] bg-white w-full'>
        <MacbookScroll
          title={
            <div className={'max-w-[800px] flex flex-col gap-5 text-center'}>
              <Reveal variant={'right'}>
                <h1 className={'text-5xl font-extrabold'}>
                  {t('section.1.title')} <br /> {t('section.1.sub-title')}
                </h1>
              </Reveal>
              <Reveal variant={'left'}>
                <p className={'text-xl text-color'}>{t('section.1.description')}</p>
              </Reveal>
            </div>
          }
          content={<div className={'container-content'}>{sectionTwo(true)}</div>}
          showGradient={false}
        />
      </div>
      <section id={'solution'} className={'container-content py-16 md:py-24'}>
        {sectionTwo(false)}
      </section>
      <section id={'products'} className={'container-content py-16 group min-h-[100vh]'}>
        <div className={'flex flex-col gap-5 px-6'}>
          <Reveal variant={'top'}>
            <h2 className={'text-center text-4xl font-extrabold'}>Các sản phẩm đã làm cho khách</h2>
          </Reveal>
          <Reveal variant={'bottom'}>
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
                        <CardContent className={'relative h-[70vh]'}>
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
              <CarouselPrevious className={'hidden group-hover:inline-flex'} />
              <CarouselNext className={'hidden group-hover:inline-flex'} />
            </Carousel>
          </Reveal>
        </div>
      </section>
      <section
        id={'contact'}
        className={'container-content py-16 group min-h-[100vh] flex justify-center items-center'}
      >
        <div className={'flex flex-col gap-5 px-6'}>
          <div className={'text-center flex flex-col gap-5 justify-center items-center'}>
            <Reveal variant={'left'}>
              <h2 className={'text-4xl font-extrabold'}>Ready to talk?</h2>
            </Reveal>
            <Reveal variant={'right'}>
              <p className={'text-xl text-color max-w-[800px]'}>
                Whether you&apos;ve got an emergency that requires a rapid solution, or just interested in discussing
                how the platform might stop on in the future, we&apos;re here to talk.
              </p>
            </Reveal>
          </div>
          <Reveal variant={'bottom'}>
            <div className={'flex justify-center items-center'}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 max-w-[600px] flex-shrink-0 w-full'>
                  <div className={'grid grid-cols-1 md:grid-cols-2 gap-5'}>
                    <FormField
                      control={form.control}
                      name='fullName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full name</FormLabel>
                          <FormControl>
                            <Input placeholder='Your full name' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='company'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder='Your company name' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder='Your email address' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='subject'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder='Open Source' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='message'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder='What can we help?' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit' className={'w-full !mt-10'}>
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

const sectionTwo = (isLid: boolean) => {
  return (
    <div className={cn('flex flex-col', isLid ? 'gap-16' : 'gap-20')}>
      <Reveal variant={'left'}>
        <h2 className={cn('text-center', isLid ? 'text-3xl font-bold' : 'text-4xl font-extrabold')}>
          OTOMATA sẽ làm gì cho bạn ?
        </h2>
      </Reveal>
      {dataSection2.map(({ image, content }, index) => (
        <div key={index} className={cn('grid grid-cols-1 md:grid-cols-2', isLid ? 'gap-8' : 'gap-10')}>
          <Reveal variant={'bottom'}>
            <Image
              src={image}
              alt={`image-${index}`}
              height='500'
              width='500'
              className={cn(
                'w-full h-full p-4 object-cover order-none',
                index % 2 ? 'md:order-first' : 'md:order-last'
              )}
            />
          </Reveal>
          <div
            className={cn('flex flex-col justify-center order-none', index % 2 ? 'md:order-last' : 'md:order-first')}
          >
            <Reveal variant={index % 2 ? 'right' : 'left'}>
              <div className={'text-xl'}>{content}</div>
            </Reveal>
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
