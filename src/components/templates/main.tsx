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

  async function onSubmit(values: ContactBodyType) {
    console.log('values contact', values)
  }

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
          content={<div className={'container-content'}>{sectionTwo(true, t)}</div>}
          showGradient={false}
        />
      </div>
      <section id={'solution'} className={'container-content py-16 md:py-24 text-center'}>
        {sectionTwo(false, t)}
      </section>
      <section id={'products'} className={'text-center container-content py-16 group min-h-[100vh]'}>
        <div className={'flex flex-col gap-5 px-6'}>
          <Reveal variant={'top'}>
            <h2 className={'text-center text-4xl font-extrabold'}>{t('section.3.title')}</h2>
            <h3 className={'text-center text-xl font-thin pt-4'}>{t('section.3.subsection_title')}</h3>
          </Reveal>
          <Reveal variant={'bottom'}>
            <Carousel
              plugins={[plugin.current]}
              className='w-full'
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselPrevious />
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
              <CarouselNext />
            </Carousel>
          </Reveal>
        </div>
      </section>
      <section
        id={'contact'}
        className={'container-content py-16 group min-h-[100vh] flex justify-center items-center text-center'}
      >
        <div className={'flex flex-col gap-5 px-6'}>
          <div className={'text-center flex flex-col gap-5 justify-center items-center'}>
            <Reveal variant={'left'}>
              <h2 className={'text-4xl font-extrabold'}>{t('section.4.title')}</h2>
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
                          <FormLabel>{t('section.4.form.full-name.label')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('section.4.form.full-name.placeholder')} {...field} />
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
                          <FormLabel>{t('section.4.form.company.label')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('section.4.form.company.placeholder')} {...field} />
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
                        <FormLabel>{t('section.4.form.email.label')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('section.4.form.email.placeholder')} {...field} />
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
                        <FormLabel>{t('section.4.form.subject.label')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('section.4.form.subject.placeholder')} {...field} />
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
                        <FormLabel>{t('section.4.form.message.label')}</FormLabel>
                        <FormControl>
                          <Textarea placeholder={t('section.4.form.message.placeholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit' className={'w-full !mt-10'}>
                    {t('actions.submit')}
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

const sectionTwo = (isLid: boolean, t: (value: string) => string) => {
  return (
    <div className={cn('flex flex-col', isLid ? 'gap-16' : 'gap-20')}>
      {dataSection2(t).map(({ image, content }, index) => (
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

const dataSection2 = (t: (value: string) => string) => [
  {
    image: '/images/thumbnail/2.svg',
    content: (
      <div>
        <h2 className='text-3xl pb-4 font-extrabold'>{t('section.2.first.1')}</h2>
        <p className={'text-color'}>
          {t('section.2.first.2')}
          <br />
          {t('section.2.first.3')}
        </p>
      </div>
    )
  },
  {
    image: '/images/thumbnail/1.svg',
    content: (
      <div>
        <h2 className='text-3xl pb-4 font-extrabold'>{t('section.2.second.1')}</h2>
        <p className={'text-color'}>
          {t('section.2.second.2')}
          <br />
          {t('section.2.second.3')}
        </p>
      </div>
    )
  },
  {
    image: '/images/thumbnail/3.svg',
    content: (
      <div>
        <h2 className='text-3xl pb-4 font-extrabold'>{t('section.2.third.1')}</h2>
        <p className={'text-color'}>
          {t('section.2.third.2')}
          <br />
          {t('section.2.third.3')}
        </p>
      </div>
    )
  }
]

const dataSection3 = [
  {
    title: 'OTOMATA task automation',
    video: 'https://www.youtube.com/embed/rn6UNJQXBgM?si=TeOMb3Ztz2kJYkB8'
  },
  {
    title: 'OTOMATA form filler',
    video: 'https://www.youtube.com/embed/rEvjrCESMpc?si=r-zT3jQpQuXTTfIF'
  }
]
